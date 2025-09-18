# Let's create the missing db.js file for database configuration
db_config = '''// db.js - Database configuration for Book My Event

const Database = require('better-sqlite3');
const path = require('path');

// Create database file in current directory
const dbPath = path.join(__dirname, 'bookmyevent.db');

// Initialize database with better-sqlite3
const db = new Database(dbPath);

// Enable WAL mode for better performance
db.pragma('journal_mode = WAL');

// Create tables if they don't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS movies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    genre TEXT,
    poster TEXT,
    description TEXT,
    showtimes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    movie_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    seats TEXT NOT NULL,
    showtime TEXT NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    booked_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (movie_id) REFERENCES movies (id),
    FOREIGN KEY (user_id) REFERENCES users (id)
  );

  CREATE INDEX IF NOT EXISTS idx_bookings_user ON bookings(user_id);
  CREATE INDEX IF NOT EXISTS idx_bookings_movie ON bookings(movie_id);
`);

console.log('✅ Database initialized successfully');

module.exports = db;
'''

with open('db.js', 'w') as f:
    f.write(db_config)

print("✅ Created db.js - Database configuration file")