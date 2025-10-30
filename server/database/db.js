const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'wallpapers.db');
const db = new sqlite3.Database(dbPath);

const init = () => {
  db.serialize(() => {
    // Create wallpapers table
    db.run(`
      CREATE TABLE IF NOT EXISTS wallpapers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        image_url TEXT NOT NULL,
        thumbnail_url TEXT,
        source_url TEXT,
        source_site TEXT,
        category TEXT,
        tags TEXT,
        resolution TEXT,
        file_size INTEGER,
        downloads INTEGER DEFAULT 0,
        likes INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create categories table
    db.run(`
      CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        description TEXT,
        wallpaper_count INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Insert default categories
    const defaultCategories = [
      { name: 'Nature', slug: 'nature', description: 'Beautiful nature wallpapers' },
      { name: 'Abstract', slug: 'abstract', description: 'Abstract and artistic wallpapers' },
      { name: 'Technology', slug: 'technology', description: 'Tech and digital wallpapers' },
      { name: 'Space', slug: 'space', description: 'Space and astronomy wallpapers' },
      { name: 'Animals', slug: 'animals', description: 'Animal and wildlife wallpapers' },
      { name: 'Cars', slug: 'cars', description: 'Automotive wallpapers' },
      { name: 'Gaming', slug: 'gaming', description: 'Gaming related wallpapers' },
      { name: 'Minimalist', slug: 'minimalist', description: 'Clean and minimal wallpapers' }
    ];

    const stmt = db.prepare(`
      INSERT OR IGNORE INTO categories (name, slug, description) 
      VALUES (?, ?, ?)
    `);

    defaultCategories.forEach(category => {
      stmt.run(category.name, category.slug, category.description);
    });

    stmt.finalize();
  });

  console.log('Database initialized successfully');
};

const getDb = () => db;

module.exports = { init, getDb };