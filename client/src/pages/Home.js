import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import WallpaperCard from '../components/WallpaperCard';
import { API_BASE_URL } from '../config';

const Home = () => {
    const [categories, setCategories] = useState([]);
    const [featuredWallpapers, setFeaturedWallpapers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            // Fetch categories
            const categoriesResponse = await fetch(`${API_BASE_URL}/wallpapers/categories/all`);
            const categoriesData = await categoriesResponse.json();
            setCategories(categoriesData);

            // Fetch featured wallpapers (latest 8)
            const wallpapersResponse = await fetch(`${API_BASE_URL}/wallpapers?limit=8&sortBy=created_at&sortOrder=DESC`);
            const wallpapersData = await wallpapersResponse.json();
            setFeaturedWallpapers(wallpapersData.wallpapers || []);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="container">
                <div className="loading">Loading amazing wallpapers...</div>
            </div>
        );
    }

    return (
        <div className="container">
            {/* Hero Section */}
            <section style={{ textAlign: 'center', padding: '4rem 0' }}>
                <h1 style={{ fontSize: '3rem', marginBottom: '1rem', background: 'linear-gradient(135deg, #ff6b6b, #ff5252)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    Discover Amazing Wallpapers
                </h1>
                <p style={{ fontSize: '1.2rem', color: '#888', maxWidth: '600px', margin: '0 auto' }}>
                    Explore thousands of high-quality wallpapers from various categories.
                    New wallpapers added daily automatically!
                </p>
            </section>

            {/* Categories Section */}
            <section>
                <h2 style={{ fontSize: '2rem', marginBottom: '2rem', textAlign: 'center' }}>
                    Browse Categories
                </h2>
                <div className="categories-grid">
                    {categories.map(category => (
                        <Link
                            key={category.id}
                            to={`/category/${category.slug}`}
                            className="category-card"
                        >
                            <h3>{category.name}</h3>
                            <p style={{ color: '#888', fontSize: '0.9rem' }}>
                                {category.description}
                            </p>
                            <p style={{ color: '#ff6b6b', fontSize: '0.8rem', marginTop: '0.5rem' }}>
                                {category.wallpaper_count || 0} wallpapers
                            </p>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Featured Wallpapers */}
            <section>
                <h2 style={{ fontSize: '2rem', marginBottom: '2rem', textAlign: 'center' }}>
                    Latest Wallpapers
                </h2>
                {featuredWallpapers.length > 0 ? (
                    <div className="wallpapers-grid">
                        {featuredWallpapers.map(wallpaper => (
                            <WallpaperCard key={wallpaper.id} wallpaper={wallpaper} />
                        ))}
                    </div>
                ) : (
                    <div style={{ textAlign: 'center', padding: '2rem', color: '#888' }}>
                        <p>No wallpapers available yet. Let's populate your site with 1000+ amazing wallpapers!</p>
                        <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <button
                                onClick={() => {
                                    const btn = document.activeElement;
                                    btn.textContent = '🔄 Generating wallpapers...';
                                    btn.disabled = true;
                                    fetch(`${API_BASE_URL.replace('/api', '')}/api/scraper/populate`, { method: 'POST' })
                                        .then(() => {
                                            btn.textContent = '✅ Done! Refreshing...';
                                            setTimeout(() => window.location.reload(), 1000);
                                        })
                                        .catch(() => {
                                            btn.textContent = '❌ Failed - Try again';
                                            btn.disabled = false;
                                        });
                                }}
                                className="btn btn-primary"
                                style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}
                            >
                                🚀 Generate 1200+ Diverse Wallpapers
                            </button>
                            <button
                                onClick={() => fetch(`${API_BASE_URL.replace('/api', '')}/api/scraper/run`, { method: 'POST' }).then(() => window.location.reload())}
                                className="btn btn-secondary"
                            >
                                Quick Scrape (External Sources)
                            </button>
                        </div>
                        <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#666' }}>
                            The generator creates 150 unique wallpapers per category (1200 total).<br />
                            This takes about 30 seconds and provides instant variety!
                        </p>
                    </div>
                )}
            </section>
        </div>
    );
};

export default Home;