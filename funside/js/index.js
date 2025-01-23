function generateCategories(categories) {
	let result = `
	<section class="container-fluid">
		<div class="row">
			<h2 class="text-white">Categorie</h2>
		</div>
		<div class="row">
	`;
	for (let i = 0; i < categories.length; i++) {
		let category = `
			<div class="col-6 col-md-3 col-lg-2 d-flex flex-column">
				<div class="d-flex justify-content-center w-100 h-100"><img src="${categories[i]["image"]}" class="img-thumbnail img-fluid object-fit-contain" alt="${categories[i]["type"]}" /></div>
				<div class="d-flex justify-content-center">${categories[i]["type"]}</div>
			</div>

		`;
		result += category;
	}
	result += `
		</div>
	</section>
		`;
	return result;
}

async function getCategoryData() {
	const url = "api/api-category.php";
	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error("Response status: " + response.status);
		}
		const json = await response.json();
		console.log(json);
		const categories = generateCategories(json);
		const div = document.querySelector("main");
		div.innerHTML = categories;
	} catch (error) {
		console.log(error.message);
	}
}

getCategoryData();