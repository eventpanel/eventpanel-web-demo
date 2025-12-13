.PHONY: install build dev start clean help up

# Default target
help:
	@echo "EventPanel Demo - Available commands:"
	@echo ""
	@echo "  make install    - Install all dependencies"
	@echo "  make build      - Build frontend and backend"
	@echo "  make dev        - Start development servers (frontend + backend)"
	@echo "  make start      - Start production server"
	@echo "  make clean      - Remove build artifacts"
	@echo ""

# Install all dependencies
install:
	@echo "📦 Installing root dependencies..."
	npm install
	@echo "📦 Installing frontend dependencies..."
	cd frontend && npm install
	@echo "✅ All dependencies installed!"

# Build everything
build:
	@echo "🔨 Building backend..."
	cd backend && npm run build
	@echo "🔨 Building frontend..."
	cd frontend && npm run build
	@echo "✅ Build complete!"

# Development mode - runs both servers
dev:
	@echo "🚀 Starting development servers..."
	@echo "   Backend:  http://localhost:3005"
	@echo "   Frontend: http://localhost:5173"
	@echo ""
	@trap 'kill 0' EXIT; \
	(cd backend && npm run start:dev) & \
	(cd frontend && npm run dev) & \
	wait

# Production start
start: build
	@echo "🚀 Starting production server on http://localhost:3005"
	npm start

# Clean build artifacts
clean:
	@echo "🧹 Cleaning..."
	rm -rf backend/dist
	rm -rf frontend/dist
	@echo "✅ Clean complete!"

# Quick setup - install + build + dev
up: install build dev

