const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();

router.get('/search', async (req, res) => {
    const {genre, year, language, q = '', page = 1} = req.query;

    let tmdbUrl = 'https://api.themoviedb.org/3/';
    const tmdbParams = {
      api_key: process.env.TMDB_API_KEY,
      sort_by: 'popularity.desc',
      page,
    };

    if (q.trim() !== '') {
        tmdbUrl += 'search/movie';
        tmdbParams.query = q;
    } else {
        tmdbUrl += 'discover/movie';
        if (genre && genre !== '') tmdbParams.with_genres = genre;
        if (year) tmdbParams.primary_release_year = year;
        if (language) tmdbParams.with_original_language = language;
    }

    console.log('movieroutes TMDB URL:', tmdbUrl);
    console.log('movieroutes Params:', tmdbParams);

    try {
        const result = [];
        const resultsToGet = 100;
        const totalPagesToGet = resultsToGet / 20;

        for (let i = 1; i <= totalPagesToGet; i++) {
            const tmdb = await axios.get(tmdbUrl, {
                params : {...tmdbParams, page: i}
            });

            if (tmdb.data?.results) {
                result.push(...tmdb.data.results);
            }
        }

        res.json({result, totalPages: Math.ceil(result.length / 8)});
        console.log('Returned TMDB titles:', tmdb.data.results.map(m => m.title));
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
        with_companies: 9993, //'429,9993,174'
        sort_by: 'popularity.desc',
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

router.get('/starwars', async (req, res) => {
    const tmdbParams = {
        api_key: process.env.TMDB_API_KEY,
        with_companies: 1,
        sort_by: 'popularity.desc',
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
        res.status(500).json({ error: 'TMDB Star Wars fetch failed'});
    }
});   

router.get('/community/:movieId', async (req, res) => {
    const {movieId} = req.params;
    const tmdbParams ={
        api_key: process.env.TMDB_API_KEY,
    }

    try {
        const tmdbRes = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
            params: tmdbParams
        });

        res.json(tmdbRes.data);
    } catch (err) {
        console.error(err)
        res.status(500).json({error: 'Failed to retrieve movie'});
    }
});

router.get('/match', async (req, res) => {
    const { type = 'random' } = req.query;
    const pages = [1, 2, 3, 4, 5];
    const apiKey = process.env.TMDB_API_KEY;
  
    let movieResults = [];
  
    for (let page of pages) {
      const { data } = await axios.get('https://api.themoviedb.org/3/discover/movie', {
        params: {
          api_key: apiKey,
          sort_by: type === 'gems' ? 'vote_average.desc' : 'popularity.desc',
          'vote_count.gte': type === 'gems' ? 100 : 0,
          page
        }
      });
      movieResults.push(...data.results);
    }
  
    // Optionally shuffle or select subset
    const shuffled = movieResults.sort(() => 0.5 - Math.random()).slice(0, 20);
    res.json({ result: shuffled });
  });

router.get('/match', async (req, res) => {
    const {type = 'Random'} = req.query;
    const tmdbParams ={
        api_key: process.env.TMDB_API_KEY,
    }

    try {
        const tmdb = await axios.get('https://api.themoviedb.org/3/discover/movie', {
            params : {
                ...tmdbParams, 
                sort_by: type === 'Gems' ? 'vote_average.desc' : 'popularity.desc',
                'vote_count.gte': type === 'Gems' ? 100 : 0,
                page: Math.floor(Math.random() * 10000) + 1,
                include_adult: false,
            }
        });

        const shuffled = tmdb.data.results.sort(() => 0.5 - Math.random());
        res.json({result: shuffled});
    } catch (err) {
        console.error(err)
        res.status(500).json({error: 'Failed to retrieve movies'});
    }
});

module.exports = router;