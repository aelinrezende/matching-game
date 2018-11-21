const cardList = ["fa-birthday-cake", "fa-angry", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb"];


function createCard(cardClass){
    $("ul.grid").append(`<li class="card"><i class="fas"></i></li>`);
}

// Iniciador
createCard()