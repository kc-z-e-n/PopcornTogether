import React, {useState} from 'react';
import './HomePage.css';
import Header from '../components/Header';
import Filter from '../components/Filter';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const HomePage = () => {
    const [showFilters, setShowFilters] = useState(false);
    const navigate = useNavigate();

    {/* will have to check for routes and results page */}
    const handleSearch = async (queryParams) => {
        try {
            const res = await axios.get('http://localhost:5050/api/movie/search', {params : queryParams});
            navigate('/results', {state : {results: res.data}} );
        } catch (err) {
            console.error('Search failed', err);
        }
    }

    return (
        <div className='home-container'>
            <Header onSearchBarFocus={() => !showFilters && setShowFilters(true)} onSearch={handleSearch}/>
            {showFilters && <Filter onSearch={handleSearch} onClose={()=> setShowFilters(false)}/>}

            <section className='banner-section'>
                <div className='banner-content'>
                    <div>
                        <h1 className='main-heading'>
                            <span className='highlight'>Watch, Discover, Connect</span>
                        </h1>
                        <p className='sub-heading'>
                            Movies are better <span className='highlight'>together</span>, with <span className='highlight'>popcorn</span>.
                        </p>
                        <h2 className='movie-title'>Kingdom of the Planet of the Apes</h2>
                        <p className='movie-meta'>Movie - Action, Drama - 2024</p>
                        <button className='play-button'>+ Watchedlist</button>
                        <p></p>
                        <button className='play-button'>+ Wishlist</button>
                    </div>
                    <div>
                        <img src='./Monkey.png' alt="Kingdom of the Planet of the Apes" className='banner-image' />
                    </div>
                </div>
            </section>

            <section className="movie-section">
                <h2 className="section-heading">Latest Movies</h2>
                    <div className="movie-grid">
                        {['Sinners', 'Mission: Impossible', 'Ballerina', 'How to Train Your Dragon'].map((title, i) => (
                            <div key={i} className="movie-card">
                                <div className="movie-placeholder"></div>
                                <p className="movie-label">{title}</p>
                            </div>
                        ))}
                    </div>
            </section>

            <section className='movie-section'>
                <h2 className='section-heading'>Timeless Favourites</h2>
                <img src='./TimelessFavourites.png' alt='Timeless Favourites' className='poster' />
            </section>

            <section className='movie-section'>
                <h2 className='section-heading'>Friend Activity</h2>
                <img src='./FriendActivity.png' alt='Friends' className='poster' />
            </section>

            <section className='movie-section'>
                <h2 className='section-heading'>Popular Franchises</h2>
                <img src='./FranchiseLogos.png' alt='Franchises' className='franchise-poster' />
            </section>

        </div>
    );
};

export default HomePage;