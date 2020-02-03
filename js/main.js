
// Variables
const stars = document.querySelectorAll('.product__star');
const arrow = document.querySelectorAll('.product__arrow');
const openMyCart = document.querySelector('.header__corp');
const hoverCart = document.querySelector('.header__right');
const myCart = document.querySelector('.mycart');
const add = document.querySelectorAll('.addBtn');
const del = document.querySelector('.mycart__list');


// Listeners
openMyCart.addEventListener('click', openCart);
hoverCart.addEventListener('mouseenter', openPopUp);
hoverCart.addEventListener('mouseleave', closePopUp);
del.addEventListener('click', removeItem);

// Functions

// Like and dislike of product
stars.forEach(star => {
    star.addEventListener('click', likeItem);
});
function likeItem(star) {
    this.children[0].classList.toggle('fas');
}

// Collapse hidden info for products
arrow.forEach(el => {
    el.addEventListener('click', collapseInfo);
});
function collapseInfo(el) {
    const productWrap = this.parentElement.parentElement;
    productWrap.classList.toggle('wrap__active');
}

// Open popup when item is added
function openPopUp() {
    const addedCart = this.children[1];
    addedCart.classList.toggle('added__cart--active');
}

// Close popup when item is added
function closePopUp() {
    const addedCart = this.children[1];
    addedCart.classList.remove('added__cart--active');
}

// Open MyCart with added products
function openCart() {
    myCart.classList.toggle('mycart__active');
}

// Add new items in cart
add.forEach(el => {
    el.addEventListener('click', addItem);
})

function addItem(e) {
    e.preventDefault();

    // Grab info from data atr
    const wrap = $(this).parent().parent();

    const img = $(wrap).find('[data-img] img');
    const brand = $(wrap).find('[data-name]');
    const subbrand = $(wrap).find('[data-subbrand]');
    const itemno = $(wrap).find('[data-itemno]');
    const listing = $(wrap).find('[data-listing]');
    const wholesale = $(wrap).find('[data-wholesale]');
    const qty = $(wrap).find('.product__qtyNum').val();

    // console.log($(listing).attr('data-listing'));
    // Create obj with data atr info
    const product = {
        img: $(img).attr('src'),
        brand: $(brand).attr('data-name'),
        subbrand: $(subbrand).attr('data-subbrand'),
        itemno: $(itemno).attr('data-itemno'),
        listing: $(listing).attr('data-listing'),
        wholesale: $(wholesale).attr('data-wholesale'),
        qty: qty
    }

    console.log(product);

    // HTML template
    const mycart__list = document.querySelector('.mycart__list');

    const html = `
            <div class="mycart__item">
                <div class="mycart__close"><i class="fas fa-times"></i></div>
                <div class="product__brand">${product.brand} <span class="product__subbrand">${product.subbrand}</span></div>
                <div class="product__wholesale">${product.wholesale}</div>
                <div class="product__qty">
                <input type="number" class="product__qtyNum" value="${product.qty}" min="0">
                </div>
            </div>
    `;

    mycart__list.insertAdjacentHTML('afterbegin', html);
}

// Remove items from cart list 

function removeItem(e) {
    const itemList = this.children;
    const item = Array.from(itemList);


}