const axios = require('axios');
const cheerio = require('cheerio');
const { getDb } = require('../database/db');
const fs = require('fs');
const path = require('path');

class WallpaperScraper {
  constructor() {
    this.sources = [
      {
        name: 'Unsplash',
        baseUrl: 'https://unsplash.com',
        categories: ['nature', 'abstract', 'technology', 'space', 'animals', 'cars', 'gaming', 'minimalist']
      },
      {
        name: 'Pexels',
        baseUrl: 'https://www.pexels.com',
        categories: ['nature', 'cars', 'technology', 'abstract', 'space', 'animals', 'gaming', 'minimalist']
      },
      {
        name: 'Pixabay',
        baseUrl: 'https://pixabay.com',
        categories: ['nature', 'abstract', 'technology', 'space', 'animals', 'cars', 'gaming', 'minimalist']
      }
    ];
    
    // Extended search terms for better variety
    this.searchTerms = {
      nature: ['landscape', 'forest', 'mountain', 'ocean', 'sunset', 'sunrise', 'trees', 'flowers', 'waterfall', 'beach', 'desert', 'lake'],
      abstract: ['geometric', 'pattern', 'colorful', 'gradient', 'texture', 'digital art', 'fractal', 'modern art', 'shapes', 'lines'],
      technology: ['computer', 'coding', 'circuit', 'digital', 'futuristic', 'cyber', 'neon', 'matrix', 'programming', 'tech'],
      space: ['galaxy', 'nebula', 'stars', 'planet', 'universe', 'cosmos', 'astronaut', 'rocket', 'moon', 'earth'],
      animals: ['wildlife', 'lion', 'tiger', 'elephant', 'bird', 'wolf', 'cat', 'dog', 'horse', 'eagle', 'bear'],
      cars: ['supercar', 'sports car', 'vintage car', 'motorcycle', 'racing', 'luxury car', 'classic car', 'truck'],
      gaming: ['game art', 'fantasy', 'sci-fi', 'character', 'weapon', 'armor', 'medieval', 'dragon', 'warrior'],
      minimalist: ['simple', 'clean', 'white', 'minimal', 'geometric simple', 'monochrome', 'elegant', 'modern']
    };
    
    this.db = getDb();
    this.uploadsDir = path.join(__dirname, '../uploads');
    
    // Create uploads directory if it doesn't exist
    if (!fs.existsSync(this.uploadsDir)) {
      fs.mkdirSync(this.uploadsDir, { recursive: true });
    }
  }

  async scrapeUnsplash(category, limit = 30, page = 1) {
    try {
      console.log(`Scraping Unsplash for ${category} wallpapers (page ${page})...`);
      
      const searchTerms = this.searchTerms[category] || [category];
      const allWallpapers = [];
      
      // Search with multiple terms for variety
      for (const term of searchTerms.slice(0, 3)) { // Use first 3 terms to avoid rate limits
        try {
          const response = await axios.get(`https://api.unsplash.com/search/photos`, {
            params: {
              query: term,
              per_page: Math.min(limit, 30), // Unsplash max is 30
              page: page,
              orientation: 'landscape'
            },
            headers: {
              'Authorization': `Client-ID ${process.env.UNSPLASH_ACCESS_KEY || 'demo-key'}`
            }
          });

          if (response.data.results) {
            const wallpapers = response.data.results.map(photo => ({
              title: photo.alt_description || `${term} wallpaper`,
              description: photo.description || photo.alt_description,
              image_url: photo.urls.full,
              thumbnail_url: photo.urls.small,
              source_url: photo.links.html,
              source_site: 'Unsplash',
              category: category,
              tags: photo.tags ? photo.tags.map(tag => tag.title).join(',') : term,
              resolution: `${photo.width}x${photo.height}`,
              file_size: null
            }));
            
            allWallpapers.push(...wallpapers);
          }
          
          // Rate limiting delay
          await new Promise(resolve => setTimeout(resolve, 1000));
        } catch (termError) {
          console.error(`Error with term "${term}":`, termError.message);
        }
      }

      return allWallpapers;
    } catch (error) {
      console.error(`Error scraping Unsplash: ${error.message}`);
      return [];
    }
  }

  async scrapePexels(category, limit = 80, page = 1) {
    try {
      console.log(`Scraping Pexels for ${category} wallpapers (page ${page})...`);
      
      const searchTerms = this.searchTerms[category] || [category];
      const allWallpapers = [];
      
      // Search with multiple terms for variety
      for (const term of searchTerms.slice(0, 4)) { // Use first 4 terms
        try {
          const response = await axios.get(`https://api.pexels.com/v1/search`, {
            params: {
              query: term,
              per_page: Math.min(limit, 80), // Pexels max is 80
              page: page,
              orientation: 'landscape'
            },
            headers: {
              'Authorization': process.env.PEXELS_API_KEY || 'demo-key'
            }
          });

          if (response.data.photos) {
            const wallpapers = response.data.photos.map(photo => ({
              title: photo.alt || `${term} wallpaper`,
              description: photo.alt,
              image_url: photo.src.original,
              thumbnail_url: photo.src.medium,
              source_url: photo.url,
              source_site: 'Pexels',
              category: category,
              tags: term,
              resolution: `${photo.width}x${photo.height}`,
              file_size: null
            }));
            
            allWallpapers.push(...wallpapers);
          }
          
          // Rate limiting delay
          await new Promise(resolve => setTimeout(resolve, 1000));
        } catch (termError) {
          console.error(`Error with term "${term}":`, termError.message);
        }
      }

      return allWallpapers;
    } catch (error) {
      console.error(`Error scraping Pexels: ${error.message}`);
      return [];
    }
  }

  async scrapePinterest(category, limit = 100) {
    try {
      console.log(`Scraping Pinterest for ${category} wallpapers...`);
      
      const searchTerms = this.searchTerms[category] || [category];
      const allWallpapers = [];
      
      // Pinterest wallpaper specific search terms
      const pinterestTerms = searchTerms.map(term => `${term} wallpaper 4k`);
      
      for (const term of pinterestTerms.slice(0, 5)) { // Use 5 terms for Pinterest
        try {
          console.log(`Searching Pinterest for: ${term}`);
          
          // Pinterest search URL
          const searchUrl = `https://www.pinterest.com/search/pins/?q=${encodeURIComponent(term)}&rs=typed`;
          
          const response = await axios.get(searchUrl, {
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
              'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
              'Accept-Language': 'en-US,en;q=0.5',
              'Accept-Encoding': 'gzip, deflate, br',
              'DNT': '1',
              'Connection': 'keep-alive',
              'Upgrade-Insecure-Requests': '1'
            },
            timeout: 10000
          });

          const $ = cheerio.load(response.data);
          
          // Extract Pinterest data from script tags (Pinterest loads data via JSON)
          const scriptTags = $('script').toArray();
          let pinterestData = null;
          
          for (const script of scriptTags) {
            const scriptContent = $(script).html();
            if (scriptContent && scriptContent.includes('"images"') && scriptContent.includes('"url"')) {
              try {
                // Try to extract JSON data
                const jsonMatch = scriptContent.match(/window\.__PWS_DATA__\s*=\s*({.*?});/);
                if (jsonMatch) {
                  pinterestData = JSON.parse(jsonMatch[1]);
                  break;
                }
              } catch (e) {
                // Continue searching
              }
            }
          }
          
          // Alternative: Extract image URLs directly from img tags
          const imageElements = $('img[src*="pinimg.com"]').toArray();
          
          for (let i = 0; i < Math.min(imageElements.length, 20); i++) {
            const img = $(imageElements[i]);
            const imageUrl = img.attr('src');
            const alt = img.attr('alt') || `${term}`;
            
            if (imageUrl && imageUrl.includes('pinimg.com')) {
              // Convert Pinterest image URL to higher resolution
              const highResUrl = imageUrl.replace(/\/\d+x\d+\//, '/originals/').replace(/\/\d+x\//, '/originals/');
              
              const wallpaper = {
                title: alt || `${category} wallpaper from Pinterest`,
                description: `Beautiful ${category} wallpaper found on Pinterest`,
                image_url: highResUrl,
                thumbnail_url: imageUrl,
                source_url: `https://pinterest.com/search/pins/?q=${encodeURIComponent(term)}`,
                source_site: 'Pinterest',
                category: category,
                tags: term.replace(' wallpaper 4k', ''),
                resolution: 'High Resolution',
                file_size: null
              };
              
              allWallpapers.push(wallpaper);
            }
          }
          
          // Rate limiting - be respectful to Pinterest
          await new Promise(resolve => setTimeout(resolve, 3000));
          
        } catch (termError) {
          console.error(`Error scraping Pinterest for "${term}":`, termError.message);
        }
      }
      
      console.log(`Pinterest scraping completed for ${category}: ${allWallpapers.length} wallpapers found`);
      return allWallpapers;
      
    } catch (error) {
      console.error(`Error scraping Pinterest: ${error.message}`);
      return [];
    }
  }

  async scrapeWallhavenCC(category, limit = 50) {
    try {
      console.log(`Scraping Wallhaven.cc for ${category} wallpapers...`);
      
      const searchTerms = this.searchTerms[category] || [category];
      const allWallpapers = [];
      
      for (const term of searchTerms.slice(0, 3)) {
        try {
          // Wallhaven.cc search URL
          const searchUrl = `https://wallhaven.cc/search?q=${encodeURIComponent(term)}&categories=111&purity=100&sorting=relevance&order=desc`;
          
          const response = await axios.get(searchUrl, {
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            },
            timeout: 10000
          });

          const $ = cheerio.load(response.data);
          
          // Extract wallpaper data from Wallhaven
          $('.thumb').each((index, element) => {
            if (index >= 20) return false; // Limit per term
            
            const $thumb = $(element);
            const thumbUrl = $thumb.find('img').attr('data-src') || $thumb.find('img').attr('src');
            const wallpaperLink = $thumb.attr('href');
            
            if (thumbUrl && wallpaperLink) {
              // Extract wallpaper ID from URL
              const wallpaperIdMatch = wallpaperLink.match(/wallhaven\.cc\/w\/(\w+)/);
              if (wallpaperIdMatch) {
                const wallpaperId = wallpaperIdMatch[1];
                const fullImageUrl = `https://w.wallhaven.cc/full/${wallpaperId.slice(0, 2)}/wallhaven-${wallpaperId}.jpg`;
                
                const wallpaper = {
                  title: `${term} wallpaper - ${wallpaperId}`,
                  description: `High quality ${term} wallpaper from Wallhaven`,
                  image_url: fullImageUrl,
                  thumbnail_url: thumbUrl,
                  source_url: `https://wallhaven.cc${wallpaperLink}`,
                  source_site: 'Wallhaven',
                  category: category,
                  tags: term,
                  resolution: 'High Resolution',
                  file_size: null
                };
                
                allWallpapers.push(wallpaper);
              }
            }
          });
          
          // Rate limiting
          await new Promise(resolve => setTimeout(resolve, 2000));
          
        } catch (termError) {
          console.error(`Error scraping Wallhaven for "${term}":`, termError.message);
        }
      }
      
      console.log(`Wallhaven scraping completed for ${category}: ${allWallpapers.length} wallpapers found`);
      return allWallpapers;
      
    } catch (error) {
      console.error(`Error scraping Wallhaven: ${error.message}`);
      return [];
    }
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
            console.log('Wallpaper already exists, skipping...');
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
              
              console.log(`Saved wallpaper: ${wallpaper.title}`);
              resolve(true);
            }
          );
        }
      );
    });
  }

  async runScraper(bulkMode = false) {
    console.log(`Starting wallpaper scraping process... ${bulkMode ? '(BULK MODE - targeting 1000+ wallpapers)' : ''}`);
    
    const categories = ['nature', 'abstract', 'technology', 'space', 'animals', 'cars', 'gaming', 'minimalist'];
    let totalSaved = 0;
    const targetPerCategory = bulkMode ? 150 : 20; // 150 * 8 categories = 1200+ wallpapers

    for (const category of categories) {
      try {
        console.log(`\n🎯 Processing category: ${category.toUpperCase()}`);
        let categorySaved = 0;
        
        // 1. PINTEREST (Dominant source - 60% of wallpapers)
        console.log(`📌 Scraping Pinterest for ${category}...`);
        const pinterestWallpapers = await this.scrapePinterest(category, Math.floor(targetPerCategory * 0.6));
        for (const wallpaper of pinterestWallpapers) {
          const saved = await this.saveWallpaper(wallpaper);
          if (saved) {
            categorySaved++;
            totalSaved++;
          }
        }
        console.log(`Pinterest: ${pinterestWallpapers.length} found, ${categorySaved} new saved`);

        // 2. WALLHAVEN (High quality source - 25% of wallpapers)
        console.log(`🖼️ Scraping Wallhaven for ${category}...`);
        const wallhavenStart = categorySaved;
        const wallhavenWallpapers = await this.scrapeWallhavenCC(category, Math.floor(targetPerCategory * 0.25));
        for (const wallpaper of wallhavenWallpapers) {
          const saved = await this.saveWallpaper(wallpaper);
          if (saved) {
            categorySaved++;
            totalSaved++;
          }
        }
        console.log(`Wallhaven: ${wallhavenWallpapers.length} found, ${categorySaved - wallhavenStart} new saved`);

        // 3. UNSPLASH (Professional photos - 10% of wallpapers)
        if (process.env.UNSPLASH_ACCESS_KEY && process.env.UNSPLASH_ACCESS_KEY !== 'demo-key') {
          console.log(`📸 Scraping Unsplash for ${category}...`);
          const unsplashStart = categorySaved;
          const unsplashWallpapers = await this.scrapeUnsplash(category, Math.floor(targetPerCategory * 0.1));
          for (const wallpaper of unsplashWallpapers) {
            const saved = await this.saveWallpaper(wallpaper);
            if (saved) {
              categorySaved++;
              totalSaved++;
            }
          }
          console.log(`Unsplash: ${unsplashWallpapers.length} found, ${categorySaved - unsplashStart} new saved`);
        }

        // 4. PEXELS (Stock photos - 5% of wallpapers)
        if (process.env.PEXELS_API_KEY && process.env.PEXELS_API_KEY !== 'demo-key') {
          console.log(`📷 Scraping Pexels for ${category}...`);
          const pexelsStart = categorySaved;
          const pexelsWallpapers = await this.scrapePexels(category, Math.floor(targetPerCategory * 0.05));
          for (const wallpaper of pexelsWallpapers) {
            const saved = await this.saveWallpaper(wallpaper);
            if (saved) {
              categorySaved++;
              totalSaved++;
            }
          }
          console.log(`Pexels: ${pexelsWallpapers.length} found, ${categorySaved - pexelsStart} new saved`);
        }

        console.log(`✅ Category ${category} completed: ${categorySaved} new wallpapers saved`);
        
        // Add delay between categories to be respectful
        await new Promise(resolve => setTimeout(resolve, bulkMode ? 5000 : 3000));
        
      } catch (error) {
        console.error(`❌ Error processing category ${category}: ${error.message}`);
      }
    }

    console.log(`\n🎉 Scraping completed! Total saved: ${totalSaved} new wallpapers`);
    
    // Update category counts
    await this.updateCategoryCounts();
    
    return totalSaved;
  }

  async runBulkScraper() {
    console.log('🚀 Starting BULK scraper to populate 1000+ wallpapers...');
    return await this.runScraper(true);
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
          console.log('Category counts updated');
        }
        resolve();
      });
    });
  }
}

const scraper = new WallpaperScraper();

// Export for use in other modules
module.exports = scraper;

// Allow running directly
if (require.main === module) {
  const args = process.argv.slice(2);
  const isBulk = args.includes('--bulk') || args.includes('-b');
  
  if (isBulk) {
    console.log('Running bulk scraper...');
    scraper.runBulkScraper().then((count) => {
      console.log(`Bulk scraping completed! ${count} wallpapers saved.`);
      process.exit(0);
    }).catch(error => {
      console.error('Bulk scraper failed:', error);
      process.exit(1);
    });
  } else {
    scraper.runScraper().then((count) => {
      console.log(`Regular scraping completed! ${count} wallpapers saved.`);
      process.exit(0);
    }).catch(error => {
      console.error('Scraper failed:', error);
      process.exit(1);
    });
  }
}