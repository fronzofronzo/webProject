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

    const json = await fetchData(url, formData);
    
    if(json) {
        let reviews = ""
        for(let i=0; i<json.length; i++) {
            reviews += `<p>${json[i]["user"]}<p>`
        }
        div.innerHTML = reviews;
    }
}

init();