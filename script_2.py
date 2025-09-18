# Create package.json file with all necessary dependencies
package_json = '''{
  "name": "book-my-event",
  "version": "1.0.0",
  "description": "Movie and Event Booking Application with QR Codes",
  "main": "enhanced-server.js",
  "scripts": {
    "start": "node enhanced-server.js",
    "seed": "node enhanced-seed.js",
    "dev": "node enhanced-server.js",
    "setup": "npm install && node enhanced-seed.js"
  },
  "keywords": [
    "movie",
    "booking",
    "events",
    "qr-code",
    "tickets"
  ],
  "author": "Prem Lawrence",
  "license": "MIT",
  "dependencies": {
    "express": "^4.18.2",
    "better-sqlite3": "^8.7.0",
    "bcrypt": "^5.1.1",
    "cors": "^2.8.5",
    "body-parser": "^1.20.2"
  },
  "engines": {
    "node": ">=14.0.0"
  }
}'''

with open('package.json', 'w') as f:
    f.write(package_json)

print("✅ Created package.json with all dependencies")