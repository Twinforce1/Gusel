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