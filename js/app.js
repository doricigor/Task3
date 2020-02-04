const products = [
    {
        id: '1',
        img: 'img/sat1.png',
        brand: {
            title: 'ALFRED SUNG',
            subTitle: 'Slim Collection Series 5'
        },
        itemNo: 'AS7104SL-1A',
        listing: '3700',
        wholesale: '3700',
        qty: 0,
    },
    {
        id: '2',
        img: 'img/sat1.png',
        brand: {
            title: 'Naslov 2',
            subTitle: 'Slim Collection Series 5'
        },
        itemNo: 'AS7104SL-1A',
        listing: '3700',
        wholesale: '3700',
        qty: 0,
    },
    {
        id: '3',
        img: 'img/sat1.png',
        brand: {
            title: 'Naslov 3',
            subTitle: 'Slim Collection Series 5'
        },
        itemNo: 'AS7104SL-1A',
        listing: '3700',
        wholesale: '3700',
        qty: 0,
    },
    {
        id: '4',
        img: 'img/sat1.png',
        brand: {
            title: 'Naslov 4',
            subTitle: 'Slim Collection Series 5'
        },
        itemNo: 'AS7104SL-1A',
        listing: '3700',
        wholesale: '3700',
        qty: 0,
    },
]


new Main();

class Main {

    constructor() {
        this.init();
    }

    init() {
        products.map(item => {
            this.createproduct(item);
        })
    }

    createproduct(obj) {
        let div = document.createElement('div');
        let img = document.createElement('img');
        let title = document.createElement('h1');
        let subTitle = document.createElement('span');
        let itemNo = document.createElement('span');
        let listing = document.createElement('span');
        let wholesale = document.createElement('span');
        let input = document.createElement('input');

        img.setAttrtibute('src', obj.img);
    }

}