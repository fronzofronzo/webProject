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

async function changeOrderStatus(id, status, user) {
    const url="./api/api-order.php";
    const formData = new FormData();
    formData.append("action", "change-status")
    formData.append("order", id);
    formData.append("status", status);
    formData.append("user", user);

    const result = await fetchData(url,formData);

    if(result) {
        init();
    }
}

async function toggleSuspension(id, user, suspended) {
    const url="./api/api-order.php";
    const formData = new FormData();
    formData.append("action", "toggle-suspension")
    formData.append("order", id);
    formData.append("user", user);
    formData.append("suspended", suspended);

    const result = await fetchData(url,formData);

    if(result) {
        init();
    }
}

function nextStatus(status) {
    switch(status) {
        case 'ordinato':
            return 'spedito';
        case 'spedito':
            return 'in consegna'
        case 'in consegna': 
            return 'consegnato' 
    }
}

async function setDeliveredOrders() {
    const url = "./api/api-order.php";
    const formData = new FormData();
    formData.append("action", "get-delivered-orders");

    const delivered = await fetchData(url, formData);

    if(delivered) {
        let code = "";
        for(let i=0; i<delivered.length; i++) {
            code += `
            <div class="d-flex p-3 align-items-center order-manage mt-4">  
                <div> 
                    <strong>Order #${delivered[i]["idorder"]}</strong>
                    <p class="text-black">Data ordine: ${delivered[i]["dateorder"]}</p>
                    <p class="text-black">Data consegna: ${delivered[i]["datedelivery"]}</p>
                    <p class="text-black">Utente: ${delivered[i]["user"]}</p>
                </div>
             </div>
            `;
        }
        document.querySelector("main section:nth-child(2) div").innerHTML = code;
    }
}

async function init() {
    const url = "./api/api-order.php";
    const formData = new FormData();
    formData.append("action", "getPendingOrders");

    const orders = await fetchData(url,formData);

    if(orders) {
        let code = "";
        for(let i=0; i<orders.length; i++) {
            code += `
            <div class="d-flex p-3 align-items-center order-manage mt-4">  
                <div> 
                    <strong>Order #${orders[i]["idorder"]}</strong>
                    <p class="text-black"> L'ordine si trova nello stato : ${orders[i]["status"]} ${orders[i]["suspended"] ? "(SOSPESO)" : ""}<p>
                </div>
                <div class="d-flex justify-content-end flex-grow-1" >
                    <button
                        class="btn btn-secondary me-2 statusButton" 
                        id="status-${orders[i]["idorder"]}"  
                        data-status="${nextStatus(orders[i]["status"])}" 
                        data-user="${orders[i]["user"]}" 
                        ${orders[i]["suspended"] ? "disabled" : "" }
                        aria-label="Passa a stato successivo per l'ordine ${orders[i]['idorder']}">
                        Passa a stato successivo
                        </button>
                    <button 
                    class="btn btn-danger suspendButton" 
                    id="suspend-${orders[i]["idorder"]}" 
                    data-user="${orders[i]["user"]}" 
                    data-suspended ="${!orders[i]["suspended"]}"
                    aria-label="${orders[i]['suspended'] ? 'Riprendi' : 'Sospendi'} l'ordine ${orders[i]['idorder']} ">
                    ${orders[i]["suspended"] ? "Riprendi" : "Sospendi"}
                    </button>
                </div>
             </div>
            `;
        }
        document.querySelector("main section div").innerHTML = code;
    }

    let statusButtons = document.querySelectorAll(".statusButton");
    statusButtons.forEach(btn => 
        btn.addEventListener("click", async function(e) {
            const orderId = this.id.replace("status-", "");
            const nextStatus = this.getAttribute("data-status");
            const user = this.getAttribute("data-user");
            changeOrderStatus(orderId, nextStatus, user);
    }));
    let suspensionButtons = document.querySelectorAll(".suspendButton");
    suspensionButtons.forEach(btn=> {
        btn.addEventListener("click", async function(e) {
            const orderId = this.id.replace("suspend-", "");
            const user = this.getAttribute("data-user");
            const suspendend = this.getAttribute("data-suspended") === "true";
            console.log(btn.getAttribute("value"));
            toggleSuspension(orderId,user,suspendend);
        })
    });

    await setDeliveredOrders();
}

init();