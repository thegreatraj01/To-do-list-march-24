import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import fetch from 'node-fetch'; // Import fetch for making API calls
import userrouter from './Route/UserRoute.js';
import taskrouter from './Route/TaskRoute.js';

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());
dotenv.config();
app.use(userrouter);
app.use(taskrouter);

const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO || "mongodb://localhost:27017/to-do");
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
    }
};

async function makeApiCall() {
    try {
        const response = await fetch("https://zero8-03-2024-advisoropedia-assignment.onrender.com/fake");
        if (response.ok) {
            console.log("API call successful");
        } else {
            throw new Error(`API call failed with status ${response.status}`);
        }
    } catch (error) {
        console.error("Error making API call:", error.message);
    }
}

const interval = 10 * 60 * 1000; // 10 minutes in milliseconds
setInterval(makeApiCall, interval);

app.listen(port, async (err) => {
    await connectToDatabase();
    await makeApiCall();

    if (!err) {
        console.log('Listening on port', port);
    } else {
        console.log('Error starting the server:', err);
    }
});
