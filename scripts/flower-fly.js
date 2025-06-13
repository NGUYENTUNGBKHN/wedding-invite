// script.js
document.addEventListener('DOMContentLoaded', () => {
    const flowerContainer = document.getElementById('flower-fly-container');
    const numberOfFlowers = 10; // Số lượng bông hoa bạn muốn hiển thị đồng thời
    const minFallDuration = 5; // Thời gian rơi tối thiểu (giây)
    const maxFallDuration = 10; // Thời gian rơi tối đa (giây)
    const flowerTypes = ['type1', 'type2', 'type3']; // Các loại hoa để đa dạng màu sắc

    function createFlower() {
        const flower = document.createElement('div');
        flower.classList.add('flower-fly');

        const randomType = flowerTypes[Math.floor(Math.random() * flowerTypes.length)];
        flower.classList.add(randomType);

        const startX = Math.random() * window.innerWidth;
        flower.style.left = `${startX}px`;

        const randomSize = Math.random() * (10 - 5) + 5;
        flower.style.width = `${randomSize}px`;
        flower.style.height = `${randomSize}px`;

        const fallDuration = Math.random() * (maxFallDuration - minFallDuration) + minFallDuration;
        flower.style.animationDuration = `${fallDuration}s`;

        // --- Bỏ comment dòng này hoặc thêm vào nếu chưa có ---
        flower.style.animationDelay = `${Math.random() * 0.1}s`; // Thêm độ trễ ngẫu nhiên từ 0 đến 5 giây

        flowerContainer.appendChild(flower);

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
    }, 5000); // Tăng thời gian tạo hoa mới lên một chút, ví dụ 1.5 giây
});