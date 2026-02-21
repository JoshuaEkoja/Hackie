import puppeteer from 'puppeteer';
import { saveToMongo } from './db.js';

async function autoScroll(page) {
    await page.evaluate(async () => {
        await new Promise((resolve) => {
            let totalHeight = 1000;
            let distance = 100;
            let timer = setInterval(() => {
                const scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                // If we've scrolled past the current height, 
                // we check if more content loaded
                if (totalHeight >= scrollHeight) {
                    // Wait a moment to see if the height increases
                    setTimeout(() => {
                        if (scrollHeight === document.body.scrollHeight) {
                            clearInterval(timer);
                            resolve();
                        }
                    }, 1000); // 1-second "buffer" to check for new content
                }
            }, 100);
        });
    });
}

const scrapeMLH = async () => {
    console.log("🚀 Starting MLH Scraper...");
    const browser = await puppeteer.launch({
        headless: false,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 8000 });

    // 1. Set a realistic User Agent so you don't look like a basic bot
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36');

    try {
        // 2. Go to the URL but wait until the network is completely quiet
        await page.goto('https://mlh.io/seasons/2026/events', {
            waitUntil: 'networkidle2',
            timeout: 6000000
        });

        await autoScroll(page);

        // Wait specifically until at least 50 events are found
        await page.waitForFunction(() => document.querySelectorAll('h3').length > 10, { timeout: 10000 });

        // 3. Wait for a few seconds manually just to be sure
        console.log("⏳ Waiting for content to render...");
        await new Promise(r => setTimeout(r, 5000));

        // 4. Scrape using extremely broad selectors
        const events = await page.evaluate(() => {
            const allH3 = document.querySelectorAll('h3');
            const results = [];

            allH3.forEach(h3 => {
                const title = h3.innerText.trim();
                // Find the container (usually the <a> tag or a <div>)
                const card = h3.closest('a, .event-wrapper, .inner') || h3.parentElement;

                // 1. Get the Link
                const link = h3.closest('a')?.href || card.querySelector('a')?.href || "";

                // 2. SMART LOCATION SEARCH
                // We look for any span that isn't the title and isn't a date.
                const spans = Array.from(card.querySelectorAll('span'));

                // We'll prioritize spans that specifically mention 'location' or are simply the second span found
                let location = "Remote";
                if (spans.length > 0) {
                    // Usually, the location is the span with the city/state info
                    const locCandidate = spans.find(s =>
                        s.innerText.includes(',') || // Cities often have commas (Austin, TX)
                        s.className.includes('location')
                    );
                    location = locCandidate ? locCandidate.innerText.trim() : spans[0].innerText.trim();
                }

                // 3. SMART DATE SEARCH
                const dateEl = card.querySelector('.event-date, .date, .event-range') ||
                    spans.find(s => s.innerText.match(/\d/)); // Look for a span with numbers
                const date = dateEl ? dateEl.innerText.trim() : "TBD";

                // Filter for upcoming 2026 events
                if (title.length > 2 && link && (date.includes('2026') || date === "TBD")) {
                    results.push({ title, location, date, link });
                }
            });
            return results;
        });

        console.log(`✅ Success! Found ${events.length} events!`);

        if (events.length > 0) {
            await saveToMongo(events);
        } else {
            console.log("⚠️ Still 0? Taking a screenshot for you to check...");
            await page.screenshot({ path: 'debug.png' });
        }

    } catch (error) {
        console.error("❌ Scrape failed:", error.message);
    } finally {
        await browser.close();
        console.log("🔒 Browser closed.");
    }
};

scrapeMLH();