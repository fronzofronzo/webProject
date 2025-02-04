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

function showInputBox(field, text) {
    let output = ``;
    switch (field) {            
        case "priceproduct":

            break;
        case "typeproduct":

            break;
        default:
            output += `
                    <form action="#" method="POST" id="form_${field}" name="form_${field}">
                        <div class="form-group mb-2">
                            <label for="${field}">${text}</label>
                            <input type="text" class="form-control" id="${field}" aria-describedby="emailHelp" required>
                        </div>
                    </form>
                    <button type="submit" class="btn btn-primary display-inline-block">Modifica</button>
                    `;
            break;
    }
    output += `
            <button type="submit" class="btn btn-primary display-inline-block">Annulla</button>
            <p class="mt-2"></p>`;
    document.querySelector("main section div").innerHTML = output;
    document.querySelector("main section button:last-of-type").addEventListener("click", function (e) {
        e.preventDefault();
        window.location.reload();
    })
    switch (field) {            
        case "priceproduct":

            break;
        case "typeproduct":

            break;
        default:
            document.querySelector("main section button:first-of-type").addEventListener("click", function (e) {
                e.preventDefault();
                const val = document.querySelector("main section input").value;
                updateProduct(field, val);
            });
            break;
    }
}

async function updateProduct(field, val) {
    const url = "api/api-mod-product.php";
    const formData = new FormData();
    formData.append('field', field);
    formData.append('val', val);
    const json = await fetchData(url, formData);
    if (json["modified"]) {
        document.querySelector("main p").innerHTML = "Campo modificato correttamente";
    } else {
        document.querySelector("main p").innerHTML = "Modifica fallita";}

}

document.querySelector("main section button").addEventListener("click", function (e) {
    e.preventDefault();
    const select = document.querySelector("main section select");
    const field = select.value;
    const text = select.options[select.selectedIndex].text;
    showInputBox(field, text);
});