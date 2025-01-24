async function getLoginData() {
    const url = './api/api-login.php';
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        console.log(json);
        if(json["loginresult"]){
            viewClientHome();
        }
        else{
            viewLoginForm();
        }
    } catch (error) {
        console.log(error.message);
    }
}

//Client
function viewClientHome() {
    // Utente loggato
	document.title = "FunSide - Profilo";
    let loginform = generateClientHome();
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
    document.querySelector("main form").addEventListener("submit", function (event) {
        event.preventDefault();
        const username = document.querySelector("#username").value;
        const password = document.querySelector("#password").value;
        tryLogin(username, password);
    });
	const toggleButton = document.querySelector("main form div div button");
	toggleButton.addEventListener("click", function(e) {
		e.preventDefault();
		const password = document.querySelector("#password");
		const type = password.getAttribute("type") === "password" ? "text" : "password";
		password.setAttribute("type", type);
		const text = toggleButton.getHTML() === "Show" ? "Hide" : "Show";
		toggleButton.innerHTML = text;
	});
}

function generateLoginForm(loginerror = null) {
    let loginform = `
	<section>
		<div class="container border border-black">
			<h2 class="text-white" >Login</h2>
			<form action="#" method="POST" id="login" name="login">
				<div class="form-group mb-2">
				<p></p>
					<label for="username">Username</label>
					<input type="text" class="form-control" id="username" aria-describedby="emailHelp" placeholder="Inserisci username">
				</div>
				<div class="form-group mb-2">
					<label for="password" >Password</label>
					<div class="row">
					<div class="col-9"><input type="password" class="form-control" id="password" placeholder="Password"></div>
					<div class="col-3"><button type="button" class="btn btn-secondary ">Show</button></div>
					</div>
				</div>
				<button type="submit" class="btn btn-primary">Login</button>
			</form>
		</div>
	</section>
	<section>
		<div class="container border border-black">
			<h2 class="text-white mb-2" >Registrati</h2>
			<form action="#" method="POST" id="register" name="register">
				<div class="form-group mb-2">
					<div class="row">
					<div class="col-6"><label for="name-register">Nome</label>
					<input type="text" class="form-control" id="name-register" placeholder="Inserisci nome"></div><div class="col-6"><label for="surname-register">Cognome</label><input type="text" class="form-control" id="surname-register" placeholder="Inserisci cognome"></div>
					</div>
				</div>
				<div class="form-group mb-2">
				<p></p>
					<label for="username-register">Username</label>
					<input type="text" class="form-control" id="username-register" placeholder="Inserisci username">
				</div>
				<div class="form-group mb-2">
					<label for="password-register" >Password</label>
					<div class="row">
					<div class="col-8"><input type="password" class="form-control" id="password-register" placeholder="Password"></div>
				</div>
				<button type="submit" class="btn btn-primary">Registrati</button>
			</form>
		</div>
	</section>`;
    return loginform;
}

//Admin
function viewAdminHome() {

}

function generateAdminHome() {

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
        if(json["loginresult"]){
            viewClientHome();
        }
        else{
            document.querySelector("form p").innerText = json["errorLogin"];
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

getLoginData();