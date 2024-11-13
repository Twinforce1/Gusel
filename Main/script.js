// Герои
// const track = document.querySelector('.hero-track');
// const prevButton = document.querySelector('.prev-btn');
// const nextButton = document.querySelector('.next-btn');
// const items = Array.from(track.children);

// const itemWidth = items[0].getBoundingClientRect().width;
// let currentPosition = 0;

// function moveToSlide(index) {
//     const amountToMove = -itemWidth * index;
//     track.style.transform = `translateX(${amountToMove}px)`;
//     currentPosition = index;
// }

// prevButton.addEventListener('click', () => {
//     if (currentPosition > 0) {
//         moveToSlide(currentPosition - 1);
//     } else {
//         moveToSlide(items.length - 1)
//     }
// });

// nextButton.addEventListener('click', () => {
//     if (currentPosition < items.length - 1) {
//         moveToSlide(currentPosition + 1);
//     } else {
//         moveToSlide(0);
//     }
// });

// Атрибутика
const merchTrack = document.querySelector('.merch-track');
const prevButton2 = document.querySelector('.prev-btn2');
const nextButton2 = document.querySelector('.next-btn2');
const items2 = Array.from(document.querySelectorAll('.merch-item'));

const gap2 = getGap(merchTrack);
const itemWidth2 = (items2[0].offsetWidth + gap2);

let currentPosition2 = 0;

function moveCarousel(position, transition = true) {
    merchTrack.style.transition = transition ? 'transform 0.7s ease' : 'none';
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

const gap3 = getGap(yaTrack);
const itemWidth3 = items3[0].offsetWidth + gap3;

let currentPosition3 = 0;

function moveCarousel2(position, transition = true) {
    yaTrack.style.transition = transition ? 'transform 0.7s ease' : 'none';
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

const itemWidth4 = items4[0].offsetWidth + gap3;

let currentPosition4 = 0;

function moveCarousel3(position, transition = true) {
    paninTrack.style.transition = transition ? 'transform 0.7s ease' : 'none';
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

//Автоматические карусели
const intervalTime = 6000;

const photos1Track = document.querySelector('.photos1-track');
const photos2Track = document.querySelector('.photos2-track');

function getGap(track) {
    const computedStyle = window.getComputedStyle(track);
    return parseInt(computedStyle.gap) || 0;
}

function scroll(track, direction) {
    const photoWidth = track.firstElementChild.offsetWidth;
    const gap = getGap(track);
    const offset = direction === 'left' ? -(photoWidth + gap) : (photoWidth + gap);

    track.style.transition = 'transform 1.5s ease';
    track.style.transform = `translate3D(${offset}px, 0, 0)`;

    setTimeout(() => {
        track.appendChild(track.firstElementChild);
        track.style.transition = 'none';
        track.style.transform = 'translate3D(0, 0, 0)';
    }, 2000);
}

function startCarousel() {
    scroll(photos1Track, 'left');
    scroll(photos2Track, 'right');
}

setInterval(startCarousel, intervalTime);

const sections = document.querySelectorAll('section');
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
});

sections.forEach((section) => observer.observe(section));
