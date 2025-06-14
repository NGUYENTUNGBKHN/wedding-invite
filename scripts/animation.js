// animation.js

document.addEventListener('DOMContentLoaded', function() {
    const archBottom = document.querySelector('.arch-bottom');
    const archwrapper = document.querySelector('.arch-wrapper'); // Container cho mái vòm

    // Chọn tất cả các phần tử chữ cần animate
    const textElements = document.querySelectorAll('.animate-text-on-scroll');
    const textContainer = document.querySelector('.date-layout'); // Hoặc một container chung cho các chữ này

    // flower
    const flowerElements = document.querySelectorAll('.animate-flower-on');
    const flowerContainer = document.querySelector('.flower-section');

    // name group
    const name_left_right = document.querySelectorAll('.animate-text-left-to-right');
    const name_right_left = document.querySelectorAll('.animate-text-right-to-left');
    const name_pulse    =  document.querySelectorAll('.animate-text-pulse');
    const textContainer_2 = document.querySelector('.names-group');

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
    // Chữ names-group
    if (textContainer_2) {
        const textObserverOptions_2 = {
            root: null,
            rootMargin: '0px',
            threshold: [0, 0.5] // Kích hoạt khi 0% và 50% hiển thị
        };

        const textObserver_2 = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
                    // Khi container chứa chữ xuất hiện
                    name_left_right.forEach(textEl => {
                        textEl.classList.add('is-visible-text');
                    });
                    name_right_left.forEach(textEl => {
                        textEl.classList.add('is-visible-text');
                    });
                    name_pulse.forEach(textEl => {
                        textEl.classList.add('is-visible-text');
                    });

                } else if (!entry.isIntersecting && entry.intersectionRatio === 0) {
                    // Khi container chứa chữ khuất khỏi tầm nhìn, xóa class
                    name_left_right.forEach(textEl => {
                        textEl.classList.remove('is-visible-text');
                    });
                    name_right_left.forEach(textEl => {
                        textEl.classList.remove('is-visible-text');
                    });
                    name_pulse.forEach(textEl => {
                        textEl.classList.remove('is-visible-text');
                    });
                }
            });
        }, textObserverOptions_2);

        textObserver_2.observe(textContainer_2); // Theo dõi container chung của các chữ
    }

    // flower
    if (flowerElements.length > 0 && flowerContainer) {
        const flowerObserverOptions = {
            root: null,
            rootMargin: '0px',
            threshold: [0, 0.5] // Kích hoạt khi 0% và 50% hiển thị
        };

        const flowerObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
                    // Khi container chứa chữ xuất hiện
                    flowerElements.forEach(textEl => {
                        textEl.classList.add('is-visible-text');
                    });
                } else if (!entry.isIntersecting && entry.intersectionRatio === 0) {
                    // Khi container chứa chữ khuất khỏi tầm nhìn, xóa class
                    flowerElements.forEach(textEl => {
                        textEl.classList.remove('is-visible-text');
                    });
                }
            });
        }, flowerObserverOptions);

        flowerObserver.observe(flowerContainer); // Theo dõi container chung của các chữ
    }
});