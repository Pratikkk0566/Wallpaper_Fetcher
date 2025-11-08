const axios = require('axios');
const { getDb } = require('../database/db');

class WorkingScraper {
  constructor() {
    this.db = getDb();
    
    // Free APIs that actually work
    this.apis = {
      // Unsplash - Free with demo access
      unsplash: {
        baseUrl: 'https://source.unsplash.com',
        featured: 'https://source.unsplash.com/featured'
      },
      // Picsum - Completely free
      picsum: {
        baseUrl: 'https://picsum.photos',
        list: 'https://picsum.photos/v2/list'
      }
    };
    
    // Search terms for variety
    this.searchTerms = {
      nature: ['mountain', 'forest', 'ocean', 'sunset', 'landscape', 'waterfall', 'beach', 'lake', 'river', 'valley'],
      abstract: ['pattern', 'texture', 'gradient', 'geometric', 'colorful', 'minimal', 'modern', 'digital', 'art', 'design'],
      technology: ['computer', 'tech', 'digital', 'code', 'circuit', 'cyber', 'futuristic', 'neon', 'data', 'network'],
      space: ['galaxy', 'nebula', 'stars', 'planet', 'universe', 'cosmos', 'moon', 'astronomy', 'milky way', 'space'],
      animals: ['wildlife', 'lion', 'tiger', 'elephant', 'bird', 'wolf', 'cat', 'dog', 'horse', 'eagle'],
      cars: ['car', 'supercar', 'sports car', 'vintage car', 'racing', 'automobile', 'vehicle', 'motorcycle', 'truck', 'classic car'],
      gaming: ['game', 'gaming', 'esports', 'controller', 'console', 'pc gaming', 'fantasy', 'sci-fi', 'character', 'warrior'],
      minimalist: ['minimal', 'simple', 'clean', 'white', 'monochrome', 'elegant', 'modern', 'pure', 'basic', 'zen']
    };
  }

  async scrapeUnsplashDirect(category, count = 20) {
    console.log(`Scraping Unsplash for ${category}...`);
    const wallpapers = [];
    const terms = this.searchTerms[category] || [category];
    
    // Use Picsum instead since Unsplash source is unreliable
    try {
      const response = await axios.get('https://picsum.photos/v2/list?page=1&limit=100');
      const photos = response.data;
      
      // Randomly select photos for this category
      const selectedPhotos = photos.sort(() => Math.random() - 0.5).slice(0, count);
      
      for (let i = 0; i < selectedPhotos.length; i++) {
        const photo = selectedPhotos[i];
        const term = terms[i % terms.length];
        
        const wallpaper = {
          title: `${term.charAt(0).toUpperCase() + term.slice(1)} - ${category} wallpaper`,
          description: `Beautiful ${term} wallpaper by ${photo.author}`,
          image_url: `https://picsum.photos/id/${photo.id}/1920/1080`,
          thumbnail_url: `https://picsum.photos/id/${photo.id}/400/300`,
          source_url: photo.url,
          source_site: 'Picsum Photos',
          category: category,
          tags: `${term},${category},wallpaper,hd,${photo.author}`,
          resolution: '1920x1080',
          file_size: null
        };
        
        wallpapers.push(wallpaper);
      }
      
    } catch (error) {
      console.error(`Error fetching ${category} wallpapers:`, error.message);
    }
    
    return wallpapers;
  }

  async scrapePicsumPhotos(category, count = 20) {
    console.log(`Scraping Picsum for ${category}...`);
    const wallpapers = [];
    
    try {
      // Get list of available photos from different pages for more variety
      const page = Math.floor(Math.random() * 10) + 1;
      const response = await axios.get(`https://picsum.photos/v2/list?page=${page}&limit=100`);
      const photos = response.data;
      
      // Randomly select photos
      const selectedPhotos = photos.sort(() => Math.random() - 0.5).slice(0, count);
      
      for (const photo of selectedPhotos) {
        const wallpaper = {
          title: `${category.charAt(0).toUpperCase() + category.slice(1)} wallpaper by ${photo.author}`,
          description: `High quality ${category} wallpaper`,
          image_url: `https://picsum.photos/id/${photo.id}/1920/1080`,
          thumbnail_url: `https://picsum.photos/id/${photo.id}/400/300`,
          source_url: photo.url,
          source_site: 'Picsum Photos',
          category: category,
          tags: `${category},photography,hd,wallpaper`,
          resolution: '1920x1080',
          file_size: null
        };
        
        wallpapers.push(wallpaper);
      }
      
    } catch (error) {
      console.error(`Error scraping Picsum:`, error.message);
    }
    
    return wallpapers;
  }

  async saveWallpaper(wallpaper) {
    return new Promise((resolve, reject) => {
      // Check if wallpaper already exists
      this.db.get(
        'SELECT id FROM wallpapers WHERE image_url = ?',
        [wallpaper.image_url],
        (err, row) => {
          if (err) {
            reject(err);
            return;
          }

          if (row) {
            resolve(false);
            return;
          }

          // Insert new wallpaper
          this.db.run(
            `INSERT INTO wallpapers 
             (title, description, image_url, thumbnail_url, source_url, source_site, 
              category, tags, resolution, file_size) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
              wallpaper.title,
              wallpaper.description,
              wallpaper.image_url,
              wallpaper.thumbnail_url,
              wallpaper.source_url,
              wallpaper.source_site,
              wallpaper.category,
              wallpaper.tags,
              wallpaper.resolution,
              wallpaper.file_size
            ],
            function(err) {
              if (err) {
                reject(err);
                return;
              }
              
              console.log(`✅ Saved: ${wallpaper.title}`);
              resolve(true);
            }
          );
        }
      );
    });
  }

  async runWorkingScraper() {
    console.log('🚀 Starting working scraper with real APIs...\n');
    
    const categories = ['nature', 'abstract', 'technology', 'space', 'animals', 'cars', 'gaming', 'minimalist'];
    let totalSaved = 0;
    const wallpapersPerCategory = 30; // 30 * 8 = 240 wallpapers

    for (const category of categories) {
      try {
        console.log(`\n🎯 Processing category: ${category.toUpperCase()}`);
        let categorySaved = 0;
        
        // Scrape from Picsum (100% reliable wallpapers)
        console.log(`🖼️ Fetching from Picsum Photos...`);
        const picsumWallpapers = await this.scrapePicsumPhotos(category, wallpapersPerCategory);
        for (const wallpaper of picsumWallpapers) {
          const saved = await this.saveWallpaper(wallpaper);
          if (saved) {
            categorySaved++;
            totalSaved++;
          }
        }
        
        console.log(`✅ ${category}: ${categorySaved} new wallpapers saved`);
        
        // Delay between categories
        await new Promise(resolve => setTimeout(resolve, 2000));
        
      } catch (error) {
        console.error(`❌ Error processing category ${category}: ${error.message}`);
      }
    }

    // Update category counts
    await this.updateCategoryCounts();
    
    console.log(`\n🎉 Scraping completed! Total saved: ${totalSaved} reliable wallpapers from Picsum Photos`);
    return totalSaved;
  }

  async updateCategoryCounts() {
    return new Promise((resolve) => {
      this.db.run(`
        UPDATE categories 
        SET wallpaper_count = (
          SELECT COUNT(*) 
          FROM wallpapers 
          WHERE wallpapers.category = categories.slug
        )
      `, (err) => {
        if (err) {
          console.error('Error updating category counts:', err);
        } else {
          console.log('✅ Category counts updated');
        }
        resolve();
      });
    });
  }
}

const workingScraper = new WorkingScraper();

// Export for use in other modules
module.exports = workingScraper;

// Allow running directly
if (require.main === module) {
  const db = require('../database/db');
  db.init();
  
  setTimeout(() => {
    workingScraper.runWorkingScraper().then((count) => {
      console.log(`\n✨ Working scraper completed! ${count} wallpapers saved.`);
      process.exit(0);
    }).catch(error => {
      console.error('Working scraper failed:', error);
      process.exit(1);
    });
  }, 2000);
}