//Categories
async function getCategoryData() {
	const url = "api/api-category.php";
	const formData = new FormData();
	formData.append('action', 1);
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

function generateCategories(categories) {
	let result = `
		<div class="row">
	`;
	for (let i = 0; i < categories.length; i++) {
		let category = `
			<div class="col-6 col-md-3 col-lg-2 d-flex flex-column justify-content-center">
				<div class="d-flex justify-content-center "><img src="${categories[i]["image"]}" class="img-thumbnail img-fluid object-fit-cover" alt="${categories[i]["type"]}" /></div>
				<div class="">${categories[i]["type"]}</div>
			</div>

		`;
		result += category;
	}
	result += `
		</div>
	`;
	return result;
}

getCategoryData();