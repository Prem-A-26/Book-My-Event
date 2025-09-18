// enhanced-seed.js
const bcrypt = require('bcrypt');
const db = require('./db');

// Clear existing data
db.exec(`
  DELETE FROM bookings;
  DELETE FROM movies;
  DELETE FROM users;
`);

// Movie data from listings.html
const movies = [
  { title: "3 Idiots", genre: "Bollywood", poster: "https://images.justwatch.com/poster/115370120/s718/3-idiots.jpg", description: "Comedy-drama film about three friends and their college adventures", showtimes: JSON.stringify(['10:00', '14:00', '18:00', '21:00']) },
  { title: "Dangal", genre: "Bollywood", poster: "https://upload.wikimedia.org/wikipedia/en/9/99/Dangal_Poster.jpg", description: "Biographical sports drama about wrestler Mahavir Singh Phogat", showtimes: JSON.stringify(['10:30', '14:30', '18:30', '21:30']) },
  { title: "PK", genre: "Bollywood", poster: "https://m.media-amazon.com/images/M/MV5BMTYzOTE2NjkxN15BMl5BanBnXkFtZTgwMDgzMTg0MzE@._V1_FMjpg_UX1000_.jpg", description: "Comedy-drama about an alien who comes to Earth", showtimes: JSON.stringify(['11:00', '15:00', '19:00', '22:00']) },
  { title: "Chennai Express", genre: "Bollywood", poster: "https://images.jdmagicbox.com/comp/jd_social/news/2018jul31/image-176481-00ip909joy.jpg", description: "Action comedy film with Shah Rukh Khan and Deepika Padukone", showtimes: JSON.stringify(['10:00', '13:30', '17:00', '20:30']) },
  { title: "Jawan", genre: "Bollywood", poster: "https://upload.wikimedia.org/wikipedia/en/3/39/Jawan_film_poster.jpg", description: "Action thriller starring Shah Rukh Khan", showtimes: JSON.stringify(['10:15', '14:15', '18:15', '21:45']) },
  { title: "Gully Boy", genre: "Bollywood", poster: "https://play-lh.googleusercontent.com/O7qMiw4gPMeVAgJlOU4XGVslbwIWd8Af5QZzEYhzzCo-yW-1rOFdviPubixeUzuVfwE6X3jIeSukUZPrZXM", description: "Musical drama inspired by the lives of street rappers", showtimes: JSON.stringify(['11:30', '15:30', '19:30', '22:30']) },
  { title: "Barfi!", genre: "Bollywood", poster: "https://upload.wikimedia.org/wikipedia/en/2/2e/Barfi%21_poster.jpg", description: "Comedy-drama about a deaf-mute boy and his relationships", showtimes: JSON.stringify(['10:45', '14:45', '18:45', '21:15']) },
  { title: "Andhadhun", genre: "Bollywood", poster: "https://m.media-amazon.com/images/I/71Zk8KSESoL._UF1000,1000_QL80_.jpg", description: "Thriller about a blind pianist", showtimes: JSON.stringify(['12:00', '16:00', '20:00', '23:00']) },
  
  { title: "Enthiran (Robot)", genre: "Kollywood", poster: "https://m.media-amazon.com/images/S/pv-target-images/7ee9fd58538fb2a4bfc46f7bfe6f90daa5025ad810d4814c335671a047e93070.jpg", description: "Science fiction film starring Rajinikanth", showtimes: JSON.stringify(['10:00', '14:00', '18:00', '21:30']) },
  { title: "Vikram", genre: "Kollywood", poster: "https://upload.wikimedia.org/wikipedia/en/5/59/Vikram_soundtrack.jpg", description: "Action thriller directed by Lokesh Kanagaraj", showtimes: JSON.stringify(['10:30', '14:30', '18:30', '22:00']) },
  { title: "Master", genre: "Kollywood", poster: "https://upload.wikimedia.org/wikipedia/en/5/53/Master_2021_poster.jpg", description: "Action thriller starring Vijay", showtimes: JSON.stringify(['11:00', '15:00', '19:00', '22:30']) },
  { title: "Coolie", genre: "Kollywood", poster: "https://dvvy6louqcr7j.cloudfront.net/vista/HO00016031/heroPoster/coolie.png", description: "Upcoming action film starring Rajinikanth", showtimes: JSON.stringify(['10:15', '14:15', '18:15', '21:45']) },
  
  { title: "Baahubali: The Beginning", genre: "Tollywood", poster: "https://m.media-amazon.com/images/S/pv-target-images/274431b8945f779acab499a1625c2a3c9ebe1054d112aed3e55cd89c7d2ce41c.jpg", description: "Epic historical fiction film", showtimes: JSON.stringify(['09:30', '13:30', '17:30', '21:00']) },
  { title: "Baahubali 2: The Conclusion", genre: "Tollywood", poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBuYrIAaGyfgshDDOikkfzkwsFuCqc9gfe9A&s", description: "Epic conclusion to the Baahubali saga", showtimes: JSON.stringify(['09:45', '13:45', '17:45', '21:15']) },
  { title: "RRR", genre: "Tollywood", poster: "https://upload.wikimedia.org/wikipedia/en/thumb/d/d7/RRR_Poster.jpg/250px-RRR_Poster.jpg", description: "Period action drama directed by S.S. Rajamouli", showtimes: JSON.stringify(['10:00', '14:00', '18:00', '21:30']) },
  { title: "Pushpa: The Rise", genre: "Tollywood", poster: "https://upload.wikimedia.org/wikipedia/en/7/75/Pushpa_-_The_Rise_%282021_film%29.jpg", description: "Action drama starring Allu Arjun", showtimes: JSON.stringify(['10:30', '14:30', '18:30', '22:00']) },
  
  { title: "Inception", genre: "Hollywood", poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXWnBnPN47nWvqWJAxw-vmchKc_2u1zkG6Bw&s", description: "Mind-bending sci-fi thriller directed by Christopher Nolan", showtimes: JSON.stringify(['11:00', '15:00', '19:00', '22:30']) },
  { title: "The Dark Knight", genre: "Hollywood", poster: "https://upload.wikimedia.org/wikipedia/en/8/83/Dark_knight_rises_poster.jpg", description: "Superhero film starring Christian Bale as Batman", showtimes: JSON.stringify(['10:15', '14:15', '18:15', '21:45']) },
  { title: "Interstellar", genre: "Hollywood", poster: "https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg", description: "Space epic directed by Christopher Nolan", showtimes: JSON.stringify(['10:00', '14:00', '18:00', '21:30']) },
  { title: "Avatar: The Way of Water", genre: "Hollywood", poster: "https://upload.wikimedia.org/wikipedia/en/5/54/Avatar_The_Way_of_Water_poster.jpg", description: "Sequel to the groundbreaking Avatar film", showtimes: JSON.stringify(['09:30', '13:30', '17:30', '21:00']) },
  
  { title: "Music Fest 2025", genre: "Events", poster: "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2", description: "Annual music festival featuring top artists", showtimes: JSON.stringify(['18:00', '19:30', '21:00']) },
  { title: "Stand-up Comedy Night", genre: "Events", poster: "https://img.freepik.com/premium-photo/comedy-night-poster-template-with-microphone-stage-lights_1302-28554.jpg", description: "Hilarious comedy show with top comedians", showtimes: JSON.stringify(['19:00', '21:00']) },
  { title: "Classical Music Evening", genre: "Events", poster: "https://images.unsplash.com/photo-1511379938547-c1f69419868d", description: "An evening of beautiful classical music performances", showtimes: JSON.stringify(['18:30', '20:30']) },
  { title: "Art Exhibition", genre: "Events", poster: "https://static.vecteezy.com/system/resources/previews/024/261/446/non_2x/art-posters-for-the-exhibition-magazine-or-cover-template-with-sculpture-art-antique-statues-geometric-background-modern-ancient-greek-or-roman-style-neo-nostalgia-banner-vector.jpg", description: "Contemporary art exhibition featuring local artists", showtimes: JSON.stringify(['10:00', '14:00', '16:00']) }
];

// Insert movies into database
const stmt = db.prepare('INSERT INTO movies (title, genre, poster, description, showtimes) VALUES (?, ?, ?, ?, ?)');
movies.forEach(movie => {
  stmt.run(movie.title, movie.genre, movie.poster, movie.description, movie.showtimes);
});

// Create a test user
(async () => {
  try {
    const hashed = await bcrypt.hash('password123', 10);
    db.prepare('INSERT INTO users (name, email, password) VALUES (?, ?, ?)')
      .run('Test User', 'test@test.com', hashed);
    
    // Create a few more test users
    const hashed2 = await bcrypt.hash('demo123', 10);
    db.prepare('INSERT INTO users (name, email, password) VALUES (?, ?, ?)')
      .run('Demo User', 'demo@example.com', hashed2);
    
    const hashed3 = await bcrypt.hash('admin123', 10);
    db.prepare('INSERT INTO users (name, email, password) VALUES (?, ?, ?)')
      .run('Admin User', 'admin@bookmyevent.com', hashed3);
    
    console.log('✅ Database seeded successfully!');
    console.log(`📽️  ${movies.length} movies/events added`);
    console.log('👥 3 test users created:');
    console.log('   - test@test.com / password123');
    console.log('   - demo@example.com / demo123');
    console.log('   - admin@bookmyevent.com / admin123');
    
    // Create some sample bookings for demo
    const testUserId = db.prepare('SELECT id FROM users WHERE email = ?').get('test@test.com').id;
    const sampleMovieId = db.prepare('SELECT id FROM movies WHERE title = ?').get('Inception').id;
    
    db.prepare(`
      INSERT INTO bookings (movie_id, seats, showtime, total_price, user_id)
      VALUES (?, ?, ?, ?, ?)
    `).run(sampleMovieId, JSON.stringify(['A1', 'A2']), '19:00', 500.00, testUserId);
    
    console.log('🎟️  Sample booking created for test user');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    process.exit(0);
  }
})();