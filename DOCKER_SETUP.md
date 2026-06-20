# Docker Setup Guide

This project includes Docker configuration for easy deployment and development.

## Prerequisites

- Docker (v20.10+)
- Docker Compose (v2.0+)
- Git

## Development with Docker

### 1. Start All Services

```bash
docker-compose up -d
```

This starts:
- MongoDB (port 27017)
- Backend API (port 3001)
- Frontend App (port 3000)

### 2. View Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f mongodb
```

### 3. Stop Services

```bash
docker-compose down
```

### 4. Rebuild Images

```bash
docker-compose up -d --build
```

## Environment Configuration

### Backend Env Variables

Edit `backend/.env.development` or `backend/.env.production`:

```env
MONGODB_URI=mongodb://admin:password@mongodb:27017/startupx-nft?authSource=admin
NODE_ENV=development
JWT_SECRET=your-secret-key
CONTRACT_ADDRESS=0x0000000000000000000000000000000000000000
NETWORK=sepolia
CORS_ORIGIN=http://localhost:3000
```

### Frontend Env Variables

The frontend gets API URL from `docker-compose.yml`:

```yaml
environment:
  REACT_APP_API_URL: http://localhost:3001
```

## Database Access

```bash
# Connect to MongoDB
docker-compose exec mongodb mongosh -u admin -p password startupx-nft
```

## Production Deployment

### Build Images

```bash
docker build -f backend/Dockerfile -t startupx-backend:1.0.0 .
docker build -f frontend/Dockerfile -t startupx-frontend:1.0.0 .
```

### Push to Registry

```bash
docker tag startupx-backend:1.0.0 your-registry/startupx-backend:1.0.0
docker tag startupx-frontend:1.0.0 your-registry/startupx-frontend:1.0.0

docker push your-registry/startupx-backend:1.0.0
docker push your-registry/startupx-frontend:1.0.0
```

### Deploy to Server

```bash
# On your server
ssh user@server.com
cd /app/startupx-nft

# Update docker-compose.yml with production images
# Then:
docker-compose up -d
```

## Troubleshooting

### Port Already in Use

```bash
# Find process using port 3000
lsof -i :3000

# Kill process
kill -9 <PID>
```

### Database Connection Issues

```bash
# Check MongoDB logs
docker-compose logs mongodb

# Restart MongoDB
docker-compose restart mongodb
```

### Clear Everything

```bash
docker-compose down -v
docker system prune -a
```

## Development Workflow

### Watch Mode

```bash
# Backend watches for changes
docker-compose exec backend npm run dev
```

### Access Services

- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- MongoDB: mongodb://admin:password@localhost:27017

## CI/CD Integration

The `.github/workflows/deploy.yml` automates:
- Running tests on pull requests
- Building Docker images on main branch push
- Pushing to Docker registry
- Deploying to production server

Set these secrets in GitHub:
- `DOCKER_USERNAME`
- `DOCKER_PASSWORD`
- `DEPLOY_HOST`
- `DEPLOY_USER`
- `DEPLOY_KEY`
