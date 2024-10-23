document.querySelectorAll('.read-more').forEach(button => {
    button.addEventListener('click', () => {
        const content = button.previousElementSibling;
        content.classList.toggle('expanded');
        button.textContent = content.classList.contains('expanded') ? 'Свернуть' : 'Еще описание';
    });
});

document.querySelectorAll('.tabs button').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.tabs button').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        // Логика для фильтрации участников
    });
});
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const carousel = document.querySelector('.carousel');

let scrollAmount = 0;

prevBtn.addEventListener('click', () => {
    carousel.scrollBy({ left: -200, behavior: 'smooth' });
});

nextBtn.addEventListener('click', () => {
    carousel.scrollBy({ left: 200, behavior: 'smooth' });
});
