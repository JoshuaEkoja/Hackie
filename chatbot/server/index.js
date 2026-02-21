import express from 'express';
import cors from 'cors';
import 'dotenv/config'; // This replaces the need for dotenv.config()
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();
app.use(cors());
app.use(express.json());

// initialize Gemini

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

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


const PORT = process.env.PORT || 5000; // start the server and listen on the specified port

app.get('/', (req, res) => {
    res.send("Server is alive and kicking!");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



