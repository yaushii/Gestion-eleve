var promo = document.querySelector("#promo")
var afficher = document.querySelector("#afficher");
var affiche = document.querySelector("#buttonaff");
var urls = "http://api-students.popschool-lens.fr/api/students";
var url = new URL(window.location.href);
var params = new URLSearchParams(url.search);
var promotionID = params.get('id');
var studentID = params.get('id');
console.log(promotionID)
var nameInput = document.getElementById("student-name");
var lastnameInput = document.getElementById("student-lastname");
var menustudents = document.querySelector("#select");


function getStudents(id) {
  fetch(urls)
    .then(function (response) {
      return response.json();
    })

    .then(function (json) {
      var students = json['hydra:member']; // recover all students and stocks in the variable
      var promotion = "/api/promotions/" + id;
      console.log(students);
      var list = document.querySelector('.list');
      
      list.innerHTML = ' ';
      students.forEach(function (student) {

        if (student.promotion == promotion) {
          // select the ul tag
          var li = document.createElement('li'); // stock the creation of a li tag in var li
          var link = document.createElement('a');      
          link.href = 'student.html?id=' + student.id + '&promoid=' + id; // add the link + the id of the promotion
          link.textContent = student.firstname; // displays the promos names in the li.appendChild (link) page
          menustudents.innerHTML += '<option>'+ student.id + ')' + ' ' + student.firstname  + "<br>";
         
          li.appendChild(link)
          //link becomes child of li
          list.appendChild(li);
          // li becomes choild of list
        }
      })
    })
}

function createStudent(id) {

  fetch(urls, {
      method: 'POST',
      headers: new Headers({
        'content-type': 'application/json'
      }),
      body: JSON.stringify({
        firstname: nameInput.value,
        lastname: lastnameInput.value,
        birthdate: "2019-01-13T13:30:49.788Z",
        promotion: 'api/promotions/' + id
      })
    })

    .then(function (response) { // then displays the promotions on the page thanks to the function above
      getStudents(id);
    })
}


var btncreate = document.getElementById("buttoncreer");
document.addEventListener('DOMContentLoaded', getStudents(promotionID))
btncreate.addEventListener('click', function(e) {
  e.preventDefault();
  createStudent(promotionID);
})




var btnsup = document.querySelector("#buttonsupp");

// I create an event listener on my button with the function in parameter
btnsup.addEventListener('click', function () {

if (confirm("Supprimer la promo : " + menustudents.value + " ?")) {
  // User confirms deletion
  supprimer(menustudents.value);
}

})

function supprimer(id) {
    fetch(urls + '/' + id, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(function(response) {
      getStudents(id);
      
    })
  }
  

/* var btnModifyPromo = document.querySelector("#buttonmod");
var modifpromo = document.querySelector("#input-modif");
var modiffpromo = document.querySelector("#input-modiff");


// I create an event listener on the button with an anonymous function
btnModifyPromo.addEventListener('click', function () {
    let SelectProm = document.querySelector('#inputState')

    // The anonymous function first asks the user to confirm before modification
    if (confirm("Remplacer la promo : " + SelectProm.value + " ?")) {
        // Then it calls the modifyPromotion function to make the change by replacing the text
        modifyPromotion(SelectProm.value);
        
    }
})
 */