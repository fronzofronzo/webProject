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

async function changeOrderStatus(id, status) {
    const url="./api/api-order.php";
    const formData = new FormData();
    formData.append("action", "change-status")
    formData.append("order", id);
    formData.append("status", status);

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
                    <p> L'ordine si trova nello stato : ${orders[i]["status"]} ${orders[i]["suspended"] ? "(SOSPESO)" : ""}<p>
                </div>
                <div class="d-flex justify-content-end flex-grow-1" >
                    <button class="btn btn-primary me-2 statusButton" id="${orders[i]["idorder"]}"  value ="${nextStatus(orders[i]["status"])}" ${orders[i]["suspended"] ? "disabled" : "" }>Passa a stato successivo</button>
                    <button class="btn btn-danger suspendButton" id=${orders[i]["idorder"]}">${orders[i]["suspended"] ? "Riprendi" : "Sospendi"}</button>
                </div>
             </div>
            `;
        }
        document.querySelector("main section div").innerHTML = code;
    }

    let statusButtons = document.querySelectorAll(".statusButton");
    statusButtons.forEach(btn => 
        btn.addEventListener("click", async function(e) {
            changeOrderStatus(btn.getAttribute("id"), btn.getAttribute("value"));
    }));
}

init();