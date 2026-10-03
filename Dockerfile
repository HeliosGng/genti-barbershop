# Stage 1: Build the Vite React Frontend
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency definition files
COPY package*.json ./

# Install all dependencies (build tools & dev dependencies)
RUN npm install

# Copy application source code
COPY . .

# Run production build (outputs to /app/dist)
RUN npm run build

# Stage 2: Production Server Runner for Google Cloud Run
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=8080

# Copy dependency definitions and install production-only dependencies
COPY package*.json ./
RUN npm install --omit=dev

# Copy compiled frontend assets from builder stage
COPY --from=builder /app/dist ./dist

# Copy production Express web server
COPY server.js ./

# Cloud Run default port
EXPOSE 8080

# Start production server
CMD ["node", "server.js"]
