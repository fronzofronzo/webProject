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

async function getAllCategories() {
    const url = "api/api-category.php";
    const formData = new FormData();
    formData.append('action', 2);  // For all categories
    const json = await fetchData(url, formData);
    return json;
}

async function generateCategoriesOptions() {
    const categories = await getAllCategories();
    let output = "";

    categories.forEach(c => {
        output += `<option value="${c.type}">${c.type}</option>`;
    });

    document.querySelector('main select').innerHTML += output;  // Append options to the select
}

async function addProduct(name, price, desc, brand, type, image, availability) {
    const url = "api/api-add-product.php";
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('desc', desc);
    formData.append('brand', brand);
    formData.append('type', type);
    formData.append('availability', availability);
    formData.append('image', image);

    const json = await fetchData(url, formData);
    return json;
}

document.querySelector('main form').addEventListener("submit", async function(e) {
    e.preventDefault();
    const name = document.querySelector('form > div:first-child > div:first-child input').value;
    const price = document.querySelector('form > div:first-child > div:nth-child(2) input').value;
    const availability = document.querySelector('form > div:first-child > div:last-child input').value;
    const desc = document.querySelector('form textarea').value;
    const type = document.querySelector('main select').value;
    const brand = document.querySelector('form > div:nth-child(3) input').value;
    const image = document.querySelector('form > div:nth-child(4) input').files[0];
    console.log(name + price + desc + brand + type + image);

    const result = await addProduct(name, price, desc, brand, type, image, availability == null ? 0 : availability);

    document.querySelector("main p").innerHTML = result["message"];  // Show message in the page
});

// Call to generate categories options
generateCategoriesOptions();