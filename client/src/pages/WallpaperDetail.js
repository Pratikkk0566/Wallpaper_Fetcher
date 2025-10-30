import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const WallpaperDetail = () => {
  const { id } = useParams();
  const [wallpaper, setWallpaper] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWallpaper();
  }, [id]);

  const fetchWallpaper = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/wallpapers/${id}`);
      const data = await response.json();
      setWallpaper(data);
    } catch (error) {
      console.error('Error fetching wallpaper:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    try {
      await fetch(`http://localhost:5000/api/wallpapers/${id}/download`, {
        method: 'POST'
      });
      
      // Update local state
      setWallpaper(prev => ({
        ...prev,
        downloads: (prev.downloads || 0) + 1
      }));
      
      // Open image for download
      window.open(wallpaper.image_url, '_blank');
    } catch (error) {
      console.error('Error downloading wallpaper:', error);
    }
  };

  const handleLike = async () => {
    try {
      await fetch(`http://localhost:5000/api/wallpapers/${id}/like`, {
        method: 'POST'
      });
      
      // Update local state
      setWallpaper(prev => ({
        ...prev,
        likes: (prev.likes || 0) + 1
      }));
    } catch (error) {
      console.error('Error liking wallpaper:', error);
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Loading wallpaper...</div>
      </div>
    );
  }

  if (!wallpaper) {
    return (
      <div className="container">
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <h2>Wallpaper not found</h2>
          <Link to="/" className="btn btn-primary">Go Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 0' }}>
        {/* Breadcrumb */}
        <nav style={{ marginBottom: '2rem', color: '#888' }}>
          <Link to="/" style={{ color: '#ff6b6b' }}>Home</Link>
          {' > '}
          <Link to={`/category/${wallpaper.category}`} style={{ color: '#ff6b6b' }}>
            {wallpaper.category}
          </Link>
          {' > '}
          <span>{wallpaper.title}</span>
        </nav>

        {/* Wallpaper Image */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <img
            src={wallpaper.image_url}
            alt={wallpaper.title}
            style={{
              maxWidth: '100%',
              height: 'auto',
              borderRadius: '15px',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)'
            }}
          />
        </div>

        {/* Wallpaper Info */}
        <div style={{ background: '#1a1a1a', padding: '2rem', borderRadius: '15px', border: '1px solid #333' }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>{wallpaper.title}</h1>
          
          {wallpaper.description && (
            <p style={{ color: '#ccc', marginBottom: '1.5rem', lineHeight: '1.6' }}>
              {wallpaper.description}
            </p>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
            <div>
              <strong>Category:</strong>
              <br />
              <Link to={`/category/${wallpaper.category}`} style={{ color: '#ff6b6b', textTransform: 'capitalize' }}>
                {wallpaper.category}
              </Link>
            </div>
            
            {wallpaper.resolution && (
              <div>
                <strong>Resolution:</strong>
                <br />
                <span style={{ color: '#ccc' }}>{wallpaper.resolution}</span>
              </div>
            )}
            
            <div>
              <strong>Source:</strong>
              <br />
              <a href={wallpaper.source_url} target="_blank" rel="noopener noreferrer" style={{ color: '#ff6b6b' }}>
                {wallpaper.source_site}
              </a>
            </div>
            
            <div>
              <strong>Stats:</strong>
              <br />
              <span style={{ color: '#ccc' }}>
                ❤️ {wallpaper.likes || 0} likes • ⬇️ {wallpaper.downloads || 0} downloads
              </span>
            </div>
          </div>

          {wallpaper.tags && (
            <div style={{ marginBottom: '2rem' }}>
              <strong>Tags:</strong>
              <br />
              <div style={{ marginTop: '0.5rem' }}>
                {wallpaper.tags.split(',').map((tag, index) => (
                  <span
                    key={index}
                    style={{
                      display: 'inline-block',
                      background: '#333',
                      color: '#fff',
                      padding: '0.3rem 0.8rem',
                      borderRadius: '15px',
                      fontSize: '0.8rem',
                      margin: '0.2rem',
                    }}
                  >
                    {tag.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button onClick={handleDownload} className="btn btn-primary">
              Download Wallpaper
            </button>
            <button onClick={handleLike} className="btn btn-secondary">
              ❤️ Like ({wallpaper.likes || 0})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WallpaperDetail;