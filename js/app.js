'use strict';

const cardList = ['fa-birthday-cake', 'fa-send', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb'];
const deck = [...cardList, ...cardList]
let timer, duration, seconds, minutes;
let moves = 0, starsOut = 3;
let timerFinish = false
let toggle = true;
let opened = [];


// Iniciador
start();

// Função que executa o modal inicial e outras funções para dar inicio ao jogo
function start() {
	swal({
		title: "Welcome to the 'Matching Game'",
		buttons: 'START',
		allowOutsideClick: false,
		closeOnClickOutside: false,
		allowEscapeKey: false,
	}).then((normalMode) => {
		if (normalMode) {
			$( '.container' ).css('opacity', '1');
			positioner();
			verifyClick();
			countdown();
	  	};
	});
}

// Função que randomiza os cards
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    };
    return array;
}

// Criando cards a partir de um icone e o posicionando como ultimo filho do 'grid'
function createCard(cardClass) {
    $('ul.grid').append(`<li class='card'><i class='fa ${cardClass}'></i></li>`);
}

// Passando para função createCard um novo icone, para que se crie um novo card
function positioner(){
    shuffle(deck).forEach(createCard);
}

// Temporizador
function countdown() {
	function startTimer(duration, display) {
		timer = duration, minutes, seconds;
    	setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        display.text(minutes + ':' + seconds);

        if (timerFinish === false) {
        	if (++timer < 0 && timerFinish) {
                    timer = duration;
                };
            };
    }, 1000);
};
	jQuery(function ($) {
	    let sec = 0,
	        display = $('#Timer');
	    startTimer(sec, display);
	});
}

// Logica para diminuir estrelas
function countStars(){
	if(moves === 8){
		starsOut = 2;
		$('#Star3').addClass('fa-star-o');
		$('#Star3').removeClass('fa-star');
	};
	if(moves === 24){
		starsOut = 1;
		$('#Star2').addClass('fa-star-o');
		$('#Star2').removeClass('fa-star');
	};
}

// restart
$('.restart').click( function() {
	$('.card').remove();
	positioner();
	verifyClick();
	moves = minutes = seconds = timer = 0;
	starsOut = 3;
	timerFinish = false;
	$('.grid').addClass('shakeRestart').delay(1000).queue(function( next ){
	    $(this).toggleClass('shakeRestart');
	    next();
	});
	$( "span.moves" ).text( "0" );
	$('ul.stars').children('li').find('*').removeClass('fa-star-o');
	$('ul.stars').children('li').find('*').addClass('fa-star');
	opened = [];
});

// verificando se a carta foi clicada
function verifyClick() {
	$('.card').click(function() {
		if(!($(this).hasClass('open') || $(this).hasClass('match')) && $('.open').length < 2){
			countStars();
			$(this).addClass('open');
		    opened.push($(this));
		    if (opened.length % 2 == 0) {
		        setTimeout(analyzer, 500);
		    };
		};
	});
}

// verificando 'match' de cartas
function cardMatch() {
    if (opened[opened.length - 2].html() == opened[opened.length - 1].html()) {
    	moves++;
		$('.moves').text(moves);
    	opened[opened.length - 2].addClass('shakeCorrect match');
    	opened[opened.length - 1].addClass('shakeCorrect match');
        opened[opened.length - 2].removeClass('open');
        opened[opened.length - 1].removeClass('open');
    };
}

// verificando 'match' incorreto de cartas
function cardIncorrect() {
    if (opened[opened.length - 2].html() !== opened[opened.length - 1].html()) {
    	moves++;
		$('.moves').text(moves);
        opened[opened.length - 1].addClass('shakeWrong wrong').delay(100).queue(function( next ){
	    $(this).toggleClass('shakeWrong');
	    next();
	});
        opened[opened.length - 2].addClass('shakeWrong wrong').delay(100).queue(function( next ){
	    $(this).toggleClass('shakeWrong');
	    next();
	});
        opened[opened.length - 1].delay(150).queue(function( next ){
	    $(this).toggleClass('open wrong');
	    next();
	});
        opened[opened.length - 2].delay(150).queue(function( next ){
	    $(this).toggleClass('open wrong');
	    next();
	    opened.pop();
    	opened.pop();
	});

    };
}

// vencendo o jogo
function won() {
	if (opened.length == 16) {
	  		$( '.container' ).css('opacity', '0')
		  	timerFinish = true;
			swal({
			allowOutsideClick: false,
			closeOnClickOutside: false,
			allowEscapeKey: false,
			title: 'Congratulations, You Won!',
			text: `In ${minutes + ':' + seconds}, ${moves} Moves and ${starsOut} Stars`,
			icon: 'success',
			button: 'Restart',
		}).then(function(restart) {
			if (restart) {
				$( '.container' ).css('opacity', '1');
				$('.card').remove();
				positioner();
				verifyClick();
				moves = minutes = seconds = timer = 0;
				starsOut = 3;
				timerFinish = false;
				$( "span.moves" ).text( "0" );
				$('ul.stars').children('li').find('*').removeClass('fa-star-o');
				$('ul.stars').children('li').find('*').addClass('fa-star');
				opened = [];
			};
		});
	};
}

// analizador
function analyzer() {
	cardMatch();
	cardIncorrect();
	won();
}