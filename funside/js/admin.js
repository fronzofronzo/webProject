// Seleziona il canvas e imposta il contesto di disegno
var canvas = document.getElementById("grafico");
var ctx = canvas.getContext("2d");

// Dati del grafico (12 mesi)
var dati = [10, 25, 15, 40, 30, 20, 50, 45, 35, 60, 55, 70];

// Funzione per ridimensionare il canvas
function ridimensionaCanvas() {
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;
    disegnaGrafico();
}

// Funzione per disegnare gli assi
function disegnaAssi() {
    // Asse X (mesi)
    ctx.beginPath();
    ctx.moveTo(50, canvas.height - 50);
    ctx.lineTo(canvas.width - 50, canvas.height - 50);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Asse Y (numeri)
    ctx.beginPath();
    ctx.moveTo(50, canvas.height - 50);
    ctx.lineTo(50, 50);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Etichette sull'asse X (mesi)
    var mesi = ["Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"];
    for (let i = 0; i < mesi.length; i++) {
        ctx.fillText(mesi[i], 50 + (i * (canvas.width - 100) / 12), canvas.height - 30);
    }

    // Etichette sull'asse Y (numeri)
    for (let i = 0; i <= 7; i++) {
        ctx.fillText(i * 10, 20, canvas.height - 50 - (i * (canvas.height - 100) / 7));
    }
}

// Funzione per disegnare la linea del grafico
function disegnaGrafico() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Pulisce il canvas prima di ridisegnare
    disegnaAssi();
    
    ctx.beginPath();
    ctx.moveTo(50 + (0 * (canvas.width - 100) / 12), canvas.height - 50 - dati[0]);
    
    for (let i = 1; i < dati.length; i++) {
        ctx.lineTo(50 + (i * (canvas.width - 100) / 12), canvas.height - 50 - dati[i]);
    }
    
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 2;
    ctx.stroke();
    
    disegnaPunti();
}

// Funzione per disegnare i punti
function disegnaPunti() {
    ctx.fillStyle = "red";
    for (let i = 0; i < dati.length; i++) {
        ctx.beginPath();
        ctx.arc(50 + (i * (canvas.width - 100) / 12), canvas.height - 50 - dati[i], 5, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Ridimensiona il canvas e disegna il grafico
window.addEventListener("resize", ridimensionaCanvas);

// Chiamata iniziale per adattare il canvas alle dimensioni
ridimensionaCanvas();
