import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import WallpaperCard from '../components/WallpaperCard';
import { API_BASE_URL } from '../config';

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [wallpapers, setWallpapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    if (query) {
      setPage(1);
      setWallpapers([]);
      setHasMore(true);
      fetchWallpapers(1, true);
    }
  }, [query]);

  const fetchWallpapers = async (pageNum = page, reset = false) => {
    if (!query) return;
    
    try {
      setLoading(true);
      const response = await fetch(
        `${API_BASE_URL}/wallpapers?search=${encodeURIComponent(query)}&page=${pageNum}&limit=20`
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
      console.error('Error searching wallpapers:', error);
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

  if (!query) {
    return (
      <div className="container">
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <h2>Enter a search term to find wallpapers</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <section style={{ textAlign: 'center', padding: '2rem 0' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
          Search Results
        </h1>
        <p style={{ color: '#888' }}>
          {totalCount} wallpapers found for "{query}"
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
        <div className="loading">Searching wallpapers...</div>
      ) : (
        <div style={{ textAlign: 'center', padding: '2rem', color: '#888' }}>
          <p>No wallpapers found for "{query}".</p>
          <p>Try searching for different terms like "nature", "abstract", or "space".</p>
        </div>
      )}
    </div>
  );
};

export default Search;