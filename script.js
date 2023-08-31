let tableauJeu;
let cptClickCurrent = 0;
let cardClickedId;
const cards = ["Evoli", "Sablaireau", "Salameche", "Pokeball"];
const gameBoard = document.getElementById("gameBoard");

/* Cette fonction gère ce qui se passe 
quand on clique sur une carte 
*/
function clickOnCardEvent(card) {
    let allCards = document.querySelectorAll(".card");
    if (card.classList.contains("finded")) {
        alert("Vous avez déjà appuyé sur cette carte, choisissez-en une autre");
        return;
    }
    cptClickCurrent++;

    if (cptClickCurrent == 1) {
        //premier click,  je cache les images trouvées avant
        allCards.forEach((card) => {
            if (card.classList.contains("finded")) {
                //carte cachée
            } else {
                //pas trouvée il faut qu'elles soient masquées
                card.classList.add("hidden");
            }
        });
        //J'affiche la carte que je viens de cliquer
        card.classList.remove("hidden");
        //je stocke la réponse derrière la carte
        cardClickedId = card.id;
    } else if (cptClickCurrent == 2) {
        //deuxième click, je vérifie si l'image cliquée est la même qu'au premier click
        if (cardClickedId == card.id) {
            //si oui j'annule le deuxième clique
            cptClickCurrent = 1;
            return;
        } else {
            card.classList.remove("hidden");
            let cardClickedBefore = document.getElementById(cardClickedId);
            if (cardClickedBefore.dataset.image == card.dataset.image) {
                allCards.forEach((card) => {
                    if (card.classList.contains("hidden")) {
                        //carte cachée
                    } else {
                        card.classList.add("finded");
                    }
                });
            }

            cptClickCurrent = 0;
            //On enlève les cartes sauvegardées
            cardClickedId = "";
        }
    }
}

/* Initialise le tableau */
function initGame(nbPaires) {
    gameBoard.innerHTML = "";
    let gameCard = [];
    for (let i = 0; i < nbPaires; i++) {
        gameCard.push([cards[i], false]);
        gameCard.push([cards[i], false]);
    }
    console.log(gameCard);

    for (let i = 0; i < gameCard.length; i++) {
        let cardIsPositionned = false;
        while (!cardIsPositionned) {
            let randomNumber = getRandomNumber(0, gameCard.length);
            if (gameCard[randomNumber][1] == false) {
                cardIsPositionned = true;
                gameCard[randomNumber][1] = true;

                //Je peux positioner la carte dans le html
                let cardHtml = getHtmlCodeCard(gameCard[randomNumber][0], i);
                gameBoard.innerHTML += cardHtml;
            }
        }
    }

    /* Ajoute l'événement de click */
    let allCards = document.querySelectorAll(".card");
    allCards.forEach((card) => {
        card.addEventListener("click", function () {
            clickOnCardEvent(card);
        });
    });
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (min, max) + min);
}

function getHtmlCodeCard(nomCard, id) {
    return `<div class="card hidden" id="${id}" data-image="${nomCard}"><img src="img/${nomCard}.png" /></div>`;
}
