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
                    <p> L'ordine si trova nello stato : ${orders[i]["status"]}<p>
                </div>
                <div class="d-flex justify-content-end flex-grow-1" >
                    <button class="btn btn-primary me-2" id="4">Passa a stato successivo</button>
                    <button class="btn btn-danger" id="4">Sospendi</button>
                </div>
             </div>
            `;
        }
        document.querySelector("main section div").innerHTML = code;
    }
}

init();