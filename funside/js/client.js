async function logout() {
    const url = "api/api-login.php";
    const formData = new FormData();
    formData.append('action', 'logout');
    try {
        const response = await fetch(url, {
            method: "POST",
            body: formData
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        if (json["logoutresult"]) {
            window.location.reload();
        }
    } catch (error) {
        console.log(error.message);
    }
}

function viewFormModifyPassword() {
    document.querySelector("main section:nth-child(2)").innerHTML = generateFormModifyPassword();
    document.getElementById("oldpasswordshow").addEventListener("click", function (e) {
        e.preventDefault();
        const password = document.querySelector("#oldpassword");
        const type = password.getAttribute("type") === "password" ? "text" : "password";
        password.setAttribute("type", type);
        const text = this.innerHTML() === "Show" ? "Hide" : "Show";
        this.innerHTML = text;
    });
    document.getElementById("newpasswordshow").addEventListener("click", function (e) {
        e.preventDefault();
        const password = document.querySelector("#newpassword");
        const type = password.getAttribute("type") === "password" ? "text" : "password";
        password.setAttribute("type", type);
        const text = this.innerHTML() === "Show" ? "Hide" : "Show";
        this.innerHTML = text;
    });
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

async function tryModifyPassword(oldpassword, newpassword) {
    const url = 'api/api-client.php';
    const formData = new FormData();
    formData.append('oldpassword', oldpassword);
    formData.append('newpassword', newpassword);
    formData.append('action', 'modifypassword');
    try {
        const response = await fetch(url, {
            method: "POST",
            body: formData
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        if (json["isPasswordModified"]) {
            window.location.reload();
        } else {
            document.querySelector("main section:nth-child(2) p").innerHTML = json["message"];
        }
    } catch (error) {
        console.log(error.message);
    }
}

function generateFormModifyPassword() {
    form = `
        <h2>Modifica password</h2>
        <div><form action="#" method="POST" id="modifypassword" name="modificapassword">
            <div class="form-group mb-2">
                <label for="oldpassword">Vecchia password</label>
                <div class="row">
                    <div class="col-9"><input type="password" class="form-control" id="oldpassword" aria-describedby="emailHelp" placeholder="Vecchia password"></div>
                    <div class="col-3"><button type="button" class="btn btn-secondary" id="oldpasswordshow">Show</button></div>
                </div>
            </div>
            <div class="form-group mb-2">
                <label for="newpassword">Nuova password</label>
                <div class="row">
                    <div class="col-9"><input type="password" class="form-control" id="newpassword" placeholder="Nuova password"></div>
                    <div class="col-3"><button type="button" class="btn btn-secondary" id="newpasswordshow">Show</button></div>
                </div>
            </div>
            <button type="submit" class="btn btn-primary" id="confirmButton">Conferma</button>
            <button type="submit" class="btn btn-primary" id="goBack">Indietro</button>
            <p></p>
        </form>
        </div>
    `;
    return form;
}

async function getClientAddress() {
    const url = 'api/api-client.php';
    const formData = new FormData();
    formData.append('action', 'getaddress');
    try {
        const response = await fetch(url, {
            method: "POST",
            body: formData
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        console.log(json);
        return json["address"];
    } catch (error) {
        console.log(error.message);
    }
}

async function viewAddress() {
    const address = await getClientAddress();
    if (!address || address.length  == 0) {
        document.getElementById("ul_address").innerHTML = `<li>Nessun indirizzo salvato per questo utente</li>`;
    } else {
        address_list = ``
        for (let i = 0; i < address.length; i++) {
            address_list += `<li>${address[i]["add"]}</li>`;
        }
        document.getElementById("ul_address").innerHTML = address_list;
    }
}

async function viewFormModifyAddress() {   
    const address = await getClientAddress();
    document.querySelector("main section:nth-child(2)").innerHTML = generateFormModifyAddress(address, 0);
}

function generateFormModifyAddress(address, n) {
    form = `
    <p>da implementare generateFormModifyAddress</p>`;
    return form;
}

const logoutButton = document.querySelector("main > section:first-child div button");
logoutButton.addEventListener("click", function (e) {
    console.log("Logout press")
    e.preventDefault();
    logout();
});

const modifyPasswordButton = document.querySelector("main > section:nth-child(2) div button:nth-of-type(1)");
modifyPasswordButton.addEventListener("click", function (e) {
    e.preventDefault();
    viewFormModifyPassword();
});

const modifyAddressButton = document.querySelector("main > section:nth-child(2) div button:nth-of-type(2)");
modifyAddressButton.addEventListener("click", function (e) {
    console.log("Logout press")
    e.preventDefault();
    viewFormModifyAddress();
});

async function getOrdersData(){
    const url = 'api/api-order.php';
    const formData = new FormData();
    formData.append('action', 'getorderbyuser');
    try {
        const response = await fetch(url, {
            method: "POST",
            body: formData
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        console.log(json);
        viewOrders(json);
    } catch (error) {
        console.log(error.message);
    }
}

viewAddress();
getOrdersData();