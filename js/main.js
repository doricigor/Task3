
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
});

let allProducts = [];

function addItem(e) {
    e.preventDefault();

    // Grab info from data atr
    const wrap = $(this).parent().parent();
    const index = $(wrap).find('[data-index]');
    const id = $(index).attr('data-index');
    let flag = false;
    allProducts.map( item => {
        if (item.index == id) 
            flag = true;
    });
    if (flag) 
        return false;
    
    const img = $(wrap).find('[data-img] img');
    const brand = $(wrap).find('[data-name]');
    const subbrand = $(wrap).find('[data-subbrand]');
    const itemno = $(wrap).find('[data-itemno]');
    const listing = $(wrap).find('[data-listing]');
    const wholesale = $(wrap).find('[data-wholesale]');
    const qty = $(wrap).find('.product__qtyNum').val();

    // Create obj with data atr info
    const product = {
        index: id,
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
        
        // let input = document.createElement('input');
        //     input.setAttribute('type', 'number');
        //     input.setAttribute('class', 'product__qtyNum');
        //     input.setAttribute('min', '0');
        //     input.value = product.qty;

        createCart(product);
        createHover(product);
        

       

        // Object/Product go in Array
        allProducts.push(product);
        

        // // Change button
        // const element = e.target;
        // element.classList.toggle('addedBtn');

        // if (element.classList.contains('addedBtn')) {
        //     addMsg = 'ADDED';
        // } else {
        //     addMsg = 'ADD';
        // }
        // element.textContent = addMsg;

        updateTotal();
    }
}

// Create hover cart
function createHover(product) {
        const hoverHtml = `
        <div class="added__item">
            <div class="product__img"><img src=${product.img} alt="sat"></div>
            <div class="product__brand" data-id-hover="${product.index}">${product.brand} 
            <span class="product__subbrand">${product.subbrand}</span></div>
            <div class="product__itemNo">${product.itemno}</div>
        </div>
    `;

    addedCart__list.insertAdjacentHTML('afterbegin', hoverHtml);
}

// Create slideIn cart
function createCart(product) {

    const html = `
                <div class="mycart__item">
                    <div class="mycart__close" data-index="${product.index}"><i class="fas fa-times" data-index="${product.index}"></i></div>
                    <div class="product__brand">${product.brand} 
                    <span class="product__subbrand">${product.subbrand}</span></div>
                    <div class="product__wholesale">${formatter.format(product.wholesale * product.qty)}</div>
                    <div class="product__qty">
                    <input type="number" onChange='updateQty(${product.index}, event)' class="product__qtyNum" value="${product.qty}" min="0">
                    </div>
                </div>
        `;

        mycart__list.insertAdjacentHTML('afterbegin', html);
}

function toggleAdd(btn) {
    console.log(btn);
    btn.classList.add('addedBtn');
    btn.innerHTML = 'ADDED';
}


// Remove items from cart list 
function removeItem(e) {
    e.preventDefault();
    removedIndex = e.target.parentElement.getAttribute('data-index');
    if (e.target.parentElement.classList.contains('mycart__close')) {
        // const item = e.target.parentElement.parentElement;
        // const list = e.target.parentElement.parentElement.parentElement;
        // Every Item in 1 array

        allProducts.map((item, index) => {
            if (item.index == removedIndex) {
                allProducts.splice(index, 1);
                let ele = document.getElementById('btn-' + item.index);
                ele.classList.remove('addedBtn');
                ele.innerHTML = 'ADD';
                $('[data-id-hover='+ item.index+']').parent().remove();
                updateTotal();
            }
        });
        // list.removeChild(item);
        
        $(document).on('click', '.mycart__close', (e) => {
            const _self = $(e.currentTarget);
            _self.parent('.mycart__item').remove();
        });
    }
}


    var total = 0;

// Show total
// function showTotal(flag, product) {

//     let price = product.wholesale,
//         qty = product.qty,
//         productTotal = (parseFloat(price) * parseFloat(qty));

//     (flag === 'plus') ? total += productTotal : total -= productTotal;
    

//     totalTop.textContent = total;
//     totalBottom.textContent = total;
//     totalItem.textContent = allProducts.length;

    

    // allProducts.forEach(product => {
    //     const price = product.wholesale;
    //     const qty = product.qty;
    //     total.push(parseFloat(price) * parseFloat(qty));
    // });

    // const totalMoney = allProducts.reduce((agg, cur) => {
    //     agg += parseFloat(cur.wholesale) * parseFloat(cur.qty);
    //     return agg;
    // }, 0);

    // const finalMoney = formatter.format(totalMoney);

    // totalTop.textContent = finalMoney;
    // totalBottom.textContent = finalMoney;
    // totalItem.textContent = total.length;
// }

function updateQty(index, val) {
    allProducts.map( item => { 
        if (item.index == index) {
            item.qty = val.target.value;
        }
    });

    updateTotal();
}

function updateTotal() {
    total = 0;

    allProducts.map(item => {
        let price = item.wholesale;
        let qty = item.qty;
        let productTotal = (parseFloat(price) * parseFloat(qty));
        total += productTotal;
    });

    totalTop.textContent = total;
    totalBottom.textContent = total;
    totalItem.textContent = allProducts.length;
}