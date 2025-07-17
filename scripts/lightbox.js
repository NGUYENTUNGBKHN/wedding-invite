// scripts/lightbox.js

document.addEventListener('DOMContentLoaded', () => {
    // Select all image elements within the gallery items
    const galleryItems = document.querySelectorAll('.gallery-item img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.lightbox .close-btn'); // More specific selector
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const body = document.body;

    // Dynamically create elements for lightbox controls and thumbnail strip
    const lightboxContentWrapper = document.createElement('div');
    lightboxContentWrapper.classList.add('lightbox-content-wrapper');
    // We append this to lightbox first, then move lightboxImg inside it
    lightbox.appendChild(lightboxContentWrapper);
    lightboxContentWrapper.appendChild(lightboxImg); // Move lightboxImg inside wrapper

    const zoomInBtn = document.createElement('button');
    zoomInBtn.innerText = '+ Zoom In';
    const zoomOutBtn = document.createElement('button');
    zoomOutBtn.innerText = '- Zoom Out';
    const resetZoomBtn = document.createElement('button');
    resetZoomBtn.innerText = 'Reset Zoom';

    const lightboxControls = document.createElement('div');
    lightboxControls.classList.add('lightbox-controls');
    lightboxControls.appendChild(zoomInBtn);
    lightboxControls.appendChild(zoomOutBtn);
    lightboxControls.appendChild(resetZoomBtn);
    lightboxContentWrapper.appendChild(lightboxControls);

    // Create thumbnail container (for toggle button and strip)
    const thumbnailContainer = document.createElement('div');
    thumbnailContainer.classList.add('thumbnail-container');
    lightbox.appendChild(thumbnailContainer); // Append to lightbox, so it's at the bottom

    // Create thumbnail toggle button
    const thumbnailToggleBtn = document.createElement('button');
    thumbnailToggleBtn.classList.add('thumbnail-toggle-btn');
    thumbnailToggleBtn.innerText = 'Ẩn/Hiện Thanh Ảnh'; // "Hide/Show Image Bar"
    thumbnailContainer.appendChild(thumbnailToggleBtn);

    // Create thumbnail strip
    const thumbnailStrip = document.createElement('div');
    thumbnailStrip.classList.add('thumbnail-strip');
    thumbnailContainer.appendChild(thumbnailStrip);

    let currentIndex = 0;
    let scale = 1;
    const zoomFactor = 0.1;
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let translateX = 0;
    let translateY = 0;
    let isThumbnailStripExpanded = false; // Initial state

    // Populate thumbnail strip using the images found in the .gallery-item
    galleryItems.forEach((img, index) => {
        const thumbnail = document.createElement('img');
        thumbnail.src = img.src;
        thumbnail.alt = img.alt;
        thumbnail.dataset.index = index;
        thumbnail.addEventListener('click', () => {
            showImage(index);
        });
        thumbnailStrip.appendChild(thumbnail);
    });

    function updateThumbnails() {
        const thumbnails = thumbnailStrip.querySelectorAll('img');
        thumbnails.forEach(thumb => thumb.classList.remove('active'));
        if (thumbnails.length > 0) {
            thumbnails.item(currentIndex).classList.add('active');
            // Scroll the active thumbnail into view
            thumbnails.item(currentIndex).scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
        }
    }

    function resetTransform() {
        scale = 1;
        translateX = 0;
        translateY = 0;
        lightboxImg.style.transform = `scale(${scale}) translate(${translateX}px, ${translateY}px)`;
        lightboxImg.style.cursor = 'grab';
    }

    function applyTransform() {
        lightboxImg.style.transform = `scale(${scale}) translate(${translateX}px, ${translateY}px)`;
        lightboxImg.style.cursor = scale > 1 ? 'grabbing' : 'grab';
    }

    zoomInBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        scale += zoomFactor;
        applyTransform();
    });

    zoomOutBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        scale -= zoomFactor;
        scale = Math.max(0.1, scale); // Prevent zooming too far out
        applyTransform();
    });

    resetZoomBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        resetTransform();
    });

    lightboxImg.addEventListener('mousedown', (e) => {
        if (scale > 1) { // Only allow dragging if zoomed in
            isDragging = true;
            startX = e.clientX - translateX;
            startY = e.clientY - translateY;
            lightboxImg.style.cursor = 'grabbing';
        }
    });

    body.addEventListener('mouseup', () => {
        isDragging = false;
        if (scale <= 1) {
            lightboxImg.style.cursor = 'grab';
        }
    });

    body.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault(); // Prevent text selection during drag
        translateX = e.clientX - startX;
        translateY = e.clientY - startY;
        applyTransform();
    });

    // Toggle thumbnail strip visibility
    thumbnailToggleBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent lightbox closing
        isThumbnailStripExpanded = !isThumbnailStripExpanded;
        if (isThumbnailStripExpanded) {
            thumbnailStrip.classList.add('expanded');
        } else {
            thumbnailStrip.classList.remove('expanded');
        }
    });

    // Open the lightbox when an image in the gallery is clicked
    galleryItems.forEach((img, index) => {
        img.addEventListener('click', () => {
            lightbox.style.display = 'flex'; // Use flex for centering
            showImage(index);
        });
    });

    // Close the lightbox when the close button is clicked
    closeBtn.addEventListener('click', () => {
        lightbox.style.display = 'none';
        resetTransform();
        // Reset thumbnail strip state on close
        isThumbnailStripExpanded = false;
        thumbnailStrip.classList.remove('expanded');
    });

    // Close the lightbox when clicking outside the image or controls
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) { // Check if the click was directly on the lightbox background
            lightbox.style.display = 'none';
            resetTransform();
            // Reset thumbnail strip state on close
            isThumbnailStripExpanded = false;
            thumbnailStrip.classList.remove('expanded');
        }
    });

    // Function to show the image based on index
    function showImage(index) {
        if (index < 0) {
            currentIndex = galleryItems.length - 1; // Loop to last image
        } else if (index >= galleryItems.length) {
            currentIndex = 0; // Loop to first image
        } else {
            currentIndex = index;
        }
        lightboxImg.src = galleryItems.item(currentIndex).src;
        resetTransform(); // Reset zoom for new image
        updateThumbnails();
    }

    // Previous image button
    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent closing lightbox
        showImage(currentIndex - 1);
    });

    // Next image button
    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent closing lightbox
        showImage(currentIndex + 1);
    });

    // Keyboard navigation (optional)
    document.addEventListener('keydown', (e) => {
        if (lightbox.style.display === 'flex') {
            if (e.key === 'ArrowLeft') {
                showImage(currentIndex - 1);
            } else if (e.key === 'ArrowRight') {
                showImage(currentIndex + 1);
            } else if (e.key === 'Escape') {
                lightbox.style.display = 'none';
                resetTransform();
                // Reset thumbnail strip state on close
                isThumbnailStripExpanded = false;
                thumbnailStrip.classList.remove('expanded');
            }
        }
    });

    let startTouchX = 0;
    let endTouchX = 0;
    const swipeThreshold = 50;

    lightboxImg.addEventListener('touchstart', (e) => {
        // Chỉ xử lý nếu không đang kéo ảnh để tránh xung đột với chức năng kéo khi zoom
        if (scale === 1) { // Chỉ vuốt khi ảnh không bị zoom
            startTouchX = e.touches[0].clientX;
        }
    });

    lightboxImg.addEventListener('touchmove', (e) => {
        // Ngăn chặn cuộn trang khi đang vuốt ảnh trong lightbox
        if (scale === 1 && lightbox.style.display === 'flex') {
            e.preventDefault();
        }
        if (scale === 1 && startTouchX !== 0) {
            endTouchX = e.touches[0].clientX;
        }
    });

    lightboxImg.addEventListener('touchend', () => {
        if (scale === 1 && startTouchX !== 0 && endTouchX !== 0) {
            const diffX = startTouchX - endTouchX;

            if (diffX > swipeThreshold) {
                // Vuốt từ phải sang trái (chuyển ảnh tiếp theo)
                showImage(currentIndex + 1);
            } else if (diffX < -swipeThreshold) {
                // Vuốt từ trái sang phải (chuyển ảnh trước đó)
                showImage(currentIndex - 1);
            }
        }
        // Reset các biến chạm
        startTouchX = 0;
        endTouchX = 0;
    })
});