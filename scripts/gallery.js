// gallery.js

document.addEventListener('DOMContentLoaded', () => {
    const galleryTrack = document.querySelector('.gallery-track');
    const prevButton = document.querySelector('.gallery-button.prev');
    const nextButton = document.querySelector('.gallery-button.next');
    const numberOfSlides = 20;

    let currentIndex = 0;
    let slides = [];

    let isDragging = false;
    let startPosX = 0;
    let autoScrollInterval = null;

    // THAY ĐỔI MỚI: Biến trạng thái để kiểm soát việc kéo
    let dragEnabled = false;

    // 1. Tạo động các slide
    for (let i = 1; i <= numberOfSlides; i++) {
        const slideDiv = document.createElement('div');
        slideDiv.classList.add('gallery-slide');

        const img = document.createElement('img');
        img.src = `images/gallery/${i}.jpg`;
        img.alt = `Mô tả ảnh ${i}`;

        slideDiv.appendChild(img);
        galleryTrack.appendChild(slideDiv);
    }

    // CẬP NHẬT: Chọn lại các slide sau khi đã tạo động
    slides = document.querySelectorAll('.gallery-slide');
    const totalSlides = slides.length;

    // Hàm cập nhật trạng thái hiển thị của các slide
    function updateGallery() {
        slides.forEach((slide, index) => {
            slide.classList.remove('active', 'prev-visible', 'next-visible');

            let prevIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            let nextIndex = (currentIndex + 1) % totalSlides;

            if (index === currentIndex) {
                slide.classList.add('active');
            } else if (index === prevIndex) {
                slide.classList.add('prev-visible');
            } else if (index === nextIndex) {
                slide.classList.add('next-visible');
            }
        });
    }

    // Xử lý sự kiện khi click nút "Tiếp theo"
    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateGallery();
        startAutoScroll();
    });

    // Xử lý sự kiện khi click nút "Trước"
    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateGallery();
        startAutoScroll();
    });

    // --- Drag functionality ---

    // THAY ĐỔI MỚI: Xử lý Double Click
    galleryTrack.addEventListener('dblclick', () => {
        dragEnabled = !dragEnabled; // Đảo ngược trạng thái
        if (dragEnabled) {
            // console.log('Kéo cuộn đã được kích hoạt!');
            // Bạn có thể thêm một số hiệu ứng trực quan ở đây, ví dụ: thay đổi con trỏ chuột
            galleryTrack.style.cursor = 'grab';
        } else {
            // console.log('Kéo cuộn đã bị vô hiệu hóa!');
            // startAutoScroll();
            galleryTrack.style.cursor = 'default';
        }
        // Dừng tự động cuộn khi trạng thái kéo thay đổi để tránh xung đột
        stopAutoScroll();
    });

    // Mouse Down / Touch Start
    galleryTrack.addEventListener('mousedown', (e) => {
        // THAY ĐỔI MỚI: Chỉ bắt đầu kéo nếu dragEnabled là true
        if (!dragEnabled) return;

        e.preventDefault();
        isDragging = true;
        startPosX = e.clientX;
        galleryTrack.style.transition = 'none';
        stopAutoScroll(); // Dừng tự động cuộn khi bắt đầu kéo
    });

    galleryTrack.addEventListener('touchstart', (e) => {
        // THAY ĐỔI MỚI: Chỉ bắt đầu kéo nếu dragEnabled là true
        if (!dragEnabled) return;

        e.preventDefault();
        isDragging = true;
        startPosX = e.touches[0].clientX;
        galleryTrack.style.transition = 'none';
        stopAutoScroll(); // Dừng tự động cuộn khi bắt đầu kéo
    });

    // Mouse Move / Touch Move (không cần thay đổi logic, chỉ bị ảnh hưởng bởi isDragging)
    galleryTrack.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
    });

    galleryTrack.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
    });

    // Mouse Up / Touch End (trên document để xử lý khi nhả chuột ngoài gallery)
    document.addEventListener('mouseup', (e) => {
        if (!isDragging) return;
        isDragging = false;
        galleryTrack.style.transition = 'transform 0.8s ease-in-out';

        const endPosX = e.clientX;
        const dragThreshold = 50;

        if (endPosX - startPosX > dragThreshold){
            currentIndex = (currentIndex + 1) % totalSlides;
        } else if (startPosX - endPosX > dragThreshold) {
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        }
        updateGallery();
        // Không gọi startAutoScroll ở đây. Sẽ được gọi trong mouseleave nếu không đang kéo.
    });

    document.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        isDragging = false;
        galleryTrack.style.transition = 'transform 0.8s ease-in-out';

        const endPosX = e.changedTouches[0].clientX;
        const dragThreshold = 50;

        if (endPosX - startPosX > dragThreshold){
            currentIndex = (currentIndex + 1) % totalSlides;
        } else if (startPosX - endPosX > dragThreshold) {
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        }
        updateGallery();
        // Không gọi startAutoScroll ở đây.
    });

    // --- Thêm chức năng dừng/chạy khi di chuột vào/ra ---
    galleryTrack.addEventListener('mouseenter', () => {
        // stopAutoScroll();
    });

    galleryTrack.addEventListener('mouseleave', () => {
        // Chỉ bắt đầu lại tự động cuộn nếu không đang kéo và dragEnabled không ảnh hưởng đến việc khởi động lại auto-scroll sau mouseleave
        if (!isDragging) {
            startAutoScroll();
        }
    });

    // Hàm điều khiển tự động cuộn
    function startAutoScroll() {
        if (totalSlides > 1) {
            stopAutoScroll(); // Đảm bảo chỉ có một interval chạy
            autoScrollInterval = setInterval(() => {
                currentIndex = (currentIndex + 1) % totalSlides;
                updateGallery();
            }, 2000); // Tự động cuộn sau mỗi 2 giây
        }
    }

    function stopAutoScroll() {
        if (autoScrollInterval) {
            clearInterval(autoScrollInterval);
            autoScrollInterval = null;
        }
    }

    // Khởi tạo gallery và bắt đầu tự động cuộn khi tải trang
    updateGallery();
    startAutoScroll();
});