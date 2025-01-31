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

function getDataReviews() {
    let div = document.querySelector("main section:nth-child(2) div div:nth-child(2) div:nth-child(2) ");
    div.innerHTML = "Qui ci vanno le recensioni";
}

init();