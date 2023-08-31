/*
    Je veux un tableau de x lignes et y colonnes
*/

let tableauJeu;

let allCards = document.querySelectorAll(".card");

allCards.forEach(card => {
    card.addEventListener("click", function(){
        if(card.classList.contains("hidden")){
            card.classList.remove("hidden")
        } else{
            card.classList.add("hidden");
        }
    });
})

//Génére un nombre aléatoire
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

//Génére un tableau
function generateTableGame(x, y) {
    let tableau = new Array(x);

    for (var i = 0; i < tableau.lenght; i++) {
        tableau[i] = new Array(y);
    }

    tableauJeu = tableau;
}

