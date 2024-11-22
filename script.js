const cube = document.querySelector('.cube');
let isAutoRotating = true;
let rotationX = 0;
let rotationY = 0;
let rotationSpeed = 0.3; 
let animationFrameId;


autoRotate();

function autoRotate() {
    if (isAutoRotating) {
        rotationX += rotationSpeed;
        rotationY += rotationSpeed;
        cube.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
        animationFrameId = requestAnimationFrame(autoRotate);
    }
}


cube.addEventListener('click', () => {
    isAutoRotating = !isAutoRotating;
    if (isAutoRotating) {
        mouseInitialized = false;
        touchInitialized = false;
        autoRotate();
    } else {
        cancelAnimationFrame(animationFrameId);
    }
});

function updateCubeRotation() {
    cube.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
}

let previousMouseX = 0;
let previousMouseY = 0;
let mouseInitialized = false;

document.addEventListener('mousemove', (e) => {
    if (!isAutoRotating) {
        if (!mouseInitialized) {
            previousMouseX = e.clientX;
            previousMouseY = e.clientY;
            mouseInitialized = true;
        } else {
            const deltaX = e.clientX - previousMouseX;
            const deltaY = e.clientY - previousMouseY;
            rotationY += deltaX * 0.5; 
            rotationX -= deltaY * 0.5;
            updateCubeRotation();
            previousMouseX = e.clientX;
            previousMouseY = e.clientY;
        }
    }
});

let touchStartX = 0;
let touchStartY = 0;
let touchInitialized = false;

document.addEventListener('touchmove', (e) => {
    if (!isAutoRotating) {
        if (!touchInitialized) {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
            touchInitialized = true;
        } else {
            const deltaX = e.touches[0].clientX - touchStartX;
            const deltaY = e.touches[0].clientY - touchStartY;
            rotationY += deltaX * 0.5;
            rotationX -= deltaY * 0.5;
            updateCubeRotation();
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        }
    }
});

document.addEventListener('keydown', (e) => {
    if (!isAutoRotating) {
        const rotationAmount = 45;

        switch (e.key) {
            case 'ArrowLeft':
                rotationY -= rotationAmount;
                break;
            case 'ArrowRight':
                rotationY += rotationAmount;
                break;
            case 'ArrowUp':
                rotationX -= rotationAmount;
                break;
            case 'ArrowDown':
                rotationX += rotationAmount;
                break;
        }

        updateCubeRotation();
    }
});