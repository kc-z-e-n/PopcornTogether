//import records from "./routes/record.js";

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config({path: './config.env'});

const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 5050;

app.use(cors());
/*
const corsOptions ={
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}
app.use(cors(corsOptions));
app.options('*', cors(corsOptions))*/

app.use(express.json());
//app.use('/record', records); // to get records from mongodb
app.use('/api', authRoutes); // auth routes

app.get('/', (req, res) => {
  res.send('Backend running 🎬');
});

/*
app.get('/', (req, res) => {
  res.send('Test success ✅');
});
app.listen(5000, () => console.log('Listening on port 5000'));*/

//connect to mongoDB
mongoose.connect(process.env.ATLAS_URI, {
  dbName: 'PopcornTogether_users'
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

