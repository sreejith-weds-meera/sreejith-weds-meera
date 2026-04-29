# Sreejith & Merin - Wedding Invitation Website

An elegant, romantic wedding invitation website featuring a sophisticated design with multiple interactive sections inspired by modern wedding invitation trends.

## ✨ Features

- **Elegant Design** — Beautiful serif and script fonts with soft, neutral color palette
- **Sidebar Navigation** — Persistent couple info display while scrolling
- **Bottom Tab Navigation** — Quick access to all sections
- **Live Countdown Timer** — Days, hours, minutes, seconds until the wedding
- **Interactive Gallery** — Photo carousel with navigation controls
- **Guest Comments** — Visitors can leave wishes with attendance confirmation
- **Responsive Design** — Perfect on desktop, tablet, and mobile devices
- **Smooth Animations** — Elegant transitions and hover effects
- **Local Storage** — Comments saved in browser without backend needed
- **Decorative Elements** — Floating petals and subtle design accents

## 📁 Project Structure

```
├── index.html          — Main wedding invitation page
├── styles.css          — Complete styling with animations
├── script.js           — Interactive features (countdown, carousel, comments)
├── README.md          — This file
└── images/
    └── us.jpeg        — Hero and profile image
```

## 🎨 Design Highlights

### Color Palette
- **Background**: Soft beige/cream (#f5f0e8)
- **Accent**: Warm gold (#d4a574)
- **Highlight**: Elegant rose (#e75480)
- **Text**: Dark gray (#2c2c2c)

### Typography
- **Headings**: Playfair Display (elegant serif)
- **Decorative**: Great Vibes (script font)
- **Body**: Montserrat (clean sans-serif)

### Layout
- Two-column layout: Fixed sidebar + scrollable content
- Bottom navigation bar for section access
- Responsive mobile design
- Generous white space for elegance

## 🚀 How to Use

### 1. **Open & Preview**
   - Open `index.html` in a web browser
   - Site works completely offline

### 2. **Customize Couple Information**
   Edit in `index.html`:
   ```html
   <h1 class="sidebar-title">Sreejith <br>& Merin</h1>
   <p class="sidebar-date">April 26, 2026</p>
   ```

### 3. **Update Couple Profiles**
   ```html
   <h4 class="profile-name">Sreejith S Nair</h4>
   <p class="profile-relation">Son of Bapak & Ibu Nair</p>
   ```

### 4. **Add Your Photos**
   - Replace `images/us.jpeg` with couple photos
   - Update photo references in HTML

### 5. **Update Wedding Details**
   ```html
   <h5 class="event-name">Akad Nikah</h5>
   <p class="event-time">10:00 WIB</p>
   <p class="event-location">Your Venue<br>City, Country</p>
   ```

### 6. **Modify Wedding Date**
   In `script.js`, update the countdown date:
   ```javascript
   const weddingDate = new Date('2026-04-26T00:00:00').getTime();
   ```

### 7. **Customize Gallery**
   Add more carousel items in HTML:
   ```html
   <div class="carousel-item" style="background-image: url('images/photo.jpg')"></div>
   ```

## 🎯 Features Explained

### Countdown Timer
- Automatically calculates days, hours, minutes, seconds
- Updates every second
- Located in the "Tanggal" section

### Photo Gallery Carousel
- Click arrow buttons to navigate
- Click dots to jump to specific photo
- Smooth transitions
- Responsive sizing

### Guest Comments System
- Visitors can submit wishes with name and attendance status
- Comments saved in browser's local storage
- Like and delete functionality
- Timestamps for each comment
- No backend required!

### Bottom Navigation
- 5 quick-access buttons (Home, Mempelai, Tanggal, Galeri, Ucapan)
- Auto-highlights based on scroll position
- Click to jump to section

### Responsive Design
- Desktop: Full sidebar + content layout
- Tablet: Responsive grid and spacing
- Mobile: Stacked layout with optimized tap targets

## 📋 Sections Overview

1. **Home (🏠)** - Welcome with couple names and save date button
2. **Mempelai (👫)** - Couple profiles with photos and parent info
3. **Tanggal (📅)** - Event countdown, ceremony/reception times and locations
4. **Galeri (📷)** - Photo gallery carousel
5. **Ucapan (💬)** - Guest wishes and comments form

## 💾 Local Storage

Guest comments are automatically saved to browser's local storage:
- Data persists even after page refresh
- No server needed
- To clear: Open browser dev tools → Application → Clear site data

## 🌍 Deployment

### GitHub Pages (Free)
```bash
1. Create GitHub repository
2. Push files to repository
3. Enable GitHub Pages in settings
4. Visit: https://yourusername.github.io/repo-name
```

### Netlify (Free)
1. Drag and drop folder
2. Get live URL immediately

### Other Hosting
- Vercel, Firebase Hosting, or any static host
- Upload the folder contents

## 🎨 Color Customization

Edit colors in `styles.css`:
```css
/* Change accent color */
.btn-primary {
  background: #d4a574; /* Change this */
  color: white;
  border-color: #d4a574;
}
```

## 📱 Browser Support

- Chrome ✓
- Firefox ✓
- Safari ✓
- Edge ✓
- Mobile browsers ✓

## 💡 Tips

1. **Use high-quality images** for best results
2. **Test on mobile** before sharing
3. **Keep love story brief** (2-3 sentences)
4. **Use meaningful song** background is optional
5. **Customize colors** to match your theme

## 🔧 Troubleshooting

### Images not showing?
- Check file path is correct
- Use `images/filename.jpg` format
- Ensure image files exist

### Countdown not updating?
- Check date format: `'2026-04-26T00:00:00'`
- Verify wedding date in script.js

### Comments not saving?
- Check browser allows local storage
- Don't use private/incognito mode

### Styling looks wrong?
- Clear browser cache (Ctrl+Shift+Delete)
- Check styles.css is in same folder

## 📞 Contact

- Email: sreejith.merin@wedding.com
- Include email in RSVP section for guest contacts

## 📄 License

Free to use for personal wedding invitations.

---

**Wishing you a beautiful wedding day!** 💕✨

