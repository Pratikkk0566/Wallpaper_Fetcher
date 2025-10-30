import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Category from './pages/Category';
import WallpaperDetail from './pages/WallpaperDetail';
import Search from './pages/Search';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/:categorySlug" element={<Category />} />
            <Route path="/wallpaper/:id" element={<WallpaperDetail />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
