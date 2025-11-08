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

            // Fetch random featured wallpapers (30 different ones each time)
            const randomPage = Math.floor(Math.random() * 10) + 1;
            const wallpapersResponse = await fetch(`${API_BASE_URL}/wallpapers?limit=30&page=${randomPage}&sortBy=created_at&sortOrder=DESC`);
            const wallpapersData = await wallpapersResponse.json();
            
            // Shuffle wallpapers to ensure variety
            const shuffled = (wallpapersData.wallpapers || []).sort(() => Math.random() - 0.5);
            setFeaturedWallpapers(shuffled);
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
            <section className="hero-section">
                <div className="floating-element"></div>
                <div className="floating-element"></div>
                <div className="floating-element"></div>
                <h1 className="hero-title">
                    📌 Discover Amazing Wallpapers
                </h1>
                <p className="hero-subtitle">
                    Experience the beauty of Pinterest-style browsing with our dark theme masonry layout.
                    Explore 1200+ high-quality wallpapers across 8 categories with smooth animations!
                </p>
            </section>

            {/* Categories Section */}
            <section>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem', textAlign: 'center', fontWeight: '700', color: '#E60023' }}>
                    🎨 Browse Categories
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
                <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem', textAlign: 'center', fontWeight: '700', color: '#E60023' }}>
                    🖼️ Latest Wallpapers
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
                        <div style={{ marginTop: '3rem', display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <button
                                onClick={() => {
                                    const btn = document.activeElement;
                                    btn.innerHTML = '🔄 Fetching real wallpapers...';
                                    btn.disabled = true;
                                    fetch(`${API_BASE_URL.replace('/api', '')}/api/scraper/working`, { method: 'POST' })
                                        .then(res => res.json())
                                        .then(data => {
                                            btn.innerHTML = `✅ Added ${data.savedCount} wallpapers! Refreshing...`;
                                            setTimeout(() => window.location.reload(), 1500);
                                        })
                                        .catch(() => {
                                            btn.innerHTML = '❌ Failed - Try again';
                                            btn.disabled = false;
                                        });
                                }}
                                className="btn btn-primary"
                                style={{ fontSize: '1.2rem', padding: '1.2rem 2.5rem', borderRadius: '30px' }}
                            >
                                📌 Fetch 240+ Real Wallpapers (100% Working!)
                            </button>
                            <button
                                onClick={() => fetch(`${API_BASE_URL.replace('/api', '')}/api/scraper/run`, { method: 'POST' }).then(() => window.location.reload())}
                                className="btn btn-secondary"
                                style={{ fontSize: '1rem', padding: '1rem 2rem', borderRadius: '30px' }}
                            >
                                🌐 Quick Scrape (External Sources)
                            </button>
                        </div>
                        <p style={{ marginTop: '2rem', fontSize: '1rem', color: '#aaa', lineHeight: '1.6' }}>
                            ✨ Fetches real wallpapers from Picsum Photos API (30 per category)<br />
                            ⚡ Takes about 30-60 seconds to fetch 240 diverse, high-quality wallpapers<br />
                            🎨 100% working images - all wallpapers load perfectly with Pinterest-style variety!
                        </p>
                    </div>
                )}
            </section>
        </div>
    );
};

export default Home;