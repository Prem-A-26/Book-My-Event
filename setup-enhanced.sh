#!/bin/bash

# Quick setup script for Book My Event Enhanced System

echo "🎬 Setting up Book My Event Enhanced System..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm found"

# Install dependencies
echo "📦 Installing dependencies..."
npm install express better-sqlite3 bcrypt cors body-parser

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

# Seed the database
echo "🌱 Seeding database with movie data..."
node enhanced-seed.js

if [ $? -eq 0 ]; then
    echo "✅ Database seeded successfully"
else
    echo "❌ Failed to seed database"
    exit 1
fi

# Create a simple start script
cat > start-enhanced.sh << 'EOF'
#!/bin/bash
echo "🚀 Starting Book My Event Enhanced Server..."
node enhanced-server.js
EOF

chmod +x start-enhanced.sh

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "📋 Test Accounts:"
echo "   Email: test@test.com | Password: password123"
echo "   Email: demo@example.com | Password: demo123"  
echo "   Email: admin@bookmyevent.com | Password: admin123"
echo ""
echo "🚀 To start the server:"
echo "   ./start-enhanced.sh"
echo "   OR"
echo "   node enhanced-server.js"
echo ""
echo "🌐 Then open: http://localhost:5000"
echo ""
echo "✨ Enhanced Features:"
echo "   ✅ QR Code generation on booking confirmation"
echo "   ✅ Real movie posters from database"
echo "   ✅ 47 movies/events with metadata"
echo "   ✅ Download and share booking tickets"
echo "   ✅ Better API with search and filtering"
echo ""