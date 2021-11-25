// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    "use strict";

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll(".needs-validation");

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms).forEach(function (form) {
        form.addEventListener(
            "submit",
            function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                }

                form.classList.add("was-validated");
            },
            false
        );
    });
})();

const forms = document.querySelector('.needs-validation')
const fullName = document.getElementById("fullName");
const userName = document.getElementById("userName");
const email = document.getElementById("validationEmail");
const submit = document.getElementById('submit')

const regex = {
    userName: /^[A-Za-z ]+$/,
    email: /^\w+([\.\+\-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/,
}

function isUserName(userName) {return regex.userName.test(userName)}
function isEmail(email) {return regex.email.test(email)}

function setGreen() {
    forms.classList.add("was-validated");
}
function setRed() {
    forms.classList.add("form-control.is-invalid form-control.invalid");
}

forms.addEventListener("keyup", (e) => {
    e.stopPropagation()
    switch(e.target){
        case userName:
            isUserName(e.target.value) ? setGreen() : setRed()
            break;
        case email:
            isEmail(e.target.value) ? setGreen() : setRed()
            break;
        case fullName:
            isUserName(e.target.value) ? setGreen() : setRed()
            break;
        default:
            break;
    }
})

submit.addEventListener('submit', (e) => {
    postRequest()
})

function postRequest() {
    fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        body: JSON.stringify({
            id: "12",
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

function validation(params) {
    
}

/* 
async function request(url, verb) {
    try {
        const result = await fetch(url, {
            method: verb,
        });
        const data = await result.json();
        if (result.status !== 200) {
            return false;
        }
        return data;
    } catch (error) {
        console.error(error.message);
        return false;
    }
}
 */
