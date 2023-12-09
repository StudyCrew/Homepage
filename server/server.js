require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');

const app = express();
const MAX_SPOTS = 2500;

// Security middleware
app.use(helmet());

// Compression middleware
app.use(compression());

// Middleware
app.use(bodyParser.json());

app.use(cors({
    origin: 'https://studycrew-homepage-preview.netlify.app'
}));

// Cors Configuration for Production
const whitelist = ['https://studycrew-homepage-preview.netlify.app']; // replace with your frontend domain
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions));

// MongoDB URI
const dbURI = process.env.DB_URI;

// Connect to MongoDB
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));

// Define a schema for the waitlist
const WaitlistSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, 
  }
});

// Create a model from the schema
const Waitlist = mongoose.model('Waitlist', WaitlistSchema);

// POST endpoint to add email to waitlist
app.post('/join-waitlist', async (req, res) => {
    try {
      const { email } = req.body;

      // TODO: Add email verification

      const newEntry = new Waitlist({ email });
      await newEntry.save();
      res.status(201).json({ message: 'Email added to waitlist!' });
    } catch (error) {
      console.error(error); // Log the full error
      res.status(500).json({ message: error.message, stack: error.stack });
    }
});

const getTotalWaitlistCount = async () => {
    try {
      const count = await Waitlist.countDocuments();
      return count;
    } catch (error) {
      console.error("Error fetching waitlist count:", error);
      throw error; 
    }
};

const getSpotsLeft = async () => {
  const totalWaitlistCount = await getTotalWaitlistCount();
  return MAX_SPOTS - totalWaitlistCount;
};

app.get('/spots-left', async (req, res) => {
    try {
      const spotsLeft = await getSpotsLeft();
      res.status(200).json({ spotsLeft });
    } catch (error) {
      console.error(error); // Log the full error
      res.status(500).json({ message: "Failed to fetch spots left", stack: error.stack });
    }
  });

// Start the server
const port = process.env.PORT || 2023;
app.listen(port, () => console.log(`Server launched on port ${port}`));