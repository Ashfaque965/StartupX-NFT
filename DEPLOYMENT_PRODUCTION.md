# StartupX NFT - Production Deployment Guide

## Pre-Deployment Checklist

- [ ] Environment variables configured
- [ ] Database connection verified
- [ ] Smart contracts deployed to chosen network
- [ ] SSL/TLS certificates obtained
- [ ] Domain configured and DNS pointing to server

## Environment Setup

### Backend Configuration

Create `backend/.env.production`:

```env
# Server
PORT=3001
NODE_ENV=production

# Database - Use MongoDB Atlas for production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/startupx-nft?retryWrites=true&w=majority

# Security
JWT_SECRET=your_very_secure_random_secret_key_minimum_32_chars

# Blockchain
NETWORK=mainnet
CONTRACT_ADDRESS=0x_your_deployed_contract_address

# CORS
CORS_ORIGIN=https://yourdomain.com

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## Deployment Methods

### Option 1: Docker Compose (Recommended)

```bash
# Pull latest images
docker pull your-registry/startupx-backend:latest
docker pull your-registry/startupx-frontend:latest

# Update docker-compose.yml
# Set NODE_ENV=production
# Update database credentials
# Update CORS_ORIGIN

# Deploy
docker-compose -f docker-compose.yml up -d
```

### Option 2: Kubernetes

```bash
# Apply manifests
kubectl apply -f k8s/namespace.yml
kubectl apply -f k8s/configmap.yml
kubectl apply -f k8s/secrets.yml
kubectl apply -f k8s/mongodb.yml
kubectl apply -f k8s/backend.yml
kubectl apply -f k8s/frontend.yml
kubectl apply -f k8s/ingress.yml

# Check deployment
kubectl get pods -n startupx
```

### Option 3: Manual Server Deployment

```bash
# SSH to server
ssh user@production.domain.com

# Clone repository
git clone https://github.com/your-org/startupx-nft.git
cd startupx-nft

# Install dependencies
npm install

# Backend
cd backend
npm install
npm run build
screen -S backend -d -m npm start

# Frontend
cd ../frontend
npm install
npm run build
# Serve with Nginx or similar

# Start Nginx
sudo systemctl start nginx
```

## Nginx Configuration

Create `/etc/nginx/sites-available/startupx`:

```nginx
upstream backend {
    server localhost:3001;
}

server {
    listen 80;
    listen [::]:80;
    server_name yourdomain.com www.yourdomain.com;

    # Redirect to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;

    # SSL Certificates (use Let's Encrypt)
    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    # Frontend
    location / {
        root /var/www/startupx-nft/frontend/build;
        try_files $uri $uri/ /index.html;
        expires 1d;
        add_header Cache-Control "public, immutable";
    }

    # Backend API
    location /api/ {
        proxy_pass http://backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Enable site:
```bash
sudo ln -s /etc/nginx/sites-available/startupx /etc/nginx/sites-enabled/
sudo systemctl reload nginx
```

## SSL/TLS Setup with Let's Encrypt

```bash
# Install Certbot
sudo apt-get install certbot python3-certbot-nginx

# Get certificate
sudo certbot certonly --nginx -d yourdomain.com -d www.yourdomain.com

# Auto-renewal
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer
```

## Database Backup Strategy

```bash
# MongoDB Atlas automatic backups are included
# Or use manual backups:

# Backup
mongodump --uri="mongodb+srv://username:password@cluster.mongodb.net/startupx-nft" --out=/backups/startupx-$(date +%Y%m%d)

# Restore
mongorestore --uri="mongodb+srv://username:password@cluster.mongodb.net/startupx-nft" /backups/startupx-20231201
```

## Monitoring and Logging

### PM2 (Process Manager)

```bash
# Install
npm install -g pm2

# Start backend with PM2
cd backend
pm2 start server.js --name startupx-backend
pm2 save

# Monitor
pm2 monit

# Logs
pm2 logs startupx-backend
```

### Log Aggregation

```bash
# Using Winston (already in backend/server.js)
# Logs are written to console and can be piped to external services

# View logs
docker-compose logs -f backend

# Send to external service
# Configure Winston transports in backend/server.js
```

## Security Hardening

### Database Security
- Use MongoDB Atlas with IP whitelist
- Enable authentication
- Use separate user accounts for different environments

### API Security
- Enable rate limiting (already configured)
- Use HTTPS only
- Add CORS whitelist

### Smart Contract Security
- Contracts should be audited before mainnet deployment
- Use OpenZeppelin verified libraries

## Scaling Considerations

### Horizontal Scaling
```bash
# Use load balancer (e.g., Nginx, HAProxy)
# Deploy multiple backend instances
# Use MongoDB Atlas for database
```

### Performance Optimization
- Enable caching for static assets
- Use CDN for frontend assets
- Implement database indexes
- Use connection pooling

## Disaster Recovery

### Regular Backups
- Database: Daily backups to AWS S3
- Code: Version control on GitHub
- Secrets: Encrypted backup of env variables

### Recovery Plan
1. Restore from latest backup
2. Verify database integrity
3. Run smoke tests
4. Monitor for 24 hours

## Post-Deployment Verification

```bash
# Test API endpoints
curl -X GET https://yourdomain.com/api/auth/me

# Check frontend
curl -I https://yourdomain.com

# Check DNS
nslookup yourdomain.com

# Verify SSL
curl -I https://yourdomain.com | grep -i ssl

# Monitor logs
docker-compose logs -f
```

## Troubleshooting

### High Memory Usage
```bash
docker stats
docker-compose logs backend | grep -i memory
```

### Database Connection Issues
```bash
# Test connection
mongodb://username:password@host:27017/startupx-nft

# Check MongoDB status
docker-compose logs mongodb
```

### API Response Times
```bash
# Monitor performance
docker-compose logs backend | grep "Response time"

# Check if database is the bottleneck
db.startupx-nft.stats()
```
