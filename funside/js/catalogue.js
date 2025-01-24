function generateProducts(products) {
	let result = "";
	for(let i=0; i<numProducts; i++) {
		let product = `
		<div class="p-2">
			<p>Nome: ${products[i]["name"]}</p>
			<p>Prezzo: ${products[i]["price"]} €</p>
			<button type="button" class="btn btn-secondary btn-sm">see more</button>
		</div>`;
		result += product;
	}
	return result;
}

async function getRandomProducts() {
	const url = './api/api-products.php';
	const formData = new FormData();
	formData.append("action", 1);
	try {
		const response = await fetch(url, {
			method:"POST",
			body: formData
		});
		if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        console.log(json);
		products = json;
		document.querySelector("main > section > div:nth-child(3) div").innerHTML = generateProducts(json);
		let button = document.querySelector("main > section > div:nth-child(3) > div > button");
		button.addEventListener("click", function(e) {
			e.preventDefault();
			numProducts += 3;
			const main = document.querySelector("main > section > div:nth-child(3) > div ");
			main.innerHTML =generateProducts(products);
			console.log(numProducts);
		});
    } catch (error) {
		console.log(error.message)
	}
}

function generateCategoriesChoice(categories) {
	let result = "";
	for(let i=0; i<categories.length; i++) {
		let category = `
		<li class="form-check">
			<input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
			<label class="form-check-label" for="flexCheckDefault">
				${categories[i]["type"]}
			</label>
		</li>`;
		result += category;
	}
	return result;
}

async function getAllCategories() {
	const url = "api/api-category.php";
	const formData = new FormData();
	formData.append('action', 2);
	try {
		const response = await fetch(url, {
			method:"POST",
			body:formData
		});
		if (!response.ok) {
			throw new Error("Response status: " + response.status);
		}
		const json = await response.json();
		console.log(json);
		const categories = generateCategoriesChoice(json);
		const div = document.querySelector("main section div div ul");
		div.innerHTML = categories;
	} catch (error) {
		console.log(error.message);
	}
}

let numProducts = 6;
let products = "";

//startups operations
getAllCategories();
getRandomProducts();