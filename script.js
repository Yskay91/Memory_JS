/*
    Je veux un tableau de x lignes et y colonnes
*/

let tableauJeu;
let allCards = document.querySelectorAll(".card");
let cptClickCurrent = 0;
let dataImageShowed;

allCards.forEach(card => {
    card.addEventListener("click", function () {
        playGame(card)
    });
})

function playGame(card) {
    cptClickCurrent++;

    if (cptClickCurrent == 1) {
        //premier click,  je cache les images trouvées avant
        allCards.forEach(card => {
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
        dataImageShowed = card.dataset.image;

    } else if (cptClickCurrent == 2) {
        //deuxième click, je vérifie si l'image a été trouvée
        card.classList.remove("hidden");
        if (dataImageShowed == card.dataset.image) {
            allCards.forEach(card => {
                if (card.classList.contains("hidden")) {
                    //carte cachée
                } else {
                    card.classList.add("finded");
                }
            });
        }

        cptClickCurrent = 0;
        //On enlève les cartes sauvegardées
        dataImageShowed = "";
    }
}