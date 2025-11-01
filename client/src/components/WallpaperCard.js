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
    <div className="wallpaper-card">
      <Link to={`/wallpaper/${wallpaper.id}`}>
        <img
          src={wallpaper.thumbnail_url || wallpaper.image_url}
          alt={wallpaper.title}
          className="wallpaper-image"
          loading="lazy"
        />
      </Link>
      <button 
        onClick={handleDownload} 
        className="save-overlay"
        data-tooltip="Save wallpaper"
      >
        Save
      </button>
      <div className="wallpaper-info">
        <Link to={`/wallpaper/${wallpaper.id}`} style={{ textDecoration: 'none' }}>
          <h3 className="wallpaper-title">{wallpaper.title}</h3>
        </Link>
        <div className="wallpaper-meta">
          <span className="category">{wallpaper.category}</span>
          <div className="wallpaper-stats">
            <span className="stat">
              👁️ {wallpaper.downloads || 0}
            </span>
          </div>
        </div>
        <div className="wallpaper-actions">
          <button onClick={handleLike} className="btn btn-secondary btn-small tooltip" data-tooltip="Like this wallpaper">
            ❤️ {wallpaper.likes || 0}
          </button>
          <button onClick={handleDownload} className="btn btn-primary btn-small tooltip" data-tooltip="Download wallpaper">
            ⬇️ Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default WallpaperCard;