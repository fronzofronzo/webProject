//HOME

//Categories
async function getCategoryData() {
	const url = "api/api-category.php";
	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error("Response status: " + response.status);
		}
		const json = await response.json();
		console.log(json);
		const categories = generateCategories(json);
		const div = document.querySelector("main");
		div.innerHTML = categories;
	} catch (error) {
		console.log(error.message);
	}
}

function generateCategories(categories) {
	let result = `
	<section class="container-fluid">
		<div class="row">
			<h2 class="text-white">Categorie</h2>
		</div>
		<div class="row">
	`;
	for (let i = 0; i < categories.length; i++) {
		let category = `
			<div class="col-6 col-md-3 col-lg-2 d-flex flex-column justify-content-center">
				<div class="d-flex justify-content-center "><img src="${categories[i]["image"]}" class="img-thumbnail img-fluid object-fit-cover" alt="${categories[i]["type"]}" /></div>
				<div class="">${categories[i]["type"]}</div>
			</div>

		`;
		result += category;
	}
	result += `
		</div>
	</section>
	`;
	return result;
}

//LOGIN

async function getLoginData() {
    const url = 'api/api-login.php';
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
    let loginform = generateLoginForm();
    main.innerHTML = loginform;
    // Gestisco tentativo di login
    document.querySelector("main form").addEventListener("submit", function (event) {
        event.preventDefault();
        const username = document.querySelector("#username").value;
        const password = document.querySelector("#password").value;
        tryLogin(username, password);
    });
}

function generateLoginForm(loginerror = null) {
    let loginform = `
	<section>
		<div class="container border border-black">
			<form action="#" method="POST" id="login" name="login">
				<div class="form-group">
				<p></p>
					<label for="username">Username</label>
					<input type="text" class="form-control" id="username" aria-describedby="emailHelp" placeholder="Enter email">
				</div>
				<div class="form-group">
					<label for="password">Password</label>
					<input type="password" class="form-control" id="password" placeholder="Password">
				</div>
				<button type="submit" class="btn btn-primary">Submit</button>
			</form>
		</div>
	</section>`;
    return loginform;
}

//ADMIN
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

//SELEECTOR

const main = document.querySelector("main");

const profileButton = document.querySelector("nav div button:nth-child(2)");
profileButton.addEventListener("click", function(e){
    e.preventDefault();
    getLoginData();
});

const title = document.querySelector("body > header > h1");
title.addEventListener("click", function(e){
    e.preventDefault();
    getCategoryData();
});

//DEFAULT

getCategoryData();