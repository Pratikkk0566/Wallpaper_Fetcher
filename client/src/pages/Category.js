import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import WallpaperCard from '../components/WallpaperCard';
import { API_BASE_URL } from '../config';

const Category = () => {
  const { categorySlug } = useParams();
  const [wallpapers, setWallpapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    setPage(1);
    setWallpapers([]);
    setHasMore(true);
    fetchWallpapers(1, true);
  }, [categorySlug]);

  const fetchWallpapers = async (pageNum = page, reset = false) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${API_BASE_URL}/wallpapers?category=${categorySlug}&page=${pageNum}&limit=20`
      );
      const data = await response.json();
      
      if (reset) {
        setWallpapers(data.wallpapers || []);
      } else {
        setWallpapers(prev => [...prev, ...(data.wallpapers || [])]);
      }
      
      setTotalCount(data.pagination?.total || 0);
      setHasMore(pageNum < (data.pagination?.totalPages || 0));
    } catch (error) {
      console.error('Error fetching wallpapers:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchWallpapers(nextPage);
    }
  };

  return (
    <div className="container">
      <section style={{ textAlign: 'center', padding: '2rem 0' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', textTransform: 'capitalize' }}>
          {categorySlug} Wallpapers
        </h1>
        <p style={{ color: '#888' }}>
          {totalCount} wallpapers found
        </p>
      </section>

      {wallpapers.length > 0 ? (
        <>
          <div className="wallpapers-grid">
            {wallpapers.map(wallpaper => (
              <WallpaperCard key={wallpaper.id} wallpaper={wallpaper} />
            ))}
          </div>
          
          {hasMore && (
            <div style={{ textAlign: 'center', margin: '2rem 0' }}>
              <button 
                onClick={loadMore} 
                disabled={loading}
                className="btn btn-primary"
              >
                {loading ? 'Loading...' : 'Load More'}
              </button>
            </div>
          )}
        </>
      ) : loading ? (
        <div className="loading">Loading wallpapers...</div>
      ) : (
        <div style={{ textAlign: 'center', padding: '2rem', color: '#888' }}>
          <p>No wallpapers found in this category yet.</p>
        </div>
      )}
    </div>
  );
};

export default Category;