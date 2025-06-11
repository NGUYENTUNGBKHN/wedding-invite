// scripts/scroll-animation.js

document.addEventListener('DOMContentLoaded', function() {
    const archBottom = document.querySelector('.arch-bottom');
    const archwrapper = document.querySelector('.arch-wrapper'); // Container cho mái vòm

    // Chọn tất cả các phần tử chữ cần animate
    const textElements = document.querySelectorAll('.animate-text-on-scroll');
    const textContainer = document.querySelector('.date-layout'); // Hoặc một container chung cho các chữ này

    // --- Observer cho mái vòm ---
    if (archBottom && archwrapper) {
        const archObserverOptions = {
            root: null,
            rootMargin: '0px',
            threshold: [0, 0.5] // Kích hoạt khi 0% và 50% hiển thị
        };

        const archObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
                    archBottom.classList.add('is-visible');
                } else if (!entry.isIntersecting && entry.intersectionRatio === 0) {
                    archBottom.classList.remove('is-visible');
                }
            });
        }, archObserverOptions);

        archObserver.observe(archwrapper);
    }

    // --- Observer cho các chữ ---
    if (textElements.length > 0 && textContainer) {
        const textObserverOptions = {
            root: null,
            rootMargin: '0px',
            threshold: [0, 0.5] // Kích hoạt khi 0% và 50% hiển thị
        };

        const textObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
                    // Khi container chứa chữ xuất hiện
                    textElements.forEach(textEl => {
                        textEl.classList.add('is-visible-text');
                    });
                } else if (!entry.isIntersecting && entry.intersectionRatio === 0) {
                    // Khi container chứa chữ khuất khỏi tầm nhìn, xóa class
                    textElements.forEach(textEl => {
                        textEl.classList.remove('is-visible-text');
                    });
                }
            });
        }, textObserverOptions);

        textObserver.observe(textContainer); // Theo dõi container chung của các chữ
    }
});