function setProductCallback(buttons) {
	buttons.forEach(button => {
		button.addEventListener("click", function(event) {
			let productID = event.target.getAttribute("data-id");
			console.log(productID);
			window.location.href = `./product.php?id=${productID}`;
		});
	});
}

function generateProducts(products) {
	let result = "";
	let limit = numProducts;
	if(numProducts > products.length) {
		limit = products.length;
	}
	for(let i=0; i<limit; i++) {
		let product = `
		<div class="p-2 col-4 col-md-2 mb-3 text-center text-light">
			<img src="${products[i]["image"]}" class="border border-black rounded homeImage" alt="${products[i]["name"]}">
			<p class="fw-bold" >${products[i]["name"]}</p>
			<p>${products[i]["price"]} €</p>
			<button type="button" class="btn btn-secondary btn-sm" data-id="${products[i]["idproduct"]}">vedi</button>
		</div>`;
		result += product;
	}
	return result;
}

function showProducts(products) {
	console.log(products);
	const main = document.querySelector("main > section > div:nth-child(3) > div ");
	main.innerHTML = generateProducts(products);
	let buttons = document.querySelectorAll("main > section > div:nth-child(3) > div > div > button");
	setProductCallback(buttons);
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
        products = await response.json();
        console.log(products);
    } catch (error) {
		console.log(error.message)
	}
}

function generateCategoriesChoice(categories) {
	let result = `<form id='categoryForm'>
	<fieldset>
		<label class="d-none">Scelta categorie</label> `;
	for(let i=0; i<categories.length; i++) {
		let category = `<div class="mx-2 mb-1">
			<input class="form-check-input" type="checkbox" value="" id="${categories[i]["type"]}">
			<label class="form-check-label text-black" for="${categories[i]["type"]}">
				${categories[i]["type"]}
			</label>
			</div>`;
		result += category;
	}
	result += `
		</fieldset>
	</form>`;
	let submitButton = `<div class="text-center mb-2"><button type="submit" class="btn btn-secondary btn-sm">Applica Filtri</button></div>
	<div class="text-center"><button type="submit" class="btn btn-secondary btn-sm" disabled>Reset filtri</button></div>`;
	result += submitButton;
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
		categories = await response.json();
		console.log(categories);
		const cat = generateCategoriesChoice(categories);
		const div = document.querySelector("main section div div div");
		div.innerHTML = cat;
		const filter = document.querySelector("main section div div div button:first-child");
		const reset = document.querySelector("main section div div div div:last-child button ")
		filter.addEventListener("click", function(e) {
			reset.removeAttribute("disabled");
			let selectedProducts = [];
			for(let i=0; i<categories.length; i++) {
				let checkBox = document.getElementById(categories[i]["type"]);
				if(checkBox.checked) {
					for(let j=0; j<products.length; j++) {
						if(products[j]["type"] == categories[i]["type"]){
							selectedProducts.push(products[j]);
						}
					}
				}
			}
			numProducts = 3;
			filteredProducts = selectedProducts;
			showProducts(filteredProducts);
		});
		reset.addEventListener("click", function(e) {
			filteredProducts = products;
			document.getElementById("categoryForm").reset();
			showProducts(filteredProducts);
		})
	} catch (error) {
		console.log(error.message);
	}
}

let numProducts = 3;
let products = "";
let categories = [];
let filteredProducts = [];

async function init() {
    await getAllCategories(); // Aspetta che le categorie siano caricate
    await getRandomProducts();
	const param = new URLSearchParams(window.location.search);
	const cat = param.get("cat");
	if(cat) {
		console.log(typeof cat);
		let selectedProducts = [];
		for(let j=0; j<products.length; j++) {
			console.log(typeof products[j]["type"])
			if(products[j]["type"] == cat){
				
				selectedProducts.push(products[j]);
			}
		}
		filteredProducts = selectedProducts;
	} else {
		filteredProducts = products;
	}
	showProducts(filteredProducts);
	let showButton = document.querySelector("main > section > div:nth-child(3) > div > button");
	showButton.addEventListener("click", function (e) {
		numProducts += 3;
		showProducts(filteredProducts);
	});
	let buttons = document.querySelectorAll("main > section > div:nth-child(3) > div > div > button");
	setProductCallback(buttons);
}

init();