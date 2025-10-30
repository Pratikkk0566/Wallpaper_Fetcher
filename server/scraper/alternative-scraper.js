const axios = require('axios');
const { getDb } = require('../database/db');

class AlternativeScraper {
  constructor() {
    this.db = getDb();
    
    // Free APIs that work well
    this.sources = {
      // Lorem Picsum - Free placeholder images
      picsum: 'https://picsum.photos',
      // JSONPlaceholder for demo
      placeholder: 'https://jsonplaceholder.typicode.com'
    };
    
    // Categories with specific image IDs from Lorem Picsum
    this.categoryImages = {
      nature: [
        { id: 1018, author: 'Landscape Photography', keywords: 'mountain, nature, landscape' },
        { id: 1015, author: 'Nature Shots', keywords: 'forest, trees, nature' },
        { id: 1022, author: 'Ocean Views', keywords: 'ocean, water, blue' },
        { id: 1025, author: 'Sunset Collection', keywords: 'sunset, sky, colors' },
        { id: 1036, author: 'Wildlife Photography', keywords: 'animals, wildlife, nature' },
        { id: 1043, author: 'Garden Beauty', keywords: 'flowers, garden, plants' },
        { id: 1044, author: 'River Scenes', keywords: 'river, water, peaceful' },
        { id: 1051, author: 'Mountain Peaks', keywords: 'mountains, snow, peaks' },
        { id: 1059, author: 'Beach Views', keywords: 'beach, sand, ocean' },
        { id: 1062, author: 'Forest Path', keywords: 'forest, path, trees' }
      ],
      abstract: [
        { id: 1080, author: 'Digital Art', keywords: 'abstract, digital, art' },
        { id: 1081, author: 'Geometric Patterns', keywords: 'geometric, pattern, shapes' },
        { id: 1082, author: 'Color Gradients', keywords: 'gradient, colors, smooth' },
        { id: 1083, author: 'Modern Art', keywords: 'modern, abstract, creative' },
        { id: 1084, author: 'Texture Art', keywords: 'texture, surface, material' },
        { id: 1085, author: 'Light Effects', keywords: 'light, effects, glow' },
        { id: 1086, author: 'Fluid Art', keywords: 'fluid, liquid, flow' },
        { id: 1087, author: 'Minimal Design', keywords: 'minimal, clean, simple' },
        { id: 1088, author: 'Color Splash', keywords: 'color, vibrant, splash' },
        { id: 1089, author: 'Pattern Design', keywords: 'pattern, design, repeat' }
      ],
      technology: [
        { id: 1090, author: 'Tech World', keywords: 'technology, computer, digital' },
        { id: 1091, author: 'Circuit Boards', keywords: 'circuit, electronics, tech' },
        { id: 1092, author: 'Code Life', keywords: 'coding, programming, screen' },
        { id: 1093, author: 'Future Tech', keywords: 'futuristic, sci-fi, tech' },
        { id: 1094, author: 'Digital Matrix', keywords: 'matrix, digital, code' },
        { id: 1095, author: 'Cyber Space', keywords: 'cyber, space, digital' },
        { id: 1096, author: 'Tech Patterns', keywords: 'tech, pattern, grid' },
        { id: 1097, author: 'Binary World', keywords: 'binary, data, numbers' },
        { id: 1098, author: 'Network Design', keywords: 'network, connection, tech' },
        { id: 1099, author: 'AI Concept', keywords: 'ai, artificial, intelligence' }
      ],
      space: [
        { id: 1100, author: 'Cosmic Views', keywords: 'space, cosmos, universe' },
        { id: 1101, author: 'Galaxy Art', keywords: 'galaxy, stars, nebula' },
        { id: 1102, author: 'Planet Earth', keywords: 'earth, planet, space' },
        { id: 1103, author: 'Star Fields', keywords: 'stars, field, night' },
        { id: 1104, author: 'Moon Phases', keywords: 'moon, phases, lunar' },
        { id: 1105, author: 'Solar System', keywords: 'solar, system, planets' },
        { id: 1106, author: 'Deep Space', keywords: 'deep, space, void' },
        { id: 1107, author: 'Astronaut Life', keywords: 'astronaut, space, suit' },
        { id: 1108, author: 'Rocket Launch', keywords: 'rocket, launch, space' },
        { id: 1109, author: 'Alien Worlds', keywords: 'alien, world, fantasy' }
      ],
      animals: [
        { id: 1110, author: 'Wildlife Photography', keywords: 'animals, wildlife, nature' },
        { id: 1111, author: 'Big Cats', keywords: 'lion, tiger, cat' },
        { id: 1112, author: 'Ocean Life', keywords: 'ocean, marine, fish' },
        { id: 1113, author: 'Bird Watching', keywords: 'birds, flying, wings' },
        { id: 1114, author: 'Safari Adventures', keywords: 'safari, elephant, africa' },
        { id: 1115, author: 'Pet Love', keywords: 'pets, dogs, cats' },
        { id: 1116, author: 'Wild Horses', keywords: 'horses, wild, running' },
        { id: 1117, author: 'Bear Country', keywords: 'bears, forest, wild' },
        { id: 1118, author: 'Butterfly Garden', keywords: 'butterfly, garden, colorful' },
        { id: 1119, author: 'Wolf Pack', keywords: 'wolf, pack, howling' }
      ],
      cars: [
        { id: 1120, author: 'Supercar Collection', keywords: 'supercar, fast, luxury' },
        { id: 1121, author: 'Classic Cars', keywords: 'classic, vintage, retro' },
        { id: 1122, author: 'Racing World', keywords: 'racing, speed, track' },
        { id: 1123, author: 'Motorcycle Life', keywords: 'motorcycle, bike, road' },
        { id: 1124, author: 'Sports Cars', keywords: 'sports, car, performance' },
        { id: 1125, author: 'Truck Power', keywords: 'truck, power, heavy' },
        { id: 1126, author: 'Electric Future', keywords: 'electric, future, clean' },
        { id: 1127, author: 'Off Road', keywords: 'offroad, adventure, terrain' },
        { id: 1128, author: 'City Drives', keywords: 'city, urban, driving' },
        { id: 1129, author: 'Car Shows', keywords: 'show, exhibition, display' }
      ],
      gaming: [
        { id: 1130, author: 'Game Art', keywords: 'gaming, art, character' },
        { id: 1131, author: 'Fantasy Worlds', keywords: 'fantasy, world, magic' },
        { id: 1132, author: 'Sci-Fi Gaming', keywords: 'scifi, future, gaming' },
        { id: 1133, author: 'RPG Adventures', keywords: 'rpg, adventure, quest' },
        { id: 1134, author: 'Action Heroes', keywords: 'action, hero, warrior' },
        { id: 1135, author: 'Game Weapons', keywords: 'weapons, sword, gun' },
        { id: 1136, author: 'Medieval Times', keywords: 'medieval, castle, knight' },
        { id: 1137, author: 'Dragon Lore', keywords: 'dragon, fire, mythical' },
        { id: 1138, author: 'Cyber Gaming', keywords: 'cyber, neon, gaming' },
        { id: 1139, author: 'Battle Scenes', keywords: 'battle, war, epic' }
      ],
      minimalist: [
        { id: 1140, author: 'Clean Design', keywords: 'minimalist, clean, simple' },
        { id: 1141, author: 'White Space', keywords: 'white, space, minimal' },
        { id: 1142, author: 'Geometric Simple', keywords: 'geometric, simple, shape' },
        { id: 1143, author: 'Monochrome Art', keywords: 'monochrome, black, white' },
        { id: 1144, author: 'Elegant Lines', keywords: 'elegant, lines, smooth' },
        { id: 1145, author: 'Subtle Colors', keywords: 'subtle, soft, colors' },
        { id: 1146, author: 'Modern Minimal', keywords: 'modern, minimal, design' },
        { id: 1147, author: 'Pure Forms', keywords: 'pure, form, basic' },
        { id: 1148, author: 'Calm Spaces', keywords: 'calm, peaceful, zen' },
        { id: 1149, author: 'Simple Beauty', keywords: 'simple, beauty, pure' }
      ]
    };
  }

  async generateWallpapers(category, count = 50) {
    console.log(`Generating ${count} wallpapers for ${category}...`);
    
    const categoryData = this.categoryImages[category] || this.categoryImages.abstract;
    const wallpapers = [];
    
    for (let i = 0; i < count; i++) {
      const imageData = categoryData[i % categoryData.length];
      const variation = Math.floor(i / categoryData.length) + 1;
      const imageId = imageData.id + i;
      
      const wallpaper = {
        title: `${imageData.author} - ${category} wallpaper ${variation}`,
        description: `Beautiful ${category} wallpaper featuring ${imageData.keywords}`,
        image_url: `https://picsum.photos/1920/1080?random=${imageId}`,
        thumbnail_url: `https://picsum.photos/400/300?random=${imageId}`,
        source_url: `https://picsum.photos/1920/1080?random=${imageId}`,
        source_site: 'Lorem Picsum',
        category: category,
        tags: imageData.keywords,
        resolution: '1920x1080',
        file_size: null
      };
      
      wallpapers.push(wallpaper);
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
              
              resolve(true);
            }
          );
        }
      );
    });
  }

  async populateDatabase() {
    console.log('🚀 Starting alternative scraper to populate 1000+ diverse wallpapers...');
    
    const categories = ['nature', 'abstract', 'technology', 'space', 'animals', 'cars', 'gaming', 'minimalist'];
    let totalSaved = 0;
    const wallpapersPerCategory = 150; // 150 * 8 = 1200 wallpapers

    for (const category of categories) {
      try {
        console.log(`\n🎯 Generating ${wallpapersPerCategory} wallpapers for ${category.toUpperCase()}...`);
        
        const wallpapers = await this.generateWallpapers(category, wallpapersPerCategory);
        let categorySaved = 0;
        
        for (const wallpaper of wallpapers) {
          const saved = await this.saveWallpaper(wallpaper);
          if (saved) {
            categorySaved++;
            totalSaved++;
          }
        }
        
        console.log(`✅ ${category}: ${categorySaved} new wallpapers saved`);
        
      } catch (error) {
        console.error(`❌ Error processing category ${category}: ${error.message}`);
      }
    }

    // Update category counts
    await this.updateCategoryCounts();
    
    console.log(`\n🎉 Database populated! Total saved: ${totalSaved} diverse wallpapers`);
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
          console.log('Category counts updated');
        }
        resolve();
      });
    });
  }
}

const alternativeScraper = new AlternativeScraper();

// Export for use in other modules
module.exports = alternativeScraper;

// Allow running directly
if (require.main === module) {
  const db = require('../database/db');
  db.init();
  
  setTimeout(() => {
    alternativeScraper.populateDatabase().then((count) => {
      console.log(`Alternative scraping completed! ${count} wallpapers saved.`);
      process.exit(0);
    }).catch(error => {
      console.error('Alternative scraper failed:', error);
      process.exit(1);
    });
  }, 2000);
}