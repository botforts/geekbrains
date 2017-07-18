function Container() {
    this.id = '';
    this.className = '';
    this.htmlCode = '';
}

Container.prototype.render = function () {
    return this.htmlCode;
};

function Carousel() {
    Container.call(this, "carousel");
    this.widthCarousel = 0;
    this.widthProduct = 0;
    this.widthString = 0;
    this.leftString = 0;
    this.productsSlide = 0;
    this.countProducts = 0;
    this.productsItems = [];
    this.loadCarouselItems();
    this.render();
}

Carousel.prototype = Object.create(Container.prototype);
Carousel.prototype.constructor = Carousel;

Carousel.prototype.arrows = function(direction) {
    if (direction == 'right') {
        this.leftString -= this.widthProduct;
    } else {
        this.leftString += this.widthProduct;
    }
    if (this.leftString > 0) {
        this.leftString = 0;
    }
    if (this.leftString < (this.widthProduct*this.productsSlide-this.widthString)) {
         this.leftString = this.widthProduct*this.productsSlide-this.widthString;
    }

    $('.carousel__products-string').css({"left": this.leftString});
    // console.log (this.leftString, this.widthString);
};

Carousel.prototype.render = function(root) {

    // var mas = this.productsItems;
    // console.log (this.countProducts, this.productsItems, this.productsItems[0]);

    //   .carousel__products-container
    //     .carousel__products-items
    //       .carousel__products-items-images
    //       .carousel__products-items-titles СмартФон 1
    //       .carousel__products-items-descriptions 32Gb
    //       .carousel__products-items-prices 10$
    //       .carousel__products-items-basket В корзину

    var stringDiv = $('<div />', {
        class: 'carousel__products-string',
        width: this.widthString
    });
    stringDiv.appendTo(root);

    for (var item in this.productsItems) {

        var containerDiv = $('<div />', {
            class: 'carousel__products-container'
        });
        containerDiv.appendTo(stringDiv);

        var itemsDiv = $('<div />', {
            class: 'carousel__products-items'
        });
        itemsDiv.appendTo(containerDiv);

        var itemsImagesDiv = $('<div />', {
            class: 'carousel__products-items-images',
            style: 'background-image: url(' + this.productsItems[item].image + ')'
        });
        itemsImagesDiv.appendTo(itemsDiv);

        var itemsTitlesDiv = $('<div />', {
            class: 'carousel__products-items-titles',
            text: this.productsItems[item].title
        });
        itemsTitlesDiv.appendTo(itemsDiv);

        var itemsDescriptionsDiv = $('<div />', {
            class: 'carousel__products-items-descriptions',
            text: this.productsItems[item].description
        });
        itemsDescriptionsDiv.appendTo(itemsDiv);

        var itemsPricesDiv = $('<div />', {
            class: 'carousel__products-items-prices',
            text: this.productsItems[item].price
        });
        itemsPricesDiv.appendTo(itemsDiv);

        var itemsBasketDiv = $('<div />', {
            class: 'carousel__products-items-basket',
            text: 'В корзину'
        });
        itemsBasketDiv.appendTo(itemsDiv);

    }
};

// Получаем изначальные элементы из JSON
Carousel.prototype.loadCarouselItems = function() {
    $.get({
        url: './json/carousel.json',
        dataType: 'json',
        error: function() {
            console.log ('JSON load: Error!');
        },
        success: function(data) {
            console.log ('JSON load: Ок!');
            this.widthCarousel = data.widthCarousel;
            this.productsSlide = data.productsSlide;
            this.countProducts = data.products.length;
            this.widthProduct = this.widthCarousel / this.productsSlide;
            this.widthString = this.widthProduct * this.countProducts;
            for (var item in data.products) {
                this.productsItems.push(data.products[item]);
            }
            // console.log (this);
            // console.log (data);
            // console.log (data.products);
            // console.log (this.productsItems);
            this.render('.carousel__products');
        },
        context: this
    });

};

// Добавление отзыва
/*Carousel.prototype.add = function (idComment, text, userMessage) {
    var commentsItem = {
        "id_comment": idComment,
        "text": text,
        "submit": false
    };
    // Увеличиваем количество отзывов
    this.countCarousel++;
    // Добавляем отзыв в массив
    this.commentsItems.push(commentsItem);
    // Обновляем данные
    this.refresh();
    if (!!userMessage) alert (userMessage);
};*/

// Удаление отзыва
/*Carousel.prototype.del = function () {
    if (this.countCarousel < 1) { this.refresh(); return; }
    this.countCarousel--;
    this.commentsItems.pop();
    this.refresh();
};*/

// Одобрение отзыва
/*Carousel.prototype.submit = function () {
    this.commentsItems[this.countCarousel-1].submit = true;
    this.refresh();
};*/

// Показать все отзывы
/*Carousel.prototype.list = function () {
    $('#comments__list').remove();

    if (this.countCarousel < 1) { return; }

    var commentsDiv = $('<div />', {
        id: 'comments__list',
        html: '<br><hr><br>СПИСОК ВСЕХ ОТЗЫВОВ:<br>&nbsp;'
    });

    for (var item in this.commentsItems) {
        var comment = this.commentsItems[item],
            commentsItemsDiv = $('<div />', {
                html: '<hr width="50%"><p>Отзыв №' + comment.id_comment + '</p>'
                + '<p>Текст: <span class="comments-text-list">' + comment.text + '</span></p>'
                + '<p>Отзыв одобрен: ' + comment.submit + '</p>'
            });
        commentsItemsDiv.appendTo(commentsDiv);
    }

    commentsDiv.appendTo('body');
};*/

// Перерисовка
/*Carousel.prototype.refresh = function() {
    var commentsDataDiv = $('#comments_data');
    commentsDataDiv.empty();
    commentsDataDiv.append('<p>Всего отзывов: ' + this.countCarousel + '</p>');

    // Вывод в консоль для самопроверки
    console.log(this.commentsItems, this.countCarousel);

    if (this.countCarousel < 1) {
        $('.comments').hide();
    } else {
        $('.comments').show();
    }
};*/

// Запуск функции, после загрузки документа
$(document).ready(function() {
    var carousel = new Carousel();

    // console.log ('carousel: ', carousel);


    // Кнопка - Влево
    $('.carousel__nav-arrows-links_left').on('click', function() {
        carousel.arrows('left');
    });

    // Кнопка - Вправо
    $('.carousel__nav-arrows-links_right').on('click', function() {
        carousel.arrows('right');
    });

    // console.log ('123 ', carousel);

    // // Кнопка - Добавить
    // $('.comments-add').on('click', function() {
    //     var idComment = parseInt($(this).attr('id').split('_')[1]);
    //     var text = $(this).parent().parent().find('.comments-text').val();
    //     comments.add(idComment, text, 'Ваш отзыв был передан на модерацию!');
    // });
    //
    // // Кнопка - Удалить
    // $('.comments-delete').on('click', function() {
    //     comments.del();
    // });
    //
    // // Кнопка - Одобрить
    // $('.comments-submit').on('click', function() {
    //     comments.submit();
    // });
    //
    // // Кнопка - Показать все отзывы
    // $('.comments-list').on('click', function() {
    //     comments.list();
    // });
});