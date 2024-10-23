const track = document.querySelector('.carousel-track');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const cards = document.querySelectorAll('.product-card');

let currentIndex = 0;
const cardWidth = cards[0].getBoundingClientRect().width;
const totalCards = cards.length;
const visibleCards = 3; // Количество видимых карточек

// Позиция трека
function setTrackPosition() {
    track.style.transform = `translateX(${-currentIndex * (cardWidth + 20)}px)`; // 20px — это зазор между карточками
}

// Кнопка "Назад"
prevBtn.addEventListener('click', () => {
    currentIndex--;
    setTrackPosition();
    updateButtons();
});

// Кнопка "Вперед"
nextBtn.addEventListener('click', () => {
    currentIndex++;
    setTrackPosition();
    updateButtons();
});

// Обновляем кнопки (чтобы отключать их, если достигли конца)
function updateButtons() {
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= totalCards - visibleCards;
}

// Инициализация
setTrackPosition();
updateButtons();
