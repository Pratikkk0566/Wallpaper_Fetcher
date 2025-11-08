const express = require('express');
const cors = require('cors');
const path = require('path');
const cron = require('node-cron');
require('dotenv').config();

const db = require('./database/db');
const wallpaperRoutes = require('./routes/wallpapers');
const scraper = require('./scraper');

const app = express();
const PORT = parseInt(process.env.PORT) || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/wallpapers', wallpaperRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Wallpaper Aggregator API is running' });
});

// Manual scraper trigger
app.post('/api/scraper/run', async (req, res) => {
  try {
    console.log('Manual scraper run triggered');
    const savedCount = await scraper.runScraper();
    res.json({ 
      success: true, 
      message: `Scraper completed successfully. Saved ${savedCount} new wallpapers.`,
      savedCount 
    });
  } catch (error) {
    console.error('Manual scraper failed:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Scraper failed', 
      error: error.message 
    });
  }
});

// Bulk scraper for initial population (1000+ wallpapers)
app.post('/api/scraper/bulk', async (req, res) => {
  try {
    console.log('Bulk scraper run triggered - targeting 1000+ wallpapers');
    const savedCount = await scraper.runBulkScraper();
    res.json({ 
      success: true, 
      message: `Bulk scraper completed! Saved ${savedCount} new wallpapers. Your site now has 1000+ wallpapers!`,
      savedCount 
    });
  } catch (error) {
    console.error('Bulk scraper failed:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Bulk scraper failed', 
      error: error.message 
    });
  }
});

// Alternative scraper (generates diverse wallpapers using Lorem Picsum)
app.post('/api/scraper/populate', async (req, res) => {
  try {
    console.log('Alternative scraper triggered - generating 1200+ diverse wallpapers');
    const alternativeScraper = require('./scraper/alternative-scraper');
    const savedCount = await alternativeScraper.populateDatabase();
    res.json({ 
      success: true, 
      message: `Database populated! Generated ${savedCount} diverse wallpapers across all categories.`,
      savedCount 
    });
  } catch (error) {
    console.error('Alternative scraper failed:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Alternative scraper failed', 
      error: error.message 
    });
  }
});

// Working scraper (uses real APIs - Unsplash & Picsum)
app.post('/api/scraper/working', async (req, res) => {
  try {
    console.log('Working scraper triggered - fetching real wallpapers from APIs');
    const workingScraper = require('./scraper/working-scraper');
    const savedCount = await workingScraper.runWorkingScraper();
    res.json({ 
      success: true, 
      message: `Working scraper completed! Fetched ${savedCount} real wallpapers from Unsplash & Picsum.`,
      savedCount 
    });
  } catch (error) {
    console.error('Working scraper failed:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Working scraper failed', 
      error: error.message 
    });
  }
});

// Initialize database
db.init();

// Seed demo data on first run
setTimeout(() => {
  const { seedDemoData } = require('./seed-demo-data');
  seedDemoData();
}, 2000);

// Schedule scraper to run every 24 hours at 2 AM
cron.schedule('0 2 * * *', () => {
  console.log('Starting scheduled wallpaper scraping...');
  scraper.runScraper();
});

// Start server with fallback ports
const startServer = (port) => {
  const server = app.listen(port, () => {
    console.log(`✅ Server running on port ${port}`);
    console.log(`🌐 API available at: http://localhost:${port}/api`);
    console.log('🕐 Scraper scheduled to run daily at 2 AM');
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`❌ Port ${port} is in use, trying port ${port + 1}...`);
      startServer(port + 1);
    } else {
      console.error('Server error:', err);
    }
  });
};

startServer(PORT);