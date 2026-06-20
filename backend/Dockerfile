# Stage 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

# Copy root package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy backend
COPY backend ./backend

# Copy contracts
COPY contracts ./contracts

# Copy hardhat config
COPY hardhat.config.js ./

WORKDIR /app/backend

# Stage 2: Runtime
FROM node:18-alpine

WORKDIR /app/backend

# Install production dependencies only
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/backend .
COPY --from=builder /app/contracts ../contracts
COPY --from=builder /app/hardhat.config.js ../

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

USER nodejs

EXPOSE 3001

CMD ["node", "server.js"]
