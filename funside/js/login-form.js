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
            document.querySelector("form p").innerText = json["errorlogin"];
        } else {
            window.location.reload();
        }
    } catch (error) {
        console.log(error.message);
    }
}

document.querySelector("main form").addEventListener("submit", function (event) {
    event.preventDefault();
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;
    tryLogin(username, password);
});

document.querySelector("main form div div button").addEventListener("click", function (e) {
    e.preventDefault();
    const password = document.querySelector("#password");
    const type = password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);
    const text = toggleButton.getHTML() === "Show" ? "Hide" : "Show";
    toggleButton.innerHTML = text;
});