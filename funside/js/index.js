//Categories
async function getCategoriesData() {
	const url = "api/api-category.php";
	const formData = new FormData();
	formData.append('action', 1);
	formData.append('n', 6);
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
		const categories = generateCategories(json);
		const div = document.querySelector("main > section:first-child div");
		div.innerHTML = categories;
	} catch (error) {
		console.log(error.message);
	}
}

//Best sellers
async function getBestSellersData() {
	const url = "api/api-products.php";
	const formData = new FormData();
	formData.append('action', 2);
	formData.append('n', 6);
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
		const bestsellers = generateProducts(json);
		const div = document.querySelector("main > section:nth-child(2) div");
		div.innerHTML = bestsellers;
	} catch (error) {
		console.log(error.message);
	}
}

//Best ratings
async function getBestRatingsData() {
	const url = "api/api-products.php";
	const formData = new FormData();
	formData.append('action', 3);
	formData.append('n', 6);
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
		const bestsellers = generateProducts(json);
		const div = document.querySelector("main > section:nth-child(3) div");
		div.innerHTML = bestsellers;
	} catch (error) {
		console.log(error.message);
	}
}

function generateCategories(categories) {
    let result = `
        <div class="row m-0">
    `;
    for (let i = 0; i < categories.length; i++) {
        let category = `
            <div class="homeImage col-6 col-sm-4 col-md-3 col-lg-2 d-flex flex-column justify-content-center">
                <div class="h-150 w-150 d-flex justify-content-center">
                    <img src="${categories[i]["image"]}" class="img-thumbnail img-fluid object-fit-cover" alt="${categories[i]["type"]}" />
                </div>
                <div class="text-center">${categories[i]["type"]}</div>
            </div>
        `;
        result += category;
    }
    result += `
        </div>
    `;
    return result;
}

function generateProducts(products) {
    let result = `
        <div class="row m-0">
    `;
    for (let i = 0; i < products.length; i++) {
        let bestseller = `
            <div class="homeImage col-6 col-sm-4 col-md-3 col-lg-2 d-flex flex-column justify-content-center">
                <div class="d-flex justify-content-center">
                    <img src="${products[i]["image"]}" class="img-thumbnail img-fluid object-fit-cover" alt="${products[i]["name"]}" />
                </div>
                <div class="text-center">${products[i]["name"]}</div>
                <div class="text-center">€ ${products[i]["price"]}</div>
                <div class="text-center">Rating: ${products[i]["avgrating"]}</div>
            </div>
        `;
        result += bestseller;
    }
    result += `
        </div>
    `;
    return result;
}


getCategoriesData();
getBestSellersData();
getBestRatingsData();