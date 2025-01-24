//Client
function viewClientHome() {
    // Utente loggato
	document.title = "FunSide - Profilo";
    let loginform = generateClientHome();
	let main = document.querySelector("main");
    main.innerHTML = loginform;
	const logoutButton = document.querySelector("main div button");
	logoutButton.addEventListener("click", function(e){
		console.log("Logout press")
		e.preventDefault();
		logout();
	});
}

function generateClientHome(loginerror = null) {
    let loginform = `
    <div>
		<p>Home utente</p>
		<button type="button" class="btn btn-danger">Logout</button>
	</div>`;
    return loginform;
}

//Login form
function viewLoginForm() {
    // Utente NON loggato
	document.title = "FunSide - Login";
    let loginform = generateLoginForm();
	const main = document.querySelector("main");
    main.innerHTML = loginform;
    // Gestisco tentativo di login
    
}

//Login&Logout
async function tryLogin(username, password) {
    const url = 'api/api-login.php';
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
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
        }
    } catch (error) {
        console.log(error.message);
    }
}

async function logout() {
	const url = "api/api-login.php";
	const formData = new FormData();
	formData.append('action', 1);
	try {
		const response = await fetch(url, {
			method:"POST",
			body: formData
		});
		if(!response.ok) {
			throw new Error(`Response status: ${response.status}`);
		}
		viewLoginForm();
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

document.querySelector("main form div div button").addEventListener("click", function(e) {
    e.preventDefault();
    const password = document.querySelector("#password");
    const type = password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);
    const text = toggleButton.getHTML() === "Show" ? "Hide" : "Show";
    toggleButton.innerHTML = text;
});