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

/*utility function to create stars valuation*/
function generateStars(rating){
    let fullStars = Math.floor(rating);  // Numero di stelle piene
    let halfStar = (rating - fullStars) >= 0.5 ? 1 : 0; // Mezza stella se necessario
    let emptyStars = 5 - (fullStars + halfStar); // Stelle vuote rimanenti

    let starsHtml = '<strong class="fa fa-star text-warning"></strong>'.repeat(fullStars);  // Stelle piene
    starsHtml += halfStar ? '<strong class="fa fa-star-half-alt text-warning"></strong>' : ''; // Mezza stella se serve
    starsHtml += '<strong class="fa fa-star text-secondary"></strong>'.repeat(emptyStars); // Stelle vuote

    return starsHtml;
}

/* Utility function to get the id of product showed in page*/
function getProductID() {
    // Ottieni la query string (tutto ciò che c'è dopo il ? nell'URL)
    const queryString = window.location.search;

    // Crea un oggetto URLSearchParams per analizzare i parametri della query
    const urlParams = new URLSearchParams(queryString);

    // Recupera il parametro 'id'
    const id = urlParams.get('id');

    return id
}

/* Function to add product to cart of the actual user */
async function addToCart(cartButton) {
    const url = "api/api-cart.php";
    const formData = new FormData();
    formData.append("action", "addProducts");
    formData.append("id", getProductID()); 
    formData.append("quantity", document.querySelector(".form-select").value)

    const result = await fetchData(url, formData);

    if(result) {
        console.log(cartButton);
        cartButton.setAttribute("data-bs-title", result["title"]);
        cartButton.setAttribute("data-bs-content", result["message"]);

        const popover = new bootstrap.Popover(cartButton);
        popover.show();
        setTimeout(() => popover.hide(), 2000);
    }
}

async function saveReview(text, value) {
    const url = "api/api-products.php";
    const formData = new FormData();
    formData.append("action", "add-review");
    formData.append("id", getProductID());
    formData.append("text", text);
    formData.append("value", value);

    const result = await fetchData(url, formData);

    return result;
}


async function init() {
    document.querySelectorAll('.tab-button').forEach(button => {
        button.addEventListener('click', async () => {
            const tabName = button.getAttribute('data-tab');
            
            // Rimuovi la classe "active" da tutti i bottoni
            document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
            button.classList.add('active');
            
            // Nascondi tutte le tab
            document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
            
            // Mostra la tab corrispondente
            document.getElementById(tabName).classList.add('active');
            if(tabName == "reviews") {
                await getDataReviews();
            }
        });
    });

    let cartButton = document.querySelector("main section div div:nth-child(2) div button");
    cartButton.addEventListener("click", function(e) {
        addToCart(cartButton);
    });

    let reviewButton = document.querySelector("main section:last-child div form button");
    reviewButton.addEventListener("click", async function() {
        let value = document.querySelector('input[name="rating"]:checked');
        let text = document.querySelector("textarea").value;
        if(value) {
            value = value.value;
            let res = await saveReview(text, value);
            let form = document.querySelector("main section form");
            console.log(res["result"]);
            if(res["result"] == true) {
                form.innerHTML += `<div class="alert alert-primary mt-4" role="alert">
                ${res["message"]}!</div>`
                //form.reset();
            } else if (res["result"] == false) {
                form.innerHTML += `<div class="alert alert-danger mt-4" role="alert">
                ${res["message"]}</div>`
            }
        }
    }); 
}

async function getDataReviews() {
    let div = document.querySelector("main section:nth-child(2) div div:nth-child(2) div:nth-child(2) ");
    const url = "api/api-products.php";
    // Ottieni la query string (tutto ciò che c'è dopo il ? nell'URL)
    const queryString = window.location.search;

    // Crea un oggetto URLSearchParams per analizzare i parametri della query
    const urlParams = new URLSearchParams(queryString);

    // Recupera il parametro 'id'
    const id = urlParams.get('id');

    const formData = new FormData();
    formData.append('action', 'reviews');
    formData.append('id', id);

    const reviews = await fetchData(url, formData);
    
    if(reviews) {
        let rev = ""
        for(let i=0; i<reviews.length; i++) {
            console.log(reviews[i]);
            rev += `<div class='border border-black mx-2 my-2 p-3 rounded'>
                <p class="fw-bold text-black">Username: ${reviews[i]["user"]}</p>
                <p class="text-black"> ${reviews[i]["text"]}</p>
                <div>${generateStars(reviews[i]["rating"])}</div>
            </div>`;
        }
        div.innerHTML = rev;
    }
}

init();