const cardList = ["fa-birthday-cake", "fa-angry", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb"];

function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

function createCard(cardClass){
    $("ul.grid").append(`<li class="card"><i class="fa ${cardClass}"></i></li>`);
}

function positioner(){
    shuffle(cardList).forEach(createCard);
}

// Iniciador
positioner()
positioner()