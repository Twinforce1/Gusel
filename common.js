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
