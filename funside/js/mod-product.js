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
    const url="api/api-products.php";
    const formData = new FormData();
    formData.append('action', 'getall')
    const json = await fetchData(url, formData);
    if (json) {
        console.log(json);
        viewProducts(json);
    }
}

function viewProducts(products) {
    
}

getProductsData();