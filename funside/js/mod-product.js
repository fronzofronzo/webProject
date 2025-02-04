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
        handleError(error);
    }
}

async function getProductsData() {
    const url = "api/api-products.php";
    const formData = new FormData();
    formData.append('action', 'getall')
    const json = await fetchData(url, formData);
    if (json) {
        console.log(json);
        viewProducts(json);
    }
}

function viewProducts(products) {
    document.querySelector("section div:nth-child(4) div:nth-child(2)").innerHTML = generateProducts(products);
}

function generateProducts(products) {
    let output = ``;
    products.forEach(p => {
        output += `
        <div class="mb-1">
         <input class="form-check-input" type="radio" name="productlist" id="${p.idproduct}">
        <label class="form-check-label" for="${p.idproduct}">
            ${p.idproduct} - ${p.name}
        </label>
        </div>
        `;
    });
    return output;
}


document.addEventListener("DOMContentLoaded", function () {
    getProductsData();
});