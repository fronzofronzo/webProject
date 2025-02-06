async function fetchData(url, formData) {
    try {
        const response = await fetch(url, {
            method: "POST",
            body: formData
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.log(error.message);
    }
}

function togglePasswordVisibility(button, passwordField) {
    const type = passwordField.getAttribute("type") === "password" ? "text" : "password";
    passwordField.setAttribute("type", type);
    button.classList.toggle("fa-eye");
    button.classList.toggle("fa-eye-slash");
}

async function tryLogin(username, password) {
    const url = 'api/api-login.php';
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    formData.append('action', 'login');

    const json = await fetchData(url, formData);

    if (json && !json["loginresult"]) {
        document.querySelector("main > section > div > div:first-child form p").innerText = json["errorlogin"];
    } else {
        window.location.reload();
    }
}

async function tryRegistration(name, surname, username, password) {
    const url = 'api/api-login.php';
    const formData = new FormData();
    formData.append('name', name);
    formData.append('surname', surname);
    formData.append('username', username);
    formData.append('password', password);
    formData.append('action', 'register');

    const json = await fetchData(url, formData);

    if (json) {
        document.querySelector("main > section > div > div:nth-child(2) p").innerText = json["registermsg"];
        if (json["registerresult"]) {
            document.querySelectorAll('main form:nth-of-type(2)').forEach(i => i.value = "");
        }
    }
}

// Event listener for login form submission
document.getElementById("formlogin").addEventListener("submit", function (event) {
    event.preventDefault();
    const username = document.querySelector('main form:first-of-type input:first-of-type').value;
    const password = document.querySelector('main > section > div > div:first-child form > div:nth-child(2) input').value;
    tryLogin(username, password);
});

// Event listener for toggling password visibility in login
document.querySelector('main form:first-of-type button:first-of-type').addEventListener("click", function (e) {
    e.preventDefault();
    const password = document.querySelector('main > section > div > div:first-child form > div:nth-child(2) input');
    togglePasswordVisibility(this, password);
});

// Event listener for registration form submission
document.querySelector('main > section > div > div:last-child form').addEventListener("submit", function (event) {
    event.preventDefault();
    const name = document.querySelector("#registername").value;
    const surname = document.querySelector("#registersurname").value;
    const username = document.querySelector("#registerusername").value;
    const password = document.querySelector("#registerpassword").value;
    tryRegistration(name, surname, username, password);
});

// Event listener for toggling password visibility in registration
document.querySelector('main > section > div > div:last-child button:first-of-type').addEventListener("click", function (e) {
    e.preventDefault();
    const password = document.querySelector("#registerpassword");
    togglePasswordVisibility(this, password);
});
