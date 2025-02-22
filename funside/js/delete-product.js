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

async function deleteProduct(id) {
	const url = "./api/api-products.php";
	const formData = new FormData();
	formData.append("action", "deleteProduct");
	formData.append("id", id);

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

	//add event listener to search bar.

	document.querySelector("section div input").addEventListener('keyup', function() {
		let filter = this.value.toLowerCase();
		console.log(this.value.toLowerCase());
		let select = document.querySelector("section div select");
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

	document.querySelector("main section div select").addEventListener("change", function() {
		document.querySelector("section div div button").removeAttribute("disabled")
		value = this.value;
		let productSelected = this.options[this.selectedIndex].text;
		document.querySelector("main section div span strong").innerHTML = `${productSelected}`;
	});

	document.querySelector(".modal-footer button").addEventListener("click", function() {
		document.querySelectorAll('.modal-backdrop').forEach(el => el.remove());
		init();
	});

	document.querySelector("main section div div button").addEventListener("click", async function () {
		console.log(value);
		let result = await deleteProduct(value);
		console.log(result);
		if(result["result"] == true) {
			let myModal = new bootstrap.Modal(document.querySelector(".modal"));
			document.querySelector(".modal-body").innerHTML = `
			Il prodotto con id ${value} è stato eliminato`;
			myModal.show();
		}
	});
}

let value = -1;
init();