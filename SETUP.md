# Quick Setup Guide

## 🚀 Quick Start (Windows)

1. **Double-click `start.bat`** - This will automatically:
   - Install all dependencies
   - Start both backend and frontend servers
   - Open your browser to the application

2. **Or run manually:**
   ```bash
   npm run install-all
   npm run dev
   ```

## 📋 What You Get

- **Frontend**: http://localhost:3000 (React app)
- **Backend API**: http://localhost:5000 (Express server)
- **Database**: SQLite database with demo wallpapers
- **Auto-scraper**: Runs every 24 hours at 2 AM

## 🔧 Configuration

### API Keys (Optional but Recommended)

To get fresh wallpapers from external sources, add API keys to `.env`:

1. **Unsplash API Key**:
   - Go to [unsplash.com/developers](https://unsplash.com/developers)
   - Create a new application
   - Copy the "Access Key"
   - Add to `.env`: `UNSPLASH_ACCESS_KEY=your_key_here`

2. **Pexels API Key**:
   - Go to [pexels.com/api](https://www.pexels.com/api/)
   - Create account and get API key
   - Add to `.env`: `PEXELS_API_KEY=your_key_here`

### Without API Keys
The app works with demo data even without API keys. The scraper will just skip external sources.

## 🧪 Testing

Test the backend API:
```bash
node test-api.js
```

## 📁 Project Structure

```
wallpaper-aggregator/
├── server/                 # Backend (Node.js + Express)
│   ├── index.js           # Main server
│   ├── database/          # SQLite database
│   ├── routes/            # API endpoints
│   └── scraper/           # Auto-scraping system
├── client/                # Frontend (React)
│   └── src/
│       ├── components/    # React components
│       └── pages/         # Page components
├── start.bat             # Windows quick start
└── README.md             # Full documentation
```

## 🎯 Features

- ✅ Browse wallpapers by category
- ✅ Search functionality
- ✅ Download tracking
- ✅ Like system
- ✅ Responsive design
- ✅ Auto-updating content (every 24h)
- ✅ Demo data included

## 🔄 Manual Operations

- **Run scraper manually**: `npm run scraper`
- **Add demo data**: `npm run seed`
- **Backend only**: `npm run server`
- **Frontend only**: `npm run client`

## 🐛 Troubleshooting

**Port already in use?**
- Change ports in `.env` file
- Or kill existing processes

**API not working?**
- Check if backend is running on port 5000
- Run `node test-api.js` to verify

**No wallpapers showing?**
- Demo data should load automatically
- Try running `npm run seed` manually

## 🎨 Customization

- **Colors**: Edit `client/src/App.css`
- **Categories**: Modify `server/database/db.js`
- **Scraper sources**: Add to `server/scraper/index.js`
- **Scraper schedule**: Change cron in `server/index.js`

## 📝 Next Steps

1. Get API keys for fresh content
2. Customize the design
3. Add more wallpaper sources
4. Deploy to a server for 24/7 operation

Enjoy your wallpaper aggregator! 🖼️