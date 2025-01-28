async function tryLogin(username, password) {
    const url = 'api/api-login.php';
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    formData.append('action', 'login');
    try {
        const response = await fetch(url, {
            method: "POST",
            body: formData
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        if (!json["loginresult"]) {
            document.querySelector("main > section:first-child form p").innerText = json["errorlogin"];
        } else {
            window.location.reload();
        }
    } catch (error) {
        console.log(error.message);
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
    try {
        const response = await fetch(url, {
            method: "POST",
            body: formData
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        document.querySelector("main > section:nth-child(2) p").innerText = json["registermsg"];
        if (json["registerresult"]) {
            document.querySelector("#registername").value = "";
            document.querySelector("#registersurname").value = "";
            document.querySelector("#registerusername").value = "";
            document.querySelector("#registerpassword").value = "";
        }
    } catch (error) {
        console.log(error.message);
    }
}

document.getElementById("formlogin").addEventListener("submit", function (event) {
    event.preventDefault();
    const username = document.querySelector("#loginusername").value;
    const password = document.querySelector("#loginpassword").value;
    tryLogin(username, password);
});

document.querySelector("#loginshow").addEventListener("click", function (e) {
    e.preventDefault();
    const password = document.querySelector("#loginpassword");
    const type = password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);
    const text = toggleButton.getHTML() === "Show" ? "Hide" : "Show";
    toggleButton.innerHTML = text;
});

document.getElementById("formregister").addEventListener("submit", function (event) {
    event.preventDefault();
    const name = document.querySelector("#registername").value;
    const surname = document.querySelector("#registersurname").value;
    const username = document.querySelector("#registerusername").value;
    const password = document.querySelector("#registerpassword").value;
    tryRegistration(name, surname, username, password);
});

document.querySelector("#registershow").addEventListener("click", function (e) {
    e.preventDefault();
    const password = document.querySelector("#registerpassword");
    const type = password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);
    const text = toggleButton.getHTML() === "Show" ? "Hide" : "Show";
    toggleButton.innerHTML = text;
});