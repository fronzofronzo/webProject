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

}

/* Function to add product to cart of the actual user */
function addToCart() {

}


function init() {
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

    /* Initialized popovers */ 
    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
    const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl));

    let cartButton = document.querySelector("main section div div:nth-child(2) div button");
    cartButton.addEventListener("click", function(e) {
        console.log("Add to cart button pressed");
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