const scraper = require('./server/scraper/index.js');

async function testScraper() {
  console.log('🧪 Testing scraper functionality...\n');
  
  try {
    // Initialize database first
    const db = require('./server/database/db');
    db.init();
    
    // Wait a moment for DB to initialize
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('📊 Testing Pinterest scraper...');
    const pinterestResults = await scraper.scrapePinterest('nature', 5);
    console.log(`✅ Pinterest test: ${pinterestResults.length} wallpapers found`);
    
    console.log('\n🖼️ Testing Wallhaven scraper...');
    const wallhavenResults = await scraper.scrapeWallhavenCC('abstract', 3);
    console.log(`✅ Wallhaven test: ${wallhavenResults.length} wallpapers found`);
    
    if (pinterestResults.length > 0 || wallhavenResults.length > 0) {
      console.log('\n🎉 Scraper is working! You can now run the bulk scraper.');
      console.log('\nTo populate 1000+ wallpapers, run:');
      console.log('npm run populate');
    } else {
      console.log('\n⚠️ No wallpapers found. This might be due to:');
      console.log('- Network connectivity issues');
      console.log('- Website blocking requests');
      console.log('- Rate limiting');
      console.log('\nTry running again in a few minutes.');
    }
    
  } catch (error) {
    console.error('❌ Scraper test failed:', error.message);
    console.log('\n💡 This might be normal - some websites block automated requests.');
    console.log('The demo data should still work for testing the interface.');
  }
}

testScraper();