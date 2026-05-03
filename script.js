// ==================== COUNTDOWN TIMER ====================
function updateCountdown() {
  const weddingDate = new Date('2026-07-11T12:00:00').getTime();
  const now = new Date().getTime();
  const difference = weddingDate - now;

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  daysEl.textContent = String(days).padStart(2, '0');
  hoursEl.textContent = String(hours).padStart(2, '0');
  minutesEl.textContent = String(minutes).padStart(2, '0');
  secondsEl.textContent = String(seconds).padStart(2, '0');
}

// Update countdown every second
updateCountdown();
setInterval(updateCountdown, 1000);

// ==================== BOTTOM NAVIGATION ====================
const navButtons = document.querySelectorAll('.nav-btn');
const sections = document.querySelectorAll('.section');

navButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    const href = btn.getAttribute('href');
    
    if (href && href.startsWith('#')) {
      e.preventDefault();
      
      // Remove active class from all buttons
      navButtons.forEach(b => b.classList.remove('active'));
      
      // Add active class to clicked button
      btn.classList.add('active');
      
      // Scroll to section
      const sectionId = href.substring(1);
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
});

// Update nav button based on scroll position
window.addEventListener('scroll', () => {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (window.scrollY >= sectionTop - 300) {
      current = section.getAttribute('id');
    }
  });
  
  navButtons.forEach(btn => {
    btn.classList.remove('active');
    if (btn.getAttribute('href') === '#' + current) {
      btn.classList.add('active');
    }
  });
});

// ==================== GALLERY AUTO-SCROLL ====================
const galleryGrid = document.querySelector('.gallery-grid');

let autoScrollInterval;
let currentScrollPosition = 0;
let isUserInteracting = false;

function getItemWidth() {
  const items = galleryGrid.querySelectorAll('.gallery-item');
  return items.length > 0 ? items[0].offsetWidth + 20 : 270; // item width + gap
}

function getVisibleItems() {
  const containerWidth = galleryGrid.parentElement.offsetWidth;
  const itemWidth = getItemWidth();
  return Math.floor(containerWidth / itemWidth);
}

function getMaxScroll() {
  const items = galleryGrid.querySelectorAll('.gallery-item');
  const itemWidth = getItemWidth();
  return (items.length - getVisibleItems()) * itemWidth;
}

function startAutoScroll() {
  if (isUserInteracting || !galleryGrid) return;

  autoScrollInterval = setInterval(() => {
    if (!isUserInteracting) {
      const itemWidth = getItemWidth();
      currentScrollPosition += itemWidth;

      // Check if we've reached the end
      const maxScroll = getMaxScroll();
      if (currentScrollPosition >= maxScroll) {
        currentScrollPosition = 0; // Loop back to beginning
      }

      galleryGrid.scrollTo({
        left: currentScrollPosition,
        behavior: 'smooth'
      });
    }
  }, 3000); // Scroll every 3 seconds
}

function stopAutoScroll() {
  clearInterval(autoScrollInterval);
}

function resetAutoScroll() {
  stopAutoScroll();
  isUserInteracting = false;
  startAutoScroll();
}

if (galleryGrid) {
  // Stop auto-scroll on user interaction
  galleryGrid.addEventListener('scroll', () => {
    isUserInteracting = true;
    currentScrollPosition = galleryGrid.scrollLeft;
    stopAutoScroll();
    setTimeout(() => {
      resetAutoScroll();
    }, 5000); // Resume after 5 seconds of inactivity
  }, { passive: true });

  // Pause on hover
  galleryGrid.addEventListener('mouseenter', () => {
    stopAutoScroll();
  });

  galleryGrid.addEventListener('mouseleave', () => {
    isUserInteracting = false;
    startAutoScroll();
  });

  // Handle window resize for responsive behavior
  window.addEventListener('resize', () => {
    // Reset scroll position and restart auto-scroll on resize
    currentScrollPosition = 0;
    galleryGrid.scrollTo({
      left: 0,
      behavior: 'smooth'
    });
    resetAutoScroll();
  });

  // Start auto-scroll
  startAutoScroll();
}

// ==================== CAROUSEL ====================
let currentSlide = 0;
const carouselItems = document.querySelectorAll('.carousel-item');
const totalSlides = carouselItems.length;
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
  if (totalSlides === 0) return;

  if (index >= totalSlides) {
    currentSlide = 0;
  } else if (index < 0) {
    currentSlide = totalSlides - 1;
  } else {
    currentSlide = index;
  }
  
  // Hide all items
  carouselItems.forEach(item => {
    item.style.display = 'none';
    item.style.opacity = '0';
  });
  
  // Show current item
  carouselItems[currentSlide].style.display = 'flex';
  setTimeout(() => {
    carouselItems[currentSlide].style.opacity = '1';
  }, 10);
  
  // Update dots
  dots.forEach((dot, index) => {
    dot.classList.remove('active');
    if (index === currentSlide) {
      dot.classList.add('active');
    }
  });
}

// Carousel navigation buttons
const prevBtn = document.querySelector('.carousel-prev');
const nextBtn = document.querySelector('.carousel-next');

if (prevBtn) {
  prevBtn.addEventListener('click', () => {
    showSlide(currentSlide - 1);
  });
}

if (nextBtn) {
  nextBtn.addEventListener('click', () => {
    showSlide(currentSlide + 1);
  });
}

// Dot navigation
dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    showSlide(index);
  });
});

// Initialize carousel
if (totalSlides > 0) {
  showSlide(0);
}

// ==================== COMMENTS FORM ====================
const commentForm = document.getElementById('commentForm');
const commentsList = document.getElementById('commentsList');
let comments = [];
if (commentsList) {
  comments = JSON.parse(localStorage.getItem('weddingComments')) || [];
}

// Display existing comments
function displayComments() {
  if (!commentsList) return;
  commentsList.innerHTML = '';
  
  // Sort comments by date (newest first)
  const sortedComments = [...comments].reverse();
  
  sortedComments.forEach((comment, index) => {
    const commentEl = createCommentElement(comment, index);
    commentsList.appendChild(commentEl);
  });
  
  // Show empty state if no comments
  if (comments.length === 0) {
    commentsList.innerHTML = '<p style="text-align: center; color: #999; padding: 40px 20px;">Be the first to share your wishes!</p>';
  }
}

// Create comment element
function createCommentElement(comment, index) {
  const div = document.createElement('div');
  div.className = 'comment-item';
  
  const attendanceLabel = comment.attendance === 'attend' ? '✓ Attending' : '✗ Not Attending';
  const attendanceClass = comment.attendance === 'attend' ? 'attend' : 'not-attend';
  
  div.innerHTML = `
    <div class="comment-header">
      <div>
        <div class="comment-name">${escapeHtml(comment.name)}</div>
        <span class="comment-attendance">${attendanceLabel}</span>
      </div>
      <div class="comment-time">${formatTime(comment.timestamp)}</div>
    </div>
    <div class="comment-text">${escapeHtml(comment.text)}</div>
    <div class="comment-actions">
      <button class="comment-btn like-btn" data-index="${index}">👍 Like</button>
      <button class="comment-btn delete-btn" data-index="${index}">🗑️ Delete</button>
    </div>
  `;
  
  // Add delete functionality
  div.querySelector('.delete-btn').addEventListener('click', () => {
    deleteComment(index);
  });
  
  // Add like functionality
  div.querySelector('.like-btn').addEventListener('click', (e) => {
    likeComment(index, e);
  });
  
  return div;
}

// Delete comment
function deleteComment(index) {
  comments.splice(comments.length - 1 - index, 1);
  localStorage.setItem('weddingComments', JSON.stringify(comments));
  displayComments();
}

// Like comment
function likeComment(index, e) {
  const commentIndex = comments.length - 1 - index;
  comments[commentIndex].likes = (comments[commentIndex].likes || 0) + 1;
  localStorage.setItem('weddingComments', JSON.stringify(comments));
  
  // Visual feedback
  const btn = e.target;
  btn.style.color = '#d4a574';
  btn.textContent = `👍 ${comments[commentIndex].likes}`;
  setTimeout(() => {
    btn.style.color = '';
    btn.textContent = `👍 Like`;
  }, 1000);
}

// Format time
function formatTime(timestamp) {
  const now = new Date();
  const commentDate = new Date(timestamp);
  const diffMs = now - commentDate;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);
  
  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  
  return commentDate.toLocaleDateString();
}

// Escape HTML
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Handle form submission
if (commentForm) {
  commentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('commenter-name').value.trim();
    const attendance = document.getElementById('attendance-status').value;
    const text = document.getElementById('comment-text').value.trim();
  
  if (!name || !attendance || !text) {
    alert('Please fill in all fields');
    return;
  }
  
  const comment = {
    name,
    attendance,
    text,
    timestamp: new Date().toISOString(),
    likes: 0
  };
  
  comments.push(comment);
  localStorage.setItem('weddingComments', JSON.stringify(comments));
  
  // Reset form
  commentForm.reset();
  
  // Show success message
  const btn = commentForm.querySelector('button[type="submit"]');
  const originalText = btn.textContent;
  btn.textContent = '✓ Message Sent!';
  btn.style.background = '#4CAF50';
  
  setTimeout(() => {
    btn.textContent = originalText;
    btn.style.background = '';
  }, 2000);
  
  // Display new comment
  displayComments();
});
}

if (commentsList) {
  displayComments();
}

// ==================== SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ==================== OPEN INVITATION - PLAY MUSIC ====================
const openInvitationBtn = document.getElementById('openInvitationBtn');
if (openInvitationBtn) {
  openInvitationBtn.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent immediate navigation
    
    const bgMusic = document.getElementById('bgMusic');
    if (bgMusic) {
      bgMusic.muted = false;
      sessionStorage.setItem('musicStarted', 'true');
      bgMusic.play().then(() => {
        // Music started successfully, now navigate
        window.location.href = 'invitation.html';
      }).catch(() => {
        // If play fails, still navigate
        window.location.href = 'invitation.html';
      });
    } else {
      // No music element, just navigate
      window.location.href = 'invitation.html';
    }
  });
}

// ==================== SAVE DATE BUTTON ====================
const saveDateBtn = document.querySelector('.home-buttons .btn');
const saveCalendarBtn = document.getElementById('saveCalendarBtn');
const calendarButtons = [saveDateBtn, saveCalendarBtn].filter(Boolean);

calendarButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const eventDate = '2026-04-26';
    const title = 'Sreejith & Merin Wedding';
    const description = 'Join us for our wedding celebration!';
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${eventDate.replace(/-/g, '')}/${eventDate.replace(/-/g, '')}&details=${encodeURIComponent(description)}`;

    alert('Opening Google Calendar to save the date...');
    window.open(googleCalendarUrl, '_blank');
  });
});

// ==================== BACKGROUND MUSIC CONTROL ====================
const bgMusic = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');

function updateMusicButton() {
  if (!musicToggle || !bgMusic) return;
  musicToggle.innerHTML = bgMusic.paused ? '<i class="fas fa-music"></i>' : '<i class="fas fa-pause"></i>';
  musicToggle.title = bgMusic.paused ? 'Play Music' : 'Pause Music';
}

if (musicToggle && bgMusic) {
  bgMusic.volume = 0.4;
  bgMusic.muted = true;
  bgMusic.autoplay = true;
  bgMusic.playsInline = true;
  updateMusicButton();

  const tryPlayMusic = () => {
    bgMusic.play().catch(() => {
      // autoplay may be blocked until the user interacts
    }).finally(updateMusicButton);
  };

  // Check if music should be unmuted (coming from landing page)
  const shouldUnmute = sessionStorage.getItem('musicStarted') === 'true';
  if (shouldUnmute) {
    bgMusic.muted = false;
  }

  window.addEventListener('load', tryPlayMusic);
  document.addEventListener('click', () => {
    if (bgMusic.muted) {
      bgMusic.muted = false;
      sessionStorage.setItem('musicStarted', 'true');
    }
    tryPlayMusic();
  }, { once: true });

  musicToggle.addEventListener('click', () => {
    if (bgMusic.paused) {
      bgMusic.play().catch(() => {
        // play may still be blocked until user interaction
      });
      sessionStorage.setItem('musicStarted', 'true');
    } else {
      bgMusic.pause();
    }
    updateMusicButton();
  });
}

// ==================== PAGE LOAD ANIMATION ====================
window.addEventListener('load', () => {
  const loader = document.querySelector('.page-loader');
  if (loader) {
    loader.style.opacity = '0';
    loader.style.pointerEvents = 'none';
    setTimeout(() => loader.remove(), 600);
  }
  document.body.style.opacity = '1';
  document.body.style.animation = 'fadeIn 0.6s ease-in';
});

// Add fade-in animation
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  
  body {
    opacity: 0;
  }
`;
document.head.appendChild(style);

// ==================== SIDEBAR SCROLL INDICATOR ====================
// Show sidebar activity based on scroll position
window.addEventListener('scroll', () => {
  const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
  
  // Optional: Update sidebar visual indicator
  // You can add a progress bar or other visual feedback here
});

console.log('Wedding website initialized! 💕');

// ==================== GALLERY IMAGE PRELOADER (RESERVE SPACE + SMOOTH SWAP) ====================
function initGalleryPreloader() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  if (!galleryItems || galleryItems.length === 0) return;

  galleryItems.forEach(item => {
    // mark as loading so CSS shows placeholder/blur
    item.classList.add('loading');

    // extract URL from inline style background-image or data-src
    const bgStyle = item.getAttribute('style') || '';
    const dataSrc = item.dataset.src;
    let urlMatch = bgStyle.match(/url\(["']?(.*?)["']?\)/i);
    const src = dataSrc || (urlMatch ? urlMatch[1] : null);
    if (!src) {
      // nothing to load
      item.classList.remove('loading');
      item.classList.add('loaded');
      return;
    }

    // create an Image to preload
    const img = new Image();
    img.src = src;
    img.onload = () => {
      // ensure the same background-image is set (usefull if data-src used)
      item.style.backgroundImage = `url('${src}')`;
      // toggle classes for smooth transition
      item.classList.remove('loading');
      item.classList.add('loaded');
    };
    img.onerror = () => {
      // on error, remove loading state but keep placeholder
      item.classList.remove('loading');
    };
  });
}

// Run after DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initGalleryPreloader);
} else {
  initGalleryPreloader();
}
