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

async function getProductsInCart() {
    const url = 'api/api-cart.php';
    const formData = new FormData();
    formData.append('action', 'getProducts');

    const products = await fetchData(url, formData);
    console.log(products);

    if(products) {
        let div = document.querySelector("main section div");
        console.log(div);
        let result = "";
        for(let i=0; i<products.length; i++) {
            let html = `<div class="row text-center">
                <div class='col-12 col-md-6'>
                    <h3>${products[i]["name"]}</h3>
                    <img src="./upload/${products[i]["image"]}" class="border rounded homeImage" alt="${products[i]["name"]}">
                </div>
                <div class = "col-12 col-md-6">
                    <p>Pezzi: ${products[i]["quantity"]}</p>
                    <p class="fw-bold">${products[i]["quantity"]*products[i]["price"]}</p>
                </div>
            </div>`;
            console.log(result);
            result += html;
        }
        div.innerHTML = result;
    }
}

getProductsInCart();