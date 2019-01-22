var mydiv = document.querySelector("#mydiv"); // show promotions in the html page
var listpromo = []; // empty table to display the json data on the web page.


var addpromo = document.querySelector("#input");
var btnadd = document.querySelector("#buttonadd");
var menupromo = document.querySelector("#inputState");



// 1) displays in the console.log the list of promotions tables.
btnadd.addEventListener("click", ajouter);
function getPromotion(){
fetch("http://api-students.popschool-lens.fr/api/promotions")
    // retrieves the raw data sent by the fetch and transforms them into json.
    .then(response => response.json())
    // resumes the json of the API on the console
    .then(function (promo) {
        // displays the data (the [] targets the hydra member part, the one we want to display.)
        console.log(promo["hydra:member"]);
        // the listpromo variable contains the json data.
        listpromo = promo["hydra:member"];
        // 2) Display on the web page promotions.
        // we add the foreach in the 2em then for the code to load once 1st then fully load.
        // we run hydra: member with the item function.
        menupromo.innerHTML = '';
        mydiv.innerHTML = '';
        listpromo.forEach(function (item) {
            // we get the array listpromo and with the item function we take the name of each promo
            // that we display in clickable link.
            document.getElementById("mydiv").innerHTML += `<li> <a href="promotion.html?id=${item.id}"> ${item.id} . ${item.name} </a> </li> <br>`;
            // the promo is displayed in the drop-down menu.
            menupromo.innerHTML += '<option>'+ item.id + ')' + ' ' + item.name  + "<br>";
            console.log(item);
        });
    });
}
getPromotion();

function ajouter() {

    fetch("http://api-students.popschool-lens.fr/api/promotions", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            //we use the post method on the fetch to add (or send) new promo in the existing channel.
            method: "POST",
            // we convert the value of the addpromo input field to a JSON string with stringify.
            body: JSON.stringify({
                name: addpromo.value,

            })
        })
        .then(response => response.json())

        .then(promo => {
            console.log(addpromo + "créé")
            getPromotion();
        })
}


// I declare the promotion delete button variable

var btnsup = document.querySelector("#buttonsupp");

// I create an event listener on my button with the function in parameter
btnsup.addEventListener('click', function () {
    
    // I request confirmation from the user before deletion
    if (confirm("Supprimer la promo : " + menupromo.value + " ?")) {
        // User confirms deletion
        supprimer(menupromo.value);
    }
})

// This is the function that is declared for deletion
function supprimer(idPromo) {
    // we take the ID in the promotion for deletion
    fetch("http://api-students.popschool-lens.fr/api/promotions/" + idPromo, {
        method: "DELETE"
    })
    .then(function (response) {
        getPromotion();
        // getPromotion refreshes the page
    });
    
    
}


var btnModifyPromo = document.querySelector("#buttonmod");
var modifpromo = document.querySelector("#input-modif");


// I create an event listener on the button with an anonymous function
btnModifyPromo.addEventListener('click', function () {
    let SelectProm = document.querySelector('#inputState')

    // The anonymous function first asks the user to confirm before modification
    if (confirm("Remplacer la promo : " + SelectProm.value + " ?")) {
        // Then it calls the modifyPromotion function to make the change by replacing the text
        modifyPromotion(SelectProm.value);
        
    }
})



// This is the function that is declared to replace the text in the API

// function to take the input field value
function modifyPromotion(idPromo) {
    fetch("http://api-students.popschool-lens.fr/api/promotions/"+ idPromo ,{
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        //we use the put method on the fetch to modify the existing string
        method: "PUT",
        // we convert the value of the input addpromo field to Json string via stringify
        body: JSON.stringify({
            name:modifpromo.value
        })
    })
        .then(response => response.json())
        .then(promo => {
            getPromotion();
            console.log(promo.name + "modifié")
        })
        
}