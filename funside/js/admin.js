// Seleziona il canvas e imposta il contesto di disegno
var canvas = document.getElementById("grafico");
var ctx = canvas.getContext("2d");

// Dati del grafico (12 mesi)
var dati = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

// Funzione per calcolare il valore massimo per l'asse Y
function calcolaMaxY() {
    // Trova il massimo valore tra i dati
    let maxVal = Math.max(...dati);
    
    // Aggiungi il 10% in più
    maxVal *= 1.1;
    
    // Arrotonda al prossimo multiplo di 10
    let maxY = Math.ceil(maxVal / 10) * 10;

    // Se il valore massimo calcolato è inferiore a 20, impostiamo il minimo a 20
    if (maxY < 20) {
        maxY = 20;
    }

    return maxY;
}

// Funzione per ridimensionare il canvas
function ridimensionaCanvas() {
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = 300;
    disegnaGrafico();
}

// Funzione per disegnare gli assi
function disegnaAssi() {
    // Calcola il valore massimo sull'asse Y
    let maxY = calcolaMaxY();
    
    // Asse X (mesi)
    ctx.beginPath();
    ctx.moveTo(50, canvas.height - 50);
    ctx.lineTo(canvas.width - 50, canvas.height - 50);
    ctx.strokeStyle = "white"; // Colore bianco
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Asse Y (numeri)
    ctx.beginPath();
    ctx.moveTo(50, canvas.height - 50);
    ctx.lineTo(50, 50);
    ctx.strokeStyle = "white"; // Colore bianco
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Etichette sull'asse X (mesi)
    var mesi = ["Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"];
    ctx.fillStyle = "white"; // Colore bianco per le etichette
    for (let i = 0; i < mesi.length; i++) {
        // Calcolare la posizione del mese
        let xPos = 50 + (i * (canvas.width - 100) / 12);
        ctx.fillText(mesi[i], xPos, canvas.height - 30);
    }

    // Etichette sull'asse Y (numeri)
    for (let i = 0; i <= 7; i++) {
        // Calcolare la posizione delle etichette dell'asse Y
        let yPos = canvas.height - 50 - (i * (canvas.height - 100) / 7);
        let label = Math.round(i * (maxY / 7)); // Calcolare i valori sull'asse Y
        ctx.fillText(label, 20, yPos);
    }
}

// Funzione per disegnare la griglia
function disegnaGriglia() {
    // Calcola il valore massimo sull'asse Y
    let maxY = calcolaMaxY();
    
    // Linee orizzontali della griglia
    ctx.strokeStyle = "rgba(255, 255, 255, 0.2)"; // Colore grigio chiaro e trasparente
    ctx.lineWidth = 1;
    for (let i = 1; i <= 7; i++) {
        ctx.beginPath();
        ctx.moveTo(50, canvas.height - 50 - (i * (canvas.height - 100) / 7));
        ctx.lineTo(canvas.width - 50, canvas.height - 50 - (i * (canvas.height - 100) / 7));
        ctx.stroke();
    }
    
    // Linee verticali della griglia
    for (let i = 1; i <= 12; i++) {
        ctx.beginPath();
        let xPos = 50 + (i * (canvas.width - 100) / 12);
        ctx.moveTo(xPos, canvas.height - 50);
        ctx.lineTo(xPos, 50);
        ctx.stroke();
    }
}

// Funzione per disegnare la linea del grafico
function disegnaGrafico() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Pulisce il canvas prima di ridisegnare
    disegnaGriglia(); // Disegna la griglia
    disegnaAssi();
    
    // Calcola il valore massimo sull'asse Y
    let maxY = calcolaMaxY();
    
    ctx.beginPath();
    ctx.moveTo(50 + (0 * (canvas.width - 100) / 12), canvas.height - 50 - (dati[0] / maxY) * (canvas.height - 100));
    
    for (let i = 1; i < dati.length; i++) {
        ctx.lineTo(50 + (i * (canvas.width - 100) / 12), canvas.height - 50 - (dati[i] / maxY) * (canvas.height - 100));
    }
    
    ctx.strokeStyle = "orange";
    ctx.lineWidth = 2;
    ctx.stroke();
    
    disegnaPunti();
}

// Funzione per disegnare i punti
function disegnaPunti() {
    // Calcola il valore massimo sull'asse Y
    let maxY = calcolaMaxY();
    
    ctx.fillStyle = "red";
    for (let i = 0; i < dati.length; i++) {
        let xPos = 50 + (i * (canvas.width - 100) / 12);
        let yPos = canvas.height - 50 - (dati[i] / maxY) * (canvas.height - 100); // Adattamento per il grafico
        ctx.beginPath();
        ctx.arc(xPos, yPos, 5, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Ridimensiona il canvas e disegna il grafico
window.addEventListener("resize", ridimensionaCanvas);

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

async function logout() {
    const url = "api/api-login.php";
    const formData = new FormData();
    formData.append('action', 'logout');
    const json = await fetchData(url, formData);

    if (json && json["logoutresult"]) {
        window.location.reload();
    }
}

document.querySelector("main button").addEventListener("click", function (e) {
    e.preventDefault();
    logout();
});

async function getStatsOrders(anno = 2025) {
    const url = "api/api-order.php";
    const formData = new FormData();
    formData.append('action', 'stats');
    formData.append('anno', anno);
    const json = await fetchData(url, formData);
    for (let i = 0; i < dati.length; i++) {
        dati[i] = 0;
    }
    for (let i = 0; i < json["stats"].length; i++) {
        dati[json["stats"][i]["mese"] - 1] = json["stats"][i]["quantita_totale"];
    }
    ridimensionaCanvas();
}

document.querySelectorAll("main > section:nth-child(2) input").forEach(input => {
    input.addEventListener("click", function (e) {
        const annoSelezionato = document.querySelector('input[name="anno"]:checked').value;
        getStatsOrders(annoSelezionato);
        document.querySelector("main > section:nth-child(2) > h2").innerHTML = "Grafico vendite " + annoSelezionato;
    });
});

getStatsOrders();
