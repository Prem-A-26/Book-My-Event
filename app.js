// Book My Event - Movie Booking Application with QR Codes
class BookMyEventApp {
    constructor() {
        this.currentUser = null;
        this.currentBooking = {};
        this.movies = {};
        this.events = [];
        this.venues = [];
        this.seatCategories = {};
        this.showtimes = [];
        this.init();
    }

    init() {
        this.loadApplicationData();
        this.checkUserSession();
        this.setupEventListeners();
        this.loadHomePage();
        this.loadQRCodeLibrary();
    }

    loadQRCodeLibrary() {
        // Load QR Code library
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/qrcode@1.5.3/build/qrcode.min.js';
        script.onerror = () => {
            console.warn('QR Code library failed to load, using fallback');
        };
        document.head.appendChild(script);
    }

    loadApplicationData() {
        // Load exact movie data from provided JSON
        this.movies = {
            "bollywood": [
                {"id": 1, "title": "3 Idiots", "img": "https://images.justwatch.com/poster/115370120/s718/3-idiots.jpg", "category": "bollywood", "rating": 4.5, "duration": "170 min", "genre": "Comedy/Drama", "language": "Hindi", "synopsis": "Two friends are searching for their long lost companion. They revisit their college days and recall the memories of their friend who inspired them to think differently, even as the rest of the world called them idiots."},
                {"id": 2, "title": "Dangal", "img": "https://upload.wikimedia.org/wikipedia/en/9/99/Dangal_Poster.jpg", "category": "bollywood", "rating": 4.4, "duration": "161 min", "genre": "Biography/Drama", "language": "Hindi", "synopsis": "Former wrestler Mahavir Singh Phogat and his two wrestler daughters struggle towards glory at the Commonwealth Games in the face of societal oppression."},
                {"id": 3, "title": "PK", "img": "https://m.media-amazon.com/images/M/MV5BMTYzOTE2NjkxN15BMl5BanBnXkFtZTgwMDgzMTg0MzE@._V1_FMjpg_UX1000_.jpg", "category": "bollywood", "rating": 4.3, "duration": "153 min", "genre": "Comedy/Drama", "language": "Hindi", "synopsis": "An alien on Earth loses the only device he can use to communicate with his spaceship. His innocent nature and child-like questions force the country to evaluate the impact of religion on its people."},
                {"id": 4, "title": "Chennai Express", "img": "https://images.jdmagicbox.com/comp/jd_social/news/2018jul31/image-176481-00ip909joy.jpg", "category": "bollywood", "rating": 4.0, "duration": "141 min", "genre": "Comedy/Action", "language": "Hindi", "synopsis": "A man travels to Chennai to fulfill his grandfather's last wish. However, he gets caught up in unwanted problems when he falls for a don's daughter."},
                {"id": 5, "title": "Jawan", "img": "https://upload.wikimedia.org/wikipedia/en/3/39/Jawan_film_poster.jpg", "category": "bollywood", "rating": 4.2, "duration": "169 min", "genre": "Action/Thriller", "language": "Hindi", "synopsis": "A high-octane action thriller that outlines the emotional journey of a man who is set to rectify the wrongs in the society."},
                {"id": 6, "title": "Gully Boy", "img": "https://play-lh.googleusercontent.com/O7qMiw4gPMeVAgJlOU4XGVslbwIWd8Af5QZzEYhzzCo-yW-1rOFdviPubixeUzuVfwE6X3jIeSukUZPrZXM", "category": "bollywood", "rating": 4.1, "duration": "153 min", "genre": "Drama/Music", "language": "Hindi", "synopsis": "A street rapper from the slums of Mumbai realizes his dream of becoming a rapper."},
                {"id": 7, "title": "Barfi!", "img": "https://upload.wikimedia.org/wikipedia/en/2/2e/Barfi%21_poster.jpg", "category": "bollywood", "rating": 4.2, "duration": "151 min", "genre": "Comedy/Drama", "language": "Hindi", "synopsis": "Three young people learn that love can neither be defined nor contained by society's definition of normal and abnormal."},
                {"id": 8, "title": "Andhadhun", "img": "https://m.media-amazon.com/images/I/71Zk8KSESoL._UF1000,1000_QL80_.jpg", "category": "bollywood", "rating": 4.3, "duration": "139 min", "genre": "Thriller/Comedy", "language": "Hindi", "synopsis": "A series of mysterious events change the life of a blind pianist who now must report a crime that was actually never witnessed by him."}
            ],
            "kollywood": [
                {"id": 9, "title": "Enthiran (Robot)", "img": "https://m.media-amazon.com/images/S/pv-target-images/7ee9fd58538fb2a4bfc46f7bfe6f90daa5025ad810d4814c335671a047e93070.jpg", "category": "kollywood", "rating": 4.0, "duration": "155 min", "genre": "Sci-Fi/Action", "language": "Tamil", "synopsis": "A scientist creates a robot in his deceased father's image which becomes a threat when a rival scientist manipulates it to wreak havoc."},
                {"id": 10, "title": "Vikram", "img": "https://upload.wikimedia.org/wikipedia/en/5/59/Vikram_soundtrack.jpg", "category": "kollywood", "rating": 4.4, "duration": "174 min", "genre": "Action/Thriller", "language": "Tamil", "synopsis": "A black-ops agent goes in search of his missing colleagues who were involved in a top-secret mission."},
                {"id": 11, "title": "Master", "img": "https://upload.wikimedia.org/wikipedia/en/5/53/Master_2021_poster.jpg", "category": "kollywood", "rating": 4.1, "duration": "179 min", "genre": "Action/Thriller", "language": "Tamil", "synopsis": "An alcoholic professor is sent to a juvenile facility to teach the inmates, where he clashes with a gangster who uses the facility to recruit child criminals."},
                {"id": 12, "title": "Coolie", "img": "https://dvvy6louqcr7j.cloudfront.net/vista/HO00016031/heroPoster/coolie.png", "category": "kollywood", "rating": 3.9, "duration": "165 min", "genre": "Action/Comedy", "language": "Tamil", "synopsis": "A railway station coolie fights against corruption and injustice in his community."},
                {"id": 13, "title": "Kabali", "img": "https://m.media-amazon.com/images/S/pv-target-images/d83f1b72cf5e89666330aa2f04468274e3c1eb7214c7b6a75c8b85f5a0577b90.jpg", "category": "kollywood", "rating": 3.8, "duration": "153 min", "genre": "Action/Crime", "language": "Tamil", "synopsis": "A reformed gangster is released from prison and attempts to protect his family from his former associates."},
                {"id": 14, "title": "Kaala", "img": "https://m.media-amazon.com/images/M/MV5BY2JlN2E2NjQtYTFkYi00NGM4LThlM2YtZTgwYjMwYzE3MTQ3XkEyXkFqcGc@._V1_.jpg", "category": "kollywood", "rating": 3.7, "duration": "166 min", "genre": "Action/Drama", "language": "Tamil", "synopsis": "A don in Dharavi fights for the rights of the poor against a powerful politician who wants to redevelop the slum."},
                {"id": 15, "title": "Petta", "img": "https://cinematrace.com/wp-content/uploads/2019/01/petta-2019.jpg?w=691", "category": "kollywood", "rating": 4.0, "duration": "171 min", "genre": "Action/Comedy", "language": "Tamil", "synopsis": "A hostel warden becomes the target of a dreaded politician and his gangster son, but little do they realise that it is they who should fear him."},
                {"id": 16, "title": "Soorarai Pottru", "img": "https://m.media-amazon.com/images/S/pv-target-images/5477c845aff1cfa4c7e50babecf3179af3a7ad43a63dfb549d62d284ffced92f.jpg", "category": "kollywood", "rating": 4.5, "duration": "149 min", "genre": "Drama/Biography", "language": "Tamil", "synopsis": "Inspired by the book Simply Fly, this is the story of Nedumaaran Rajangam known to friends as Maara, the son of a teacher, who sets out to make the common man fly and in the process takes on the world's most capital intensive industry."}
            ],
            "tollywood": [
                {"id": 17, "title": "Baahubali: The Beginning", "img": "https://m.media-amazon.com/images/S/pv-target-images/274431b8945f779acab499a1625c2a3c9ebe1054d112aed3e55cd89c7d2ce41c.jpg", "category": "tollywood", "rating": 4.3, "duration": "159 min", "genre": "Action/Drama", "language": "Telugu", "synopsis": "In the kingdom of Mahishmati, Shivudu falls in love with a young warrior woman. While trying to woo her, he learns about the conflict-ridden past of his family and his true legacy."},
                {"id": 18, "title": "Baahubali 2: The Conclusion", "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBuYrIAaGyfgshDDOikkfzkwsFuCqc9gfe9A&s", "category": "tollywood", "rating": 4.5, "duration": "167 min", "genre": "Action/Drama", "language": "Telugu", "synopsis": "When Shiva, the son of Bahubali, learns about his heritage, he begins to look for answers. His story is juxtaposed with past events that unfolded in the Mahishmati Kingdom."},
                {"id": 19, "title": "RRR", "img": "https://upload.wikimedia.org/wikipedia/en/thumb/d/d7/RRR_Poster.jpg/250px-RRR_Poster.jpg", "category": "tollywood", "rating": 4.6, "duration": "187 min", "genre": "Action/Drama", "language": "Telugu", "synopsis": "A fictitious story about two legendary revolutionaries and their journey away from home before they started fighting for their country in 1920s."},
                {"id": 20, "title": "Pushpa: The Rise", "img": "https://upload.wikimedia.org/wikipedia/en/7/75/Pushpa_-_The_Rise_%282021_film%29.jpg", "category": "tollywood", "rating": 4.2, "duration": "179 min", "genre": "Action/Crime", "language": "Telugu", "synopsis": "A labourer named Pushpa makes enemies as he rises in the world of red sandalwood smuggling. However, violence erupts when the police attempt to bring down his illegal business."},
                {"id": 21, "title": "Arjun Reddy", "img": "https://upload.wikimedia.org/wikipedia/en/1/18/Arjun_Reddy_%28soundtrack%29.jpg", "category": "tollywood", "rating": 4.1, "duration": "182 min", "genre": "Romance/Drama", "language": "Telugu", "synopsis": "Arjun Reddy Deshmukh is a house surgeon at Osmania Medical College. Arjun is also a short-tempered person who gets into fights very easily. Preethi joins the college and Arjun falls in love with her."},
                {"id": 22, "title": "Maharshi", "img": "https://images.justwatch.com/poster/327436002/s718/maharshi.jpg", "category": "tollywood", "rating": 3.9, "duration": "176 min", "genre": "Drama/Family", "language": "Telugu", "synopsis": "A successful businessman gets stuck between his love for family and his love for the country when he is called back to serve his nation."},
                {"id": 23, "title": "Ala Vaikunthapurramuloo", "img": "https://upload.wikimedia.org/wikipedia/en/2/28/Ala_Vaikunthapurramuloo.jpeg", "category": "tollywood", "rating": 4.0, "duration": "165 min", "genre": "Action/Drama", "language": "Telugu", "synopsis": "After growing up enduring criticism from his father, a young man finds his world shaken upon learning he was switched at birth with a millionaire's son."},
                {"id": 24, "title": "Sarkaru Vaari Paata", "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3q5VZMWrqcNuTIYHukEKiiD9tS0eiLSkfmw&s", "category": "tollywood", "rating": 3.8, "duration": "162 min", "genre": "Action/Drama", "language": "Telugu", "synopsis": "A young man fights against corruption and injustice to help his love interest and her family."}
            ],
            "hollywood": [
                {"id": 25, "title": "Inception", "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXWnBnPN47nWvqWJAxw-vmchKc_2u1zkG6Bw&s", "category": "hollywood", "rating": 4.6, "duration": "148 min", "genre": "Sci-Fi/Thriller", "language": "English", "synopsis": "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O."},
                {"id": 26, "title": "The Dark Knight", "img": "https://upload.wikimedia.org/wikipedia/en/8/83/Dark_knight_rises_poster.jpg", "category": "hollywood", "rating": 4.7, "duration": "152 min", "genre": "Action/Crime", "language": "English", "synopsis": "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice."},
                {"id": 27, "title": "Interstellar", "img": "https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg", "category": "hollywood", "rating": 4.5, "duration": "169 min", "genre": "Sci-Fi/Drama", "language": "English", "synopsis": "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival."},
                {"id": 28, "title": "The Matrix", "img": "https://static.wikia.nocookie.net/matrix/images/5/56/The_Matrix_digital_release_cover.jpg", "category": "hollywood", "rating": 4.4, "duration": "136 min", "genre": "Sci-Fi/Action", "language": "English", "synopsis": "A computer programmer is led to fight an underground war against powerful computers who have constructed his entire reality with a system called the Matrix."},
                {"id": 29, "title": "Avatar: The Way of Water", "img": "https://upload.wikimedia.org/wikipedia/en/5/54/Avatar_The_Way_of_Water_poster.jpg", "category": "hollywood", "rating": 4.2, "duration": "192 min", "genre": "Sci-Fi/Adventure", "language": "English", "synopsis": "Jake Sully lives with his newfound family formed on the extrasolar moon Pandora. Once a familiar threat returns to finish what was previously started, Jake must work with Neytiri and the army of the Na'vi race to protect their home."},
                {"id": 30, "title": "Top Gun: Maverick", "img": "https://upload.wikimedia.org/wikipedia/en/thumb/1/13/Top_Gun_Maverick_Poster.jpg/250px-Top_Gun_Maverick_Poster.jpg", "category": "hollywood", "rating": 4.3, "duration": "131 min", "genre": "Action/Drama", "language": "English", "synopsis": "After thirty years, Maverick is still pushing the envelope as a top naval aviator, but must confront ghosts of his past when he leads TOP GUN's elite graduates on a mission that demands the ultimate sacrifice from those chosen to fly it."},
                {"id": 31, "title": "Jurassic World", "img": "https://upload.wikimedia.org/wikipedia/en/6/6e/Jurassic_World_poster.jpg", "category": "hollywood", "rating": 4.0, "duration": "124 min", "genre": "Adventure/Sci-Fi", "language": "English", "synopsis": "A new theme park, built on the original site of Jurassic Park, creates a genetically modified hybrid dinosaur, which escapes containment and goes on a killing spree."},
                {"id": 32, "title": "Gladiator", "img": "https://upload.wikimedia.org/wikipedia/en/f/fb/Gladiator_%282000_film_poster%29.png", "category": "hollywood", "rating": 4.4, "duration": "155 min", "genre": "Action/Drama", "language": "English", "synopsis": "A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery."}
            ]
        };

        this.events = [
            {"id": 101, "title": "Music Fest 2025", "img": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4", "category": "events", "duration": "8 hours", "genre": "Music Festival", "rating": 4.2},
            {"id": 102, "title": "Stand-up Comedy Night", "img": "https://img.freepik.com/premium-photo/comedy-night-poster-template-with-microphone-stage-lights_1302-28554.jpg", "category": "events", "duration": "3 hours", "genre": "Comedy", "rating": 4.0},
            {"id": 103, "title": "Stage Drama — The Last Act", "img": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d", "category": "events", "duration": "2 hours", "genre": "Drama", "rating": 3.8},
            {"id": 104, "title": "Bollywood Retro Night", "img": "https://d2rvgzn8c26h0v.cloudfront.net/retro-bollywood-night1713597691547.webp", "category": "events", "duration": "5 hours", "genre": "Music/Dance", "rating": 4.1},
            {"id": 105, "title": "Indie Film Showcase", "img": "https://images.unsplash.com/photo-1489599510733-4af7f8bd1eba", "category": "events", "duration": "4 hours", "genre": "Film Festival", "rating": 3.9}
        ];

        this.venues = [
            {"id": 1, "name": "PVR Cinemas Phoenix Mall", "location": "Whitefield, Bangalore", "screens": 6},
            {"id": 2, "name": "INOX Forum Mall", "location": "Koramangala, Bangalore", "screens": 8},
            {"id": 3, "name": "Cinepolis Nexus Mall", "location": "Koramangala, Bangalore", "screens": 7},
            {"id": 4, "name": "Multiplex Mantri Square", "location": "Malleshwaram, Bangalore", "screens": 5},
            {"id": 5, "name": "PVR Orion Mall", "location": "Rajajinagar, Bangalore", "screens": 9}
        ];

        this.seatCategories = {
            "rearSilver": {"price": 150, "color": "#6c757d", "label": "Rear Silver", "count": 50},
            "premium": {"price": 250, "color": "#007bff", "label": "Premium", "count": 50},
            "recliner": {"price": 400, "color": "#d4af37", "label": "Recliner", "count": 50}
        };

        this.showtimes = ["10:00 AM", "1:30 PM", "5:00 PM", "8:30 PM", "11:00 PM"];
    }

    setupEventListeners() {
        // Search functionality
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
        }

        // Filter listeners
        const languageFilter = document.getElementById('languageFilter');
        const genreFilter = document.getElementById('genreFilter');
        if (languageFilter) languageFilter.addEventListener('change', () => this.applyFilters());
        if (genreFilter) genreFilter.addEventListener('change', () => this.applyFilters());

        // Password strength checker
        this.setupPasswordValidation();

        // Click outside to close dropdowns
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.user-menu')) {
                this.hideUserDropdown();
            }
            if (!e.target.closest('.auth-form-container') && !e.target.closest('button[onclick*="showAuthPage"]')) {
                this.hideAuthPageOnOutsideClick(e);
            }
        });

        // Escape key to close auth page
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.hideAuthPage();
            }
        });
    }

    hideAuthPageOnOutsideClick(e) {
        const authPage = document.getElementById('authPage');
        if (!authPage.classList.contains('hidden') && e.target === authPage) {
            this.hideAuthPage();
        }
    }

    setupPasswordValidation() {
        // Will setup when signup form is active
        setTimeout(() => {
            const passwordInput = document.querySelector('#signupForm input[name="password"]');
            if (passwordInput) {
                passwordInput.addEventListener('input', (e) => this.checkPasswordStrength(e.target.value));
            }
        }, 100);
    }

    checkPasswordStrength(password) {
        const strengthBar = document.querySelector('.strength-fill');
        const strengthText = document.querySelector('.strength-text');
        
        if (!strengthBar || !strengthText) return;

        let strength = 0;
        
        if (password.length >= 8) strength += 20;
        if (/[a-z]/.test(password)) strength += 20;
        if (/[A-Z]/.test(password)) strength += 20;
        if (/\d/.test(password)) strength += 20;
        if (/[@$!%*?&]/.test(password)) strength += 20;

        strengthBar.style.width = `${strength}%`;
        
        if (strength < 40) {
            strengthBar.style.backgroundColor = '#F44336';
            strengthText.textContent = 'Weak';
        } else if (strength < 80) {
            strengthBar.style.backgroundColor = '#FF9800';
            strengthText.textContent = 'Medium';
        } else {
            strengthBar.style.backgroundColor = '#4CAF50';
            strengthText.textContent = 'Strong';
        }
    }

    handleSearch(query) {
        if (!query.trim()) {
            this.loadFeaturedMovies();
            return;
        }

        const allMovies = Object.values(this.movies).flat();
        const allEvents = this.events;
        const allContent = [...allMovies, ...allEvents];
        
        const filteredContent = allContent.filter(item => 
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            (item.genre && item.genre.toLowerCase().includes(query.toLowerCase())) ||
            (item.language && item.language.toLowerCase().includes(query.toLowerCase()))
        );

        this.updateMovieGrid(filteredContent);
    }

    updateMovieGrid(items) {
        const containers = ['featuredMoviesGrid', 'allMoviesGrid'];
        containers.forEach(containerId => {
            const container = document.getElementById(containerId);
            if (container) {
                container.innerHTML = items.length > 0 
                    ? items.map(item => this.createMovieCard(item)).join('')
                    : '<div class="no-results"><i class="fas fa-film" style="font-size: 48px; margin-bottom: 16px; opacity: 0.3;"></i><br>No content found</div>';
            }
        });
    }

    checkUserSession() {
        const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
        if (user) {
            this.currentUser = user;
            this.updateAuthUI();
        }
    }

    updateAuthUI() {
        const authButtons = document.getElementById('authButtons');
        const userMenu = document.getElementById('userMenu');
        const userName = document.getElementById('userName');

        if (this.currentUser) {
            const loginBtn = authButtons.querySelector('#loginBtn');
            const signupBtn = authButtons.querySelector('#signupBtn');
            if (loginBtn) loginBtn.style.display = 'none';
            if (signupBtn) signupBtn.style.display = 'none';
            if (userMenu) userMenu.classList.remove('hidden');
            if (userName) {
                userName.textContent = this.currentUser.name.split(' ')[0];
            }
        } else {
            const loginBtn = authButtons.querySelector('#loginBtn');
            const signupBtn = authButtons.querySelector('#signupBtn');
            if (loginBtn) loginBtn.style.display = 'inline-flex';
            if (signupBtn) signupBtn.style.display = 'inline-flex';
            if (userMenu) userMenu.classList.add('hidden');
        }
    }

    toggleUserDropdown() {
        const dropdown = document.getElementById('userDropdown');
        if (dropdown) {
            dropdown.classList.toggle('hidden');
        }
    }

    hideUserDropdown() {
        const dropdown = document.getElementById('userDropdown');
        if (dropdown) {
            dropdown.classList.add('hidden');
        }
    }

    loadHomePage() {
        this.loadFeaturedMovies();
    }

    loadFeaturedMovies() {
        const container = document.getElementById('featuredMoviesGrid');
        if (!container) return;

        const allMovies = Object.values(this.movies).flat();
        const allEvents = this.events;
        const allContent = [...allMovies, ...allEvents];
        const featuredContent = allContent.sort((a, b) => b.rating - a.rating).slice(0, 12);

        container.innerHTML = featuredContent.map(item => this.createMovieCard(item)).join('');
    }

    createMovieCard(item) {
        const isEvent = item.category === 'events';
        return `
            <div class="movie-card" onclick="window.app.showMovieDetails(${item.id})">
                <img src="${item.img}" alt="${item.title}" class="movie-poster" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1489599510733-4af7f8bd1eba?w=300&h=400&fit=crop'">
                <div class="movie-info">
                    <h3 class="movie-title">${item.title}</h3>
                    <div class="movie-details">
                        <div class="movie-rating">
                            <i class="fas fa-star"></i>
                            ${item.rating}
                        </div>
                        <div class="movie-duration">${item.duration}</div>
                    </div>
                    <div class="movie-genre">${item.genre}</div>
                    <button class="book-now-btn" onclick="event.stopPropagation(); window.app.selectMovie(${item.id})">
                        <i class="fas fa-ticket-alt"></i> ${isEvent ? 'Book Event' : 'Book Now'}
                    </button>
                </div>
            </div>
        `;
    }

    filterMovies(category) {
        // Remove active class from all tabs
        document.querySelectorAll('.category-tab').forEach(tab => tab.classList.remove('active'));
        
        // Add active class to clicked tab
        const tabs = document.querySelectorAll('.category-tab');
        tabs.forEach(tab => {
            const tabText = tab.textContent.toLowerCase();
            if ((category === 'all' && tabText === 'all') ||
                (category === 'bollywood' && tabText === 'bollywood') ||
                (category === 'kollywood' && tabText === 'kollywood') ||
                (category === 'tollywood' && tabText === 'tollywood') ||
                (category === 'hollywood' && tabText === 'hollywood') ||
                (category === 'events' && tabText === 'events')) {
                tab.classList.add('active');
            }
        });

        const container = document.getElementById('featuredMoviesGrid');
        if (!container) return;

        let itemsToShow = [];
        if (category === 'all') {
            const allMovies = Object.values(this.movies).flat();
            itemsToShow = [...allMovies, ...this.events];
        } else if (category === 'events') {
            itemsToShow = this.events;
        } else {
            itemsToShow = this.movies[category] || [];
        }

        container.innerHTML = itemsToShow.map(item => this.createMovieCard(item)).join('');
    }

    applyFilters() {
        const languageFilter = document.getElementById('languageFilter')?.value;
        const genreFilter = document.getElementById('genreFilter')?.value;
        
        let allMovies = Object.values(this.movies).flat();
        
        if (languageFilter) {
            allMovies = allMovies.filter(movie => movie.language === languageFilter);
        }
        
        if (genreFilter) {
            allMovies = allMovies.filter(movie => movie.genre.includes(genreFilter));
        }

        this.updateMovieGrid(allMovies);
    }

    selectMovie(itemId) {
        this.currentBooking.movieId = itemId;
        this.showMovieDetails(itemId);
    }

    showMovieDetails(itemId) {
        const item = this.findItemById(itemId);
        if (!item) return;

        const isEvent = item.category === 'events';
        const content = document.getElementById('movieDetailsContent');
        content.innerHTML = `
            <div class="movie-details-container">
                <img src="${item.img}" alt="${item.title}" class="movie-poster-large" onerror="this.src='https://images.unsplash.com/photo-1489599510733-4af7f8bd1eba?w=300&h=400&fit=crop'">
                <div class="movie-info-detailed">
                    <h1>${item.title}</h1>
                    <div class="movie-meta">
                        <div class="meta-item">
                            <span class="meta-label">Rating</span>
                            <span class="meta-value">
                                <i class="fas fa-star" style="color: #ffc107;"></i>
                                ${item.rating}/5
                            </span>
                        </div>
                        <div class="meta-item">
                            <span class="meta-label">Duration</span>
                            <span class="meta-value">${item.duration}</span>
                        </div>
                        <div class="meta-item">
                            <span class="meta-label">Genre</span>
                            <span class="meta-value">${item.genre}</span>
                        </div>
                        ${!isEvent ? `
                        <div class="meta-item">
                            <span class="meta-label">Language</span>
                            <span class="meta-value">${item.language}</span>
                        </div>
                        ` : ''}
                    </div>
                    <div class="movie-synopsis">
                        <h3 style="color: #e63946; margin-bottom: 12px;">Synopsis</h3>
                        <p>${item.synopsis || 'An exciting experience that will captivate your attention.'}</p>
                    </div>
                    <button class="btn btn--primary btn--lg" onclick="window.app.proceedToBooking(${item.id})" style="margin-top: 24px;">
                        <i class="fas fa-ticket-alt"></i> ${isEvent ? 'Book Event' : 'Book Tickets'}
                    </button>
                </div>
            </div>
        `;

        this.showPage('movieDetails');
    }

    proceedToBooking(itemId) {
        if (!this.currentUser) {
            this.showToast('Please login to book tickets', 'error');
            this.showAuthPage();
            return;
        }

        this.currentBooking.movieId = itemId;
        this.showVenueSelection();
    }

    showVenueSelection() {
        const item = this.findItemById(this.currentBooking.movieId);
        const content = document.getElementById('venueSelectionContent');
        
        content.innerHTML = `
            <div class="venue-selection-header">
                <h2>Select Venue & Showtime for "${item.title}"</h2>
                <p style="color: rgba(255,255,255,0.7); margin-bottom: 32px;">Choose your preferred cinema and showtime</p>
            </div>
            <div class="venue-list">
                ${this.venues.map(venue => `
                    <div class="venue-item">
                        <div class="venue-header">
                            <div>
                                <div class="venue-name">${venue.name}</div>
                                <div class="venue-location">
                                    <i class="fas fa-map-marker-alt"></i> ${venue.location}
                                </div>
                            </div>
                            <div class="venue-screens">
                                <i class="fas fa-film"></i> ${venue.screens} Screens
                            </div>
                        </div>
                        <div class="showtimes">
                            ${this.showtimes.map(showtime => `
                                <button class="showtime-btn" onclick="window.app.selectShowtime(${venue.id}, '${showtime}')">
                                    ${showtime}
                                </button>
                            `).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
        `;

        this.showPage('venueSelection');
    }

    selectShowtime(venueId, time) {
        document.querySelectorAll('.showtime-btn').forEach(btn => btn.classList.remove('selected'));
        // Find the clicked button by matching venue and time
        const showtimeBtns = document.querySelectorAll('.showtime-btn');
        showtimeBtns.forEach(btn => {
            if (btn.textContent.trim() === time && btn.closest('.venue-item')) {
                btn.classList.add('selected');
            }
        });

        this.currentBooking.venueId = venueId;
        this.currentBooking.showtime = time;
        this.currentBooking.date = new Date().toISOString().split('T')[0];

        this.showToast('Showtime selected! Proceeding to seat selection...', 'success');
        setTimeout(() => this.showSeatSelection(), 1000);
    }

    showSeatSelection() {
        const item = this.findItemById(this.currentBooking.movieId);
        const venue = this.venues.find(v => v.id === this.currentBooking.venueId);
        
        const content = document.getElementById('seatSelectionContent');
        content.innerHTML = `
            <div class="seat-selection-header">
                <h2>Select Your Seats</h2>
                <p>${item.title} • ${venue.name} • ${this.currentBooking.showtime}</p>
            </div>
            <div class="seat-map-container">
                <div class="screen">🎬 SCREEN 🎬</div>
                <div class="cinema-hall">
                    ${this.generateSeatMap()}
                </div>
                <div class="seat-legend">
                    <div class="legend-item">
                        <div class="legend-color" style="background-color: #6c757d;"></div>
                        <span>Rear Silver - ₹150</span>
                    </div>
                    <div class="legend-item">
                        <div class="legend-color" style="background-color: #007bff;"></div>
                        <span>Premium - ₹250</span>
                    </div>
                    <div class="legend-item">
                        <div class="legend-color" style="background-color: #d4af37;"></div>
                        <span>Recliner - ₹400</span>
                    </div>
                    <div class="legend-item">
                        <div class="legend-color" style="background-color: #444;"></div>
                        <span>Booked</span>
                    </div>
                    <div class="legend-item">
                        <div class="legend-color" style="background-color: #e63946;"></div>
                        <span>Selected</span>
                    </div>
                </div>
            </div>
            <div class="selected-seats-info" id="selectedSeatsInfo">
                <div class="seat-summary">
                    <div class="summary-item">
                        <div class="summary-number" id="selectedSeatsCount">0</div>
                        <div class="summary-label">Seats Selected</div>
                    </div>
                    <div class="summary-item">
                        <div class="summary-number">₹<span id="selectedSeatsTotal">0</span></div>
                        <div class="summary-label">Total Amount</div>
                    </div>
                </div>
                <button class="btn btn--primary btn--lg" onclick="window.app.proceedToPayment()" disabled id="proceedBtn">
                    <i class="fas fa-arrow-right"></i> Proceed to Payment
                </button>
            </div>
        `;

        this.showPage('seatSelection');
    }

    generateSeatMap() {
        let seatMap = '';
        
        // Rear Silver (5 rows, 10 seats each)
        seatMap += `
            <div class="seat-category">
                <div class="category-header">
                    <div class="category-name">Rear Silver</div>
                    <div class="category-price rear-silver">₹150</div>
                </div>
                <div class="seat-rows">
        `;
        
        for (let row = 1; row <= 5; row++) {
            const rowLetter = String.fromCharCode(64 + row); // A, B, C, D, E
            seatMap += `<div class="seat-row">`;
            seatMap += `<div class="row-label">${rowLetter}</div>`;
            seatMap += `<div class="row-seats">`;
            
            for (let seat = 1; seat <= 10; seat++) {
                const seatId = `${rowLetter}${seat}`;
                const isBooked = Math.random() < 0.2; // 20% chance of being booked
                seatMap += `
                    <div class="seat rear-silver ${isBooked ? 'booked' : ''}" 
                         data-seat="${seatId}" 
                         data-type="rearSilver"
                         data-price="150"
                         onclick="window.app.toggleSeat(this)">
                        ${seat}
                    </div>
                `;
            }
            
            seatMap += `</div></div>`;
        }
        
        seatMap += `</div></div>`;
        
        // Premium (5 rows, 10 seats each)
        seatMap += `
            <div class="seat-category">
                <div class="category-header">
                    <div class="category-name">Premium</div>
                    <div class="category-price premium">₹250</div>
                </div>
                <div class="seat-rows">
        `;
        
        for (let row = 6; row <= 10; row++) {
            const rowLetter = String.fromCharCode(64 + row); // F, G, H, I, J
            seatMap += `<div class="seat-row">`;
            seatMap += `<div class="row-label">${rowLetter}</div>`;
            seatMap += `<div class="row-seats">`;
            
            for (let seat = 1; seat <= 10; seat++) {
                const seatId = `${rowLetter}${seat}`;
                const isBooked = Math.random() < 0.25; // 25% chance of being booked
                seatMap += `
                    <div class="seat premium ${isBooked ? 'booked' : ''}" 
                         data-seat="${seatId}" 
                         data-type="premium"
                         data-price="250"
                         onclick="window.app.toggleSeat(this)">
                        ${seat}
                    </div>
                `;
            }
            
            seatMap += `</div></div>`;
        }
        
        seatMap += `</div></div>`;
        
        // Recliner (5 rows, 10 seats each)
        seatMap += `
            <div class="seat-category">
                <div class="category-header">
                    <div class="category-name">Recliner</div>
                    <div class="category-price recliner">₹400</div>
                </div>
                <div class="seat-rows">
        `;
        
        for (let row = 11; row <= 15; row++) {
            const rowLetter = String.fromCharCode(64 + row); // K, L, M, N, O
            seatMap += `<div class="seat-row">`;
            seatMap += `<div class="row-label">${rowLetter}</div>`;
            seatMap += `<div class="row-seats">`;
            
            for (let seat = 1; seat <= 10; seat++) {
                const seatId = `${rowLetter}${seat}`;
                const isBooked = Math.random() < 0.15; // 15% chance of being booked
                seatMap += `
                    <div class="seat recliner ${isBooked ? 'booked' : ''}" 
                         data-seat="${seatId}" 
                         data-type="recliner"
                         data-price="400"
                         onclick="window.app.toggleSeat(this)">
                        ${seat}
                    </div>
                `;
            }
            
            seatMap += `</div></div>`;
        }
        
        seatMap += `</div></div>`;
        
        return seatMap;
    }

    toggleSeat(seatElement) {
        if (seatElement.classList.contains('booked')) return;

        const isSelected = seatElement.classList.contains('selected');
        const selectedSeats = document.querySelectorAll('.seat.selected');
        
        if (!isSelected && selectedSeats.length >= 6) {
            this.showToast('Maximum 6 seats can be selected', 'error');
            return;
        }
        
        if (isSelected) {
            seatElement.classList.remove('selected');
        } else {
            seatElement.classList.add('selected');
        }

        this.updateSelectedSeatsInfo();
    }

    updateSelectedSeatsInfo() {
        const selectedSeats = document.querySelectorAll('.seat.selected');
        const count = selectedSeats.length;
        const total = Array.from(selectedSeats).reduce((sum, seat) => {
            return sum + parseInt(seat.dataset.price);
        }, 0);

        const countEl = document.getElementById('selectedSeatsCount');
        const totalEl = document.getElementById('selectedSeatsTotal');
        const proceedBtn = document.getElementById('proceedBtn');

        if (countEl) countEl.textContent = count;
        if (totalEl) totalEl.textContent = total;
        if (proceedBtn) proceedBtn.disabled = count === 0;

        this.currentBooking.selectedSeats = Array.from(selectedSeats).map(seat => ({
            seatId: seat.dataset.seat,
            type: seat.dataset.type,
            price: parseInt(seat.dataset.price)
        }));
    }

    proceedToPayment() {
        if (!this.currentBooking.selectedSeats || this.currentBooking.selectedSeats.length === 0) {
            this.showToast('Please select at least one seat', 'error');
            return;
        }

        this.showPaymentPage();
    }

    showPaymentPage() {
        const item = this.findItemById(this.currentBooking.movieId);
        const venue = this.venues.find(v => v.id === this.currentBooking.venueId);
        
        const subtotal = this.currentBooking.selectedSeats.reduce((sum, seat) => sum + seat.price, 0);
        const convenienceFee = Math.ceil(subtotal * 0.05);
        const gst = Math.ceil((subtotal + convenienceFee) * 0.18);
        const total = subtotal + convenienceFee + gst;

        this.currentBooking.pricing = { subtotal, convenienceFee, gst, total };

        const content = document.getElementById('paymentContent');
        content.innerHTML = `
            <div class="payment-summary">
                <h3 style="color: #e63946; margin-bottom: 16px;">Booking Summary</h3>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
                    <div>
                        <strong>Title:</strong> ${item.title}<br>
                        <strong>Venue:</strong> ${venue.name}<br>
                        <strong>Date & Time:</strong> ${new Date(this.currentBooking.date).toLocaleDateString()} ${this.currentBooking.showtime}<br>
                        <strong>Seats:</strong> ${this.currentBooking.selectedSeats.map(s => s.seatId).join(', ')}
                    </div>
                    <div style="text-align: right;">
                        <div>Ticket Price: ₹${subtotal}</div>
                        <div>Convenience Fee: ₹${convenienceFee}</div>
                        <div>GST (18%): ₹${gst}</div>
                        <hr style="margin: 8px 0; border-color: #333;">
                        <div style="font-size: 18px; font-weight: bold; color: #e63946;">Total: ₹${total}</div>
                    </div>
                </div>
            </div>

            <div class="payment-methods">
                <div class="payment-method" onclick="window.app.selectPaymentMethod('card')">
                    <div class="payment-icon">💳</div>
                    <div class="payment-name">Credit/Debit Card</div>
                    <div class="payment-description">Visa, MasterCard, RuPay</div>
                </div>
                <div class="payment-method" onclick="window.app.selectPaymentMethod('upi')">
                    <div class="payment-icon">📱</div>
                    <div class="payment-name">UPI Payment</div>
                    <div class="payment-description">PhonePe, GPay, Paytm</div>
                </div>
                <div class="payment-method" onclick="window.app.selectPaymentMethod('netbanking')">
                    <div class="payment-icon">🏦</div>
                    <div class="payment-name">Net Banking</div>
                    <div class="payment-description">All major banks</div>
                </div>
            </div>

            <!-- Card Payment Form -->
            <div class="payment-form" id="cardForm">
                <h3 style="margin-bottom: 16px;">Card Details</h3>
                <form onsubmit="window.app.processPayment(event, 'card')">
                    <div class="form-group">
                        <label class="form-label">Card Number</label>
                        <input type="text" class="form-control" placeholder="1234 5678 9012 3456" pattern="[0-9\s]{13,19}" required>
                    </div>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                        <div class="form-group">
                            <label class="form-label">Expiry Date</label>
                            <input type="text" class="form-control" placeholder="MM/YY" pattern="[0-9]{2}/[0-9]{2}" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">CVV</label>
                            <input type="text" class="form-control" placeholder="123" pattern="[0-9]{3,4}" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Cardholder Name</label>
                        <input type="text" class="form-control" placeholder="Name on card" required>
                    </div>
                    <button type="submit" class="btn btn--primary btn--full-width btn--lg">
                        Pay ₹${total}
                    </button>
                </form>
            </div>

            <!-- UPI Payment Form -->
            <div class="payment-form" id="upiForm">
                <h3 style="margin-bottom: 16px;">UPI Payment</h3>
                <form onsubmit="window.app.processPayment(event, 'upi')">
                    <div class="form-group">
                        <label class="form-label">UPI ID</label>
                        <input type="text" class="form-control" placeholder="yourname@upi" pattern="[a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+" required>
                    </div>
                    <button type="submit" class="btn btn--primary btn--full-width btn--lg">
                        Pay ₹${total}
                    </button>
                </form>
            </div>

            <!-- Net Banking Form -->
            <div class="payment-form" id="netbankingForm">
                <h3 style="margin-bottom: 16px;">Net Banking</h3>
                <form onsubmit="window.app.processPayment(event, 'netbanking')">
                    <div class="form-group">
                        <label class="form-label">Select Bank</label>
                        <select class="form-control" required>
                            <option value="">Choose your bank</option>
                            <option value="sbi">State Bank of India</option>
                            <option value="hdfc">HDFC Bank</option>
                            <option value="icici">ICICI Bank</option>
                            <option value="axis">Axis Bank</option>
                            <option value="kotak">Kotak Mahindra Bank</option>
                        </select>
                    </div>
                    <button type="submit" class="btn btn--primary btn--full-width btn--lg">
                        Pay ₹${total}
                    </button>
                </form>
            </div>
        `;

        this.showPage('payment');
    }

    selectPaymentMethod(method) {
        document.querySelectorAll('.payment-method').forEach(el => el.classList.remove('selected'));
        // Find the clicked payment method
        const methods = document.querySelectorAll('.payment-method');
        methods.forEach(methodEl => {
            if ((method === 'card' && methodEl.textContent.includes('Credit/Debit')) ||
                (method === 'upi' && methodEl.textContent.includes('UPI')) ||
                (method === 'netbanking' && methodEl.textContent.includes('Net Banking'))) {
                methodEl.classList.add('selected');
            }
        });

        document.querySelectorAll('.payment-form').forEach(form => form.classList.remove('active'));
        const formEl = document.getElementById(method + 'Form');
        if (formEl) {
            formEl.classList.add('active');
        }
    }

    processPayment(event, method) {
        event.preventDefault();
        
        this.showLoading();
        
        // Simulate payment processing
        setTimeout(() => {
            this.hideLoading();
            
            // Generate booking ID and complete booking
            this.currentBooking.id = 'BME' + Date.now();
            this.currentBooking.paymentMethod = method;
            this.currentBooking.paymentId = 'pay_' + Date.now();
            this.currentBooking.bookingDate = new Date().toISOString();
            this.currentBooking.status = 'confirmed';
            this.currentBooking.userId = this.currentUser.id;

            // Save booking
            const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
            bookings.push(this.currentBooking);
            localStorage.setItem('bookings', JSON.stringify(bookings));

            this.showToast('Payment successful! Booking confirmed.', 'success');
            setTimeout(() => this.showConfirmation(), 1000);
        }, 2000);
    }

    async generateQRCode(data) {
        try {
            if (typeof QRCode !== 'undefined') {
                const qrCodeDataURL = await QRCode.toDataURL(data, {
                    width: 200,
                    margin: 2,
                    color: {
                        dark: '#000000',
                        light: '#FFFFFF'
                    }
                });
                return qrCodeDataURL;
            }
        } catch (error) {
            console.error('QR Code generation failed:', error);
        }
        
        // Fallback QR code placeholder
        const canvas = document.createElement('canvas');
        canvas.width = 200;
        canvas.height = 200;
        const ctx = canvas.getContext('2d');
        
        // Create a simple grid pattern as fallback
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, 200, 200);
        ctx.fillStyle = '#000000';
        
        for (let i = 0; i < 20; i++) {
            for (let j = 0; j < 20; j++) {
                if ((i + j) % 2 === 0) {
                    ctx.fillRect(i * 10, j * 10, 10, 10);
                }
            }
        }
        
        return canvas.toDataURL();
    }

    async showConfirmation() {
        const item = this.findItemById(this.currentBooking.movieId);
        const venue = this.venues.find(v => v.id === this.currentBooking.venueId);
        
        // Generate QR code data
        const qrData = JSON.stringify({
            bookingId: this.currentBooking.id,
            movieTitle: item.title,
            venue: venue.name,
            date: this.currentBooking.date,
            showtime: this.currentBooking.showtime,
            seats: this.currentBooking.selectedSeats.map(s => s.seatId).join(', '),
            total: this.currentBooking.pricing.total,
            userId: this.currentUser.id,
            userName: this.currentUser.name
        });
        
        const qrCodeImage = await this.generateQRCode(qrData);
        
        const content = document.getElementById('confirmationContent');
        content.innerHTML = `
            <div class="confirmation-card">
                <div class="success-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <h2 style="color: #4CAF50; margin-bottom: 24px; font-size: 32px;">Booking Confirmed!</h2>
                
                <div class="booking-reference">
                    <div class="reference-number">${this.currentBooking.id}</div>
                    <div class="reference-label">Booking Reference</div>
                </div>

                <div style="display: grid; grid-template-columns: 300px 1fr; gap: 32px; margin-bottom: 32px; align-items: start;">
                    <!-- Movie Poster -->
                    <div style="text-align: center;">
                        <img src="${item.img}" alt="${item.title}" style="width: 100%; max-width: 300px; border-radius: 12px; box-shadow: 0 8px 25px rgba(0,0,0,0.3); margin-bottom: 16px;" onerror="this.src='https://images.unsplash.com/photo-1489599510733-4af7f8bd1eba?w=300&h=400&fit=crop'">
                        <h3 style="color: white; margin: 0; font-size: 20px;">${item.title}</h3>
                    </div>
                    
                    <!-- Booking Details -->
                    <div style="background: rgba(255,255,255,0.05); padding: 24px; border-radius: 12px;">
                        <h3 style="margin-bottom: 20px; color: #e63946;">Booking Details</h3>
                        <div style="display: grid; gap: 12px;">
                            <div style="display: flex; justify-content: space-between;">
                                <span><i class="fas fa-film" style="width: 20px;"></i> Title:</span>
                                <span><strong>${item.title}</strong></span>
                            </div>
                            <div style="display: flex; justify-content: space-between;">
                                <span><i class="fas fa-map-marker-alt" style="width: 20px;"></i> Theatre:</span>
                                <span><strong>${venue.name}</strong></span>
                            </div>
                            <div style="display: flex; justify-content: space-between;">
                                <span><i class="fas fa-calendar" style="width: 20px;"></i> Date & Time:</span>
                                <span><strong>${new Date(this.currentBooking.date).toLocaleDateString()} ${this.currentBooking.showtime}</strong></span>
                            </div>
                            <div style="display: flex; justify-content: space-between;">
                                <span><i class="fas fa-couch" style="width: 20px;"></i> Seats:</span>
                                <span><strong>${this.currentBooking.selectedSeats.map(s => s.seatId).join(', ')}</strong></span>
                            </div>
                            <div style="display: flex; justify-content: space-between; font-size: 18px; padding-top: 12px; border-top: 1px solid rgba(255,255,255,0.2);">
                                <span><i class="fas fa-credit-card" style="width: 20px;"></i> Total Paid:</span>
                                <span style="color: #4CAF50; font-weight: bold;">₹${this.currentBooking.pricing.total}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- QR Code Section -->
                <div style="background: rgba(255,255,255,0.05); padding: 24px; border-radius: 12px; margin-bottom: 24px; text-align: center;">
                    <h3 style="margin-bottom: 16px; color: #e63946;">QR Code Ticket</h3>
                    <div style="display: inline-block; background: white; padding: 16px; border-radius: 12px; margin-bottom: 12px;">
                        <img src="${qrCodeImage}" alt="Booking QR Code" style="width: 200px; height: 200px;">
                    </div>
                    <p style="margin: 0; font-size: 14px; color: rgba(255,255,255,0.8);">
                        <i class="fas fa-qrcode" style="margin-right: 8px;"></i>
                        Show this QR code at the venue for entry
                    </p>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                    <button class="btn btn--outline" onclick="window.app.downloadTicket('${this.currentBooking.id}')">
                        <i class="fas fa-download"></i> Download Ticket
                    </button>
                    <button class="btn btn--primary" onclick="window.app.showPage('home'); window.app.currentBooking = {};">
                        <i class="fas fa-home"></i> Back to Home
                    </button>
                </div>
                
                <div style="margin-top: 24px; padding: 16px; background: rgba(76, 175, 80, 0.1); border: 1px solid rgba(76, 175, 80, 0.3); border-radius: 8px;">
                    <p style="margin: 0; font-size: 14px; color: rgba(255,255,255,0.9);">
                        <i class="fas fa-info-circle" style="color: #4CAF50; margin-right: 8px;"></i>
                        Your ticket has been sent to ${this.currentUser.email}. Please arrive 15 minutes before showtime.
                    </p>
                </div>
            </div>
        `;

        this.showPage('confirmation');
        this.currentBooking = {};
    }

    downloadTicket(bookingId) {
        if (!bookingId) {
            this.showToast('Ticket download will be available soon!', 'info');
            return;
        }
        
        // Create a simple ticket download simulation
        const booking = JSON.parse(localStorage.getItem('bookings') || '[]').find(b => b.id === bookingId);
        if (booking) {
            const item = this.findItemById(booking.movieId);
            const venue = this.venues.find(v => v.id === booking.venueId);
            
            // Create printable content
            const printContent = `
                <html>
                <head>
                    <title>Ticket - ${booking.id}</title>
                    <style>
                        body { font-family: Arial, sans-serif; margin: 20px; }
                        .ticket { border: 2px solid #e63946; border-radius: 8px; padding: 20px; max-width: 400px; }
                        .header { text-align: center; color: #e63946; margin-bottom: 20px; }
                        .details { margin-bottom: 10px; }
                        .qr-section { text-align: center; margin-top: 20px; }
                    </style>
                </head>
                <body>
                    <div class="ticket">
                        <div class="header">
                            <h2>BOOK MY EVENT</h2>
                            <h3>E-TICKET</h3>
                        </div>
                        <div class="details">
                            <strong>Booking ID:</strong> ${booking.id}<br>
                            <strong>Movie:</strong> ${item?.title}<br>
                            <strong>Theatre:</strong> ${venue?.name}<br>
                            <strong>Date:</strong> ${new Date(booking.date).toLocaleDateString()}<br>
                            <strong>Time:</strong> ${booking.showtime}<br>
                            <strong>Seats:</strong> ${booking.selectedSeats?.map(s => s.seatId).join(', ')}<br>
                            <strong>Total:</strong> ₹${booking.pricing?.total}
                        </div>
                        <div class="qr-section">
                            <p><strong>Show this ticket at the venue</strong></p>
                        </div>
                    </div>
                </body>
                </html>
            `;
            
            const printWindow = window.open('', '_blank');
            printWindow.document.write(printContent);
            printWindow.document.close();
            printWindow.print();
        }
        
        this.showToast('Opening print dialog for ticket...', 'info');
    }

    // Authentication methods
    showAuthPage(tab = 'login') {
        const authPage = document.getElementById('authPage');
        if (authPage) {
            authPage.classList.remove('hidden');
            this.switchAuthTab(tab);
            
            setTimeout(() => {
                const firstInput = authPage.querySelector('.auth-form.active input');
                if (firstInput) firstInput.focus();
            }, 100);
        }
    }

    hideAuthPage() {
        const authPage = document.getElementById('authPage');
        if (authPage) {
            authPage.classList.add('hidden');
            this.clearFormErrors();
        }
    }

    switchAuthTab(tab) {
        const tabs = document.querySelectorAll('.auth-tab');
        tabs.forEach(t => t.classList.remove('active'));
        
        if (tab === 'signup') {
            tabs[1]?.classList.add('active');
        } else {
            tabs[0]?.classList.add('active');
        }
        
        document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
        const formEl = document.getElementById(tab + 'Form');
        if (formEl) {
            formEl.classList.add('active');
            
            // Setup password validation for signup
            if (tab === 'signup') {
                setTimeout(() => {
                    const passwordInput = formEl.querySelector('input[name="password"]');
                    if (passwordInput) {
                        passwordInput.addEventListener('input', (e) => this.checkPasswordStrength(e.target.value));
                    }
                }, 100);
            }
        }
        
        this.clearFormErrors();
    }

    togglePassword(button) {
        const input = button.parentElement.querySelector('input');
        const icon = button.querySelector('i');
        
        if (input && icon) {
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.replace('fa-eye', 'fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.replace('fa-eye-slash', 'fa-eye');
            }
        }
    }

    clearFormErrors() {
        document.querySelectorAll('.field-error').forEach(error => {
            error.textContent = '';
        });
    }

    handleLogin(event) {
        event.preventDefault();
        this.clearFormErrors();
        
        const formData = new FormData(event.target);
        const email = formData.get('email')?.trim();
        const password = formData.get('password');
        
        if (!email || !password) {
            this.showToast('Please fill in all fields', 'error');
            return;
        }

        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            this.currentUser = user;
            localStorage.setItem('currentUser', JSON.stringify(user));
            
            this.updateAuthUI();
            this.hideAuthPage();
            this.showToast(`Welcome back, ${user.name.split(' ')[0]}!`, 'success');
        } else {
            this.showToast('Invalid email or password', 'error');
        }
    }

    handleSignup(event) {
        event.preventDefault();
        this.clearFormErrors();
        
        const formData = new FormData(event.target);
        const name = formData.get('name')?.trim();
        const email = formData.get('email')?.trim();
        const phone = formData.get('phone')?.trim();
        const password = formData.get('password');
        const confirmPassword = formData.get('confirmPassword');
        
        if (!name || !email || !phone || !password || !confirmPassword) {
            this.showToast('Please fill in all fields', 'error');
            return;
        }
        
        if (password !== confirmPassword) {
            this.showToast('Passwords do not match', 'error');
            return;
        }
        
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        if (users.some(u => u.email === email)) {
            this.showToast('Email already registered', 'error');
            return;
        }

        const user = {
            id: Date.now(),
            name: name,
            email: email,
            phone: phone,
            password: password,
            joinDate: new Date().toISOString()
        };

        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));

        this.currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        this.updateAuthUI();
        this.hideAuthPage();
        this.showToast(`Welcome to Book My Event, ${user.name.split(' ')[0]}!`, 'success');
    }

    showForgotPassword() {
        this.hideAuthPage();
        this.showModal('forgotPasswordModal');
    }

    handleForgotPassword(event) {
        event.preventDefault();
        this.showToast('Password reset link sent to your email!', 'success');
        this.closeModal('forgotPasswordModal');
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem('currentUser');
        this.updateAuthUI();
        this.hideUserDropdown();
        this.showToast('Logged out successfully', 'success');
        this.showPage('home');
        this.currentBooking = {};
    }

    // Profile management
    showProfile() {
        if (!this.currentUser) {
            this.showAuthPage();
            return;
        }

        const bookings = JSON.parse(localStorage.getItem('bookings') || '[]')
            .filter(booking => booking.userId === this.currentUser.id)
            .sort((a, b) => new Date(b.bookingDate) - new Date(a.bookingDate));

        const content = document.getElementById('profileContent');
        content.innerHTML = `
            <div class="profile-dashboard">
                <div class="profile-sidebar">
                    <div class="profile-avatar">
                        <div class="avatar-circle">
                            ${this.currentUser.name.charAt(0).toUpperCase()}
                        </div>
                        <div class="profile-name">${this.currentUser.name}</div>
                        <div class="profile-email">${this.currentUser.email}</div>
                    </div>
                    
                    <div class="profile-nav">
                        <div class="profile-nav-item active">
                            <i class="fas fa-ticket-alt"></i>
                            My Bookings
                        </div>
                    </div>
                </div>
                
                <div class="profile-content-area">
                    <h2 style="margin-bottom: 24px; color: white;">My Bookings</h2>
                    ${bookings.length > 0 ? `
                        <div>
                            ${bookings.map(booking => this.createBookingCard(booking)).join('')}
                        </div>
                    ` : '<div style="text-align: center; color: rgba(255,255,255,0.7); padding: 60px;"><i class="fas fa-ticket-alt" style="font-size: 48px; margin-bottom: 16px; opacity: 0.3;"></i><br>No bookings found.<br><button class="btn btn--primary" onclick="window.app.showPage(\'home\')" style="margin-top: 16px;">Book Now</button></div>'}
                </div>
            </div>
        `;

        this.showPage('profile');
    }

    createBookingCard(booking) {
        const item = this.findItemById(booking.movieId);
        const venue = this.venues.find(v => v.id === booking.venueId);
        
        return `
            <div style="background-color: #333; padding: 20px; border-radius: 8px; margin-bottom: 16px;">
                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 16px;">
                    <div style="display: flex; gap: 16px; align-items: center;">
                        <img src="${item?.img}" alt="${item?.title}" style="width: 60px; height: 80px; border-radius: 6px; object-fit: cover;" onerror="this.src='https://images.unsplash.com/photo-1489599510733-4af7f8bd1eba?w=60&h=80&fit=crop'">
                        <div>
                            <div style="font-size: 18px; font-weight: bold; color: white; margin-bottom: 4px;">${item?.title || 'Movie'}</div>
                            <div style="color: rgba(255, 255, 255, 0.7); font-size: 14px;">
                                <i class="fas fa-map-marker-alt"></i> ${venue?.name || 'Theatre'}, ${venue?.location || 'Location'}
                            </div>
                        </div>
                    </div>
                    <div style="font-size: 18px; font-weight: bold; color: #e63946;">₹${booking.pricing?.total || 0}</div>
                </div>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 16px; margin-bottom: 16px;">
                    <div>
                        <div style="font-size: 12px; color: rgba(255, 255, 255, 0.7); text-transform: uppercase; letter-spacing: 0.5px;">Date & Time</div>
                        <div style="color: white; font-weight: 500;">${new Date(booking.date).toLocaleDateString()} ${booking.showtime}</div>
                    </div>
                    <div>
                        <div style="font-size: 12px; color: rgba(255, 255, 255, 0.7); text-transform: uppercase; letter-spacing: 0.5px;">Seats</div>
                        <div style="color: white; font-weight: 500;">${booking.selectedSeats?.map(s => s.seatId).join(', ') || 'N/A'}</div>
                    </div>
                    <div>
                        <div style="font-size: 12px; color: rgba(255, 255, 255, 0.7); text-transform: uppercase; letter-spacing: 0.5px;">Booking ID</div>
                        <div style="color: white; font-weight: 500;">${booking.id}</div>
                    </div>
                    <div>
                        <div style="font-size: 12px; color: rgba(255, 255, 255, 0.7); text-transform: uppercase; letter-spacing: 0.5px;">Status</div>
                        <div><span style="background: rgba(76, 175, 80, 0.2); color: #4CAF50; padding: 4px 8px; border-radius: 16px; font-size: 12px; border: 1px solid rgba(76, 175, 80, 0.3);">${booking.status || 'Confirmed'}</span></div>
                    </div>
                </div>
                
                <div style="display: flex; gap: 12px;">
                    <button onclick="window.app.downloadTicket('${booking.id}')" style="padding: 6px 12px; border-radius: 6px; border: none; cursor: pointer; font-size: 14px; font-weight: 500; background-color: #e63946; color: white;">
                        <i class="fas fa-download"></i> Download
                    </button>
                    <button onclick="window.app.showBookingQR('${booking.id}')" style="padding: 6px 12px; border-radius: 6px; border: 1px solid #e63946; cursor: pointer; font-size: 14px; font-weight: 500; background: transparent; color: #e63946;">
                        <i class="fas fa-qrcode"></i> Show QR
                    </button>
                </div>
            </div>
        `;
    }

    async showBookingQR(bookingId) {
        const booking = JSON.parse(localStorage.getItem('bookings') || '[]').find(b => b.id === bookingId);
        if (!booking) return;

        const item = this.findItemById(booking.movieId);
        const venue = this.venues.find(v => v.id === booking.venueId);
        
        // Generate QR code data
        const qrData = JSON.stringify({
            bookingId: booking.id,
            movieTitle: item?.title,
            venue: venue?.name,
            date: booking.date,
            showtime: booking.showtime,
            seats: booking.selectedSeats?.map(s => s.seatId).join(', '),
            total: booking.pricing?.total,
            userId: booking.userId,
            status: booking.status
        });
        
        const qrCodeImage = await this.generateQRCode(qrData);
        
        // Show QR code in modal
        const modalContent = `
            <div class="modal" id="qrModal">
                <div class="modal-content" style="max-width: 400px;">
                    <div class="modal-header">
                        <h2>Booking QR Code</h2>
                        <button class="modal-close" onclick="window.app.closeModal('qrModal')">&times;</button>
                    </div>
                    <div class="modal-body" style="text-align: center;">
                        <div style="background: white; padding: 20px; border-radius: 12px; display: inline-block; margin-bottom: 16px;">
                            <img src="${qrCodeImage}" alt="Booking QR Code" style="width: 200px; height: 200px;">
                        </div>
                        <h3 style="color: white; margin-bottom: 8px;">${item?.title}</h3>
                        <p style="color: rgba(255,255,255,0.7); margin-bottom: 16px;">
                            ${venue?.name}<br>
                            ${new Date(booking.date).toLocaleDateString()} ${booking.showtime}
                        </p>
                        <p style="color: rgba(255,255,255,0.8); font-size: 14px;">
                            <strong>Booking ID:</strong> ${booking.id}<br>
                            <strong>Seats:</strong> ${booking.selectedSeats?.map(s => s.seatId).join(', ')}<br>
                            <strong>Total:</strong> ₹${booking.pricing?.total}
                        </p>
                    </div>
                </div>
            </div>
        `;
        
        // Remove existing QR modal if any
        const existingModal = document.getElementById('qrModal');
        if (existingModal) {
            existingModal.remove();
        }
        
        document.body.insertAdjacentHTML('beforeend', modalContent);
        this.showModal('qrModal');
    }

    // Utility methods
    findItemById(id) {
        const allMovies = Object.values(this.movies).flat();
        const allEvents = this.events;
        const allContent = [...allMovies, ...allEvents];
        return allContent.find(item => item.id === id);
    }

    showPage(pageId) {
        document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
        const page = document.getElementById(pageId + 'Page');
        if (page) {
            page.classList.add('active');
        }

        if (pageId === 'movies') {
            this.loadAllMovies();
        } else if (pageId === 'profile') {
            this.showProfile();
        }
        
        window.scrollTo(0, 0);
    }

    loadAllMovies() {
        const container = document.getElementById('allMoviesGrid');
        if (!container) return;

        const allMovies = Object.values(this.movies).flat();
        const allEvents = this.events;
        const allContent = [...allMovies, ...allEvents];
        container.innerHTML = allContent.map(item => this.createMovieCard(item)).join('');
    }

    showModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('hidden');
        }
    }

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('hidden');
        }
    }

    showLoading() {
        const loading = document.getElementById('loading');
        if (loading) {
            loading.classList.remove('hidden');
        }
    }

    hideLoading() {
        const loading = document.getElementById('loading');
        if (loading) {
            loading.classList.add('hidden');
        }
    }

    showToast(message, type = 'success') {
        const container = document.getElementById('toastContainer');
        if (!container) return;
        
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const icons = {
            success: 'fas fa-check-circle',
            error: 'fas fa-times-circle',
            info: 'fas fa-info-circle'
        };
        
        toast.innerHTML = `
            <i class="toast-icon ${icons[type]}"></i>
            <span>${message}</span>
        `;
        
        container.appendChild(toast);
        
        setTimeout(() => {
            toast.remove();
        }, 4000);
    }
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    window.app = new BookMyEventApp();
});

// Global function declarations for onclick handlers
function showPage(pageId) {
    if (window.app) {
        window.app.showPage(pageId);
    }
}

function showAuthPage(tab = 'login') {
    if (window.app) {
        window.app.showAuthPage(tab);
    }
}

function hideAuthPage() {
    if (window.app) {
        window.app.hideAuthPage();
    }
}

function switchAuthTab(tab) {
    if (window.app) {
        window.app.switchAuthTab(tab);
    }
}

function togglePassword(button) {
    if (window.app) {
        window.app.togglePassword(button);
    }
}

function showForgotPassword() {
    if (window.app) {
        window.app.showForgotPassword();
    }
}

function closeModal(modalId) {
    if (window.app) {
        window.app.closeModal(modalId);
    }
}

function handleLogin(event) {
    if (window.app) {
        window.app.handleLogin(event);
    }
}

function handleSignup(event) {
    if (window.app) {
        window.app.handleSignup(event);
    }
}

function handleForgotPassword(event) {
    if (window.app) {
        window.app.handleForgotPassword(event);
    }
}

function logout() {
    if (window.app) {
        window.app.logout();
    }
}

function toggleUserDropdown() {
    if (window.app) {
        window.app.toggleUserDropdown();
    }
}

function filterMovies(category) {
    if (window.app) {
        window.app.filterMovies(category);
    }
}