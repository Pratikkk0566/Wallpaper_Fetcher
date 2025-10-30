const { getDb } = require('./database/db');

const demoWallpapers = [
  {
    title: "Beautiful Mountain Landscape",
    description: "Stunning mountain view with snow-capped peaks",
    image_url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop",
    thumbnail_url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    source_url: "https://unsplash.com/photos/mountain-landscape",
    source_site: "Unsplash",
    category: "nature",
    tags: "mountain,landscape,nature,snow,peaks",
    resolution: "1920x1080",
    downloads: 45,
    likes: 12
  },
  {
    title: "Abstract Geometric Pattern",
    description: "Modern abstract design with geometric shapes",
    image_url: "https://images.unsplash.com/photo-1557683316-973673baf926?w=1920&h=1080&fit=crop",
    thumbnail_url: "https://images.unsplash.com/photo-1557683316-973673baf926?w=400&h=300&fit=crop",
    source_url: "https://unsplash.com/photos/abstract-geometric",
    source_site: "Unsplash",
    category: "abstract",
    tags: "abstract,geometric,pattern,modern,design",
    resolution: "1920x1080",
    downloads: 32,
    likes: 8
  },
  {
    title: "Deep Space Galaxy",
    description: "Breathtaking view of a distant galaxy",
    image_url: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=1920&h=1080&fit=crop",
    thumbnail_url: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=300&fit=crop",
    source_url: "https://unsplash.com/photos/space-galaxy",
    source_site: "Unsplash",
    category: "space",
    tags: "space,galaxy,stars,universe,cosmos",
    resolution: "1920x1080",
    downloads: 67,
    likes: 23
  },
  {
    title: "Modern Technology Setup",
    description: "Clean workspace with modern technology",
    image_url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1920&h=1080&fit=crop",
    thumbnail_url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop",
    source_url: "https://unsplash.com/photos/technology-setup",
    source_site: "Unsplash",
    category: "technology",
    tags: "technology,computer,workspace,modern,clean",
    resolution: "1920x1080",
    downloads: 89,
    likes: 34
  },
  {
    title: "Majestic Lion Portrait",
    description: "Powerful portrait of a majestic lion",
    image_url: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=1920&h=1080&fit=crop",
    thumbnail_url: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=400&h=300&fit=crop",
    source_url: "https://unsplash.com/photos/lion-portrait",
    source_site: "Unsplash",
    category: "animals",
    tags: "lion,animal,wildlife,portrait,majestic",
    resolution: "1920x1080",
    downloads: 156,
    likes: 78
  },
  {
    title: "Minimalist White Room",
    description: "Clean and minimal white interior design",
    image_url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1920&h=1080&fit=crop",
    thumbnail_url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
    source_url: "https://unsplash.com/photos/minimalist-room",
    source_site: "Unsplash",
    category: "minimalist",
    tags: "minimalist,white,clean,interior,design",
    resolution: "1920x1080",
    downloads: 43,
    likes: 19
  }
];

const seedDemoData = () => {
  const db = getDb();
  
  console.log('Seeding demo wallpapers...');
  
  const stmt = db.prepare(`
    INSERT OR IGNORE INTO wallpapers 
    (title, description, image_url, thumbnail_url, source_url, source_site, 
     category, tags, resolution, downloads, likes) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  let inserted = 0;
  demoWallpapers.forEach(wallpaper => {
    const result = stmt.run(
      wallpaper.title,
      wallpaper.description,
      wallpaper.image_url,
      wallpaper.thumbnail_url,
      wallpaper.source_url,
      wallpaper.source_site,
      wallpaper.category,
      wallpaper.tags,
      wallpaper.resolution,
      wallpaper.downloads,
      wallpaper.likes
    );
    
    if (result.changes > 0) {
      inserted++;
    }
  });

  stmt.finalize();
  
  console.log(`Demo data seeded: ${inserted} wallpapers added`);
  return inserted;
};

module.exports = { seedDemoData };

// Allow running directly
if (require.main === module) {
  const db = require('./database/db');
  db.init();
  
  setTimeout(() => {
    seedDemoData();
    process.exit(0);
  }, 1000);
}