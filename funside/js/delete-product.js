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

async function getProducts() {
	const url = "./api/api-products.php";
	const formData = new FormData();
	formData.append("action", "getall");

	return await fetchData(url,formData);
}

async function init(){
	const products = await getProducts();
	const select = document.querySelector("section div select");
	let code = "";
	for(let i=0; i<products.length; i++) {
		code += `
		<option value=${products[i]["idproduct"]}>${products[i]["name"]}</option>`;
	}
	select.innerHTML = code;

	document.getElementById('searchProduct').addEventListener('keyup', function() {
		let filter = this.value.toLowerCase();
		console.log(this.value.toLowerCase());
		let select = document.getElementById('productSelect');
		let options = select.getElementsByTagName('option');

		for (let i = 0; i < options.length; i++) {
			let txtValue = options[i].textContent || options[i].innerText;
			if (txtValue.toLowerCase().indexOf(filter) > -1) {
				options[i].style.display = "";
			} else {
				options[i].style.display = "none";
			}
		}
	});
}

init();