import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          WallpaperHub
        </Link>
        
        <nav>
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/category/nature">Nature</Link></li>
            <li><Link to="/category/abstract">Abstract</Link></li>
            <li><Link to="/category/technology">Technology</Link></li>
            <li><Link to="/category/space">Space</Link></li>
          </ul>
        </nav>

        <form onSubmit={handleSearch} className="search-bar">
          <input
            type="text"
            placeholder="Search wallpapers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-btn">
            Search
          </button>
        </form>
      </div>
    </header>
  );
};

export default Header;