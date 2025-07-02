const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();

router.get('/search', async (req, res) => {
    const {genre, year, language, q, page = 1} = req.query;

    let tmdbUrl = 'https://api.themoviedb.org/3/';
    const tmdbParams = {
      api_key: process.env.TMDB_API_KEY,
      sort_by: 'popularity.desc',
      page,
    };

    if (q) {
        tmdbUrl += 'search/movie';
        tmdbParams.query = q;
    } else {
        tmdbUrl += 'discover/movie';
        tmdbParams.sort_by = 'popularity.desc';
        if (genre) tmdbParams.with_genres = genre;
        if (year) tmdbParams.primary_release_year = year;
        if (language) tmdbParams.with_original_language = language;
    }

    try {
        // const tmdb = await axios.get('https://api.themoviedb.org/3/discover/movie', {
        const tmdb = await axios.get(tmdbUrl, {
            params : tmdbParams
        });

        const result = tmdb.data.results.slice(0, 8);
        const totalPages = tmdb.data.total_pages;
        res.json({result, totalPages});
    } catch (err) {
        console.error('TMDB search error:', err.message);
        res.status(500).json({error: 'TMDB Request failed'});
    }
});

router.get('/timeless', async (req, res) => {
    const tmdbParams = {
        api_key: process.env.TMDB_API_KEY,
        sort_by: 'popularity.desc',
        'primary_release_date.lte': '2015-12-31',
        'vote_count.gte': 1000,
        page: req.query.page || 1,
    };
    try {
        const tmdb = await axios.get('https://api.themoviedb.org/3/discover/movie', {
            params: tmdbParams
        });

        res.json({
            result: tmdb.data.results.slice(0, 12),
            totalPages: tmdb.data.total_pages
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'TMDB timeless favourites failed'});
    }
});

router.get('/disney', async (req, res) => {
    const tmdbParams = {
        api_key: process.env.TMDB_API_KEY,
        with_companies: 2,
        sort_by: 'popularity.desc',
        page: req.query.page || 1,
    };

    try {
        const tmdb = await axios.get('https://api.themoviedb.org/3/discover/movie', {
            params: tmdbParams
        });

        res.json({
            result: tmdb.data.results.slice(0, 12),
            totalPages: tmdb.data.total_pages
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'TMDB Disney fetch failed'});
    }
});    

router.get('/marvel', async (req, res) => {
    const tmdbParams = {
        api_key: process.env.TMDB_API_KEY,
        with_companies: 420,
        sort_by: 'popularity.desc',
        page: req.query.page || 1,
    };

    try {
        const tmdb = await axios.get('https://api.themoviedb.org/3/discover/movie', {
            params: tmdbParams
        });

        res.json({
            result: tmdb.data.results.slice(0, 12),
            totalPages: tmdb.data.total_pages
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'TMDB Marvel fetch failed'});
    }
});    

router.get('/dc', async (req, res) => {
    const tmdbParams = {
        api_key: process.env.TMDB_API_KEY,
        with_companies: '429, 9993,174',
        sort_by: 'popularity.desc',
        page: req.query.page || 1,
    };

    try {
        const tmdb = await axios.get('https://api.themoviedb.org/3/discover/movie', {
            params: tmdbParams
        });

        res.json({
            result: tmdb.data.results.slice(0, 12),
            totalPages: tmdb.data.total_pages
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'TMDB DC fetch failed'});
    }
});    

module.exports = router;