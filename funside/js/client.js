async function fetchData(url, formData) {
    try {
        const response = await fetch(url, {
            method: "POST",
            body: formData
        });
        if (!response.ok) throw new Error(`Response status: ${response.status}`);
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
    if (json && json.logoutresult) window.location.reload();
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
    if (json) viewOrders(json);
}

async function tryModifyPassword(oldpassword, newpassword) {
    const url = 'api/api-client.php';
    const formData = new FormData();
    formData.append('oldpassword', oldpassword);
    formData.append('newpassword', newpassword);
    formData.append('action', 'modifypassword');
    
    const json = await fetchData(url, formData);
    if (json && json.isPasswordModified) {
        window.location.reload();
    } else {
        displayError(json.message);
    }
}

async function addNewAddress(newaddress) {
    const url = "api/api-client.php";
    const formData = new FormData();
    formData.append('action', 'addnewaddress');
    formData.append('address', newaddress);
    
    const json = await fetchData(url, formData);
    json.newaddress ? showAddressModificationSuccess("Indirizzo aggiunto") : showAddressModificationError("Indirizzo non aggiunto");
}

async function deleteAddress(id) {
    const url = "api/api-client.php";
    const formData = new FormData();
    formData.append('action', 'deleteaddress');
    formData.append('idaddress', id);
    
    const json = await fetchData(url, formData);
    json.deletedaddress ? showAddressModificationSuccess("Indirizzo eliminato") : showAddressModificationError("Indirizzo non eliminato");
}

function showAddressModificationSuccess(message) {
    viewFormModifyAddress();
    displayMessage(message);
}

function showAddressModificationError(message) {
    displayMessage(message);
}

function displayMessage(message) {
    document.querySelector("main section:nth-child(2) > p").innerHTML = message;
}

function displayError(message) {
    document.querySelector("main section:nth-child(2) p").innerHTML = message;
}

// ui.js - Modulo per la gestione dell'interfaccia utente
function viewFormModifyPassword() {
    const formHTML = generateFormModifyPassword();
    renderForm("main section:nth-child(2)", formHTML);
    setUpPasswordToggle("oldpassword");
    setUpPasswordToggle("newpassword");

    document.getElementById("confirmButton").addEventListener("click", (e) => {
        e.preventDefault();
        const oldpassword = document.querySelector("#oldpassword").value;
        const newpassword = document.querySelector("#newpassword").value;
        tryModifyPassword(oldpassword, newpassword);
    });

    document.getElementById("goBack").addEventListener("click", (e) => {
        e.preventDefault();
        window.location.reload();
    });
}

function setUpPasswordToggle(passwordId) {
    document.getElementById(`${passwordId}show`).addEventListener("click", (e) => {
        e.preventDefault();
        const password = document.querySelector(`#${passwordId}`);
        const type = password.getAttribute("type") === "password" ? "text" : "password";
        password.setAttribute("type", type);
        this.innerHTML = this.innerHTML === "Mostra" ? "Nascondi" : "Mostra";
    });
}

function renderForm(selector, formHTML) {
    document.querySelector(selector).innerHTML = formHTML;
}

function generateFormModifyPassword() {
    return `
        <h2>Modifica password</h2>
        <div>
            <form id="modifypassword">
                <div class="form-group">
                    <label for="oldpassword">Vecchia password</label>
                    <input type="password" class="form-control" id="oldpassword" placeholder="Vecchia password">
                    <button type="button" class="btn btn-secondary" id="oldpasswordshow">Mostra</button>
                </div>
                <div class="form-group">
                    <label for="newpassword">Nuova password</label>
                    <input type="password" class="form-control" id="newpassword" placeholder="Nuova password">
                    <button type="button" class="btn btn-secondary" id="newpasswordshow">Mostra</button>
                </div>
                <button type="submit" class="btn btn-secondary" id="confirmButton">Conferma</button>
                <button type="button" class="btn btn-secondary" id="goBack">Indietro</button>
            </form>
        </div>
    `;
}

function viewOrders(orders) {
    const output = orders.orders.length > 0 ? generateOrders(orders) : "<p>Nessun ordine disponibile</p>";
    document.querySelector("main section:nth-child(3) div").innerHTML = output;
}

function generateOrders(orders) {
    return orders.orders.map(o => `
        <div class="order-view">
            <h3>Ordine #${o.idorder}</h3>
            <p>Data: ${o.dateorder}</p>
            <p>Status: ${o.status}</p>
            <p>Totale: ${o.totalprice}€</p>
            <div>${generateOrderDetails(o, orders.order_details)}</div>
        </div>
    `).join('');
}

function generateOrderDetails(order, orderDetails) {
    const details = orderDetails[order.idorder] || [];
    return details.length > 0 ? details.map(d => `
        <section class="order-details">
            <img src="${d.image}" alt="${d.name}" />
            <div>
                <a href="product.php?id=${d.id}">${d.name}</a>
                <p>Quantità: ${d.quantity}</p>
                <p>Prezzo unitario: ${d.price}€</p>
                <p>Prezzo totale: ${d.total}€</p>
            </div>
        </section>
    `).join('') : '<p>Non ci sono prodotti in questo ordine.</p>';
}
