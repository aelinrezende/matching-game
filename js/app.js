const cardList = ["fa-birthday-cake", "fa-send", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb"];
let openCard = false;
let moves = 0;
let opened = [], starsOut = 3;
let timer, timerFinish = false, duration, seconds, minutes, display;

// Iniciador


function start() {
	swal({
		title: "Welcome to the 'Memory Game'",
		buttons: "START",
		allowOutsideClick: false,
		closeOnClickOutside: false,
		allowEscapeKey: false,
	}).then((normalMode) => {
	if (normalMode) {
		callPositioner()
		verifyClick()
		countdown()
  }
})
};

start()

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


function callPositioner(){
	positioner()
	positioner()
}


// estrelas
function countStars(){
	if(moves === 8){
		starsOut = 2
		$('#Star3').addClass('fa-star-o');
		$('#Star3').removeClass('fa-star');
	}
	if(moves === 11){
		starsOut = 1
		$('#Star2').addClass('fa-star-o');
		$('#Star2').removeClass('fa-star');
	} if(moves === 14){
		starsOut = 0
		$('#Star1').addClass('fa-star-o');
		$('#Star1').removeClass('fa-star');
	}
}



// verificando se a carta foi clicada
function verifyClick() {
	$('.card').click(function() {
		if(!($(this).hasClass('open') || $(this).hasClass('match')) && $('.open').length < 2){
			countStars()
			$(this).addClass('open');
		    opened.push($(this));
		    if (opened.length % 2 == 0) {
		        setTimeout(card_match, 500);
		    }
		}
	})
};

// Temporizador
function countdown() {
	function startTimer(duration, display) {
		timer = duration, minutes, seconds;
    	setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.text(minutes + ":" + seconds);

        if (timerFinish === false) {if (++timer < 0 && timerFinish) {
                    timer = duration;
                }}
    }, 1000);
}

	jQuery(function ($) {
	    let sec = 0,
	        display = $('#Timer');
	    startTimer(sec, display);
	});
}

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
  	if (opened.length == 16) {
	  	timerFinish = true;
		swal({
		allowOutsideClick: false,
		closeOnClickOutside: false,
		allowEscapeKey: false,
		title: "Congratulations, You Won!",
		text: `In ${minutes + ":" + seconds}, ${moves} Moves and ${starsOut} Stars`,
		icon: "success",
		button: "Restart",
	}).then(function(restart) {
		if (restart) {
			moves = minutes = seconds = timer = 0;
			starsOut = 3;
			timerFinish = false;
			$('.card').removeClass('shakeCorrect match shakeWrong');
			$('ul.stars').children('li').find('*').removeClass('fa-star-o');
			$('ul.stars').children('li').find('*').addClass('fa-star');
			opened = [];
			$('li').remove()
			callPositioner()
			verifyClick()
		}
	})
}
}

// restart

$('.restart').click( function() {
	moves = minutes = seconds = timer = 0;
	timerFinish = false;
	$('.card').removeClass('shakeCorrect match shakeWrong');
	$('ul.stars').children('li').find('*').removeClass('fa-star-o');
	$('ul.stars').children('li').find('*').addClass('fa-star');
	opened = [];
})