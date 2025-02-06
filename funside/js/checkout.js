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

	products = await fetchData(url, formData);
	console.log(products);
	if(products) {
		let div = document.querySelector("main section div div");
		let result = "";
		let totalPrice = 0;
		for(let i=0; i<products.length; i++) {
			subtotal = products[i]["quantity"]*products[i]["price"];
			totalPrice += subtotal;
			result += `<div>
				<strong>${products[i]["name"]}</strong>
				<p class="text-black">Pezzi: ${products[i]["quantity"]}</p>
				<p class="text-black">Totale: ${subtotal}</p>
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
		let div = document.querySelector("main section div form div:nth-child(2) fieldset");
		let result = "";
		for(let i=0; i<adresses["address"].length; i++) {
			result += `
				<input type="radio" class="btn-check" name="adresses" id="option${i+1}">
				<label class="btn btn-secondary" for="option${i+1}">${adresses["address"][i]["add"]}</label>
			`;
		}
		div.innerHTML = result;
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

async function registerOrder() {
	const url = "./api/api-order.php";
	const formData = new FormData();
	formData.append("action", "registerOrder");
	formData.append("products", JSON.stringify(products));

	await fetchData(url, formData);
}

function checkForms() {
	let adresses = document.querySelectorAll("input[name='adresses']");
	let isAdressChecked = Array.from(adresses).some(radio => radio.checked);

	let payment = document.querySelectorAll("input[name='payment']");
	let isPaymentChecked = Array.from(payment).some(radio => radio.checked);

	return isAdressChecked && isPaymentChecked;
}

async function init() {
	await getCartDetails();
	await getAdresses();
	const addressSubmitButton = document.querySelector("main section div form div button");
	addressSubmitButton.addEventListener("click", function() {
		const addressLabel = document.querySelector(".form-control");
		console.log(addressLabel.value);
		addNewAddress(addressLabel.value);
	});
	const registerOrderButton = document.querySelector("main section div:nth-child(4) button");
	registerOrderButton.addEventListener("click", async function(e) {
		if(checkForms()){
			
			let myModal = new bootstrap.Modal(document.querySelector(".modal"));
			document.querySelector(".modal").removeAttribute("inert");
       		myModal.show();
			document.querySelector(".modal-footer button").addEventListener("click", function(e) {
				window.location.href="./index.php"
			});
			await registerOrder();
			//init();
		}

	});
}

//Startup operations.
let products = [];
init();