# 🚀 Getting 1000+ Wallpapers - Bulk Scraper Guide

## 🎯 Overview

Your wallpaper aggregator now includes a powerful bulk scraper that can fetch **1000+ high-quality wallpapers** from multiple sources, with **Pinterest as the dominant source**.

## 📊 Scraping Sources & Distribution

### 1. **Pinterest (60% - ~600 wallpapers)**
- **Dominant source** with millions of high-quality wallpapers
- Scrapes using web scraping techniques
- Searches for "4K wallpaper" variations
- Extracts high-resolution image URLs

### 2. **Wallhaven.cc (25% - ~250 wallpapers)**
- Premium wallpaper community
- High-quality curated wallpapers
- Multiple resolutions available
- No API key required

### 3. **Unsplash (10% - ~100 wallpapers)**
- Professional photography
- Requires API key for best results
- High-quality landscape photos

### 4. **Pexels (5% - ~50 wallpapers)**
- Stock photography
- Requires API key for best results
- Commercial-use friendly images

## 🚀 How to Get 1000+ Wallpapers

### Method 1: Web Interface (Easiest)
1. Start your application: `npm run dev`
2. Go to http://localhost:3000
3. Click the **"🚀 Populate 1000+ Wallpapers"** button
4. Wait 10-15 minutes for completion
5. Refresh the page to see your wallpapers!

### Method 2: Command Line
```bash
# Run the bulk scraper
npm run populate

# Or directly
npm run scraper:bulk

# Or with node
node server/scraper/index.js --bulk
```

### Method 3: API Call
```bash
# POST request to bulk scraper endpoint
curl -X POST http://localhost:5000/api/scraper/bulk
```

## ⚙️ Configuration for Maximum Results

### 1. Get API Keys (Optional but Recommended)

**Unsplash API Key:**
```bash
# Add to .env file
UNSPLASH_ACCESS_KEY=your_unsplash_access_key
```
- Get it from: https://unsplash.com/developers
- Increases Unsplash wallpapers from 0 to ~100

**Pexels API Key:**
```bash
# Add to .env file
PEXELS_API_KEY=your_pexels_api_key
```
- Get it from: https://www.pexels.com/api/
- Increases Pexels wallpapers from 0 to ~50

### 2. Bulk Scraper Settings

The bulk scraper targets **150 wallpapers per category** across 8 categories:
- Nature (mountains, forests, oceans, etc.)
- Abstract (geometric, patterns, gradients)
- Technology (computers, circuits, futuristic)
- Space (galaxies, nebulas, planets)
- Animals (wildlife, pets, birds)
- Cars (supercars, vintage, racing)
- Gaming (fantasy, sci-fi, characters)
- Minimalist (clean, simple, elegant)

**Total Target: 150 × 8 = 1,200 wallpapers**

## 📈 Expected Results

### With API Keys:
- **Pinterest**: ~600 wallpapers
- **Wallhaven**: ~250 wallpapers  
- **Unsplash**: ~100 wallpapers
- **Pexels**: ~50 wallpapers
- **Total**: ~1,000+ wallpapers

### Without API Keys:
- **Pinterest**: ~600 wallpapers
- **Wallhaven**: ~250 wallpapers
- **Total**: ~850+ wallpapers

## ⏱️ Timing & Performance

- **Estimated Time**: 10-15 minutes
- **Rate Limiting**: Built-in delays to respect websites
- **Progress Tracking**: Real-time console output
- **Error Handling**: Continues even if some sources fail

## 🔄 Scheduling & Automation

### Daily Auto-Updates
The system automatically runs a smaller scraper every 24 hours:
```javascript
// Runs at 2 AM daily
cron.schedule('0 2 * * *', () => {
  scraper.runScraper(); // ~160 new wallpapers daily
});
```

### Manual Scheduling
```bash
# Regular daily scraper (20 per category)
npm run scraper

# Bulk scraper (150 per category)  
npm run scraper:bulk
```

## 🛠️ Troubleshooting

### Common Issues:

**1. "No wallpapers found"**
- Check internet connection
- Verify websites are accessible
- Try running with API keys

**2. "Rate limited"**
- Normal behavior - scraper includes delays
- Wait and try again later
- Pinterest may temporarily block requests

**3. "Scraper takes too long"**
- Normal for bulk mode (10-15 minutes)
- Check console for progress updates
- Can be interrupted and resumed

**4. "Some categories have fewer wallpapers"**
- Some search terms may yield fewer results
- Pinterest availability varies by topic
- API rate limits may apply

### Performance Tips:

1. **Run during off-peak hours** (less traffic)
2. **Use stable internet connection**
3. **Don't interrupt the bulk scraper**
4. **Monitor console output** for progress
5. **Clear browser cache** after completion

## 📊 Monitoring Progress

### Console Output Example:
```
🎯 Processing category: NATURE
📌 Scraping Pinterest for nature...
Pinterest: 89 found, 76 new saved
🖼️ Scraping Wallhaven for nature...
Wallhaven: 34 found, 28 new saved
✅ Category nature completed: 104 new wallpapers saved

🎉 Scraping completed! Total saved: 1,247 new wallpapers
```

### Database Check:
```bash
# Test API to see total count
node test-api.js
```

## 🎨 Customization

### Add More Categories:
Edit `server/scraper/index.js`:
```javascript
const categories = [
  'nature', 'abstract', 'technology', 'space', 
  'animals', 'cars', 'gaming', 'minimalist',
  'architecture', 'food', 'travel' // Add more
];
```

### Modify Search Terms:
```javascript
this.searchTerms = {
  nature: ['landscape', 'forest', 'mountain', 'ocean'], // Customize
  // ... add more terms
};
```

### Adjust Targets:
```javascript
const targetPerCategory = bulkMode ? 200 : 20; // Increase for more wallpapers
```

## 🎉 Success!

After running the bulk scraper, your wallpaper aggregator will have:
- ✅ 1000+ high-quality wallpapers
- ✅ 8 diverse categories
- ✅ Multiple sources for variety
- ✅ Automatic daily updates
- ✅ Professional-looking content

Your site is now ready to compete with major wallpaper websites! 🚀