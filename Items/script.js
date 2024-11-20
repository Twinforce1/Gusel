// Атрибутика
const merchTrack = document.querySelector('.merch-track');
const prevButton2 = document.querySelector('.prev-btn2');
const nextButton2 = document.querySelector('.next-btn2');
const items2 = Array.from(document.querySelectorAll('.merch-item'));

function getGap(track) {
    const computedStyle = window.getComputedStyle(track);
    return parseInt(computedStyle.gap) || 0;
}

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

const mainImage = document.querySelector('.main-image');
const thumbnails = document.querySelectorAll('.thumbnail');

mainImage.src = document.querySelector('.thumbnail.active').src;

thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', () => {

        mainImage.src = thumbnail.src;

        thumbnails.forEach(thumb => thumb.classList.remove('active'));
        thumbnail.classList.add('active');
    });
});

const sections = document.querySelectorAll('section');
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
});

sections.forEach((section) => observer.observe(section));