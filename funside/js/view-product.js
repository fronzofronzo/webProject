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

async function getProductsData() {
    const url = "api/api-products.php";
    const formData = new FormData();
    formData.append('action', 'getallwithstats')
    const json = await fetchData(url, formData);
    if (json) {
        console.log(json);
        return json;
    }
}

async function generateTable() {
    const products = await getProductsData();  // Aspetta i dati
    const tbody = document.querySelector("tbody");
    tbody.innerHTML = ""; // Pulisce la tabella prima di riempirla

    products.forEach(product => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td><img src="${product.image}" alt="${product.name}" class="img-fluid" style="max-width: 50px; height: auto;"></td>
            <td>${product.idproduct}</td>
            <td>${product.type}</td>
            <td>${product.name}</td>
            <td class="text-wrap">${product.description}</td>
            <td>€${product.price}</td>
            <td>${product.avgrating !== null ? product.avgrating : "N/A"}</td>
            <td>${product.num_pieces_sold}</td>
        `;
        tbody.appendChild(row);
    });
}

document.addEventListener("DOMContentLoaded", generateTable);