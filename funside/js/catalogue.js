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

getRandomProducts();