// Герои
const track = document.querySelector('.hero-track');
const prevButton = document.querySelector('.prev-btn');
const nextButton = document.querySelector('.next-btn');
const items = Array.from(track.children);

const itemWidth = items[0].getBoundingClientRect().width;
let currentPosition = 0;

function moveToSlide(index) {
    const amountToMove = -itemWidth * index;
    track.style.transform = `translateX(${amountToMove}px)`;
    currentPosition = index;
}

prevButton.addEventListener('click', () => {
    if (currentPosition > 0) {
        moveToSlide(currentPosition - 1);
    } else {
        moveToSlide(items.length - 1)
    }
});

nextButton.addEventListener('click', () => {
    if (currentPosition < items.length - 1) {
        moveToSlide(currentPosition + 1);
    } else {
        moveToSlide(0);
    }
});

// Атрибутика
const merchTrack = document.querySelector('.merch-track');
const prevButton2 = document.querySelector('.prev-btn2');
const nextButton2 = document.querySelector('.next-btn2');
const items2 = Array.from(document.querySelectorAll('.merch-item'));

const itemWidth2 = items2[0].offsetWidth + 20;

let currentPosition2 = 0;

function moveCarousel(position, transition = true) {
    merchTrack.style.transition = transition ? 'transform 0.7s ease-in-out' : 'none';
    merchTrack.style.transform = `translateX(${position}px)`;
}

nextButton2.addEventListener('click', () => {
    if (currentPosition2 > -(itemWidth2 * (items2.length - 1))) {
        currentPosition2 -= itemWidth2;
        moveCarousel(currentPosition2);
    } else {
        currentPosition2 = 0;
        setTimeout(() => {
            moveCarousel(currentPosition2);
        }, 300);
    }
});

prevButton2.addEventListener('click', () => {
    if (currentPosition2 < 0) {
        currentPosition2 += itemWidth2;
        moveCarousel(currentPosition2);
    } else {
        currentPosition2 = -(itemWidth2 * (items2.length - 1));
        setTimeout(() => {
            moveCarousel(currentPosition2);
        }, 300);
    }
});

// Команда Яковлева
const yaTrack = document.querySelector('.yakovlev-track');
const prevButton3 = document.querySelector('.prev-btn3');
const nextButton3 = document.querySelector('.next-btn3');
const items3 = Array.from(document.querySelectorAll('.yakovlev-item'));

const itemWidth3 = items3[0].offsetWidth + 20;

let currentPosition3 = 0;

function moveCarousel2(position, transition = true) {
    yaTrack.style.transition = transition ? 'transform 0.7s ease-in-out' : 'none';
    yaTrack.style.transform = `translateX(${position}px)`;
}

nextButton3.addEventListener('click', () => {
    if (currentPosition3 > -(itemWidth3 * (items3.length - 1))) {
        currentPosition3 -= itemWidth3;
        moveCarousel2(currentPosition3);
    } else {
        currentPosition3 = 0;
        setTimeout(() => {
            moveCarousel2(currentPosition3);
        }, 300);
    }
});

prevButton3.addEventListener('click', () => {
    if (currentPosition3 < 0) {
        currentPosition3 += itemWidth3;
        moveCarousel2(currentPosition3);
    } else {
        currentPosition3 = -(itemWidth3 * (items3.length - 1));
        setTimeout(() => {
            moveCarousel2(currentPosition3);
        }, 300);
    }
});

// Команда Панина

const paninTrack = document.querySelector('.panin-track');
const prevButton4 = document.querySelector('.prev-btn4');
const nextButton4 = document.querySelector('.next-btn4');
const items4 = Array.from(document.querySelectorAll('.panin-item'));

const itemWidth4 = items4[0].offsetWidth + 20;

let currentPosition4 = 0;

function moveCarousel3(position, transition = true) {
    paninTrack.style.transition = transition ? 'transform 0.7s ease-in-out' : 'none';
    paninTrack.style.transform = `translateX(${position}px)`;
}

nextButton4.addEventListener('click', () => {
    if (currentPosition4 > -(itemWidth4 * (items4.length - 1))) {
        currentPosition4 -= itemWidth4;
        moveCarousel3(currentPosition4);
    } else {
        currentPosition4 = 0;
        setTimeout(() => {
            moveCarousel3(currentPosition4);
        }, 300);
    }
});

prevButton4.addEventListener('click', () => {
    if (currentPosition4 < 0) {
        currentPosition4 += itemWidth4;
        moveCarousel3(currentPosition4);
    } else {
        currentPosition4 = -(itemWidth4 * (items4.length - 1));
        setTimeout(() => {
            moveCarousel3(currentPosition4);
        }, 300);
    }
});

// Фон у шапки
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const threshold = 70;

    if (scrollTop > threshold) {
        header.classList.add('blur');
    } else {
        header.classList.remove('blur');
    }
});

//Автоматические карусели

const intervalTime = 4000;
const photoWidth = 277;

const photos1Track = document.querySelector('.photos1-track');
const photos2Track = document.querySelector('.photos2-track');

function scrollLeft() {
    photos1Track.style.transition = 'transform 1.5s ease-in-out';
    photos1Track.style.transform = `translateX(-${photoWidth}px)`;

    setTimeout(() => {
        photos1Track.appendChild(photos1Track.firstElementChild);
        photos1Track.style.transition = 'none';
        photos1Track.style.transform = 'translateX(0)';
    }, 2000);
}

function scrollRight() {
    photos2Track.style.transition = 'transform 1.5s ease-in-out';
    photos2Track.style.transform = `translateX(${photoWidth}px)`;

    setTimeout(() => {
        photos2Track.appendChild(photos2Track.firstElementChild);
        photos2Track.style.transition = 'none';
        photos2Track.style.transform = 'translateX(0)';
    }, 2000);
}

setInterval(scrollLeft, intervalTime);
setInterval(scrollRight, intervalTime);