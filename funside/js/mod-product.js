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
    document.querySelector("section div:nth-child(3) div:nth-child(2)").innerHTML = generateProducts(products);
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

function generateForm(idproduct) {
    const url = `form-mod-product.php?idproduct=${encodeURIComponent(idproduct)}`;
    window.location.href = url;
}


async function isValidId(idproduct) {
    const url = "api/api-products.php";
    const formData = new FormData();
    formData.append('action', 'isValidId')
    formData.append('idproduct', idproduct)
    const json = await fetchData(url, formData);
    if (json) {
        console.log(json);
        return json;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    getProductsData();
    document.querySelector("section button:first-of-type").addEventListener("click", async function(e) {
        e.preventDefault();
        const id = document.querySelector("section input:first-of-type").value;
        const res = await isValidId(id);
        if (res != null) {
            generateForm(id);
        } else {
            document.querySelector("section p:first-of-type").innerHTML = "Id non valido";
        }
    });
    document.getElementById("buttonselectproduct").addEventListener("click", async function(e) {
        e.preventDefault();
        const sel = document.querySelector('input[name="productlist"]:checked');
        const id = sel != null ? sel.id : null;
        const res = await isValidId(id);
        if (res != null) {
            generateForm(id);
        } else {
            document.querySelector("section p:last-of-type").innerHTML = "Id non valido";
        }
    });
});