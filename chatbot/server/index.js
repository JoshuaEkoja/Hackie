import express from 'express';
import cors from 'cors';
import 'dotenv/config'; // This replaces the need for dotenv.config()
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getCollection } from './db.js';
import { saveToMongo } from './db.js';

const app = express();

app.get('/api/hackathons', async (req, res) => {
    try {
        const { city, search } = req.query;
        let query = {};

        // Only add to the query if the value actually exists and isn't just whitespace
        if (city && city.trim() !== "") {
            query.location = { $regex: city.trim(), $options: 'i' };
        }

        if (search && search.trim() !== "") {
            query.title = { $regex: search.trim(), $options: 'i' };
        }

        console.log("🔍 Active Query:", query); // Debugging line!

        const hackathons = await Hackathon.find(query);
        res.json(hackathons);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.use(cors());
app.use(express.json());

// initialize Gemini

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

if (!process.env.GEMINI_API_KEY) {
    console.error("❌ ERROR: API Key is missing! Check your .env file.");
} else {
    console.log("✅ API Key loaded successfully.");
}

//setup the model with general and newutral helpful and honest responses

const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-pro',
    systemInstructions: 'You are a helpful and honest assistant. You are capable of providing information and answering questions to the best of your ability. You should always strive to be helpful and provide accurate information. If you do not know the answer to a question, you should say that you do not know rather than trying to make up an answer.',
})

// chat history to keep track of the conversation

let chatHistory = [];

// endpoint to handle chat messages from the client

app.post('/chat', async (req, res) => {
    const { message } = req.body;

    // send the message to the Gemini model and get the response

    try {
        const chat = model.startChat()({
            history: chatHistory,
        })
        const result = await chat.sendMessage(message);
        const response = result.response.text();

        // update chat history

        chatHistory.push({ role: 'user', parts: [{ text: message }] });
        chatHistory.push({ role: 'assistant', parts: [{ text: response }] });

        res.json({ reply: response });

    } catch (error) { // handle any errors that occur during the API call
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
});

// endpoint to fetch hackathon data from MongoDB and send it to the client
app.get('/api/hackathons', async (req, res) => {
    try {
        const collection = await getCollection();
        const hackathons = await collection.find({}).toArray();
        res.json(hackathons); // This sends the data back to React
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch from DB" });
    }
});


const PORT = process.env.PORT || 3000; // start the server and listen on the specified port

app.get('/', (req, res) => {
    res.send("working!");
});

app.listen(3000, () => {
    console.log(`Server is running on port ${PORT}`);
});



