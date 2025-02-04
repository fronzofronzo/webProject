document.querySelector("main > section button").addEventListener("click", async function(e) {
    e.preventDefault();
    const form = document.querySelector("main form");
    const formData = new FormData(form);
    const nameproduct = formData.get("nameproduct");
    const priceproduct = formData.get("priceproduct");
    const descriptionproduct = formData.get("descriptionproduct");
    const typeproduct = formData.get("typeproduct");
    const brandproduct = formData.get("brandproduct");
    const imageproduct = formData.get("imageproduct");
    if (await updateProduct(nameproduct, priceproduct, descriptionproduct, typeproduct, brandproduct, imageproduct)) {
        console.log("modificato") 
    } else {
        console.log("non modificato");
    }
})

async function updateProduct(nameproduct, priceproduct, descriptionproduct, typeproduct, brandproduct, imageproduct) {
    const url = "api/api-mod-product.php";
    const formData = new FormData();
    formData.append('nameproduct', nameproduct);
    formData.append('priceproduct', priceproduct);
    formData.append('descriptionproduct', descriptionproduct);
    formData.append('typeproduct', typeproduct);
    formData.append('brandproduct', brandproduct);
    formData.append('imageproduct', imageproduct);
    const json = await fetchData(url, formData);
    return json["modified"];
}

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
        console.error("Errore durante la richiesta:", error.message);
        return null;
    }
}