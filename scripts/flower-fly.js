// flower-fly.js
document.addEventListener('DOMContentLoaded', () => {
    const flowerContainer = document.getElementById('flower-fly-container');
    const numberOfFlowers = 10; // Number of flowers simultaneously display
    const minFallDuration = 5; // Min of time fall (second)
    const maxFallDuration = 10; // Max of time fall (second)
    const flowerTypes = ['type1', 'type2', 'type3']; // type of flower
    
    // create flower
    function createFlower() {
        const flower = document.createElement('div');
        flower.classList.add('flower-fly');

        const randomType = flowerTypes[Math.floor(Math.random() * flowerTypes.length)];
        flower.classList.add(randomType);

        const startX = Math.random() * window.innerWidth;
        flower.style.left = `${startX}px`;

        const randomSize = Math.random() * (15 - 10) + 10;
        flower.style.width = `${randomSize}px`;
        flower.style.height = `${randomSize}px`;

        const fallDuration = Math.random() * (maxFallDuration - minFallDuration) + minFallDuration;
        flower.style.animationDuration = `${fallDuration}s`;

        flower.style.animationDelay = `${Math.random() * 0.1}s`; // delay 0.1s

        flowerContainer.appendChild(flower);

        flower.addEventListener('animationend', () => {
            flower.remove();
        });
    }

    //  create initial number of flowers 
    for (let i = 0; i < numberOfFlowers; i++) {
        createFlower();
    }

    // After 5s create flower
    setInterval(() => {
        createFlower();
    }, 7000);
});