document.addEventListener('DOMContentLoaded', function() {
    const backgroundMusic = document.getElementById('backgroundMusic');
    const musicToggleButton = document.getElementById('musicToggleButton');

    let isPlaying = false; // Theo dõi trạng thái nhạc

    musicToggleButton.addEventListener('click', function() {
        if (isPlaying) {
            backgroundMusic.pause();
            musicToggleButton.innerHTML = '<i class="fas fa-volume-mute"></i>'; // Icon tắt tiếng
            isPlaying = false;
        } else {
            backgroundMusic.play().then(() => {
                musicToggleButton.innerHTML = '<i class="fas fa-volume-up"></i>'; // Icon bật tiếng
                isPlaying = true;
            }).catch(error => {
                // console.error("Error playing music:", error);
                // Có thể hiển thị thông báo nhẹ nhàng hơn alert
                // alert("Trình duyệt chặn tự động phát nhạc. Vui lòng bật âm thanh thủ công.");
            });
        }
    });

    // Lắng nghe sự kiện "play" và "pause" để cập nhật icon nếu nhạc được điều khiển bằng cách khác
    backgroundMusic.addEventListener('play', () => {
        musicToggleButton.innerHTML = '<i class="fas fa-volume-up"></i>';
        isPlaying = true;
    });

    backgroundMusic.addEventListener('pause', () => {
        musicToggleButton.innerHTML = '<i class="fas fa-volume-mute"></i>';
        isPlaying = false;
    });

    // Thêm một lần kiểm tra ban đầu cho trường hợp nhạc tự động phát (mặc dù hiếm)
    // hoặc khi người dùng quay lại trang
    if (!backgroundMusic.paused) {
        musicToggleButton.innerHTML = '<i class="fas fa-volume-up"></i>';
        isPlaying = true;
    } else {
        musicToggleButton.innerHTML = '<i class="fas fa-volume-mute"></i>';
        isPlaying = false;
    }
});