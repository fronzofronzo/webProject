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

const logoutButton = document.querySelector("main > section:first-child div button");
logoutButton.addEventListener("click", function (e) {
    console.log("Logout press")
    e.preventDefault();
    logout();
});

const modifyPasswordButton = document.querySelector("main > section:nth-child(2) div button");
modifyPasswordButton.addEventListener("click", function (e) {
    console.log("Logout press")
    e.preventDefault();
    viewFormModifyPassword();
});

function viewFormModifyPassword() {
    document.querySelector("main section:nth-child(2)").innerHTML = generateFormModifyPassword();
    document.getElementById("oldpasswordshow").addEventListener("click", function (e) {
        e.preventDefault();
        const password = document.querySelector("#oldpassword");
        const type = password.getAttribute("type") === "password" ? "text" : "password";
        password.setAttribute("type", type);
        const text = this.getHTML() === "Show" ? "Hide" : "Show";
        this.innerHTML = text;
    });
    document.getElementById("newpasswordshow").addEventListener("click", function (e) {
        e.preventDefault();
        const password = document.querySelector("#newpassword");
        const type = password.getAttribute("type") === "password" ? "text" : "password";
        password.setAttribute("type", type);
        const text = this.getHTML() === "Show" ? "Hide" : "Show";
        this.innerHTML = text;
    });
    document.getElementById("confirmButton").addEventListener("click", function (e) {
        e.preventDefault();
        const password = document.querySelector("#newpassword");
        const type = password.getAttribute("type") === "password" ? "text" : "password";
        password.setAttribute("type", type);
        const text = this.getHTML() === "Show" ? "Hide" : "Show";
        this.innerHTML = text;
    });
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
            <button type="submit" class="btn btn-primary">Indietro</button>
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
        viewAddress(json["address"]);
    } catch (error) {
        console.log(error.message);
    }
}

function viewAddress(address) {
    if (address.length  == 0) {
        document.getElementById("ul_address").innerHTML = `<li>Nessun indirizzo salvato per questo utente</li>`;
    } else {
        address_list = ``
        for (let i = 0; i < address.length; i++) {
            address_list += `<li>${address[i]["add"]}</li>`;
        }
        document.getElementById("ul_address").innerHTML = address_list;
    }
}

getClientAddress()