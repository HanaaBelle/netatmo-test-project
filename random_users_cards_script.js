// Affichage des "users_cards" de manière "Random"

// Affecter à la constante "url_api_users_cards" l'URL de l'API "https://randomuser.me/api/"
const url_api_users_cards = "https://randomuser.me/api/?results=3"

// Initialiser la requête "HTTP GET" avec la méthode "fetch" qui est appelé avec "url_api_users_cards", qui renvoie
// ensuite une promesse qui se résout en un objet "response" qui représente la réponse à cette requête
fetch(url_api_users_cards)

    // Dès que la promesse retournée par "fetch" est résolue, la méthode ".then()" sera appelée et la fonction de rappel
    // "callback" sera passée à cette méthode avec l'objet "response"
    .then(response => {

        // Traiter la "response" en vérifiant qu'il n'y a pas d'erreur "HTTP" avec un booléen qui indique si la réponse
        // est OK (status HTTP 200-299)
        if (response.ok) {

            // Convertir la réponse en "JSON", cela renvoie une promesse, qui est résolue avec le résultat du JSON parsé
            return response.json();
        }

        // S'il y a une erreur HTTP, une erreur est lancée
        throw new Error('La réponse du réseau n\'est pas Ok !' + response.statusText);
    })

    // Manipulation des données JSON après la conversion une fonction de rappel "callback" est appelée
    .then(data => {

        // "data" est la variable contenant la réponse JSON de l'API
        console.log("DATA", data);

        // Créer une liste des noms des utilisateurs à partir du tableau "data.results"
        const users_list = data.results;

        // Afficher la liste des users en accédant à "results" de la "data"
        console.log("Listes des utilisateurs", users_list);

       // Parcourir chaque utilisateur à partir de la liste des users avec le "forEach" et afficher ses informations
       users_list.forEach(user => {
           const user_name = `${user.name.title} ${user.name.first} ${user.name.last}`;
           console.log("Carte utilisateur:", {user_name});

           // Créer la carte de chaque user
           const cardOfUser = `

               <div class="container-center-horizontal">
               
                   <div class="container-card-box">
                   
                       <div class="card-box">
                   
                           <h1 id="${user_name}"> ${user_name} </h1>
                           <h2> ${user.login.username} </h2>
                           <img class="card-image" src="${user.picture.medium}" alt="${user_name} photo">
                       
                           <div class="card-body">
                               <h2> ${user.gender} </h2>
                               <h2> ${user.dob.age} Years Old</h2>
                               <h3> ${user.email} </h3>
                               <h2> ☏ ${user.cell} </h2>
                               <h2> ${user.location.country} </h2>
                           </div>
                       </div>  
                   </div> 
               </div> 
           `;
           document.getElementById("user-card").innerHTML += cardOfUser;
       })
    })

    // Attraper toutes les erreurs qui peuvent survenir pendant la requête ou le traitement de la réponse
    .catch(error => {
        console.error('Il y a eu un problème avec l\'opération de récupération "fetch" :', error);
    });

// Ajouter un bouton pour scroller vers le haut
jQuery(function(){
    $(function () {
        //Fonction appelée quand on descend la page
        $(window).scroll(function () {

            // Quand on est à 200pixels du haut de page,
            if ($(this).scrollTop() > 200 ) {

                // Replace à 10pixels de la droite l'image
                $('#scrollUp').css('right','10px');
            }
            else {
                // Enlève les attributs CSS affectés par javascript
                $('#scrollUp').removeAttr( 'style' );
            }
        });
    });
});



