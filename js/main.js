// TODO: 
// - Obrisati odabrani proizvod iz niza na removeItem;
// - Kada se klikne dugme odabranog proizvoda ne moze se klikati opet, prelazi u added;
// - Kada se menja kolicina azurira se total;


// Variables
const stars = document.querySelectorAll('.product__star');
const arrow = document.querySelectorAll('.product__arrow');
const openMyCart = document.querySelector('.header__corp');
const hoverCart = document.querySelector('.header__right');
const myCart = document.querySelector('.mycart');
const add = document.querySelectorAll('.addBtn');
const del = document.querySelector('.mycart__list');
const totalTop = document.querySelector('.header__cash');
const totalBottom = document.querySelector('.total');
const totalItem = document.querySelector('.header__totalItem');
const mycart__list = document.querySelector('.mycart__list');
const addedCart__list = document.querySelector('.added__cart');


// Listeners
openMyCart.addEventListener('click', openCart);
hoverCart.addEventListener('mouseenter', openPopUp);
hoverCart.addEventListener('mouseleave', closePopUp);
del.addEventListener('click', removeItem);


// Functions

// Currency format
const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
});


// Like and dislike of product
stars.forEach(star => {
    star.addEventListener('click', likeItem);
});
function likeItem() {
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
    const addedCart = this.children[2];
    addedCart.classList.toggle('added__cart--active');
}


// Close popup when item is added
function closePopUp() {
    const addedCart = this.children[2];
    addedCart.classList.remove('added__cart--active');
}


// Open MyCart with added products
function openCart() {
    myCart.classList.toggle('mycart__active');
}


// Add new items in cart
add.forEach(el => {
    el.addEventListener('click', addItem);

    // Change button

    el.classList.toggle('addedBtn');

    if (el.classList.contains('addBtn')) {
        el.innerText = 'ADD';
    } else {
        el.innerText = 'ADDED';
    }
});

const allProducts = [];

function addItem(e) {
    e.preventDefault();

    // Grab info from data atr
    const wrap = $(this).parent().parent();
    const id = $(wrap).find('[data-id]');
    const img = $(wrap).find('[data-img] img');
    const brand = $(wrap).find('[data-name]');
    const subbrand = $(wrap).find('[data-subbrand]');
    const itemno = $(wrap).find('[data-itemno]');
    const listing = $(wrap).find('[data-listing]');
    const wholesale = $(wrap).find('[data-wholesale]');
    const qty = $(wrap).find('.product__qtyNum').val();

    // Create obj with data atr info
    const product = {
        id: $(id).attr('data-id'),
        img: $(img).attr('src'),
        brand: $(brand).attr('data-name'),
        subbrand: $(subbrand).attr('data-subbrand'),
        itemno: $(itemno).attr('data-itemno'),
        listing: $(listing).attr('data-listing'),
        wholesale: $(wholesale).attr('data-wholesale'),
        qty: qty
    };

    if (product.qty > 0) {
        // HTML template created in My Cart

        const html = `
                <div class="mycart__item">
                    <div class="mycart__close"><i class="fas fa-times"></i></div>
                    <div class="product__brand" data-id="${product.id}">${product.brand} 
                    <span class="product__subbrand">${product.subbrand}</span></div>
                    <div class="product__wholesale">${formatter.format(product.wholesale * product.qty)}</div>
                    <div class="product__qty">
                    <input type="number" class="product__qtyNum" value="${product.qty}" min="0">
                    </div>
                </div>
        `;

        mycart__list.insertAdjacentHTML('afterbegin', html);

        const hoverHtml = `
                <div class="added__item">
                    <div class="product__img"><img src=${product.img} alt="sat"></div>
                    <div class="product__brand" data-id="${product.id}">${product.brand} 
                    <span class="product__subbrand">${product.subbrand}</span></div>
                    <div class="product__itemNo">${product.itemno}</div>
                </div>
        `;

        addedCart__list.insertAdjacentHTML('afterbegin', hoverHtml);

        // Object/Product go in Array
        allProducts.push(product);

        showTotal();
    }
}


// Remove items from cart list 
function removeItem(e) {
    e.preventDefault();

    if (e.target.parentElement.classList.contains('mycart__close')) {
        const item = e.target.parentElement.parentElement;
        const list = e.target.parentElement.parentElement.parentElement;

        allProducts.map((item, index) => {
            // U nizu ostane samo onaj koji je obrisan a ne oni koji nisu jos obrisani.
            allProducts.splice(index, 1);

        });
        list.removeChild(item);

    }

    // allProducts.shift(cartItem);  // TODO remove current element, not 1st or last

    showTotal();
}


// Show total
function showTotal() {

    const total = [];

    allProducts.forEach(product => {
        const price = product.wholesale;
        const qty = product.qty;
        total.push(parseFloat(price) * parseFloat(qty));
    });

    const totalMoney = allProducts.reduce((agg, cur) => {
        agg += parseFloat(cur.wholesale) * parseFloat(cur.qty);

        return agg;
    }, 0);

    const finalMoney = formatter.format(totalMoney);

    totalTop.textContent = finalMoney;
    totalBottom.textContent = finalMoney;
    totalItem.textContent = total.length;
}