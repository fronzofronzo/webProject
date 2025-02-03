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

async function init() {
	const url ="./api/api-cart.php";
	const formData = new FormData();
	formData.append("action", "getProducts");

	const products = await fetchData(url, formData);
	if(products) {
		let div = document.querySelector("main section div div");
		console.log(div);
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
		result += `<h3>Totale carrello: ${totalPrice}</h3>`;
		console.log(result)
		div.innerHTML += result;
	}
}

//Startup operations.
init();