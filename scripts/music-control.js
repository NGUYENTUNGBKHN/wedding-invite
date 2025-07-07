document.addEventListener('DOMContentLoaded', function() {
    const backgroundMusic = document.getElementById('backgroundMusic');
    const musicToggleButton = document.getElementById('musicToggleButton');

    let isPlaying = false; // Tracking status music

    musicToggleButton.addEventListener('click', function() {
        if (isPlaying) {
            backgroundMusic.pause();
            musicToggleButton.innerHTML = '<i class="fas fa-volume-mute"></i>'; // Icon music off
            isPlaying = false;
        } else {
            backgroundMusic.play().then(() => {
                musicToggleButton.innerHTML = '<i class="fas fa-volume-up"></i>'; // Icon music on
                isPlaying = true;
            }).catch(error => {

            }); 
        }
    });

    // Listen event "play" và "pause" to upgrade icon if music control by other way
    backgroundMusic.addEventListener('play', () => {
        musicToggleButton.innerHTML = '<i class="fas fa-volume-up"></i>';
        isPlaying = true;
    });

    backgroundMusic.addEventListener('pause', () => {
        musicToggleButton.innerHTML = '<i class="fas fa-volume-mute"></i>';
        isPlaying = false;
    });

    if (!backgroundMusic.paused) {
        musicToggleButton.innerHTML = '<i class="fas fa-volume-up"></i>';
        isPlaying = true;
    } else {
        musicToggleButton.innerHTML = '<i class="fas fa-volume-mute"></i>';
        isPlaying = false;
    }
});