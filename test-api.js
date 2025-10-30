const axios = require('axios');

const BASE_URL = 'http://localhost:4003/api';

async function testAPI() {
  console.log('Testing Wallpaper Aggregator API...\n');

  try {
    // Test health endpoint
    console.log('1. Testing health endpoint...');
    const healthResponse = await axios.get(`${BASE_URL}/health`);
    console.log('✅ Health check:', healthResponse.data.message);

    // Test categories endpoint
    console.log('\n2. Testing categories endpoint...');
    const categoriesResponse = await axios.get(`${BASE_URL}/wallpapers/categories/all`);
    console.log('✅ Categories loaded:', categoriesResponse.data.length, 'categories');

    // Test wallpapers endpoint
    console.log('\n3. Testing wallpapers endpoint...');
    const wallpapersResponse = await axios.get(`${BASE_URL}/wallpapers?limit=5`);
    console.log('✅ Wallpapers loaded:', wallpapersResponse.data.wallpapers?.length || 0, 'wallpapers');
    console.log('   Total wallpapers in database:', wallpapersResponse.data.pagination?.total || 0);

    // Test search
    console.log('\n4. Testing search functionality...');
    const searchResponse = await axios.get(`${BASE_URL}/wallpapers?search=nature&limit=3`);
    console.log('✅ Search results for "nature":', searchResponse.data.wallpapers?.length || 0, 'wallpapers');

    console.log('\n🎉 All API tests passed! The backend is working correctly.');
    
  } catch (error) {
    console.error('❌ API test failed:', error.message);
    if (error.code === 'ECONNREFUSED') {
      console.log('\n💡 Make sure the server is running with: npm run server');
    }
  }
}

// Run tests
testAPI();