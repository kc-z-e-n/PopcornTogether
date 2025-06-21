const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();

router.get('/search', async (req, res) => {
    const {genre, year, language, page = 1} = req.query;

    try {
        const tmdb = await axios.get('https://api.themoviedb.org/3/discover/movie', {
            params : {
                api_key: process.env.TMDB_API_KEY,
                genres: genre,
                release_year: year,
                languages: language || 'en_US',
                sort_by: 'popularity.desc',
                page,
            },
        });

        const result = tmdb.data.results.slice(0, 8);
        const totalPages = tmdb.data.total_pages;
        res.json({result, totalPages});
    } catch (err) {
        res.status(500).json({error: 'TMDB Request failed'});
    }
});

module.exports = router;