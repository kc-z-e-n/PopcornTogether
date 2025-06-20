const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config({path: './config.env'});

const authRoutes = require('./routes/authRoutes');
const movieRoutes = require('./routes/movieroutes');
const friendsRoutes = require('./routes/friendsRoutes');

const PORT = process.env.PORT || 5050;

/*
const corsOptions ={
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}
app.use(cors(corsOptions));
app.options('*', cors(corsOptions))*/

app.use(cors());
app.use(express.json());
app.use('/api/friends', friendsRoutes);
app.use('/api/movie', movieRoutes);
app.use('/api', authRoutes);

app.get('/', (req, res) => {
    res.send('Backend running');
});

//connect to mongodb
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
