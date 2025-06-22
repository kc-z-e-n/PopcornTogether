const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();

router.get('/search', async (req, res) => {
    const {genre, year, language, page = 1} = req.query;

    const tmdbParams = {
      api_key: process.env.TMDB_API_KEY,
      sort_by: 'popularity.desc',
      page,
    };

    if (genre) tmdbParams.with_genres = genre;
    if (year) tmdbParams.primary_release_year = year;
    if (language) tmdbParams.with_original_language = language;

    try {
        const tmdb = await axios.get('https://api.themoviedb.org/3/discover/movie', {
            params : tmdbParams
        });

        const result = tmdb.data.results.slice(0, 8);
        const totalPages = tmdb.data.total_pages;
        res.json({result, totalPages});
    } catch (err) {
        res.status(500).json({error: 'TMDB Request failed'});
    }
});

module.exports = router;