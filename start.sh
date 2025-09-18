#!/bin/bash

# Book My Event Backend Startup Script

echo "🎬 Starting Book My Event Backend..."
echo ""

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

# Check if database is seeded
if [ ! -f "bookmyevent.db" ]; then
    echo "🌱 Setting up database..."
    node enhanced-seed.js
    echo ""
fi

# Start the server
echo "🚀 Starting server on http://localhost:5000"
echo ""
echo "💡 Test Accounts:"
echo "   Email: test@test.com | Password: password123"
echo "   Email: demo@example.com | Password: demo123"
echo ""
echo "Press Ctrl+C to stop the server"
echo "=" * 50

node enhanced-server.js
