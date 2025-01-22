function generateCategories(categories) {
	let result = `
	<div class="container-fluid">
		<div class="row">
			<h2 class="text-white">Più apprezzati</h2>
		</div>
		<div class="row">
	`;
	for (let i = 0; i < categories.length; i++) {
		let category = `
			<div class="col-3 text-center">
				<img src="${categories[i]["image"]}" class ="img-thumbnail" alt="${categories[i]["type"]}"/>
				<div calss="text-center">${categories[i]["type"]}</div>
			</div>
		`;
		result += category;
	}
	result += `
		</div>
	</div>
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