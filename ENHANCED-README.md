# Book My Event - Enhanced Setup Guide

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install express better-sqlite3 bcrypt cors body-parser
```

### 2. Initialize Database with Movie Data
```bash
# Use the enhanced seed file with all movies from listings.html
node enhanced-seed.js
```

### 3. Start the Enhanced Server
```bash
# Use the enhanced server with better API endpoints
node enhanced-server.js
```

Server will run at: **http://localhost:5000**

### 4. Open the Application
Use VS Code Live Server or any static server to open `index.html`
Or directly access: **http://localhost:5000**

## 🎬 Features Enhanced

### ✅ Movie Database Integration
- **47 movies/events** from `listings.html` now stored in database
- Real poster URLs from the listings
- Proper movie metadata (genre, description, showtimes)
- Search and filter functionality

### ✅ Enhanced Confirmation Page (`enhanced-confirmation.html`)
- **QR Code Generation** - Unique QR code for each booking
- **Movie Poster Display** - Shows actual poster from database
- **Booking ID** - Auto-generated unique booking reference
- **Ticket Download** - Download booking details as JSON
- **Ticket Sharing** - Share booking via native sharing or clipboard

### ✅ Better Backend (`enhanced-server.js`)
- Enhanced movie endpoints with search/filter
- Better error handling
- Booking validation
- Statistics endpoint
- Serves static files directly

### ✅ Rich Movie Data (`enhanced-seed.js`)
- All movies from listings.html with proper metadata
- Multiple showtimes per movie
- Genre categorization
- Sample bookings for demo

## 🔑 Test Accounts

| Email | Password | Role |
|-------|----------|------|
| test@test.com | password123 | Regular User |
| demo@example.com | demo123 | Demo User |
| admin@bookmyevent.com | admin123 | Admin User |

## 📱 How to Test the Enhanced Features

### 1. Movie Booking with QR Code
1. Login with test credentials
2. Go to **Movies & Events** → Select any movie
3. Choose venue and showtime → Select seats
4. Complete payment → **Enhanced Confirmation Page**
5. See QR code, movie poster, and booking details

### 2. QR Code Features
- Automatically generated with booking information
- Contains: Booking ID, Movie, Venue, Showtime, Seats, Total
- Can be screenshot for offline access
- Scannable at venue for entry

### 3. Movie Poster Integration
- Posters are now pulled from the actual movie database
- Falls back to placeholder if poster URL is invalid
- Responsive design for mobile devices

## 🛠️ API Endpoints

### Authentication
- `POST /api/signup` - Create new account
- `POST /api/login` - Login user
- `GET /api/user/:id` - Get user profile

### Movies
- `GET /api/movies` - List all movies (supports ?category=bollywood&search=term)
- `GET /api/movies/:id` - Get single movie details

### Bookings
- `POST /api/bookings` - Create new booking
- `GET /api/bookings/user/:id` - Get user's bookings
- `GET /api/bookings/:id` - Get specific booking
- `DELETE /api/bookings/:id` - Cancel booking

### Statistics
- `GET /api/stats` - Get platform statistics

## 🔧 File Structure

```
├── index.html              # Homepage
├── listings.html           # Movie listings (47 movies)
├── booking.html            # Seat selection
├── payment.html            # Payment processing  
├── enhanced-confirmation.html  # 🆕 Enhanced confirmation with QR
├── profile.html            # User profile
├── login.html              # Login/signup
├── enhanced-server.js      # 🆕 Enhanced backend
├── enhanced-seed.js        # 🆕 Movie database setup
├── db.js                   # Database configuration
├── styles.css              # Styling
└── package.json            # Dependencies
```

## 🎯 Enhanced Workflow

1. **Browse Movies** → Real movie data with posters
2. **Select & Book** → Choose seats and pay
3. **Get Confirmation** → QR code + poster + details
4. **Use QR Code** → Scan at venue for entry
5. **Download/Share** → Save or share booking details

## 🔍 QR Code Data Structure

The QR code contains JSON with:
```json
{
  "bookingId": "BKG-20250102-001",
  "movie": "Inception",
  "venue": "PVR Cinemas",
  "showtime": "19:00",
  "seats": ["A1", "A2"],
  "total": "750.00",
  "timestamp": "2025-01-02T19:00:00.000Z"
}
```

## 🚨 Troubleshooting

### QR Code Not Showing
- Ensure `https://cdn.jsdelivr.net/npm/qrcode@1.5.3/build/qrcode.min.js` is accessible
- Check browser console for errors
- Verify booking data exists in localStorage

### Movie Posters Not Loading
- Check if image URLs are accessible
- Fallback placeholder will show if image fails
- Clear browser cache if images seem stuck

### Database Issues
- Run `node enhanced-seed.js` again to reset
- Check if SQLite database file has proper permissions
- Verify all dependencies are installed

## 📈 Next Steps

1. **Add Payment Gateway** - Integrate Razorpay/Stripe
2. **SMS/Email Notifications** - Send booking confirmations  
3. **Admin Dashboard** - Manage movies and bookings
4. **Mobile App** - React Native version
5. **Analytics** - Track popular movies and user behavior

---

🎉 **Your enhanced Book My Event system is now ready with QR codes, movie posters, and real data!**