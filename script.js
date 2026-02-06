// ===== Navigation Scroll Effect =====
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

// ===== Load Profile Photo from localStorage =====
function loadProfilePhoto() {
    const profilePhoto = localStorage.getItem('profilePhoto');
    const profileImg = document.querySelector('.profile-img');

    if (profilePhoto && profileImg) {
        profileImg.src = profilePhoto;
    }
}

// Load profile photo on page load
loadProfilePhoto();

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== Mobile Menu Toggle =====
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ===== Smooth Scroll with Offset =====
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Active Navigation Link =====
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.scrollY >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===== Certification Filter =====
const certFilters = document.querySelectorAll('.cert-filter');
const certCards = document.querySelectorAll('.cert-card');

certFilters.forEach(filter => {
    filter.addEventListener('click', () => {
        // Remove active class from all filters
        certFilters.forEach(f => f.classList.remove('active'));
        // Add active class to clicked filter
        filter.classList.add('active');

        const category = filter.getAttribute('data-category');

        certCards.forEach(card => {
            if (category === 'all' || card.getAttribute('data-category') === category) {
                card.style.display = 'block';
                // Add animation
                card.style.animation = 'fadeInUp 0.5s ease-out';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// ===== Contact Form Handling =====
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // Create mailto link
    const mailtoLink = `mailto:hongdiempt@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Tên: ${name}\nEmail: ${email}\n\nNội dung:\n${message}`)}`;

    // Open email client
    window.location.href = mailtoLink;

    // Show success message
    alert('Cảm ơn bạn đã liên hệ! Email client của bạn sẽ được mở để gửi tin nhắn.');

    // Reset form
    contactForm.reset();
});

// ===== Scroll Animations =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll('.timeline-item, .achievement-card, .cert-card, .skill-card, .contact-card');

animateElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(element);
});

// ===== Counter Animation for Stats =====
const statNumbers = document.querySelectorAll('.stat-number');

const animateCounter = (element, target) => {
    const duration = 2000; // 2 seconds
    const start = 0;
    const increment = target / (duration / 16); // 60fps
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
};

// Observe stats section
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            statNumbers.forEach((stat, index) => {
                const targets = [17, 50, 100]; // Corresponding to the stat values
                setTimeout(() => {
                    animateCounter(stat, targets[index]);
                }, index * 200);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// ===== Parallax Effect for Hero Orbs =====
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const orbs = document.querySelectorAll('.gradient-orb');

    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 0.1;
        orb.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ===== Typing Effect for Hero Title (Optional Enhancement) =====
const heroTitle = document.querySelector('.hero-title .gradient-text');
if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    let index = 0;

    const typeWriter = () => {
        if (index < text.length) {
            heroTitle.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, 100);
        }
    };

    // Start typing effect after a short delay
    setTimeout(typeWriter, 500);
}

// ===== Add Hover Effect to Timeline Items =====
const timelineItems = document.querySelectorAll('.timeline-item');

timelineItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.querySelector('.timeline-marker').style.transform = 'scale(1.5)';
        item.querySelector('.timeline-marker').style.transition = 'transform 0.3s ease';
    });

    item.addEventListener('mouseleave', () => {
        item.querySelector('.timeline-marker').style.transform = 'scale(1)';
    });
});

// ===== Lazy Loading for Images (if you add real images later) =====
const lazyImages = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.add('loaded');
            observer.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));

// ===== Add Ripple Effect to Buttons =====
const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
    button.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        this.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple CSS dynamically
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===== Performance: Debounce Scroll Events =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll-heavy functions
const debouncedScroll = debounce(() => {
    // Your scroll-heavy code here
}, 10);

window.addEventListener('scroll', debouncedScroll);

// ===== Load Blog Posts =====
function loadBlogPosts() {
    const blogGrid = document.getElementById('blog-grid');
    const blogPosts = JSON.parse(localStorage.getItem('blogPosts')) || [];

    // Filter only published posts
    const publishedPosts = blogPosts.filter(post => post.status === 'published');

    if (publishedPosts.length > 0) {
        blogGrid.innerHTML = publishedPosts.map(post => `
            <div class="blog-card">
                <div class="blog-thumbnail">
                    ${post.thumbnail ?
                `<img src="${post.thumbnail}" alt="${post.title}">` :
                `<img src="images/profile_photo.jpg" alt="${post.title}">`
            }
                </div>
                <div class="blog-content">
                    <span class="blog-category">${getCategoryName(post.category)}</span>
                    <h3>${post.title}</h3>
                    <p>${post.excerpt || post.content.substring(0, 150).replace(/<[^>]*>/g, '') + '...'}</p>
                    <div class="blog-meta">
                        <span>📅 ${new Date(post.createdAt).toLocaleDateString('vi-VN')}</span>
                        <a href="#" class="blog-read-more" onclick="viewBlogPost(${post.id}); return false;">Đọc thêm →</a>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

function getCategoryName(category) {
    const categories = {
        'education': 'Giáo dục',
        'technology': 'Công nghệ',
        'business': 'Kinh doanh',
        'personal': 'Phát triển bản thân',
        'other': 'Khác'
    };
    return categories[category] || category;
}

function viewBlogPost(id) {
    const blogPosts = JSON.parse(localStorage.getItem('blogPosts')) || [];
    const post = blogPosts.find(p => p.id === id);

    if (post) {
        // Create modal to display full blog post
        const modal = document.createElement('div');
        modal.className = 'blog-modal';
        modal.innerHTML = `
            <div class="blog-modal-content">
                <button class="blog-modal-close">&times;</button>
                <div class="blog-post-full">
                    ${post.thumbnail ? `<img src="${post.thumbnail}" alt="${post.title}" class="blog-post-image">` : ''}
                    <span class="blog-category">${getCategoryName(post.category)}</span>
                    <h1>${post.title}</h1>
                    <div class="blog-post-meta">
                        📅 ${new Date(post.createdAt).toLocaleDateString('vi-VN')}
                        ${post.tags && post.tags.length > 0 ? `<span class="blog-tags">🏷️ ${post.tags.join(', ')}</span>` : ''}
                    </div>
                    <div class="blog-post-content">${post.content}</div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Add styles for modal
        const style = document.createElement('style');
        style.textContent = `
            .blog-modal {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.8);
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 2rem;
                overflow-y: auto;
            }
            
            .blog-modal-content {
                background: white;
                border-radius: 1rem;
                max-width: 800px;
                width: 100%;
                max-height: 90vh;
                overflow-y: auto;
                position: relative;
            }
            
            .blog-modal-close {
                position: sticky;
                top: 1rem;
                right: 1rem;
                float: right;
                background: white;
                border: none;
                font-size: 2rem;
                cursor: pointer;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                box-shadow: 0 2px 8px rgba(0,0,0,0.2);
                z-index: 1;
            }
            
            .blog-post-full {
                padding: 3rem;
            }
            
            .blog-post-image {
                width: 100%;
                height: 400px;
                object-fit: cover;
                border-radius: 1rem;
                margin-bottom: 2rem;
            }
            
            .blog-post-full h1 {
                font-size: 2.5rem;
                margin-bottom: 1rem;
            }
            
            .blog-post-meta {
                color: #6B7280;
                margin-bottom: 2rem;
                padding-bottom: 1rem;
                border-bottom: 2px solid #E5E7EB;
            }
            
            .blog-tags {
                margin-left: 1rem;
            }
            
            .blog-post-content {
                font-size: 1.125rem;
                line-height: 1.8;
                color: #1F2937;
            }
            
            .blog-post-content img {
                max-width: 100%;
                height: auto;
                border-radius: 0.5rem;
                margin: 1rem 0;
            }
        `;
        document.head.appendChild(style);

        // Close modal
        modal.querySelector('.blog-modal-close').addEventListener('click', () => {
            modal.remove();
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }
}

// Load blog posts on page load
loadBlogPosts();

// ===== Console Welcome Message =====
console.log('%c👋 Xin chào!', 'font-size: 24px; font-weight: bold; color: #FF6B9D;');
console.log('%cWebsite được thiết kế bởi Antigravity AI', 'font-size: 14px; color: #64748B;');
console.log('%cPhạm Trần Hồng Diễm - TEDx Speaker & Strategic Consultant', 'font-size: 12px; color: #C084FC;');
