// Déclaration des variables globales
let tableauJeu;
let cptClickCurrent = 0;
let cardClickedId;
const cards = ["Evoli", "Pikachu", "Psykokwak", "Sablaireau", "Salameche", "Pokeball"];
const gameBoard = document.getElementById("gameBoard");
let nbPairesOnGame;
let cptCartesTrouvees = 0;
const nbCoupsCurrentNode = document.getElementById("NbCoupsCurrent");
let nbCoups = 0;

// Gestionnaire d'événement pour le bouton "Jouer"
document.getElementById("playButton").addEventListener("click", function () {
    let nbCardInput = document.getElementById("nbCardInput");
    initGame(nbCardInput.value);
});

// Gestionnaire d'événement pour le bouton "Ajouter des cartes"
document.getElementById("ajoutCards").addEventListener("click", function () {
    let nbCardInput = document.getElementById("nbCardInput");
    if (nbCardInput.value < 6) {
        nbCardInput.value++;
    }
});

// Gestionnaire d'événement pour le bouton "Enlever des cartes"
document.getElementById("enleverCards").addEventListener("click", function () {
    let nbCardInput = document.getElementById("nbCardInput");
    if (nbCardInput.value > 2) {
        nbCardInput.value--;
    }
});

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
        // Premier clic, on cache les images déjà trouvées
        allCards.forEach((card) => {
            if (card.classList.contains("finded")) {
                // Carte cachée
            } else {
                // Pas trouvée, il faut les masquer
                card.classList.add("hidden");
            }
        });
        // On affiche la carte que l'on vient de cliquer
        card.classList.remove("hidden");
        // On stocke la réponse derrière la carte
        cardClickedId = card.id;
    } else if (cptClickCurrent == 2) {
        // Deuxième clic, on vérifie si l'image cliquée est la même qu'au premier clic
        if (cardClickedId == card.id) {
            // Si c'est la même carte, on annule le deuxième clic
            cptClickCurrent = 1;
            return;
        } else {
            card.classList.remove("hidden");
            let cardClickedBefore = document.getElementById(cardClickedId);
            if (cardClickedBefore.dataset.image == card.dataset.image) {
                allCards.forEach((card) => {
                    if (card.classList.contains("hidden")) {
                        // Carte cachée
                    } else if (!card.classList.contains("finded")) {
                        card.classList.add("finded");
                        cptCartesTrouvees++;
                    }
                });
            }
            nbCoups++;
            nbCoupsCurrentNode.innerText = nbCoups;
            cptClickCurrent = 0;
            // On enlève les cartes sauvegardées
            cardClickedId = "";

            if (cptCartesTrouvees == nbPairesOnGame * 2) {
                // Animation de célébration
                setAnimationWin();
            }
        }
    }
}

/* Initialise le tableau */
function initGame(nbPaires) {
    stopAnimation();
    gameBoard.innerHTML = "";
    nbPairesOnGame = nbPaires;
    cptCartesTrouvees = 0;
    nbCoups = 0;
    nbCoupsCurrentNode.innerText = nbCoups;
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

                // On positionne la carte dans le HTML
                let cardHtml = getHtmlCodeCard(gameCard[randomNumber][0], i);
                gameBoard.innerHTML += cardHtml;
            }
        }
    }

    /* Ajoute l'événement de clic aux cartes */
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

function setAnimationWin() {
    let animateDiv = document.getElementById("allconfettis");
    animateDiv.innerHTML = "";

    for (let i = 0; i < 100; i++) {
        let confeti = document.createElement("div");
        confeti.classList.add("confetti");
        confeti.style.left = getRandomNumber(0, 100) + '%';
        confeti.style.animationDelay = 50 * i + "ms";
        confeti.style.backgroundColor = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
        animateDiv.appendChild(confeti);
    }
}

function stopAnimation() {
    let animateDiv = document.getElementById("allconfettis");
    animateDiv.innerHTML = "";
}