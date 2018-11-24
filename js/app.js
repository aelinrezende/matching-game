const cardList = ["fa-birthday-cake", "fa-angry", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb"];
let openCard = false;
let moves = 0;
let opened = [];
let timer = 0;

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
		$(this).addClass('open');
	    opened.push($(this));
	    if (opened.length % 2 == 0) {
	        setTimeout(card_match, 500);
	    }
	}
});

// Temporizador
function countdown() {
	function startTimer(duration, display) {
    let timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.text(minutes + ":" + seconds);

        if (++timer < 0) {
            timer = duration;
        }
    }, 1000);
}

	jQuery(function ($) {
	    let sec = 0,
	        display = $('#Timer');
	    startTimer(sec, display);
	});
}

countdown()

// verificando "match" de cartas
function card_match() {
    if (opened[opened.length - 2].html() == opened[opened.length - 1].html()) {
    	moves++;
		$('.moves').text(moves);
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
    	moves++;
		$('.moves').text(moves);
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
	    opened.pop();
    	opened.pop();
});

    }
  //   if (opened.length == 16) {
		// modal()
  //   }
}