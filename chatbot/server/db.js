import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// 1. Get the directory name of the current file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 2. Force dotenv to load from the absolute path
dotenv.config({ path: path.join(__dirname, '.env') });

// 3. Debugging check
console.log("Checking URI in db.js...", process.env.MONGO_URI ? "✅ Found it!" : "❌ Still empty!");

const url = process.env.MONGO_URI;

if (!url) {
    console.error("❌ ERROR: MONGO_URI is missing. Make sure your .env file is in:", __dirname);
    process.exit(1);
}

// ... rest of your code (MongoClient, etc.)
const client = new MongoClient(url);
const dbName = 'hackie-hackathon-finder';

export async function getCollection() {
    await client.connect();
    const db = client.db(dbName);
    return db.collection('hackathons');
}

export async function saveToMongo(events) {
    try {
        const collection = await getCollection();
        await collection.insertMany(events);
        console.log("✅ Events saved to MongoDB!");
    } catch (error) {
        console.error("❌ Failed to save events to MongoDB:", error);
    }
}

