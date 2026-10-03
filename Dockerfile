# Stage 1: Build the Vite React Frontend
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency definition files
COPY package*.json ./

# Install dependencies (including devDependencies required for vite build)
RUN npm ci

# Copy source code and assets
COPY . .

# Run production build (outputs to /app/dist)
RUN npm run build

# Stage 2: Production Server Runner for Google Cloud Run
FROM node:20-alpine AS runner

WORKDIR /app

# Set production environment
ENV NODE_ENV=production
ENV PORT=8080

# Install production-only dependencies for minimal container size and fast startup
COPY package*.json ./
RUN npm ci --omit=dev

# Copy built web application from builder stage
COPY --from=builder /app/dist ./dist

# Copy production Express web server
COPY server.js ./

# Cloud Run defaults to port 8080
EXPOSE 8080

# Run production server
CMD ["node", "server.js"]
