// Helper function to make fetch requests
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

// Helper function to toggle password visibility
function togglePasswordVisibility(button, passwordField) {
    const type = passwordField.getAttribute("type") === "password" ? "text" : "password";
    passwordField.setAttribute("type", type);
    const text = button.innerHTML === "Mostra" ? "Nascondi" : "Mostra";
    button.innerHTML = text;
}

// Function to handle login
async function tryLogin(username, password) {
    const url = 'api/api-login.php';
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    formData.append('action', 'login');

    const json = await fetchData(url, formData);

    if (json && !json["loginresult"]) {
        document.querySelector("main > section:first-child form p").innerText = json["errorlogin"];
    } else {
        window.location.reload();
    }
}

// Function to handle registration
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
        document.querySelector("main > section:nth-child(2) p").innerText = json["registermsg"];
        if (json["registerresult"]) {
            document.querySelector("#registername").value = "";
            document.querySelector("#registersurname").value = "";
            document.querySelector("#registerusername").value = "";
            document.querySelector("#registerpassword").value = "";
        }
    }
}

// Event listener for login form submission
document.getElementById("formlogin").addEventListener("submit", function (event) {
    event.preventDefault();
    const username = document.querySelector("#loginusername").value;
    const password = document.querySelector("#loginpassword").value;
    tryLogin(username, password);
});

// Event listener for toggling password visibility in login
document.querySelector("#loginshow").addEventListener("click", function (e) {
    e.preventDefault();
    const password = document.querySelector("#loginpassword");
    togglePasswordVisibility(this, password);
});

// Event listener for registration form submission
document.getElementById("formregister").addEventListener("submit", function (event) {
    event.preventDefault();
    const name = document.querySelector("#registername").value;
    const surname = document.querySelector("#registersurname").value;
    const username = document.querySelector("#registerusername").value;
    const password = document.querySelector("#registerpassword").value;
    tryRegistration(name, surname, username, password);
});

// Event listener for toggling password visibility in registration
document.querySelector("#registershow").addEventListener("click", function (e) {
    e.preventDefault();
    const password = document.querySelector("#registerpassword");
    togglePasswordVisibility(this, password);
});
