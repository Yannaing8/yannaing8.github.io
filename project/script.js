let iconCart = document.querySelector('.icon-cart');
let closeCart = document.querySelector('.close');
let body = document.querySelector('body');

iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart')
})
closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart')
})

let cartItems = [];
let cartCount = 0;

const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartIconCount = document.querySelector('.icon-cart span');
const listCart = document.querySelector('.listCart');

addToCartButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const product = button.parentElement;
        const name = product.querySelector('h3').textContent;
        const price = product.querySelector('.discounted-price').textContent;
        const imgSrc = product.querySelector('img').getAttribute('src');

        const existingItem = cartItems.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cartItems.push({
                name,
                price,
                image: imgSrc,
                quantity: 1
            });
        }

        cartCount++;
        cartIconCount.textContent = cartCount;
        updateCartDisplay();
    });
});

function updateCartDisplay() {
    listCart.innerHTML = '';

    cartItems.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('item');

        cartItem.innerHTML = `
            <div class="image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="name">${item.name}</div>
            <div class="discounted-price">${item.price}</div>
            <div class="quantity">
                <span class="minus" data-index="${index}">-</span>
                <span>${item.quantity}</span>
                <span class="plus" data-index="${index}">+</span>
            </div>
        `;

        listCart.appendChild(cartItem);
    });
    document.querySelectorAll('.plus').forEach(button => {
        button.addEventListener('click', () => {
            const index = button.getAttribute('data-index');
            cartItems[index].quantity++;
            cartCount++;
            cartIconCount.textContent = cartCount;
            updateCartDisplay();
        });
    });

    document.querySelectorAll('.minus').forEach(button => {
        button.addEventListener('click', () => {
            const index = button.getAttribute('data-index');
            if (cartItems[index].quantity > 1) {
                cartItems[index].quantity--;
                cartCount--;
            } else {
                cartCount -= cartItems[index].quantity;
                cartItems.splice(index, 1);
            }
            cartIconCount.textContent = cartCount;
            updateCartDisplay();
        });
    });
}
const secondCarousel = document.querySelector('.second-carousel');
document.querySelector('.second-left').addEventListener('click', () => {
    secondCarousel.scrollBy({ left: -300, behavior: 'smooth' });
});
document.querySelector('.second-right').addEventListener('click', () => {
    secondCarousel.scrollBy({ left: 300, behavior: 'smooth' });
});
