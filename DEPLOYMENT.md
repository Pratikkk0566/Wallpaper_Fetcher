# 🚀 Deployment Guide

This guide covers different ways to deploy the Wallpaper Aggregator application.

## 📋 Prerequisites

- Node.js 18+ installed
- Git installed
- Basic command line knowledge

## 🏠 Local Production Deployment

### 1. Clone and Setup
```bash
git clone https://github.com/yourusername/wallpaper-aggregator.git
cd wallpaper-aggregator
npm run install-all
```

### 2. Environment Configuration
```bash
# Copy and edit environment file
cp .env.example .env
```

Edit `.env`:
```bash
PORT=4003
NODE_ENV=production
UNSPLASH_ACCESS_KEY=your_key_here
PEXELS_API_KEY=your_key_here
```

### 3. Build and Start
```bash
npm run build
npm start
```

## ☁️ Cloud Deployment Options

### Heroku Deployment

1. **Install Heroku CLI**
2. **Create Heroku App**
   ```bash
   heroku create your-wallpaper-app
   ```

3. **Set Environment Variables**
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set UNSPLASH_ACCESS_KEY=your_key
   heroku config:set PEXELS_API_KEY=your_key
   ```

4. **Deploy**
   ```bash
   git push heroku main
   ```

### Vercel Deployment

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel --prod
   ```

3. **Configure Environment Variables** in Vercel dashboard

### Railway Deployment

1. **Connect GitHub Repository** to Railway
2. **Set Environment Variables** in Railway dashboard
3. **Deploy automatically** on git push

### DigitalOcean App Platform

1. **Create new App** in DigitalOcean
2. **Connect GitHub repository**
3. **Configure build settings**:
   - Build Command: `npm run build`
   - Run Command: `npm start`

## 🐳 Docker Deployment

### Dockerfile
```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY client/package*.json ./client/

# Install dependencies
RUN npm install
RUN cd client && npm install

# Copy source code
COPY . .

# Build frontend
RUN npm run build

# Expose port
EXPOSE 4003

# Start application
CMD ["npm", "start"]
```

### Docker Compose
```yaml
version: '3.8'
services:
  wallpaper-app:
    build: .
    ports:
      - "4003:4003"
    environment:
      - NODE_ENV=production
      - PORT=4003
    volumes:
      - ./server/database:/app/server/database
```

### Build and Run
```bash
docker build -t wallpaper-aggregator .
docker run -p 4003:4003 wallpaper-aggregator
```

## 🌐 Nginx Configuration

### Reverse Proxy Setup
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:4003;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 🔒 SSL/HTTPS Setup

### Using Certbot (Let's Encrypt)
```bash
# Install certbot
sudo apt install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d your-domain.com

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

## 📊 Production Monitoring

### PM2 Process Manager
```bash
# Install PM2
npm install -g pm2

# Start application
pm2 start server/index.js --name wallpaper-app

# Save PM2 configuration
pm2 save
pm2 startup
```

### Environment Variables for PM2
```javascript
// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'wallpaper-aggregator',
    script: 'server/index.js',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 4003
    }
  }]
};
```

## 🗄️ Database Considerations

### SQLite in Production
- Suitable for small to medium applications
- Automatic backups recommended
- Consider read replicas for high traffic

### Backup Strategy
```bash
# Create backup script
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
cp server/database/wallpapers.db backups/wallpapers_$DATE.db

# Add to crontab for daily backups
0 2 * * * /path/to/backup-script.sh
```

## 🔧 Performance Optimization

### Frontend Optimization
- Enable gzip compression
- Use CDN for static assets
- Implement image lazy loading
- Minify CSS and JavaScript

### Backend Optimization
- Enable response compression
- Implement caching headers
- Use database indexing
- Monitor memory usage

### Nginx Optimization
```nginx
# Enable gzip compression
gzip on;
gzip_types text/plain text/css application/json application/javascript;

# Enable caching
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

## 📈 Scaling Considerations

### Horizontal Scaling
- Use load balancer (Nginx, HAProxy)
- Multiple application instances
- Shared database or database clustering

### Vertical Scaling
- Increase server resources
- Optimize database queries
- Implement caching (Redis)

## 🚨 Troubleshooting

### Common Issues

**Port Already in Use**
```bash
# Find process using port
lsof -i :4003
# Kill process
kill -9 <PID>
```

**Database Permissions**
```bash
# Fix database permissions
chmod 664 server/database/wallpapers.db
chown www-data:www-data server/database/wallpapers.db
```

**Memory Issues**
```bash
# Increase Node.js memory limit
node --max-old-space-size=4096 server/index.js
```

## 📝 Deployment Checklist

- [ ] Environment variables configured
- [ ] Database initialized
- [ ] SSL certificate installed
- [ ] Firewall configured
- [ ] Monitoring setup
- [ ] Backup strategy implemented
- [ ] Performance testing completed
- [ ] Error logging configured

## 🆘 Support

If you encounter deployment issues:
1. Check the logs for error messages
2. Verify environment variables
3. Test locally first
4. Create a GitHub issue with deployment details

Happy deploying! 🚀