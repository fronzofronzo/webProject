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
        <div >
            <form action="#" method="POST" id="modifypassword" name="modificapassword">
                <div class="form-group mb-2">
                    <label class="text-light" for="oldpassword">Vecchia password</label>
                    <div class="d-flex ">
                        <div class="flex-grow-1 me-2">
                            <input type="password" class="form-control" id="oldpassword" placeholder="Vecchia password">
                        </div>
                        <button type="button" class="btn btn-secondary" id="oldpasswordshow">Mostra</button>
                    </div>
                </div>
                <div class="form-group mb-2">
                    <label class="text-light" for="newpassword">Nuova password</label>
                    <div class="d-flex">
                        <div class="flex-grow-1 me-2">
                            <input type="password" class="form-control" id="newpassword" placeholder="Nuova password">
                        </div>
                        <button type="button" class="btn btn-secondary" id="newpasswordshow">Mostra</button>
                    </div>
                </div>
                <button type="submit" class="btn btn-secondary" id="confirmButton">Conferma</button>
                <button type="submit" class="btn btn-secondary" id="goBack">Indietro</button>
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
            let address_list = address.map(a => `<li>${a.add}</li>`).join('');
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
    document.querySelector("#confirmnewaddress").addEventListener("click", function (e) {
        e.preventDefault();
        const newaddress = document.getElementById("newaddress").value;
        addNewAddress(newaddress);
    });
}

async function addNewAddress(newaddress) {
    const url = "api/api-client.php";
    const formData = new FormData();
    formData.append('action', 'addnewaddress');
    formData.append('address', newaddress);
    const json = await fetchData(url, formData);
    
    if (json["newaddress"]) {  // Controllo su 'newaddress' e non 'address'
        viewFormModifyAddress();
        document.querySelector("main section:nth-child(2) > p").innerHTML = "Indirizzo aggiunto";
    } else {
        document.querySelector("main section:nth-child(2) > p").innerHTML = "Indirizzo non aggiunto";
    }
}

async function deleteAddress(id) {
    const url = "api/api-client.php";
    const formData = new FormData();
    formData.append('action', 'deleteaddress');
    formData.append('idaddress', id);
    const json = await fetchData(url, formData);
    if (json["deletedaddress"]) {  
        viewFormModifyAddress();
        document.querySelector("main section:nth-child(2) > p").innerHTML = "Indirizzo eliminato";
    } else {
        document.querySelector("main section:nth-child(2) > p").innerHTML = "Indirizzo non eliminato";
    }
}


function generateFormModifyAddress(addresses) {
    let form = ``;
    if (addresses.length) {
        addresses.forEach((a) => {
            form += `
            <section class="d-flex align-items-center justify-content-start p-2 mb-2 border" id="sec_${a.id}">
                <button class="btn text-light" onclick="deleteAddress(${a.id})"><strong class="material-icons">delete</strong></button>
                <span>${a.add}</span>
            </section>

            `;
        });
    } else {
        form += `<p class="mb-2">Nessun indirizzo aggiunto</p>`;
    }

    form += `
        <button id="buttonnewaddress" class="btn btn-primary" data-bs-toggle="collapse" data-bs-target="#collapseform" type="button" aria-expanded="false" aria-controls="collapseform">Aggiungi Indirizzo</button>
        <button class="btn btn-secondary" id="gobackaddress">Indietro</button>
        <div class="collapse" id="collapseform">
            <form action="#" method="POST" id="formnewaddress" name="nuovoindirizzo">
                <div class="form-group mb-2">
                    <label class="text-light " for="newaddress">Nuovo indirizzo</label>
                    <input type="text" class="form-control" id="newaddress" aria-describedby="emailHelp" placeholder="Inserisci nuovo indirizzo">
                </div>
                <button type="submit" id="confirmnewaddress" class="btn btn-primary">Conferma</button>
            </form>
        </div>
        <p class="mt-2"></p>
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
        <div class="border border-dark p-3 mb-3 order-view">
            <div class="d-flex align-items-center justify-content-between ">
                <h3 class="mb-0">Ordine #${o.idorder}</h3>
                <button class="btn btn-outline-secondary" data-bs-toggle="collapse" data-bs-target="#details_${o.idorder}" id="${o.idorder}" type="button" aria-expanded="false" aria-controls="details_${o.idorder}">▼</button>
            </div>
            <p>Ordine del: ${o.dateorder}</p>
            <p>Status: ${o.status}</p>
            <p>Totale: ${o.totalprice}€</p>
            <div class="collapse mt-2 " id="details_${o.idorder}">
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
            <section class="d-flex flex-row align-items-center gap-3 p-2 mb-2 border rounded border-2 border-black">
                <div class="d-flex justify-content-center">
                    <img src="${d.image}" class="img-thumbnail img-fluid" style="width: 80px; height: 80px; object-fit: cover;" alt="${d.name}"/>
                </div>
                <div>
                    <a href="product.php?id=${d.id}" class="fw-bold">${d.name}</a>
                    <p>Quantità: ${d.quantity}</p>
                    <p>Prezzo unitario: ${d.price}€</p>
                    <p><strong>Prezzo totale:</strong> ${d.total}€</p>
                </div>
            </section>`;
        });
    } else {
        detailsOutput += `<p class="text-muted">Non ci sono prodotti in questo ordine.</p>`;
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
