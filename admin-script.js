// ===== Admin Panel JavaScript =====

// Navigation
const navItems = document.querySelectorAll('.nav-item');
const sections = document.querySelectorAll('.content-section');
const sectionTitle = document.getElementById('section-title');

const sectionTitles = {
    'profile': 'Quản lý ảnh Profile',
    'certificates': 'Quản lý Bằng cấp & Chứng chỉ',
    'achievements': 'Quản lý Thành tựu',
    'blog': 'Viết bài mới',
    'gallery': 'Thư viện ảnh'
};

navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const targetSection = item.dataset.section;

        // Update active nav item
        navItems.forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');

        // Update active section
        sections.forEach(section => section.classList.remove('active'));
        document.getElementById(`${targetSection}-section`).classList.add('active');

        // Update title
        sectionTitle.textContent = sectionTitles[targetSection];
    });
});

// ===== Profile Image Upload =====
const profileUpload = document.getElementById('profile-upload');
const profileImg = document.getElementById('profile-img');

profileUpload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const imageData = e.target.result;
            profileImg.src = imageData;
            // Save to localStorage
            localStorage.setItem('profilePhoto', imageData);
            showNotification('Ảnh profile đã được cập nhật!', 'success');
        };
        reader.readAsDataURL(file);
    }
});

// ===== Certificate Management =====
const certModal = document.getElementById('cert-modal');
const addCertBtn = document.getElementById('add-cert-btn');
const certForm = document.getElementById('cert-form');
const certList = document.getElementById('cert-list');
const certImageInput = document.getElementById('cert-image');
const certPreview = document.getElementById('cert-preview');

let certificates = JSON.parse(localStorage.getItem('certificates')) || [];

addCertBtn.addEventListener('click', () => {
    certModal.classList.add('active');
});

certImageInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            certPreview.classList.add('active');
            certPreview.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
        };
        reader.readAsDataURL(file);
    }
});

certForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('cert-name').value;
    const provider = document.getElementById('cert-provider').value;
    const category = document.getElementById('cert-category').value;
    const imageFile = certImageInput.files[0];

    if (imageFile) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const cert = {
                id: Date.now(),
                name,
                provider,
                category,
                image: e.target.result
            };

            certificates.push(cert);
            localStorage.setItem('certificates', JSON.stringify(certificates));
            renderCertificates();
            certModal.classList.remove('active');
            certForm.reset();
            certPreview.classList.remove('active');
            showNotification('Chứng chỉ đã được thêm!', 'success');
        };
        reader.readAsDataURL(imageFile);
    }
});

function renderCertificates() {
    certList.innerHTML = certificates.map(cert => `
        <div class="cert-item">
            <img src="${cert.image}" alt="${cert.name}">
            <div class="cert-info">
                <h4>${cert.name}</h4>
                <p>${cert.provider}</p>
            </div>
            <div class="cert-actions">
                <button class="btn-icon" onclick="deleteCertificate(${cert.id})">🗑️</button>
            </div>
        </div>
    `).join('');
}

function deleteCertificate(id) {
    if (confirm('Bạn có chắc muốn xóa chứng chỉ này?')) {
        certificates = certificates.filter(cert => cert.id !== id);
        localStorage.setItem('certificates', JSON.stringify(certificates));
        renderCertificates();
        showNotification('Chứng chỉ đã được xóa!', 'success');
    }
}

// ===== Achievement Management =====
const achievementModal = document.getElementById('achievement-modal');
const addAchievementBtn = document.getElementById('add-achievement-btn');
const achievementForm = document.getElementById('achievement-form');
const achievementsList = document.getElementById('achievements-list');
const achievementImageInput = document.getElementById('achievement-image');
const achievementPreview = document.getElementById('achievement-preview');

let achievements = JSON.parse(localStorage.getItem('achievements')) || [];

addAchievementBtn.addEventListener('click', () => {
    achievementModal.classList.add('active');
});

achievementImageInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            achievementPreview.classList.add('active');
            achievementPreview.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
        };
        reader.readAsDataURL(file);
    }
});

achievementForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.getElementById('achievement-title').value;
    const desc = document.getElementById('achievement-desc').value;
    const year = document.getElementById('achievement-year').value;
    const imageFile = achievementImageInput.files[0];

    if (imageFile) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const achievement = {
                id: Date.now(),
                title,
                desc,
                year,
                image: e.target.result
            };

            achievements.push(achievement);
            localStorage.setItem('achievements', JSON.stringify(achievements));
            renderAchievements();
            achievementModal.classList.remove('active');
            achievementForm.reset();
            achievementPreview.classList.remove('active');
            showNotification('Thành tựu đã được thêm!', 'success');
        };
        reader.readAsDataURL(imageFile);
    }
});

function renderAchievements() {
    achievementsList.innerHTML = achievements.map(achievement => `
        <div class="achievement-item">
            <img src="${achievement.image}" alt="${achievement.title}">
            <div>
                <h4>${achievement.title}</h4>
                <p>${achievement.desc}</p>
                <span class="achievement-year">${achievement.year}</span>
            </div>
            <button class="btn-icon" onclick="deleteAchievement(${achievement.id})">🗑️</button>
        </div>
    `).join('');
}

function deleteAchievement(id) {
    if (confirm('Bạn có chắc muốn xóa thành tựu này?')) {
        achievements = achievements.filter(achievement => achievement.id !== id);
        localStorage.setItem('achievements', JSON.stringify(achievements));
        renderAchievements();
        showNotification('Thành tựu đã được xóa!', 'success');
    }
}

// ===== Blog Management =====
const blogForm = document.getElementById('blog-form');
const blogContent = document.getElementById('blog-content');
const blogThumbnail = document.getElementById('blog-thumbnail');
const blogThumbnailPreview = document.getElementById('blog-thumbnail-preview');
const contentImageInput = document.getElementById('content-image');
const insertImageBtn = document.getElementById('insert-image-btn');
const saveDraftBtn = document.getElementById('save-draft-btn');
const blogListBtn = document.getElementById('blog-list-btn');
const blogListModal = document.getElementById('blog-list-modal');
const blogPostsList = document.getElementById('blog-posts-list');

let blogPosts = JSON.parse(localStorage.getItem('blogPosts')) || [];
let currentThumbnail = null;

// Thumbnail upload
blogThumbnail.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            currentThumbnail = e.target.result;
            blogThumbnailPreview.innerHTML = `<img src="${e.target.result}" alt="Thumbnail">`;
        };
        reader.readAsDataURL(file);
    }
});

// Rich text editor toolbar
document.querySelectorAll('.toolbar-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const command = btn.dataset.command;
        if (command) {
            document.execCommand(command, false, null);
        }
    });
});

// Insert image into content
insertImageBtn.addEventListener('click', () => {
    contentImageInput.click();
});

contentImageInput.addEventListener('change', (e) => {
    const files = e.target.files;
    Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.style.maxWidth = '100%';
            img.style.height = 'auto';
            img.style.margin = '1rem 0';
            img.style.borderRadius = '0.5rem';
            blogContent.appendChild(img);
        };
        reader.readAsDataURL(file);
    });
});

// Save draft
saveDraftBtn.addEventListener('click', () => {
    saveBlogPost('draft');
});

// Publish blog post
blogForm.addEventListener('submit', (e) => {
    e.preventDefault();
    saveBlogPost('published');
});

function saveBlogPost(status) {
    const title = document.getElementById('blog-title').value;
    const category = document.getElementById('blog-category').value;
    const excerpt = document.getElementById('blog-excerpt').value;
    const content = blogContent.innerHTML;
    const tags = document.getElementById('blog-tags').value;

    const post = {
        id: Date.now(),
        title,
        category,
        excerpt,
        content,
        tags: tags.split(',').map(tag => tag.trim()),
        thumbnail: currentThumbnail,
        status,
        createdAt: new Date().toISOString()
    };

    blogPosts.push(post);
    localStorage.setItem('blogPosts', JSON.stringify(blogPosts));

    blogForm.reset();
    blogContent.innerHTML = '';
    blogThumbnailPreview.innerHTML = '<span class="placeholder-text">Chưa có ảnh</span>';
    currentThumbnail = null;

    const message = status === 'draft' ? 'Bài viết đã được lưu nháp!' : 'Bài viết đã được xuất bản!';
    showNotification(message, 'success');
}

// Show blog list
blogListBtn.addEventListener('click', () => {
    renderBlogPosts();
    blogListModal.classList.add('active');
});

function renderBlogPosts() {
    blogPostsList.innerHTML = blogPosts.map(post => `
        <div class="blog-post-item">
            <div class="blog-post-thumbnail">
                ${post.thumbnail ? `<img src="${post.thumbnail}" alt="${post.title}">` : '<div style="background: #f3f4f6; width: 100%; height: 100%;"></div>'}
            </div>
            <div class="blog-post-info">
                <h4>${post.title}</h4>
                <p class="blog-post-meta">
                    ${post.category} • ${new Date(post.createdAt).toLocaleDateString('vi-VN')} • ${post.status === 'draft' ? '📝 Nháp' : '✅ Đã xuất bản'}
                </p>
            </div>
            <div class="blog-post-actions">
                <button class="btn-icon" onclick="editBlogPost(${post.id})">✏️</button>
                <button class="btn-icon" onclick="deleteBlogPost(${post.id})">🗑️</button>
            </div>
        </div>
    `).join('');
}

function editBlogPost(id) {
    const post = blogPosts.find(p => p.id === id);
    if (post) {
        document.getElementById('blog-title').value = post.title;
        document.getElementById('blog-category').value = post.category;
        document.getElementById('blog-excerpt').value = post.excerpt;
        blogContent.innerHTML = post.content;
        document.getElementById('blog-tags').value = post.tags.join(', ');

        if (post.thumbnail) {
            currentThumbnail = post.thumbnail;
            blogThumbnailPreview.innerHTML = `<img src="${post.thumbnail}" alt="Thumbnail">`;
        }

        // Remove from list to avoid duplicates
        blogPosts = blogPosts.filter(p => p.id !== id);
        localStorage.setItem('blogPosts', JSON.stringify(blogPosts));

        blogListModal.classList.remove('active');
        showNotification('Bài viết đã được tải để chỉnh sửa!', 'success');
    }
}

function deleteBlogPost(id) {
    if (confirm('Bạn có chắc muốn xóa bài viết này?')) {
        blogPosts = blogPosts.filter(post => post.id !== id);
        localStorage.setItem('blogPosts', JSON.stringify(blogPosts));
        renderBlogPosts();
        showNotification('Bài viết đã được xóa!', 'success');
    }
}

// ===== Gallery Management =====
const galleryUpload = document.getElementById('gallery-upload');
const galleryGrid = document.getElementById('gallery-grid');

let galleryImages = JSON.parse(localStorage.getItem('galleryImages')) || [];

galleryUpload.addEventListener('change', (e) => {
    const files = e.target.files;
    let processed = 0;

    Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const image = {
                id: Date.now() + processed,
                src: e.target.result,
                name: file.name
            };

            galleryImages.push(image);
            processed++;

            if (processed === files.length) {
                localStorage.setItem('galleryImages', JSON.stringify(galleryImages));
                renderGallery();
                showNotification(`${files.length} ảnh đã được upload!`, 'success');
            }
        };
        reader.readAsDataURL(file);
    });
});

function renderGallery() {
    galleryGrid.innerHTML = galleryImages.map(image => `
        <div class="gallery-item">
            <img src="${image.src}" alt="${image.name}">
            <div class="gallery-item-actions">
                <button class="btn-icon" onclick="deleteGalleryImage(${image.id})">🗑️</button>
            </div>
        </div>
    `).join('');
}

function deleteGalleryImage(id) {
    if (confirm('Bạn có chắc muốn xóa ảnh này?')) {
        galleryImages = galleryImages.filter(img => img.id !== id);
        localStorage.setItem('galleryImages', JSON.stringify(galleryImages));
        renderGallery();
        showNotification('Ảnh đã được xóa!', 'success');
    }
}

// ===== Modal Management =====
document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.remove('active');
        });
    });
});

// Close modal on outside click
document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
});

// ===== Save Changes =====
const saveBtn = document.getElementById('save-btn');

saveBtn.addEventListener('click', () => {
    // Save all changes to localStorage
    localStorage.setItem('certificates', JSON.stringify(certificates));
    localStorage.setItem('achievements', JSON.stringify(achievements));
    localStorage.setItem('blogPosts', JSON.stringify(blogPosts));
    localStorage.setItem('galleryImages', JSON.stringify(galleryImages));

    showNotification('Tất cả thay đổi đã được lưu!', 'success');
});

// ===== Preview =====
const previewBtn = document.getElementById('preview-btn');

previewBtn.addEventListener('click', () => {
    window.open('index.html', '_blank');
});

// ===== Notification System =====
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 2rem;
        right: 2rem;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#10B981' : '#EF4444'};
        color: white;
        border-radius: 0.5rem;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===== Initialize =====
function initializeAdmin() {
    // Load profile photo from localStorage
    const savedProfilePhoto = localStorage.getItem('profilePhoto');
    if (savedProfilePhoto) {
        profileImg.src = savedProfilePhoto;
    }

    // Render existing data
    renderCertificates();
    renderAchievements();
    renderGallery();
}

initializeAdmin();

console.log('Admin Panel initialized successfully!');
