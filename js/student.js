var urls = 'http://api-students.popschool-lens.fr/api/students';

const url = new URL(window.location.href); 
var params = new URLSearchParams(url.search);
var studentID = params.get('id');

const urldeux = new URL(window.location.href); 
var paramsdeux = new URLSearchParams(urldeux.search);
var promotionID = paramsdeux.get('promoid');


function deleteStudent(id) {
    fetch(urls + '/' + id, {
        method: 'DELETE'
    })
    .then(function(response) {

    })
}

const btnsupp = document.getElementById('delete-btn');

btnsupp.addEventListener('click',function(e){
    e.preventDefault();
    deleteStudent(studentID)
})

function getStudent(id) {
    fetch(urls + '/' + id)
    .then(function(response){
        return response.json();
        
    })
    .then(function(json){
        console.log(json)
        const nameInput = document.getElementById('student-name')
        const lastInput = document.getElementById('student-lastname')
        const idInput = document.getElementById('student-id')

        nameInput.value = json.firstname;
        lastInput.value = json.lastname;
        idInput.value = json.id
    });
}

function UpdateStudent(id,promoID) {
    const nameInput = document.getElementById('student-name')
    const lastInput = document.getElementById('student-lastname')
    const idInput = document.getElementById('student-id')
    fetch(urls + '/' + id, {
        method: 'PUT',
        headers: new Headers({'content-type': 'application/json'}),
        body: JSON.stringify({
            
  firstname: nameInput.value,
  lastname: lastInput.value,
  sex: 0,
  birthdate: "2019-01-21T14:24:10.379Z",
  promotion: '/api/promotions/' + promoID
    })
})
.then(function(response){
    
})
.catch(function(error) {
    console.log(error);
});
}

const btnUpdate = document.getElementById('update-btn')

document.addEventListener('DOMContentLoaded',getStudent(studentID))
btnUpdate.addEventListener('click',function(e){
    e.preventDefault();
    UpdateStudent(studentID,promotionID);
})