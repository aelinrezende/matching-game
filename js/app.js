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
		$(this).addClass('open');
	    opened.push($(this));
	    if (opened.length % 2 == 0) {
	        setTimeout(card_match, 1000);
	    }
	}
});

// verificando "match" de cartas
function card_match() {
    if (opened[opened.length - 2].html() == opened[opened.length - 1].html()) {
    	opened[opened.length - 2].addClass('shakeCorrect').delay(200).queue(function( next ){
	    $(this).toggleClass('shakeWrong');
	    next();
});
    	opened[opened.length - 1].addClass('shakeCorrect').delay(200).queue(function( next ){
	    $(this).toggleClass('shakeWrong');
	    next();
});
        opened[opened.length - 2].removeClass('open');
        opened[opened.length - 2].addClass('match');
        opened[opened.length - 1].removeClass('open');
        opened[opened.length - 1].addClass('match');
    } else {
        opened[opened.length - 1].addClass('shakeWrong wrong').delay(200).queue(function( next ){
	    $(this).toggleClass('shakeWrong');
	    next();
});
        opened[opened.length - 2].addClass('shakeWrong wrong').delay(200).queue(function( next ){
	    $(this).toggleClass('shakeWrong');
	    next();
});
        opened[opened.length - 1].delay(250).queue(function( next ){
	    $(this).toggleClass('open wrong');
	    next();
});
        opened[opened.length - 2].delay(250).queue(function( next ){
	    $(this).toggleClass('open wrong');
	    next();
});
        opened.pop();
        opened.pop();
    }
}
