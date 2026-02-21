import axios from 'axios';
import { getCollection } from './db.js';

const geocodeLocations = async () => {
    console.log("🌍 Starting Geocoder...");
    const collection = await getCollection();

    // 1. Find events that don't have lat/lng yet
    const hackathons = await collection.find({ lat: { $exists: false } }).toArray();

    if (hackathons.length === 0) {
        console.log("✅ All events already have coordinates!");
        process.exit();
    }

    for (const event of hackathons) {
        try {
            console.log(`📍 Geocoding: ${event.location}...`);

            const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
                params: {
                    q: event.location,
                    format: 'json',
                    limit: 1
                },
                headers: { 'User-Agent': 'HackieProject/1.0' }
            });

            if (response.data.length > 0) {
                const { lat, lon } = response.data[0];

                await collection.updateOne(
                    { _id: event._id },
                    { $set: { lat: parseFloat(lat), lng: parseFloat(lon) } }
                );
                console.log(`✅ Success: ${lat}, ${lon}`);
            }

            // Respect Nominatim's rate limit (1 request per second)
            await new Promise(r => setTimeout(r, 1000));

        } catch (error) {
            console.error(`❌ Failed geocoding ${event.location}:`, error.message);
        }
    }
    console.log("🏁 Geocoding complete!");
    process.exit();
};

geocodeLocations();