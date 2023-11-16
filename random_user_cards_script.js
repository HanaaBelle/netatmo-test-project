// Affichage des "user cards" de manière "Random" avec trois fonctionnalités :
// -> Ajout de 10 "user cards"
// -> Suppression d'une "user card" spécifique
// -> Filtre de genre

// Affecter à la constante "url_api_for_3_user_cards" l'URL de l'API pour afficher 3 "user cards"
const url_api_for_3_user_cards = "https://randomuser.me/api/?results=3"

// Affecter à la constante "url_api_for_10_user_cards" l'URL de l'API pour afficher 10 "user cards"
const url_api_for_10_user_cards = "https://randomuser.me/api/?results=10"

// Déclaration de la fonction qui ajoute des "user cards"
function add_user_cards(url_api) {
// Initialiser la requête "HTTP GET" avec la méthode "fetch" qui est appelée avec "url_api" et qui renvoie ensuite une
// promesse qui se résout en un objet "response" représentant la réponse à cette requête
    fetch(url_api)

        // Dès que la promesse retournée par "fetch" est résolue, la méthode ".then()" sera appelée et la fonction de
        // rappel "callback" sera passée à cette méthode avec l'objet "response"
        .then(response => {

            // Traiter la "response" en vérifiant qu'il n'y a pas d'erreur "HTTP" avec un booléen qui indique si la
            // réponse est OK donc "Correcte" (status HTTP 200-299)
            if (response.ok) {

                // Convertir la réponse en "JSON", cela renvoie une promesse, qui est résolue avec le résultat du "JSON"
                // "parsé"
                return response.json();
            }

            // S'il y a une erreur "HTTP" alors une erreur sera lancée sinon le processus continu
            throw new Error('La réponse du réseau n\'est pas Ok !' + response.statusText);
        })

        // Manipulation des données "JSON" après la conversion et donc une fonction de rappel "callback" est appelée
        .then(data => {

            // "data" est la variable contenant la réponse "JSON" de l'API
            console.log("DATA", data);

            // Créer une liste des noms des utilisateurs à partir du tableau "data.results"
            const users_list = data.results;

            // Afficher la liste des "users" en accédant à "results" de la "data"
            console.log("Listes des utilisateurs", users_list);

            // Parcourir chaque utilisateur à partir de la liste des "users" avec le "forEach" et afficher les
            // informations de chaque "user" dans une "user card"
            users_list.forEach(user => {

                // Récupérer les données de chaque "user" et les afficher
                const user_id = `${user.id.value}`;
                const user_name = `${user.name.title} ${user.name.first} ${user.name.last}`;
                const user_gender = `${user.gender}`;
                const user_birthdate = `${user.dob.date}`;
                console.log("Carte utilisateur:", {user_id}, {user_name}, {user_gender}, {user_birthdate});

                // Créer la carte de chaque "user" contenant ses informations récupérées
                const cardOfUser =
                    `<div id="user-${user_id}" class="user_card_container" 
                          data-gender="${user_gender}" data-birthdate="${user_birthdate}">
                        <div class="container-card-box">
                            <div class="card-box">
                                <h2 id="${user_name}"> ${user_name} </h2>
                                <h3> ${user.login.username} </h3>
                                <img class="card-image" src="${user.picture.medium}" alt="${user_name} photo">
                                <div class="card-body">
                                    <h3> ${user_gender} </h3>
                                    <h3> ${user.dob.age} Years Old</h3>
                                    <h4> ${user.email} </h4>
                                    <h3> ☏ ${user.cell} </h3>
                                    <h3> ${user.location.country} </h3>
                                </div>
                            </div> 
                       
                            <button id="remove-${user_id}" class="remove-bouton" type="button" 
                                    onclick="remove_user_card('${user_id}')">
                                   <span>Remove 🥺</span>
                            </button> 
                       
                        </div> 
                    </div> 
                    `;

                // Ajouter chaque "user card" au "DOM"
                document.getElementById("user-cards").innerHTML += cardOfUser;

                // Appel de la fonction pour trier la liste des users
                // users_birthDates_sorter(users_list, user_birthdate);
            });
        })
        // Attraper toutes les erreurs qui peuvent survenir pendant la requête ou le traitement de la réponse
        .catch(error => {
            console.error('Il y a eu un problème avec l\'opération de récupération "fetch" :', error);
        });
}

// Appel de la fonction qui affiche 3 "user cards"
add_user_cards(url_api_for_3_user_cards);

// Gérer le bouton "ADD" qui affiche 10 "user cards" avec la méthode 'DOMContentLoaded' pour s'assurer que le code JS ne
// s'exécute qu'après le chargement complet du contenu de la page web et que le bouton est disponible pour y attacher
// l'événement "onclick"
document.addEventListener('DOMContentLoaded', () => {
    // Sélectionner le bouton "ADD" dans le document avec sa classe ".add-bouton"
    const addButton = document.querySelector('.add-bouton');

    // Attacher un gestionnaire d'événement "onclick" : si le bouton est cliqué, la "fonction()" anonyme est exécutée
    addButton.onclick = function () {
        // URL avec 10 user cards
        add_user_cards(url_api_for_10_user_cards);
    };
});

// Déclaration de la fonction qui supprime une "user card" spécifique suivant l'"id" du "user"
function remove_user_card(idOfUser) {
    // Sélectionner le conteneur de "user card" à supprimer
    const user_card_container = document.getElementById(`user-${idOfUser}`);

    // Vérifier si le conteneur de "user card" existe pour pouvoir le supprimer sinon afficher un message d'erreur
    if (user_card_container) {
        user_card_container.parentNode.removeChild(user_card_container);
    } else {
        console.error('Erreur ! Le conteneur de "user card" n\'existe pas.');
    }
}

// Déclaration de la fonction qui filtre suivant le genre
function filter_gender_user_cards(genderOfUser) {
    // Sélectionner tous les conteneurs des "user cards" suivant leur class "user_card_container"
    const user_cards_containers_list = document.querySelectorAll('.user_card_container');

    // Parcourir toute la liste des "user cards" avec le "forEach"
    user_cards_containers_list.forEach(user_card_container => {

        // Vérifier si le genre sélectionné (genderOfUser) est 'all' ou si le genre de la "user card" actuelle
        // (user_card_container) correspond au genre sélectionné (genderOfUser)
        if (genderOfUser === 'all' || user_card_container.getAttribute('data-gender') === genderOfUser) {
            // Afficher la "user card"
            user_card_container.style.display = '';
        }
        // Cacher la "user card"
        else {
            user_card_container.style.display = 'none';
        }
    });
}

// Écouteur d'événement pour le changement de sélection du genre
document.getElementById('gender-filter').addEventListener('change', (event) => {
    filter_gender_user_cards(event.target.value);
});

// Déclaration de la fonction qui classifie les "user cards" suivant la date de naissance des users
function users_birthDates_sorter(typeOfSort) {

    // Sélectionner tous les conteneurs des "user cards" suivant leur class "user_card_container" dans une liste de
    // nœuds puis la convertir en tableau
    const user_cards_containers_list = Array.from(document.querySelectorAll('.user_card_container'));

    // Trier le tableau des conteneurs des user cards en fonction du type de tri (croissant ou décroissant)
    user_cards_containers_list.sort((birthdateOfUser_a, birthdateOfUser_b) => {

        // Récupérer les dates de naissance des deux "user cards" à comparer
        let birthdateOfUserA = new Date(birthdateOfUser_a.getAttribute('data-birthdate'));
        let birthdateOfUserB = new Date(birthdateOfUser_b.getAttribute('data-birthdate'));

        // Comparer les dates en fonction du type de tri sélectionné
        if (typeOfSort === 'ascending') {
            // Tri par ordre croissant
            return birthdateOfUserB - birthdateOfUserA;

        } else if (typeOfSort === 'descending') {
            // Tri par ordre décroissant
            return birthdateOfUserA - birthdateOfUserB;
        }
    });

    // Mettre à jour l'affichage en fonction de l'ordre de classification (soit croissant ou décroissant) en récupérant
    // le conteneur des "user cards" où elles sont affichées
    const containerOfUserCards = document.getElementById("user-cards");

    // Effacer le conteneur existant des "user cards" non triées
    containerOfUserCards.innerHTML = '';

    // Ajouter au conteneur les "user cards" triées
    user_cards_containers_list.forEach(user_card_container => {
        containerOfUserCards.appendChild(user_card_container);
    });
}

// Écouteur d'événement pour le changement de sélection du tri par date de naissance
document.getElementById('birthDate-filter').addEventListener('change', (event) => {
    users_birthDates_sorter(event.target.value);
});

// Ajouter un bouton pour scroller vers le haut en utilisant "JQuery"
jQuery(function () {
    $(function () {
        //Fonction appelée quand on descend la page
        $(window).scroll(function () {

            // Quand on est à 200 pixels du haut de page,
            if ($(this).scrollTop() > 200) {

                // Remplace à 10 pixels de la droite de l'image
                $('#scrollUp').css('right', '10px');
            } else {
                // Enlève les attributs CSS affectés par JS (cacher le bouton)
                $('#scrollUp').removeAttr('style');
            }
        });
    });
});



