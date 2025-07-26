import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ResultsPage from './pages/ResultsPage';
import WatchedListPage from './pages/WatchedListPage';
import WishListPage from './pages/WishListPage';
import WatchStatsPage from './pages/WatchStatsPage';
import FriendsListPage from './pages/FriendsListPage';
import TimelessFavouritesPage from './pages/TimelessFavouritesPage';
import DisneyPage from './pages/DisneyPage';
import MarvelPage from './pages/MarvelPage';
import DCPage from './pages/DCPage';
import StarWarsPage from './pages/StarWarsPage';
import CommunityReviewsPage from './pages/CommunityReviewsPage';
import MovieMatchPage from './pages/MovieMatchPage';
import ReviewsPage from './pages/ReviewsPage';

function App() {
  return (
    <div className="App">
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/watched" element={<WatchedListPage />} />
            <Route path="/wish" element={<WishListPage />} />
            <Route path="/profile" element={<WatchStatsPage />} />
            <Route path="/friends" element={<FriendsListPage />} />
            <Route path="/timeless" element={<TimelessFavouritesPage />} />
            <Route path="/franchise/disney" element={<DisneyPage />} />
            <Route path="/franchise/marvel" element={<MarvelPage />} />
            <Route path="/franchise/dc" element={<DCPage />} />
            <Route path="/franchise/starwars" element={<StarWarsPage />} />
            <Route path="/community/:movieId" element={<CommunityReviewsPage />} />
            <Route path="/movieMatch" element={<MovieMatchPage />} />
            <Route path="/movie/:movieId/reviews" element={<ReviewsPage />} />

            {/*friend paths*/}
            <Route path="/user/:id/watched" element={<WatchedListPage />} />
            <Route path="/user/:id/wish" element={<WishListPage />} />
            <Route path="/user/:id/profile" element={<WatchStatsPage />} />
        </Routes>
    </div>
  );
}
export default App;