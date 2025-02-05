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
    return output;
}

async function showInputBox(field, text) {
    let output = ``;
    switch (field) {
        case "imageproduct":
            output += `
            <form action="#" method="POST" id="form_${field}" name="form_${field}">
                <div class="form-group mb-2">
                    <label for="${field}">${text}</label>
                <input type="file" class="form-control" id="${field}" name="image" required>
                </div>
            </form>
            <button type="submit" class="btn btn-primary display-inline-block">Modifica</button>
            `;
            break;
        case "typeproduct":
            output += `
            <form action="#" method="POST" id="form_${field}" name="form_${field}">
                <div class="form-group mb-2">
                    <label for="${field}">${text}</label>
                    <select class="form-select" id="${field}" name="${field}" aria-label="Default select example">`
            output += await generateCategoriesOptions();
            output += `</select>
                </div>
            </form>
            <button type="submit" class="btn btn-primary display-inline-block">Modifica</button>
            `;
            console.log(output);
            break;
        case "descriptionproduct":
            output += `
            <form action="#" method="POST" id="form_${field}" name="form_${field}">
                <div class="form-group mb-2">
                    <label for="${field}">${text}</label>
                    <textarea class="form-control" id="${field}" name="${field}" required></textarea>
                </div>
            </form>
            <button type="submit" class="btn btn-primary display-inline-block">Modifica</button>
            `;
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
        case "imageproduct":
            document.querySelector("main section button:first-of-type").addEventListener("click", async function (e) {
                e.preventDefault();
                await updateProduct(field, null);
            });
            break;
        case "typeproduct":
            document.querySelector("main section button:first-of-type").addEventListener("click", function (e) {
                e.preventDefault();
                const val = document.querySelector("main section select").value;
                updateProduct(field, val);
            });
            break;
        case "descriptionproduct":
            document.querySelector("main section button:first-of-type").addEventListener("click", function (e) {
                e.preventDefault();
                const val = document.querySelector("main section textarea").value;
                updateProduct(field, val);
            });
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
    if (field == "imageproduct") {
        const image = document.querySelector("#imageproduct").files[0];
        formData.append('image', image);
    }
    const json = await fetchData(url, formData);
    if (json["modified"]) {
        document.querySelector("main p").innerHTML = "Campo modificato correttamente";
    } else {
        document.querySelector("main p").innerHTML = "Modifica fallita";
    }

}

document.querySelector("main section button").addEventListener("click", function (e) {
    e.preventDefault();
    const select = document.querySelector("main section select");
    const field = select.value;
    const text = select.options[select.selectedIndex].text;
    showInputBox(field, text);
});