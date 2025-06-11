// script.js
document.addEventListener('DOMContentLoaded', () => {
    const flowerContainer = document.getElementById('flower-fly-container');
    const numberOfFlowers = 30; // Số lượng bông hoa bạn muốn hiển thị đồng thời
    const minFallDuration = 8; // Thời gian rơi tối thiểu (giây)
    const maxFallDuration = 15; // Thời gian rơi tối đa (giây)
    const flowerTypes = ['type1', 'type2', 'type3']; // Các loại hoa để đa dạng màu sắc

    function createFlower() {
        const flower = document.createElement('div');
        flower.classList.add('flower-fly');

        // Chọn một loại hoa ngẫu nhiên
        const randomType = flowerTypes[Math.floor(Math.random() * flowerTypes.length)];
        flower.classList.add(randomType);

        // Đặt vị trí bắt đầu ngẫu nhiên
        const startX = Math.random() * window.innerWidth;
        flower.style.left = `${startX}px`;

        // Kích thước ngẫu nhiên (tùy chọn)
        const randomSize = Math.random() * (30 - 10) + 10; // Từ 10px đến 30px
        flower.style.width = `${randomSize}px`;
        flower.style.height = `${randomSize}px`;

        // Thời gian rơi ngẫu nhiên
        const fallDuration = Math.random() * (maxFallDuration - minFallDuration) + minFallDuration;
        flower.style.animationDuration = `${fallDuration}s`;
        flower.style.animationDelay = `${Math.random() * 5}s`; // Thêm độ trễ để hoa không rơi cùng lúc

        flowerContainer.appendChild(flower);

        // Xóa bông hoa sau khi nó rơi ra khỏi màn hình để tối ưu hiệu suất
        flower.addEventListener('animationend', () => {
            flower.remove();
        });
    }

    // Tạo một số lượng hoa ban đầu
    for (let i = 0; i < numberOfFlowers; i++) {
        createFlower();
    }

    // Liên tục tạo hoa mới để duy trì hiệu ứng
    setInterval(() => {
        createFlower();
    }, 1000); // Tạo một bông hoa mới mỗi 1 giây (có thể điều chỉnh)
});