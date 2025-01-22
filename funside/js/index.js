function generateCategories(categories) {
	let result = "";
	for(let i=0; i<categories.length; i++) {
		let category = `
		<div class="row">
		<div class="col-3 text-center">
			<img src="${categories[i]["image"]}" class ="img-thumbnail" alt="${categories[i]["type"]}">
		</div>
		</div>
		<div class="row">
			<div class="col-3 text-center">${categories[i]["type"]}</div>
		</div>
		`;
		result += category;
	}
	return result;
}

async function get