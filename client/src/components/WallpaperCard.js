import React from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../config';

const WallpaperCard = ({ wallpaper }) => {
  const handleDownload = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      // Increment download count
      await fetch(`${API_BASE_URL}/wallpapers/${wallpaper.id}/download`, {
        method: 'POST'
      });
      
      // Open image in new tab for download
      window.open(wallpaper.image_url, '_blank');
    } catch (error) {
      console.error('Error downloading wallpaper:', error);
    }
  };

  const handleLike = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      await fetch(`${API_BASE_URL}/wallpapers/${wallpaper.id}/like`, {
        method: 'POST'
      });
    } catch (error) {
      console.error('Error liking wallpaper:', error);
    }
  };

  return (
    <Link to={`/wallpaper/${wallpaper.id}`} className="wallpaper-card">
      <img
        src={wallpaper.thumbnail_url || wallpaper.image_url}
        alt={wallpaper.title}
        className="wallpaper-image"
        loading="lazy"
      />
      <div className="wallpaper-info">
        <h3 className="wallpaper-title">{wallpaper.title}</h3>
        <div className="wallpaper-meta">
          <span className="category">{wallpaper.category}</span>
          <div className="wallpaper-stats">
            <span className="stat">
              ❤️ {wallpaper.likes || 0}
            </span>
            <span className="stat">
              ⬇️ {wallpaper.downloads || 0}
            </span>
          </div>
        </div>
        <div className="wallpaper-actions" style={{ marginTop: '0.5rem', display: 'flex', gap: '0.5rem' }}>
          <button onClick={handleLike} className="btn btn-secondary" style={{ fontSize: '0.8rem', padding: '0.3rem 0.8rem' }}>
            Like
          </button>
          <button onClick={handleDownload} className="btn btn-primary" style={{ fontSize: '0.8rem', padding: '0.3rem 0.8rem' }}>
            Download
          </button>
        </div>
      </div>
    </Link>
  );
};

export default WallpaperCard;