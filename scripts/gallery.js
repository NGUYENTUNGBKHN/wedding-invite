// scripts/gallery.js

document.addEventListener('DOMContentLoaded', () => {
    // Chọn các phần tử ảnh trong gallery
    const galleryImagesLeft = document.querySelectorAll('.gallery-image-left');
    const galleryImagesRight = document.querySelectorAll('.gallery-image-right');
    const galleryContainer = document.querySelector('.gallery-container');

    const observerOptions = {
        root: null, // Sử dụng viewport làm root
        rootMargin: '0px',
        threshold: 0.5 // Kích hoạt khi 50% của phần tử hiển thị
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) { // Nếu phần tử đang hiển thị trong viewport
                // Thêm lớp 'animated' để kích hoạt animation
                entry.target.classList.add('animated');
                // Ngừng quan sát phần tử này để animation chỉ chạy một lần
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Bắt đầu quan sát từng ảnh
    galleryImagesLeft.forEach(image => {
        observer.observe(image);
    });

    galleryImagesRight.forEach(image => {
        observer.observe(image);
    });


    if (galleryContainer) {
        const textObserverOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0 // Kích hoạt khi 0% và 50% hiển thị
        };

        const textObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Khi container chứa chữ xuất hiện
                    galleryImagesLeft.forEach(textEl => {
                        textEl.classList.remove('animated');
                    });
                    galleryImagesRight.forEach(textEl => {
                        textEl.classList.remove('animated');
                    });
                } 
            });
        }, textObserverOptions);

        textObserver.observe(galleryContainer); // Theo dõi container chung của các chữ
    }

});