// Home.js
document.addEventListener('DOMContentLoaded', function() {
    const home_groom_elements = document.querySelectorAll('.animate-home-groom'); 
    const home_bride_elements = document.querySelectorAll('.animate-home-bride'); 
    const home_elements = document.querySelectorAll('.animate-home');           
    const home_container = document.querySelector('.couple-names');          

    // Chỉ thiết lập IntersectionObserver nếu home_container tồn tại
    if (home_container) {
        const homeObserverOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1 // Kích hoạt khi 10% của home_container hiển thị
        };

        const homeObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Lặp qua từng phần tử trong NodeList để thêm class 'is-visible'
                    home_groom_elements.forEach(el => el.classList.add('is-visible'));
                    home_bride_elements.forEach(el => el.classList.add('is-visible'));
                    home_elements.forEach(el => el.classList.add('is-visible'));
                } else {
                    // Tùy chọn: Xóa class 'is-visible' khi không còn hiển thị
                    home_groom_elements.forEach(el => el.classList.remove('is-visible'));
                    home_bride_elements.forEach(el => el.classList.remove('is-visible'));
                    home_elements.forEach(el => el.classList.remove('is-visible'));
                }
            });
        }, homeObserverOptions);

        homeObserver.observe(home_container);
    }
});