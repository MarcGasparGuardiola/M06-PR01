import {User} from "./User"

const forms = document.querySelector('.needs-validation')
const fullName = document.getElementById("fullName");
const userName = document.getElementById("userName");
const email = document.getElementById("validationEmail");
const submit = document.getElementById('submit');
const password = document.getElementById('password');
let users = [];

const regex = {
    userName: /^[A-Za-z ]+$/,
    email: /^\w+([\.\+\-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/,
    password: /^[A-Za-z0-9]{5}$/,
}

function isUserName(userName) {return regex.userName.test(userName)}
function isEmail(email) {return regex.email.test(email)}
function isPassword(password) {return regex.password.test(password)}

function setGreen(input) {
    return input.classList.add("is-valid");
}
function setRed(input) {
    return input.classList.add("is-invalid");
}

forms.addEventListener("keyup", (e) => {
    switch(e.target){
        case userName:
            isUserName(e.target.value) ? setGreen(e.target) : setRed(e.target)
            break;
        case email:
            isEmail(e.target.value) ? setGreen(e.target) : setRed(e.target)
            break;
        case fullName:
            isUserName(e.target.value) ? setGreen(e.target) : setRed(e.target)
            break;
        case password:
            isPassword(e.target.value) ? setGreen(e.target) : setRed(e.target)
        default:
            break;
    }
})


submit.addEventListener('click', (e) => {
    e.preventDefault()
    postRequest()
    getRequest()
    let user = new User(userName.value, fullName.value, email.value, password.value)
    users.push(user)
    console.log(users)
    sessionStorage.setItem('usersArray', JSON.stringify(users))
})


function postRequest() {
    fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        body: JSON.stringify({
            name: fullName.value,
            username: userName.value,
            email: email.value,
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    })
        .then((response) => response.json())
        .then((json) => console.log(json));
}

function getRequest() {
    fetch("https://jsonplaceholder.typicode.com/users")
        .then((response) => response.json())
        .then((json) => console.log(json));
}