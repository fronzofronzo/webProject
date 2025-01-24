function generateProducts(products) {
	let result = "";
	for(let i=0; i<products.length; i++) {
		let product = `
		<div>
			<p>Nome: ${products[i]["name"]}</p>
		</div>`;
		result += product;
	}
	return result;
}

async function getRandomProducts() {
	const url = './api/api-products.php';
	try {
		const response = await fetch(url);
		if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        console.log(json);
        const products = generateProducts(json);
        const main = document.querySelector("main");
        main.innerHTML = products;
    } catch (error) {
		console.log(error.message)
	}
}

function generateCategoriesChoice(categories) {
	let result = "";
	for(let i=0; i<categories.length; i++) {
		let category = `
		<div class="form-check">
			<input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
			<label class="form-check-label" for="flexCheckDefault">
				${categories[i]["name"]}
			</label>
		</div>`;
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
		const div = document.querySelector("main section div div div");
		div.innerHTML = categories;
	} catch (error) {
		console.log(error.message);
	}
}
getAllCategories();