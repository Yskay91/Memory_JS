let tableauJeu;
let allCards = document.querySelectorAll(".card");
let cptClickCurrent = 0;
let cardClickedId;

/* Ajoute l''événement de clique sur toutes les cartes */
allCards.forEach((card) => {
    card.addEventListener("click", function () {
        clickOnCardEvent(card);
    });
});

/* Cette fonction gère ce qui se passe 
quand on clique sur une carte 
*/
function clickOnCardEvent(card) {
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
