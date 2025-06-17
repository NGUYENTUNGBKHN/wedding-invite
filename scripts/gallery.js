// scripts/gallery.js

document.addEventListener('DOMContentLoaded', () => {
    // Select a element image in gallery
    const galleryImagesLeft = document.querySelectorAll('.gallery-image-left');
    const galleryImagesRight = document.querySelectorAll('.gallery-image-right');
    const galleryContainer = document.querySelector('.gallery-container');

    const observerOptions = {
        root: null, // use viewport to root
        rootMargin: '0px',
        threshold: 0.2 // Trigger from 20% of display element
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) { // if element display into viewport
                // add class 'animated' to trigger animation
                entry.target.classList.add('animated');
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Start observer each photo
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
            threshold: 0 
        };

        const textObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    galleryImagesLeft.forEach(textEl => {
                        textEl.classList.remove('animated');
                    });
                    galleryImagesRight.forEach(textEl => {
                        textEl.classList.remove('animated');
                    });
                } 
            });
        }, textObserverOptions);

        textObserver.observe(galleryContainer); // Observer container
    }

});