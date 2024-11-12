// Атрибутика
const merchTrack = document.querySelector('.merch-track');
const prevButton2 = document.querySelector('.prev-btn2');
const nextButton2 = document.querySelector('.next-btn2');
const items2 = Array.from(document.querySelectorAll('.merch-item'));

const itemWidth2 = items2[0].offsetWidth + 20;

let currentPosition2 = 0;

function moveCarousel(position, transition = true) {
    merchTrack.style.transition = transition ? 'transform 0.7s ease' : 'none';
    merchTrack.style.transform = `translate3D(${position}px, 0, 0)`;
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

// Получаем основное изображение и все миниатюры
const mainImage = document.querySelector('.main-image');
const thumbnails = document.querySelectorAll('.thumbnail');

mainImage.src = document.querySelector('.thumbnail.active').src;

// Добавляем обработчик события для каждой миниатюры
thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', () => {
        // Меняем источник основного изображения на источник миниатюры
        mainImage.src = thumbnail.src;

        // Добавляем активный класс для выделения выбранной миниатюры
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