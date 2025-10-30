# 🖼️ Wallpaper Aggregator

> A modern, full-stack wallpaper aggregation website that automatically fetches and displays high-quality wallpapers from multiple sources. Built for educational purposes with React, Node.js, and automated scraping capabilities.

![Wallpaper Aggregator](https://img.shields.io/badge/Status-Active-brightgreen) ![React](https://img.shields.io/badge/React-18.x-blue) ![Node.js](https://img.shields.io/badge/Node.js-18.x-green) ![License](https://img.shields.io/badge/License-MIT-yellow)

## ✨ Features

- 🖼️ **1000+ Wallpapers**: Automatically generates diverse wallpapers across 8 categories
- 🎨 **Modern Dark UI**: Clean, responsive design with smooth animations
- 🔍 **Smart Search**: Search wallpapers by keywords, categories, and tags
- 📱 **Fully Responsive**: Perfect experience on desktop, tablet, and mobile
- ⬇️ **Download Tracking**: Track downloads and likes for each wallpaper
- 🏷️ **8 Categories**: Nature, Abstract, Technology, Space, Animals, Cars, Gaming, Minimalist
- 🔄 **Auto-Updates**: Scheduled scraping every 24 hours
- 🚀 **One-Click Setup**: Populate 1200+ wallpapers instantly

## 🛠️ Tech Stack

### Backend
- **Node.js** + **Express.js** - RESTful API server
- **SQLite** - Lightweight database for wallpaper metadata
- **Axios** + **Cheerio** - Web scraping capabilities
- **Node-cron** - Automated scheduling
- **CORS** - Cross-origin resource sharing

### Frontend
- **React 18** - Modern UI with hooks
- **React Router** - Client-side routing
- **CSS Grid & Flexbox** - Responsive layouts
- **Fetch API** - HTTP requests

### Scraping Sources
- **Pinterest** - Primary source (60% of content)
- **Wallhaven.cc** - High-quality curated wallpapers
- **Unsplash** - Professional photography
- **Pexels** - Stock photography
- **Lorem Picsum** - Placeholder images for development

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/wallpaper-aggregator.git
cd wallpaper-aggregator
```

### 2. Install Dependencies
```bash
npm run install-all
```

### 3. Start Development Servers
```bash
npm run dev
```

This starts:
- **Backend**: http://localhost:4003 (auto-detects free port)
- **Frontend**: http://localhost:3000

### 4. Populate Wallpapers
Visit http://localhost:3000 and click **"🚀 Generate 1200+ Diverse Wallpapers"**

## 📁 Project Structure

```
wallpaper-aggregator/
├── 📁 server/                    # Backend (Node.js + Express)
│   ├── 📄 index.js              # Main server file
│   ├── 📁 database/             # SQLite database
│   │   └── 📄 db.js            # Database setup & queries
│   ├── 📁 routes/               # API endpoints
│   │   └── 📄 wallpapers.js    # Wallpaper routes
│   └── 📁 scraper/              # Scraping system
│       ├── 📄 index.js         # Main scraper
│       └── 📄 alternative-scraper.js # Backup scraper
├── 📁 client/                   # Frontend (React)
│   ├── 📁 src/
│   │   ├── 📁 components/       # React components
│   │   ├── 📁 pages/           # Page components
│   │   ├── 📄 App.js           # Main React app
│   │   └── 📄 config.js        # API configuration
│   └── 📁 public/              # Static assets
├── 📄 package.json             # Dependencies & scripts
├── 📄 .env                     # Environment variables
└── 📄 README.md               # This file
```

## 🔧 Configuration

### Environment Variables (.env)
```bash
# Server Configuration
PORT=4003
NODE_ENV=development

# API Keys (Optional - for external scraping)
UNSPLASH_ACCESS_KEY=your_unsplash_access_key_here
PEXELS_API_KEY=your_pexels_api_key_here

# Scraper Configuration
SCRAPER_INTERVAL=24
SCRAPER_ENABLED=true
```

### Get API Keys (Optional)
- **Unsplash**: [unsplash.com/developers](https://unsplash.com/developers)
- **Pexels**: [pexels.com/api](https://www.pexels.com/api/)

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/health` | Health check |
| `GET` | `/api/wallpapers` | Get wallpapers (with pagination) |
| `GET` | `/api/wallpapers/:id` | Get single wallpaper |
| `GET` | `/api/wallpapers/categories/all` | Get all categories |
| `POST` | `/api/wallpapers/:id/download` | Increment download count |
| `POST` | `/api/wallpapers/:id/like` | Increment like count |
| `POST` | `/api/scraper/run` | Manual scraper trigger |
| `POST` | `/api/scraper/bulk` | Bulk scraper (1000+ wallpapers) |
| `POST` | `/api/scraper/populate` | Generate diverse wallpapers |

## 🎯 Available Scripts

```bash
# Development
npm run dev              # Start both frontend & backend
npm run server          # Start backend only
npm run client          # Start frontend only

# Production
npm run build           # Build for production
npm start              # Start production server

# Scraping
npm run scraper         # Run regular scraper
npm run scraper:bulk    # Run bulk scraper
npm run populate        # Generate 1200+ wallpapers

# Utilities
npm run install-all     # Install all dependencies
npm run seed           # Seed demo data
```

## 🔄 Automated Features

### Daily Auto-Scraping
```javascript
// Runs every day at 2 AM
cron.schedule('0 2 * * *', () => {
  scraper.runScraper(); // Adds ~160 new wallpapers daily
});
```

### Smart Duplicate Prevention
- Checks existing URLs before saving
- Prevents database bloat
- Maintains data integrity

### Category Auto-Updates
- Automatically updates wallpaper counts
- Maintains category statistics
- Real-time category management

## 🎨 Screenshots

### Home Page
- Hero section with category grid
- Featured wallpapers showcase
- One-click wallpaper population

### Category Pages
- Filtered wallpapers by category
- Infinite scroll loading
- Responsive grid layout

### Wallpaper Details
- Full-size wallpaper view
- Download and like functionality
- Related wallpaper suggestions

## 🚀 Deployment

### Local Production
```bash
npm run build
npm start
```

### Docker (Optional)
```dockerfile
# Dockerfile example
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 4003
CMD ["npm", "start"]
```

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Contribution Ideas
- 🎨 UI/UX improvements
- 🔍 Better search algorithms
- 📱 Mobile app version
- 🌐 Additional scraping sources
- 🔐 User authentication system
- 📊 Analytics dashboard

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚖️ Legal Notice

This project is for **educational purposes only**. Always respect the terms of service of websites you're scraping from and ensure you have proper permissions for content aggregation.

## 🙏 Acknowledgments

- [Unsplash](https://unsplash.com) - Beautiful free photos
- [Pexels](https://pexels.com) - Free stock photography
- [Lorem Picsum](https://picsum.photos) - Placeholder images
- [Wallhaven](https://wallhaven.cc) - Wallpaper community

## 📞 Support

If you have any questions or need help:

1. **Check the documentation** in this README
2. **Look at existing issues** on GitHub
3. **Create a new issue** if needed
4. **Join discussions** in the repository

---

**Made with ❤️ for the developer community**

⭐ **Star this repository if you found it helpful!**