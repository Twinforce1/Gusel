let inputPhone=document.getElementById("guardianPhone");
inputPhone.oninput=()=>phoneMask(inputPhone)
function phoneMask(inputEl) {
    let patStringArr = "+7(___)___-__-__".split('');
    let arrPush = [3, 4, 5, 7, 8, 9, 11, 12, 14, 15]
    let val = inputEl.value;
    let arr = val.replace(/\D+/g, "").split('').splice(1);
    let n;
    let ni;
    arr.forEach((s, i) => {
        n = arrPush[i];
        patStringArr[n] = s
        ni = i
    });
    arr.length < 10 ? inputEl.style.color = 'red' : inputEl.style.color = 'green';
    inputEl.value = patStringArr.join('');
    n ? inputEl.setSelectionRange(n + 1, n + 1) : inputEl.setSelectionRange(17, 17)
}

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

function toggleCart() {
    const cartMenu = document.querySelector(".cart-menu");
    const checkoutMenu = document.querySelector(".checkout-menu");
    const mainContainer = document.querySelector(".main_container");
    const maskContent = document.querySelector(".mask-content");

    const isCartOpen = cartMenu.classList.contains("active");
    const isCheckoutOpen = checkoutMenu && checkoutMenu.classList.contains("active");

    if (isCartOpen || isCheckoutOpen) {
        cartMenu.classList.remove("active");
        if (checkoutMenu) checkoutMenu.classList.remove("active");
        mainContainer.classList.remove("blur-active");
        maskContent.classList.remove("active");
    } else {
        cartMenu.classList.add("active");
        mainContainer.classList.add("blur-active");
        maskContent.classList.add("active");
    }
}

function toggleCheckout() {
    const cartMenu = document.querySelector(".cart-menu");
    const checkoutMenu = document.querySelector(".checkout-menu");
    const mainContainer = document.querySelector(".main_container");

    cartMenu.classList.remove("active");
    checkoutMenu.classList.add("active");
    mainContainer.classList.add("blur-active");
}

function back() {
    document.querySelector(".cart-menu").classList.toggle("active");
    document.querySelector(".checkout-menu").classList.remove("active");
}

function proceedToCheckout() {
    const sizeSelectors = document.querySelectorAll('.size-selector');
    let allSizesSelected = true;

    sizeSelectors.forEach(selector => {
        if (selector.value === "") {
            allSizesSelected = false;
        }
    });

    if (!allSizesSelected) {
        alert("Пожалуйста, выберите размер для всех товаров перед оформлением заказа");
        return;
    }

    if (sizeSelectors.length === 0) {
        alert("В корзине пусто")
        return;
    }

    toggleCheckout();
}

// let cartItems = document.querySelectorAll("cart-items");

// function updateCounter() {
//     const cartCount = document.getElementById("cart-count");
//     cartCount.textContent = cartItems.length;
//     console.log(cartItems.values);
// }

// updateCounter();