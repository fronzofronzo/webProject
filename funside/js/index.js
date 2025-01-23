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

function viewClientHome() {
    // Utente loggato
    let loginform = generateClientHome();
    main.innerHTML = loginform;
}

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
            document.querySelector("form > p").innerText = json["errorlogin"];
        }


    } catch (error) {
        console.log(error.message);
    }
}

function generateLoginForm(loginerror = null) {
    let loginform = `
	<section>
		<div class="container border border-black">
			<form action="#" method="POST" id="bbb" name="aaa">
				<h2>Login</h2>
				<p></p>
				<ul>
					<li>
						<label for="username">Username:</label><input type="text" id="username" name="username" />
					</li>
					<li>
						<label for="password">Password:</label><input type="password" id="password" name="password" />
					</li>
					<li>
						<input type="submit" name="submit" value="Invia" />
					</li>
				</ul>
			</form>
		</div>
	</section>`;
    return loginform;
}

function generateClientHome(loginerror = null) {
    let loginform = `
    <div>
		<p>Home utente</p>
		<button type="button" class="btn btn-danger">Logout</button>
	</div>`;
    return loginform;
}
getCategoryData();

const main = document.querySelector("main");
const profileButton = document.querySelector("nav div button:nth-child(2)");
profileButton.addEventListener("click", function(e){
    e.preventDefault();
    getLoginData();
});
