const cardList = ["fa-birthday-cake", "fa-angry", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb"];
let openCard = false;
var moves = 0;
var opened = [];
var timer = 0;

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

function createCard(cardClass) {
    $("ul.grid").append(`<li class="card"><i class="fa ${cardClass}"></i></li>`);
}

function positioner(){
    shuffle(cardList).forEach(createCard);
}

// Iniciador
positioner()
positioner()

// verificando se a carta foi clicada
$('.card').click(function() {
	if(!($(this).hasClass('open') || $(this).hasClass('match')) && $('.open').length < 2){
		moves++;
	    $('.moves').text(moves);
		$(this).addClass('open');
	    opened.push($(this));
	}
});