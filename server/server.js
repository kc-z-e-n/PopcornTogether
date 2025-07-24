const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config({path: './config.env'});
const session = require('express-session');
const MongoStore = require('connect-mongo');

//port
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const path = require('path');
app.use(express.static(path.join(__dirname, '../client/build')));

app.use(express.json());

app.use(cors({
    origin: /*true,*/'http://localhost:3000',
    credentials: true
}));

//app.set('trust proxy', 1);
app.use(session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly:true,
        secure:/*true*/false,
        sameSite:/*'none'*/'lax',
        maxAge:1000*60*60*24
    },
    store: MongoStore.create({
      mongoUrl: process.env.ATLAS_URI,
      dbName:'PopcornTogether_users',
      collectionName: 'sessions'
    })
}));

//routes
const authRoutes = require('./routes/authRoutes');
const movieRoutes = require('./routes/movieRoutes');
const friendsRoutes = require('./routes/friendsRoutes');
const userRoutes = require('./routes/userRoutes');
const watchStatsRoutes = require('./routes/watchStatsRoutes');
const ratingRoutes = require('./routes/ratingRoutes');

app.use('/api/friends', friendsRoutes);
app.use('/api/movie', movieRoutes);
app.use('/api', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/stats', watchStatsRoutes);
app.use('/api/rating', ratingRoutes);

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

app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ message: 'Server error' });
  });

app.get('/api/retrieve', async (req, res) => {
  try {
    const user = await User.findById(req.session.user.id);
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: 'User retrieval failed'});
  }
});

/* //fallback route
app.get('.*', (req,res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
}); */