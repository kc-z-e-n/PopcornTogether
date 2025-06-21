const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();

router.get('/search', async (req, res) => {
    const {genre, year, language} = req.query;

    try {
        const tmdb = await axios.get('https://api.themoviedb.org/3/discover/movie', {
            params : {
                api_key: process.env.TMDB_API_KEY,
                genres: genre,
                release_year: year,
                languages: language || 'en_US',
                sort_by: 'popularity.desc',
                page: 1,
            },
        });

        const top10 = tmdb.data.results.slice(0, 8);
        res.json(top10);
    } catch (err) {
        res.status(500).json({error: 'TMDB Request failed'});
    }
});

module.exports = router;