"use strict"

const app = {
    // ------------- Variable -------------

    $stars: $('.product__star i'),
    $arrow: $('.product__arrow'),
    $openMyCart: $('.header__corp'),
    $hoverCart: $('.header__right'),
    $myCart: $('.mycart'),
    $add: $('.addBtn'),
    $del: $('.mycart__list'),
    $totalTop: $('.header__cash'),
    $totalBottom: $('.total'),
    $totalItem: $('.header__totalItem'),
    $mycart__list: $('.mycart__list'),
    $addedCart__list: $('.added__cart'),
    total: 0,
    lastItem: 0,
    allProducts: [],
    

    // ------------- Init function -------------

    init: function() {
        this.bindEvents();
    },

    // ------------- Events -------------
    bindEvents: function() {
        const _this = this;

        // Open MyCart with added products
        this.$openMyCart.on('click', function() {
            _this.$myCart.toggleClass('.mycart__active');
        });

        // Event for function remove items from cart list 
        this.$del.on('click', this.removeItem);

        // Event for function like and dislike of products
        this.$stars.on('click', this.likeItem);

        // Event for collapse hidden info for products
        this.$arrow.on('click', this.collapseInfo);

        // Event for add items
        this.$add.on('click', this.addItem.bind(this));

    },

    // ------------- Functions -------------

    // Remove items from cart list 
    removeItem: function(event) {
        const target = $(event.target);
        console.log(target.parent().parent());
        let removedIndex = $(target.parent().parent().attr('data-index'));
        if (removedIndex.hasClass('mycart__close')) {
            this.allProducts.map((item, index) => {
                if(item.index == removedIndex) {
                    this.allProducts.splice(index, 1);
                    this.updateTotal();
                }
            });

            $(document).on('click', '.mycart__close', (e) => {
                const _self = $(e.currentTarget);
                _self.parent('.mycart__item').remove();
            });

        }
    },

    // Like and dislike of products
    likeItem: function() {
        this.$stars.toggleClass('fas');
    },

    // Collapse hidden info for products
    collapseInfo: function (event) { 
        const productWrap = event.parent().parent();
        productWrap.toggleClass('wrap__active');
    },

    // Open popup when item is added
    openPopUp: function() {
        $('.added__cart').addClass('added__cart--active');
    },

    // Close popup when item is added
    closePopUp: function() {
        $('.added__cart').removeClass('added__cart--active');
    },

    // Add new items in cart
    addItem: function(event) {
        app.toggleAdd($(event.target))
        
         // Grab info from data atr
        const wrap = $(event.target).parent().parent();
        const index = $(wrap).find('[data-index]');
        const id = $(index).attr('data-index');
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

            // Object/Product go in Array
            this.allProducts.push(product);
            this.lastItem = this.allProducts[this.allProducts.length - 1];
            // Function for create HTML template My Cart
            this.createCart(product);
            // Function for create HTML template Hover Added Cart
            this.createHover(this.lastItem);
            // Function for open popup window after add product
            this.openPopUp();
            // Function for update Total
            this.updateTotal();
            // Function for show added item and delite it after 3 sec from popup window
            this.showAndDelete();
        }
    },

    // Create hover cart
    createHover: function(lastItem) {
        const hoverHtml = `
            <div class="added__item">
                <div class="product__img"><img src=${lastItem.img} alt="sat"></div>
                <div class="product__brand">${lastItem.brand} 
                <span class="product__subbrand">${lastItem.subbrand}</span></div>
                <div class="product__itemNo">${lastItem.itemno}</div>
            </div>
        `;
        // $addedCart__list.insertAdjacentHTML('afterbegin', hoverHtml);
        $(this.$addedCart__list).prepend(hoverHtml);
    },

    // Create slideIn cart
    createCart: function (product) { 
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
        // $mycart__list.insertAdjacentHTML('afterbegin', html);
        $(this.$mycart__list).prepend(html);
    },

    // Toggle addBtn - Add -> Added
    toggleAdd: function(btn) {
        btn.addClass('addedBtn');
        btn.html('ADDED');
    },

    // Function for hide and delete popup
    showAndDelete: function() {
            this.lastItem = setTimeout(this.closePopUp, 3000);
            let deleteLastItem = setTimeout(() => {
            $('.added__cart').children().remove();
        }, 3000);
    },

    // Function for update qty of product in cart
    updateQty: function(index,val) {
        allProducts.map(item => {
            if (item.index == index) {
                item.qty = val.target.value;
            }
        });
        this.updateTotal();
    },

    // Function for update and show Total
    updateTotal: function() {
        this.total = 0;

        this.allProducts.map(item => {
            let price = item.wholesale;
            let qty = item.qty;
            let productTotal = (parseFloat(price) * parseFloat(qty));
            this.total += productTotal;
        });
    
        this.$totalTop.html(formatter.format(this.total));
        this.$totalBottom.html(formatter.format(this.total)); 
        this.$totalItem.html(this.allProducts.length);
    }
}

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
});

$(function() {
    app.init();
});
