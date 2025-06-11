// script.js

document.addEventListener('DOMContentLoaded', () => {
    const galleryTrack = document.querySelector('.gallery-track');
    // const slides = document.querySelectorAll('.gallery-slide'); // <--- DÒNG NÀY SẼ BỊ LỖI
    const prevButton = document.querySelector('.gallery-button.prev');
    const nextButton = document.querySelector('.gallery-button.next');
    const numberOfSlides = 20; // Tổng số slide bạn muốn tạo

    let currentIndex = 0;
    let slides = []; // Khởi tạo mảng slides rỗng

    // --- 1. Tạo động các slide ---
    for (let i = 1; i <= numberOfSlides; i++) {
        const slideDiv = document.createElement('div');
        slideDiv.classList.add('gallery-slide');

        const img = document.createElement('img');
        img.src = `images/gallery/${i}.jpg`; // Tên ảnh theo index
        img.alt = `Mô tả ảnh ${i}`; // Mô tả ảnh theo index

        slideDiv.appendChild(img);
        galleryTrack.appendChild(slideDiv);
    }

    // --- CẬP NHẬT: Chọn lại các slide sau khi đã tạo động ---
    slides = document.querySelectorAll('.gallery-slide');
    const totalSlides = slides.length; // Bây giờ totalSlides sẽ là 20

    // Hàm cập nhật trạng thái hiển thị của các slide
    function updateGallery() {
        // Áp dụng transform cho gallery-track để dịch chuyển các slide
        // Lưu ý: hiệu ứng 3D/hiển thị slide lân cận thường yêu cầu CSS phức tạp hơn
        // để định vị và xoay các slide. Phần JS này chủ yếu điều khiển chỉ số.
        // Nếu bạn muốn 3D thực sự, cần thêm CSS transform-style: preserve-3d;
        // và các transform tương ứng cho .gallery-slide.
        // galleryTrack.style.transform = `translateX(-${currentIndex * (100 / totalSlides)}%)`;

        slides.forEach((slide, index) => {
            slide.classList.remove('active', 'prev-visible', 'next-visible');

            // Xác định slide trước đó và slide kế tiếp (quay vòng)
            let prevIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            let nextIndex = (currentIndex + 1) % totalSlides;

            if (index === currentIndex) {
                slide.classList.add('active');
            } else if (index === prevIndex) {
                slide.classList.add('prev-visible');
            } else if (index === nextIndex) {
                slide.classList.add('next-visible');
            }
            // Các slide còn lại sẽ vẫn ẩn (opacity: 0)
        });
    }

    // Xử lý sự kiện khi click nút "Tiếp theo"
    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % totalSlides; // Quay vòng
        updateGallery();
    });

    // Xử lý sự kiện khi click nút "Trước"
    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides; // Quay vòng
        updateGallery();
    });

    // Khởi tạo gallery ở trạng thái ban đầu
    updateGallery();

    // Tùy chọn: Tự động cuộn (hiệu ứng 3D trông rất đẹp khi tự động cuộn)
    // Dừng tự động cuộn nếu tổng số slide là 0 hoặc 1 (không có gì để cuộn)
    if (totalSlides > 1) {
        setInterval(() => {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateGallery();
        }, 2000); // Tự động cuộn sau mỗi 2 giây
    }
});