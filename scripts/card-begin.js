// scripts/card-begin.js

document.addEventListener('DOMContentLoaded', () => {
    const cardContainer = document.getElementById('cardContainer');
    const openCardBtn = document.getElementById('openCardBtn');
    const htmlElement = document.documentElement; // Lấy thẻ <html>

    if (openCardBtn && cardContainer && htmlElement) {
        openCardBtn.addEventListener('click', () => {
            cardContainer.classList.add('open'); // Kích hoạt animation đóng thiệp

            // Sau khi animation hoàn tất (1 giây, dựa trên transition trong CSS)
            setTimeout(() => {
                cardContainer.style.display = 'none'; // Ẩn thiệp đi
                htmlElement.classList.remove('no-scroll'); // Loại bỏ class no-scroll
                // Bắt đầu nhạc nếu bạn muốn (từ music-control.js)
                // const backgroundMusic = document.getElementById('backgroundMusic');
                // if (backgroundMusic && backgroundMusic.paused) {
                //     backgroundMusic.play().catch(e => console.error("Error playing music:", e));
                // }
            }, 1000); // Thời gian này phải khớp với transition trong card-begin.css
        });
    }
});

window.addEventListener('load', async ()  => {
    const card = document.getElementById('cardContainer');
    const htmlElement = document.documentElement; // Lấy thẻ <html>
    const params = new URLSearchParams(window.location.search);
    const guestId = params.get('guest');

    const welcomeText = document.getElementById('welcomeText');
    const openCardBtn = document.getElementById('openCardBtn');

    if (guestId) {
        try {
            const doc = await firebase.firestore().collection("guests").doc(guestId).get();
            if (doc.exists) {
                const guestName = doc.data().name;

                // Hiển thị tên người nhận
                welcomeText.innerHTML = `Gửi <strong>${guestName}</strong> `;

                // Hiện nút "Mở thiệp"
                openCardBtn.style.display = 'inline-block'; // hoặc 'block'
            } else {
                welcomeText.innerHTML = "Không tìm thấy thông tin khách mời.";
            }
        } catch (error) {
            // console.error("Lỗi khi lấy dữ liệu khách mời:", error);
            welcomeText.innerText = "Đã xảy ra lỗi khi tải thông tin.";
        }
    } else {
        welcomeText.innerText = "Vui lòng mở liên kết thiệp đúng định dạng.";
    }


    if (card) {
        card.classList.remove('open');
        card.style.display = 'flex';
        card.style.opacity = 1;
        htmlElement.classList.add('no-scroll');
        card.scrollIntoView({ behavior: 'smooth' });
    }
});

  
