"use strict"

const app = {

    // ------------- Variable -------------

    $stars: $('.product__star i'),
    $arrow: $('.product__arrow'),
    $openMyCart: $('.header__corp'),
    $hoverCart: $('.header__right'),
    $myCart: $('.mycart'),
    $addedCart: $('added__cart'),
    $add: $('.addBtn'),
    $del: $('.mycart__list'),
    $totalTop: $('.header__cash'),
    $totalBottom: $('.total'),
    $totalItem: $('.header__totalItem'),
    $mycart__list: $('.mycart__list'),
    $addedCart__list: $('.added__cartContainer'),
    $close: $('.close'),
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
            _this.$myCart.toggleClass('mycart__active');
        });

        // Click on hover card to open MyCart
        $(document).on('click', '.added__item', function () { 
            $('.added__cart').toggleClass('added__cart--active');
            $('.mycart').toggleClass('mycart__active');
        });

        // // Close MyCart on click outside of MyCart
        // $(document).on('click', function(e) {
        //                if (!_this.$myCart.is(e.target) && _this.$myCart.has(e.target).length === 0) {
        //         console.log('asdasd');
        //     }
        //     // let element = e.target;
        //     // if ($('.mycart').hasClass('mycart__active')) {

        //     //     if ($(element).is('.mycart') === false) {
        //     //         $('.mycart').removeClass('mycart__active');
        //     //     }
        //     // }
        // });

        // Close MyCart on ESC
        $(document).on('keyup', function(e) {
            if (e.keyCode == 27) {
                _this.$myCart.removeClass('mycart__active');
            }
        });

        // Event for function remove items from cart list 
        this.$del.on('click', this.removeItem.bind(this));

        // Event for function like and dislike of products
        this.$stars.on('click', this.likeItem);

        // Event for collapse hidden info for products
        this.$arrow.on('click', this.collapseInfo);

        // Event for add items
        this.$add.on('click', this.addItem.bind(this));

        // Event for close hover popup
        this.$close.on('click', this.closePopUpManualy);

        // Event for change input field
        $(document).on('change', '.product__input', app.inputs);

        // Show more info on responsive for phone and tabs / remowe arrow
        $(window).resize(function() {
            if($(window).width() <= 768) {
                $('.product__arrow i').removeClass();
                $('.product__arrow i').html('More info');
            } 
            if($(window).width() > 768) {
                $('.product__arrow i').addClass('fas fa-chevron-down');
                $('.product__arrow i').html('');
            }
        }).resize();
    },

    // ------------- Functions -------------

    // Remove items from cart list 
    removeItem: function(event) {
        const target = $(event.target);
        let removedIndex = event.target.parentElement.getAttribute('data-index');

        if (target.parent().hasClass('mycart__close')) {
            this.allProducts.map((item, index) => {
                if (item.index == removedIndex) {
                    this.allProducts.splice(index, 1);
                    this.updateTotal();
                    if (this.allProducts.length == 0) {
                        $('.product__qtyNum').val(0);
                        $('.addBtn').removeClass('addedBtn').html('ADD');
                    }
                }
            });

            $(document).on('click', '.mycart__close', (e) => {
                const _self = $(e.currentTarget);
                _self.parent('.mycart__item').remove();
            });
        }
    },

    // Get value and index from input on change
    inputs: function(e) {
        const $el = $(e.target);
        const index = $el.attr('data-index');
        const val = $el.val();
        app.updateQty(index, val);
    },

    // Like and dislike of products
    likeItem: function() {
        $(this).toggleClass('fas');
    },

    // Collapse hidden info for products
    collapseInfo: function (event) {
        $(event.target).parent().parent().parent().parent().toggleClass('wrap__active');
        // Rotate arrow
        $(event.target).toggleClass('fa-chevron-up');
    },

    // Open popup when item is added
    openPopUp: function() {
        $('.added__cart').addClass('added__cart--active');
    },

    // Close popup when item is added
    closePopUp: function() {
        $('.added__cart').removeClass('added__cart--active');
    },

    // Dont work becouse of TimeOut TODO
    closePopUpManualy: function() {
        $('.added__cart').removeClass('added__cart--active');
    },

    // Add new items in cart
    addItem: function(event) {
        
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

            // Change btn
            app.toggleAdd($(event.target));

            // Object/Product go in Array
            this.allProducts.push(product);

            // Last item in array for showing in hover popup
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
        } else {
            alert('Insert QTY please');
        }
    },
   
    // Create hover cart
    createHover: function(lastItem) {
        const hoverHtml = `
        <span class="close"><i class="fas fa-times"></i></span>
            <div class="added__item">
                <div class="product__img"><img src=${lastItem.img} alt="sat"></div>
                <div class="product__brand">${lastItem.brand} 
                <span class="product__subbrand">${lastItem.subbrand}</span></div>
                <div class="product__itemNo">${lastItem.itemno}</div>
            </div>
        `;
        $(this.$addedCart__list).html(hoverHtml);
    },

    // Create slideIn cart
    createCart: function (product) { 
        const html = `
            <div class="mycart__item">
                <div class="mycart__close" data-index="${product.index}"><i class="fas fa-times"></i></div>
                <div class="product__brand">${product.brand} 
                <span class="product__subbrand">${product.subbrand}</span></div>
                <div class="product__wholesale">${formatter.format(product.wholesale * product.qty)}</div>
                <div class="product__qty listQty">
                <input type="number" class="product__qtyNum product__input" data-index="${product.index}" value="${product.qty}" min="0">
                </div>
            </div>
        `;
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
    },

    // Function for update qty of product in cart
    updateQty: function(index, val) {
        this.allProducts.map(item => {
            if (item.index == index) {
                item.qty =  val;
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
