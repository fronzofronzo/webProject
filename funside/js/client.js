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

async function logout() {
    const url = "api/api-login.php";
    const formData = new FormData();
    formData.append('action', 'logout');
    const json = await fetchData(url, formData);

    if (json && json["logoutresult"]) {
        window.location.reload();
    }
}

async function getClientAddress() {
    const url = 'api/api-client.php';
    const formData = new FormData();
    formData.append('action', 'getaddress');
    const json = await fetchData(url, formData);
    return json ? json.address || [] : [];
}

async function getOrdersData() {
    const url = 'api/api-order.php';
    const formData = new FormData();
    formData.append('action', 'getorderbyuser');
    const json = await fetchData(url, formData);
    
    if (json) {
        viewOrders(json);
    }
}

async function tryModifyPassword(oldpassword, newpassword) {
    const url = 'api/api-client.php';
    const formData = new FormData();
    formData.append('oldpassword', oldpassword);
    formData.append('newpassword', newpassword);
    formData.append('action', 'modifypassword');
    
    const json = await fetchData(url, formData);

    if (json && json["isPasswordModified"]) {
        window.location.reload();
    } else {
        document.querySelector("main section:nth-child(2) p").innerHTML = json["message"];
    }
}

function viewFormModifyPassword() {
    document.querySelector("main section:nth-child(2)").innerHTML = generateFormModifyPassword();
    setUpPasswordToggle("oldpassword");
    setUpPasswordToggle("newpassword");

    document.getElementById("confirmButton").addEventListener("click", function (e) {
        e.preventDefault();
        const oldpassword = document.querySelector("#oldpassword").value;
        const newpassword = document.querySelector("#newpassword").value;
        tryModifyPassword(oldpassword, newpassword);
    });

    document.getElementById("goBack").addEventListener("click", function (e) {
        e.preventDefault();
        window.location.reload();
    });
}

function setUpPasswordToggle(passwordId) {
    document.getElementById(`${passwordId}show`).addEventListener("click", function (e) {
        e.preventDefault();
        const password = document.querySelector(`#${passwordId}`);
        const type = password.getAttribute("type") === "password" ? "text" : "password";
        password.setAttribute("type", type);
        const text = this.innerHTML === "Mostra" ? "Nascondi" : "Mostra";
        this.innerHTML = text;
    });
}

function generateFormModifyPassword() {
    return `
        <h2>Modifica password</h2>
        <div><form action="#" method="POST" id="modifypassword" name="modificapassword">
            <div class="form-group mb-2">
                <label for="oldpassword">Vecchia password</label>
                <div class="row">
                    <div class="col-9"><input type="password" class="form-control" id="oldpassword" placeholder="Vecchia password"></div>
                    <div class="col-3"><button type="button" class="btn btn-secondary" id="oldpasswordshow">Mostra</button></div>
                </div>
            </div>
            <div class="form-group mb-2">
                <label for="newpassword">Nuova password</label>
                <div class="row">
                    <div class="col-9"><input type="password" class="form-control" id="newpassword" placeholder="Nuova password"></div>
                    <div class="col-3"><button type="button" class="btn btn-secondary" id="newpasswordshow">Mostra</button></div>
                </div>
            </div>
            <button type="submit" class="btn btn-primary" id="confirmButton">Conferma</button>
            <button type="submit" class="btn btn-primary" id="goBack">Indietro</button>
            <p></p>
        </form>
        </div>
    `;
}

function viewAddress() {
    getClientAddress().then(address => {
        if (!address.length) {
            document.getElementById("ul_address").innerHTML = `<li>Nessun indirizzo salvato per questo utente</li>`;
        } else {
            let address_list = address.map(a => `<li>${a}</li>`).join('');
            document.getElementById("ul_address").innerHTML = address_list;
        }
    });
}

async function viewFormModifyAddress() {
    const address = await getClientAddress();
    document.querySelector("main section:nth-child(2)").innerHTML = generateFormModifyAddress(address);
    document.querySelector("#gobackaddress").addEventListener("click", function (e) {
        e.preventDefault();
        window.location.reload();
    });
}

function generateFormModifyAddress(addresses) {
    let form = ``;
    if (addresses.length) {
        addresses.forEach((a) => {
            form += `
            <section class="d-flex align-items-center justify-content-start p-2 mb-2 border">
                <button class="btn"><strong class="material-icons">edit</strong></button>
                <button class="btn"><strong class="material-icons">delete</strong></button>
                <span>${a}</span>
            </section>
            `;
        });
    } else {
        form += `<p class="mb-2">Nessun indirizzo aggiunto</p>`;
    }

    form += `
        <button class="btn btn-primary">Aggiungi Indirizzo</button>
        <button class="btn btn-secondary" id="gobackaddress">Indietro</button>
        <p id="message" class="mt-2"></p>
    `;
    return form;
}

function viewOrders(orders) {
    let output = orders["orders"].length > 0 ? generateOrders(orders) : "<p>Nessun ordine disponibile</p>";
    document.querySelector("main section:nth-child(3) div").innerHTML = output;
}

function generateOrders(orders) {
    let output = '';
    orders.orders.forEach(o => {
        output += `
        <div class="border border-dark p-3 mb-3">
            <div class="d-flex align-items-center justify-content-between">
                <h3 class="mb-0">Ordine #${o.idorder}</h3>
                <button class="btn btn-outline-secondary" data-bs-toggle="collapse" data-bs-target="#details_${o.idorder}" id="${o.idorder}" type="button" aria-expanded="false" aria-controls="details_${o.idorder}">▼</button>
            </div>
            <p>Ordine del: ${o.dateorder}</p>
            <p>Status: ${o.status}</p>
            <p>Totale: ${o.totalprice}€</p>
            <div class="collapse mt-2" id="details_${o.idorder}">
                ${generateOrderDetails(o, orders.order_details)}
            </div>
        </div>`;
    });
    return output;
}

function generateOrderDetails(order, orderDetails) {
    let detailsOutput = '';
    if (orderDetails && orderDetails[order.idorder]) {
        orderDetails[order.idorder].forEach(d => {
            detailsOutput += `
            <section class="d-flex flex-row align-items-center gap-3 border rounded p-2 mb-2">
                <div class="d-flex justify-content-center">
                    <img src="${d.image}" class="img-thumbnail img-fluid" style="width: 80px; height: 80px; object-fit: cover;" alt="${d.name}"/>
                </div>
                <div>
                    <p class="fw-bold">${d.name}</p>
                    <p>Quantità: ${d.quantity}</p>
                    <p>Prezzo unitario: ${d.price}€</p>
                    <p><strong>Prezzo totale:</strong> ${d.total}€</p>
                </div>
            </section>`;
        });
    } else {
        detailsOutput += `<p class="text-muted">Nessun dettaglio disponibile</p>`;
    }
    return detailsOutput;
}

document.querySelector("main > section:first-child div button").addEventListener("click", function (e) {
    e.preventDefault();
    logout();
});

document.querySelector("main > section:nth-child(2) div button:nth-of-type(1)").addEventListener("click", function (e) {
    e.preventDefault();
    viewFormModifyPassword();
});

document.querySelector("main > section:nth-child(2) div button:nth-of-type(2)").addEventListener("click", function (e) {
    e.preventDefault();
    viewFormModifyAddress();
});

viewAddress();
getOrdersData();
