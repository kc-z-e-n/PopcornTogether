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

app.use(express.json());
//'popcorn-together-skhc-3jfmvz3he-kcs-projects-bcc9092b.vercel.app'
const deploy = 'https://popcorn-together-j8bpcfv30-kcs-projects-bcc9092b.vercel.app'
app.use(cors({
    origin: deploy,
    credentials:true
}));
//user session
app.use(session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly:true,
      secure:true,
      sameSite:'none',
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

app.use('/api/friends', friendsRoutes);
app.use('/api/movie', movieRoutes);
app.use('/api', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/stats', watchStatsRoutes);

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