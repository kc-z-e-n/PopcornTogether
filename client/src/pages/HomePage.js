import React from 'react';
import './HomePage.css';
import Header from '../components/Header';

const HomePage = () => {
  return (
    <div className="home-container">
      <Header />

      {/* Top Banner - Recommended Movie */}
      <section className="banner-section">
        <div className="banner-content">
          <div>
            <h1 className="main-heading">
              <span className="highlight">Watch, Discover, Connect.</span>
            </h1>
            <p className="sub-heading">
              Movies are better <span className="highlight">together</span>, with <span className="highlight">popcorn</span>.
            </p>
            <h2 className="movie-title">Kingdom of the Planet of the Apes</h2>
            <p className="movie-meta">Movie • Action, Drama • 2024</p>
            <button className="play-button">+ Watched list</button>
            <button className="play-button">+ Wishlist</button>
          </div>
          <div>
            <img src='./Monkey.png' alt="Kingdom of the Planet of the Apes" className="banner-image" />
          </div>
        </div>
      </section>

      {/* Latest Movies */}
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

      {/* Timeless Favourites */}
      <section className="movie-section">
        <h2 className="section-heading">Timeless Favourites</h2>
        <div className="movie-grid">
          <div className="movie-card">
            <img src='./TimelessFavourites.png' alt="Timeless Favourites" className="poster" />
            <p className="movie-label">Timeless Favourites</p>
          </div>
          {['Avatar', 'Final Destination', 'Frozen'].map((title, i) => (
            <div key={i} className="movie-card">
              <div className="movie-placeholder"></div>
              <p className="movie-label">{title}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Friend Activity */}
      <section className="movie-section">
        <h2 className="section-heading">Friend Activity</h2>
        <div className="movie-grid">
          <div className="movie-card">
            <img src='./FriendActivity.png' alt="Friend Activity" className="poster" />
            <p className="movie-label">Friend Activity</p>
          </div>
          {['Spider-Man 3', 'Hawaizaada'].map((title, i) => (
            <div key={i} className="movie-card">
              <div className="movie-placeholder"></div>
              <p className="movie-label">{title}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Franchise Logos */}
      <section className="movie-section">
        <h2 className="section-heading">Franchise Logos</h2>
        <div className="movie-grid">
          <img src='/FranchiseLogos.png' alt="Franchise Logos" className="franchise-image" />
        </div>
      </section>
    </div>
  );
};

export default HomePage;