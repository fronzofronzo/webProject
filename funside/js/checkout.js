// Helper function to make fetch requests
async function fetchData(url, formData) {
    try {
        const response = await fetch(url, {
            method: "POST",
            body: formData
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.log(error.message);
    }
}

async function getCartDetails() {
	const url ="./api/api-cart.php";
	const formData = new FormData();
	formData.append("action", "getProducts");

	const products = await fetchData(url, formData);
	if(products) {
		let div = document.querySelector("main section div div");
		let result = "";
		let totalPrice = 0;
		for(let i=0; i<products.length; i++) {
			subtotal = products[i]["quantity"]*products[i]["price"];
			totalPrice += subtotal;
			result += `<div>
				<strong>${products[i]["name"]}</strong>
				<p>Pezzi: ${products[i]["quantity"]}</p>
				<p>Totale: ${subtotal}</p>
			</div>`;
		}
		result += `<h3 class="mt-4">Totale carrello: ${totalPrice}</h3>`;
		console.log(result)
		div.innerHTML += result;
	}
}

async function getAdresses() {
	const url = "./api/api-client.php";
	const formData = new FormData();
	formData.append("action", "getaddress");

	const adresses = await fetchData(url, formData);
	if(adresses) {
		let div = document.querySelector("main section div form div:nth-child(2)");
		let result = "";
		for(let i=0; i<adresses["address"].length; i++) {
			result += `
				<input type="radio" class="btn-check" name="options" id="option${i+1}" autocomplete="off">
				<label class="btn btn-secondary" for="option${i+1}">${adresses["address"][i]["add"]}</label>
			`;
		}
		div.innerHTML += result;
	}
}

async function addNewAddress(address) {
	const url = "./api/api-client.php";
	const formData = new FormData();
	formData.append("action", "addnewaddress");
	formData.append("address", address);

	const result = await fetchData(url, formData);
	if(result) {
		await getAdresses();
	}
}

async function init() {
	await getCartDetails();
	await getAdresses();
	
}

//Startup operations.
init();