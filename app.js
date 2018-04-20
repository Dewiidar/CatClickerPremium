$(function () {

    var model = {
        currentCat: null,
        cats: [
            {
                clickCount: 0,
                name: 'Toby',
                imgSrc: 'cat_picture1.jpg'
            },
            {
                clickCount: 0,
                name: 'Tiger',
                imgSrc: 'cat_picture2.jpeg'
            },
            {
                clickCount: 0,
                name: 'Scaredy',
                imgSrc: 'cat_picture3.jpeg'
            },
            {
                clickCount: 0,
                name: 'Hasan',
                imgSrc: 'cat_picture4.jpeg'
            },
        ]
    };

    var octopus = {
        init: function () {
            model.currentCat = model.cats[0];
            catListView.init();
            catView.init();
            // inputsView.init();
        },
        getCurrentCat: function () {
            return model.currentCat;
        },
        getCats: function () {
            return model.cats;
        },
        setCurrentCat: function (cat) {
            model.currentCat = cat;
        },
        incrementCounter: function () {
            model.currentCat.clickCount++;
            catView.render();
        }
    };

    var catView = {
        init: function () {
            this.catElem = document.querySelector('#cat');
            this.catNameElem = document.querySelector('#cat-name');
            this.catImageElem = document.querySelector('#cat-img');
            this.counterElem = document.querySelector('#cat-count');

            this.catImageElem.addEventListener('click', function (e) {
                octopus.incrementCounter();
            });
            this.render();
        },
        render: function () {
            var currentCat = octopus.getCurrentCat();
            this.counterElem.textContent = currentCat.clickCount;
            this.catNameElem.textContent = currentCat.name;
            this.catImageElem.src = currentCat.imgSrc;
        }
    };

    var catListView = {
        init: function () {
            this.catListElem = document.querySelector('#catlist');
            this.render();
        },
        render: function () {
            var cats = octopus.getCats();
            this.catListElem.innerHTML = '';

            for (var i = 0; i < cats.length; i++) {
                var cat = cats[i];
                var elem = document.createElement('li');
                elem.textContent = cat.name;
                elem.addEventListener('click', (function (cat) {
                    return function () {
                        octopus.setCurrentCat(cat);
                        catView.render();
                    };
                })(cat));
                this.catListElem.appendChild(elem);
            }
        }
    };
    // var inputsView = {
    //     init: function () {
    //         this.adminButton = document.querySelector('#adminButton');
    //         this.catNameInput = document.querySelector('#catName');
    //         this.imgUrlInput = document.querySelector('#imageUrl');
    //         this.clicksInput = document.querySelector('#clicksInput');

    //         this.render();
    //     },
    //     render: function () {
    //         console.log(this.imgUrlInput.value);
    //     }
    // };

    octopus.init();
});