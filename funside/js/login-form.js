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
            document.querySelector('main > section > div > div:last-child form').reset();
        }
    }
}

// Event listener for login form submission
document.querySelector('section > div > div:first-child form').addEventListener("submit", function (event) {
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
    const name = document.querySelector('main > section > div > div:last-child form > div:nth-child(1) input:first-of-type').value;
    const surname = document.querySelector('main > section > div > div:last-child form > div:nth-child(1) input:last-of-type').value;
    const username = document.querySelector('main > section > div > div:last-child form > div:nth-child(2) input').value;
    const password = document.querySelector('main > section > div > div:last-child form > div:nth-child(3) input').value;
    tryRegistration(name, surname, username, password);
});

// Event listener for toggling password visibility in registration
document.querySelector('main > section > div > div:last-child button:first-of-type').addEventListener("click", function (e) {
    e.preventDefault();
    const password = document.querySelector('main > section > div > div:last-child form > div:nth-child(3) input');
    togglePasswordVisibility(this, password);
});
