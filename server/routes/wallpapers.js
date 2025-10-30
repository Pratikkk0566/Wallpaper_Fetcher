const express = require('express');
const { getDb } = require('../database/db');
const router = express.Router();

// Get all wallpapers with pagination and filters
router.get('/', (req, res) => {
  const db = getDb();
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const category = req.query.category;
  const search = req.query.search;
  const sortBy = req.query.sortBy || 'created_at';
  const sortOrder = req.query.sortOrder || 'DESC';
  
  const offset = (page - 1) * limit;
  
  let query = 'SELECT * FROM wallpapers WHERE 1=1';
  let countQuery = 'SELECT COUNT(*) as total FROM wallpapers WHERE 1=1';
  const params = [];
  
  if (category) {
    query += ' AND category = ?';
    countQuery += ' AND category = ?';
    params.push(category);
  }
  
  if (search) {
    query += ' AND (title LIKE ? OR description LIKE ? OR tags LIKE ?)';
    countQuery += ' AND (title LIKE ? OR description LIKE ? OR tags LIKE ?)';
    const searchTerm = `%${search}%`;
    params.push(searchTerm, searchTerm, searchTerm);
  }
  
  query += ` ORDER BY ${sortBy} ${sortOrder} LIMIT ? OFFSET ?`;
  
  // Get total count
  db.get(countQuery, params, (err, countResult) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    
    // Get wallpapers
    db.all(query, [...params, limit, offset], (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      
      res.json({
        wallpapers: rows,
        pagination: {
          page,
          limit,
          total: countResult.total,
          totalPages: Math.ceil(countResult.total / limit)
        }
      });
    });
  });
});

// Get single wallpaper
router.get('/:id', (req, res) => {
  const db = getDb();
  const { id } = req.params;
  
  db.get('SELECT * FROM wallpapers WHERE id = ?', [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    
    if (!row) {
      return res.status(404).json({ error: 'Wallpaper not found' });
    }
    
    res.json(row);
  });
});

// Get categories
router.get('/categories/all', (req, res) => {
  const db = getDb();
  
  db.all('SELECT * FROM categories ORDER BY name', (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    
    res.json(rows);
  });
});

// Increment download count
router.post('/:id/download', (req, res) => {
  const db = getDb();
  const { id } = req.params;
  
  db.run(
    'UPDATE wallpapers SET downloads = downloads + 1 WHERE id = ?',
    [id],
    function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      
      res.json({ success: true, downloads: this.changes });
    }
  );
});

// Like wallpaper
router.post('/:id/like', (req, res) => {
  const db = getDb();
  const { id } = req.params;
  
  db.run(
    'UPDATE wallpapers SET likes = likes + 1 WHERE id = ?',
    [id],
    function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      
      res.json({ success: true, likes: this.changes });
    }
  );
});

module.exports = router;