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

    let starsHtml = '<i class="fa fa-star text-warning"></i>'.repeat(fullStars);  // Stelle piene
    starsHtml += halfStar ? '<i class="fa fa-star-half-alt text-warning"></i>' : ''; // Mezza stella se serve
    starsHtml += '<i class="fa fa-star text-secondary"></i>'.repeat(emptyStars); // Stelle vuote

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
    formData.append("quantity", document.getElementById("quantity").value)

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

    return await fetchData(url, formData);
}


async function init() {
    document.querySelectorAll('.tab-button').forEach(button => {
        button.addEventListener('click', () => {
            const tabName = button.getAttribute('data-tab');
            
            // Rimuovi la classe "active" da tutti i bottoni
            document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
            button.classList.add('active');
            
            // Nascondi tutte le tab
            document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
            
            // Mostra la tab corrispondente
            document.getElementById(tabName).classList.add('active');
            if(tabName == "reviews") {
                getDataReviews();
            }
        });
    });

    let cartButton = document.querySelector("main section div div:nth-child(2) div button");
    cartButton.addEventListener("click", function(e) {
        addToCart(cartButton);
    });

    let reviewButton = document.querySelector("main section:last-child div form button");
    reviewButton.addEventListener("click", function() {
        let value = document.querySelector('input[name="rating"]:checked');
        let text = document.getElementById("review-text").value;
        if(value) {
            value = value.value;
            if(saveReview(text, value)) {
                let form = document.querySelector("main section form");
                form.reset();
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
            rev += `<div class='border mx-2 my-2 p-3 rounded'>
                <p class="fw-bold ">Username: ${reviews[i]["user"]}</p>
                <p> ${reviews[i]["text"]}</p>
                ${generateStars(reviews[i]["rating"])}
            </div>`;
        }
        div.innerHTML = rev;
    }
}

init();