const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config({path: './config.env'});
const session = require('express-session');
const MongoStore = require('connect-mongo');

//port
const PORT = process.env.PORT || 5050;

//routes
const authRoutes = require('./routes/authRoutes');
const movieRoutes = require('./routes/movieroutes');
const friendsRoutes = require('./routes/friendsRoutes');

app.use(cors({
    origin: 'http://localhost:3000',
    credentials:true
}));
app.use(express.json());
app.use('/api/friends', friendsRoutes);
app.use('/api/movie', movieRoutes);
app.use('/api', authRoutes);

//user session
app.use(session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly:true,
      maxAge:1000*60*60*24
    },
    store: MongoStore.create({
      mongoUrl: process.env.ATLAS_URI,
      dbName:'PopcornTogether_users',
      collectionName: 'sessions'
    })
}));

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
