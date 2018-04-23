$(function () {

    var model = {
        currentCat: null,
        adminShow: false, //hides the admin display area.
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
            }
        ]
    };

    var octopus = {
        init: function () {
            model.currentCat = model.cats[0];
            catListView.init();
            catView.init();
            adminView.init();
            adminView.hide();
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
        },

        adminDisplay: function () {
            if (model.adminShow === false) {
                model.adminShow = true;
                adminView.show(); //displays the admin input boxes and buttons
            }
            else if (model.adminShow === true) {
                model.adminShow = false;
                adminView.hide();// hides the admin input boxes and buttons
            }
        },

        //hides admin display when cancel button is clicked.
        adminCancel: function () {
            adminView.hide();
        },

        //hides admin display and saves new cat data when save button is clicked.
        adminSave: function () {
            model.currentCat.name = adminCatName.value;
            model.currentCat.imgSrc = adminCatURL.value;
            model.currentCat.clickCount = adminCatClicks.value;
            catView.render();
            catListView.render();
            adminView.hide();
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
                        adminView.render();
                    };
                })(cat));
                this.catListElem.appendChild(elem);
            }
        }
    };


    var adminView = {
        init: function () {
            this.adminCatName = document.getElementById("adminCatName");
            this.adminCatURL = document.getElementById("adminCatURL");
            this.adminCatClicks = document.getElementById("adminCatClicks");
            var admin = document.getElementById("admin");

            this.adminBtn = document.getElementById("adminBtn");
            this.adminCancel = document.getElementById("adminCancel");
            this.adminSave = document.getElementById("adminSave");


            this.adminBtn.addEventListener('click', function () { //shows the admin display.
                octopus.adminDisplay();
            });

            this.adminCancel.addEventListener('click', function () { //hides the admin display without saving any new cat data.
                octopus.adminCancel();
            });

            this.adminSave.addEventListener('click', function () { //hides the admin display and saves new cat data.
                octopus.adminSave();
            });


            this.render();
        },
        render: function () {
            var currentCat = octopus.getCurrentCat(); //calls current cat
            this.adminCatName.value = currentCat.name;
            this.adminCatURL.value = currentCat.imgSrc;
            this.adminCatClicks.value = currentCat.clickCount;
        },

        show: function () {
            admin.style.display = 'block'; //shows the admin div on index.html
            this.render();
        },

        hide: function () {
            admin.style.display = 'none';
        }


    };

    octopus.init();
});