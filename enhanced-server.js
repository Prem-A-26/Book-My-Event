// enhanced-server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const path = require('path');
const db = require('./db');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname)));

const PORT = process.env.PORT || 5000;

// ---------- AUTH ENDPOINTS ----------

// SIGNUP
app.post('/api/signup', async (req, res) => {
  const { name, email, password } = req.body || {};
  
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const hashed = await bcrypt.hash(password, 10);
    const info = db.prepare('INSERT INTO users (name, email, password) VALUES (?, ?, ?)')
      .run(name, email, hashed);
    
    const user = db.prepare('SELECT id, name, email FROM users WHERE id = ?').get(info.lastInsertRowid);
    res.json(user);
  } catch (e) {
    if (e.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      res.status(400).json({ error: 'Email already exists' });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});

// LOGIN
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body || {};
  
  if (!email || !password) {
    return res.status(400).json({ error: 'Missing email or password' });
  }

  try {
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
    
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    
    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid password' });
    }

    // Return user without password
    res.json({ 
      id: user.id, 
      name: user.name, 
      email: user.email 
    });
  } catch (e) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET USER PROFILE
app.get('/api/user/:id', (req, res) => {
  try {
    const user = db.prepare('SELECT id, name, email FROM users WHERE id = ?').get(req.params.id);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (e) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ---------- MOVIES ENDPOINTS ----------

// GET ALL MOVIES
app.get('/api/movies', (req, res) => {
  try {
    const { category, search } = req.query;
    let query = 'SELECT * FROM movies';
    let params = [];

    if (category || search) {
      query += ' WHERE 1=1';
      
      if (category && category !== 'all') {
        query += ' AND LOWER(genre) = LOWER(?)';
        params.push(category);
      }
      
      if (search) {
        query += ' AND (LOWER(title) LIKE LOWER(?) OR LOWER(description) LIKE LOWER(?))';
        params.push(`%${search}%`, `%${search}%`);
      }
    }

    query += ' ORDER BY title ASC';
    
    const movies = db.prepare(query).all(...params);
    
    // Parse showtimes JSON for each movie
    const moviesWithParsedShowtimes = movies.map(movie => ({
      ...movie,
      showtimes: JSON.parse(movie.showtimes || '[]')
    }));

    res.json(moviesWithParsedShowtimes);
  } catch (e) {
    console.error('Error fetching movies:', e);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET SINGLE MOVIE
app.get('/api/movies/:id', (req, res) => {
  try {
    const movie = db.prepare('SELECT * FROM movies WHERE id = ?').get(req.params.id);
    
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    // Parse showtimes JSON
    movie.showtimes = JSON.parse(movie.showtimes || '[]');
    
    res.json(movie);
  } catch (e) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ---------- BOOKINGS ENDPOINTS ----------

// CREATE BOOKING
app.post('/api/bookings', (req, res) => {
  const { movie_id, seats, showtime, total_price, user_id } = req.body || {};
  
  if (!movie_id || !seats || !showtime || !total_price || !user_id) {
    return res.status(400).json({ 
      error: 'Missing required fields: movie_id, seats, showtime, total_price, user_id' 
    });
  }

  try {
    // Verify movie exists
    const movie = db.prepare('SELECT * FROM movies WHERE id = ?').get(movie_id);
    if (!movie) {
      return res.status(400).json({ error: 'Movie not found' });
    }

    // Verify user exists
    const user = db.prepare('SELECT id FROM users WHERE id = ?').get(user_id);
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    // Create booking
    const info = db.prepare(`
      INSERT INTO bookings (movie_id, seats, showtime, total_price, user_id)
      VALUES (?, ?, ?, ?, ?)
    `).run(movie_id, JSON.stringify(seats), showtime, total_price, user_id);
    
    // Get the created booking with movie details
    const booking = db.prepare(`
      SELECT b.*, m.title, m.poster, m.genre
      FROM bookings b
      LEFT JOIN movies m ON m.id = b.movie_id
      WHERE b.id = ?
    `).get(info.lastInsertRowid);

    // Parse seats JSON
    booking.seats = JSON.parse(booking.seats || '[]');
    
    res.json(booking);
  } catch (e) {
    console.error('Error creating booking:', e);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET USER BOOKINGS
app.get('/api/bookings/user/:id', (req, res) => {
  try {
    const bookings = db.prepare(`
      SELECT b.id, b.movie_id, b.seats, b.showtime, b.total_price, b.booked_at,
             m.title, m.poster, m.genre, m.description
      FROM bookings b
      LEFT JOIN movies m ON m.id = b.movie_id
      WHERE b.user_id = ?
      ORDER BY b.booked_at DESC
    `).all(req.params.id);

    // Parse seats JSON for each booking
    const bookingsWithParsedSeats = bookings.map(booking => ({
      ...booking,
      seats: (() => {
        try {
          return JSON.parse(booking.seats || '[]');
        } catch (e) {
          return booking.seats; // Return as-is if not valid JSON
        }
      })()
    }));

    res.json(bookingsWithParsedSeats);
  } catch (e) {
    console.error('Error fetching user bookings:', e);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// CANCEL BOOKING
app.delete('/api/bookings/:id', (req, res) => {
  try {
    const bookingId = req.params.id;
    const { user_id } = req.query; // Optional: verify ownership
    
    let query = 'SELECT id FROM bookings WHERE id = ?';
    let params = [bookingId];
    
    if (user_id) {
      query += ' AND user_id = ?';
      params.push(user_id);
    }
    
    const exists = db.prepare(query).get(...params);
    
    if (!exists) {
      return res.status(404).json({ error: 'Booking not found or access denied' });
    }

    db.prepare('DELETE FROM bookings WHERE id = ?').run(bookingId);
    res.json({ success: true, message: 'Booking cancelled successfully' });
  } catch (e) {
    console.error('Error cancelling booking:', e);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET BOOKING BY ID
app.get('/api/bookings/:id', (req, res) => {
  try {
    const booking = db.prepare(`
      SELECT b.*, m.title, m.poster, m.genre, m.description
      FROM bookings b
      LEFT JOIN movies m ON m.id = b.movie_id
      WHERE b.id = ?
    `).get(req.params.id);
    
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    // Parse seats JSON
    booking.seats = JSON.parse(booking.seats || '[]');
    
    res.json(booking);
  } catch (e) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ---------- STATISTICS ENDPOINTS ----------

// GET DASHBOARD STATS
app.get('/api/stats', (req, res) => {
  try {
    const totalMovies = db.prepare('SELECT COUNT(*) as count FROM movies').get().count;
    const totalUsers = db.prepare('SELECT COUNT(*) as count FROM users').get().count;
    const totalBookings = db.prepare('SELECT COUNT(*) as count FROM bookings').get().count;
    const totalRevenue = db.prepare('SELECT SUM(total_price) as revenue FROM bookings').get().revenue || 0;
    
    const popularMovies = db.prepare(`
      SELECT m.title, m.poster, COUNT(b.id) as booking_count
      FROM movies m
      LEFT JOIN bookings b ON m.id = b.movie_id
      GROUP BY m.id, m.title, m.poster
      ORDER BY booking_count DESC
      LIMIT 5
    `).all();

    res.json({
      totalMovies,
      totalUsers,
      totalBookings,
      totalRevenue,
      popularMovies
    });
  } catch (e) {
    console.error('Error fetching stats:', e);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ---------- ERROR HANDLING ----------

// 404 handler for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({ error: 'API endpoint not found' });
});

// Default route for SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Book My Event Server running at http://localhost:${PORT}`);
  console.log('📚 Available endpoints:');
  console.log('   Authentication:');
  console.log('   - POST /api/signup');
  console.log('   - POST /api/login');
  console.log('   - GET  /api/user/:id');
  console.log('');
  console.log('   Movies:');
  console.log('   - GET  /api/movies');
  console.log('   - GET  /api/movies/:id');
  console.log('');
  console.log('   Bookings:');
  console.log('   - POST   /api/bookings');
  console.log('   - GET    /api/bookings/user/:id');
  console.log('   - GET    /api/bookings/:id');
  console.log('   - DELETE /api/bookings/:id');
  console.log('');
  console.log('   Statistics:');
  console.log('   - GET  /api/stats');
  console.log('');
  console.log('💡 Test credentials:');
  console.log('   Email: test@test.com');
  console.log('   Password: password123');
});