// Funzione di supporto per gestire gli errori
function handleError(error) {
    console.log(error.message);
}

// Funzione di supporto per inviare richieste POST
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
        handleError(error);
    }
}

// Funzione per ottenere i dati delle notifiche
async function getNotificationData() {
    const url = 'api/api-notification.php';
    const formData = new FormData();
    formData.append('action', 'getall');

    const json = await fetchData(url, formData);

    if (json) {
        console.log(json);
        viewNotificationCentre(json["username"], json["notifications"]);
    }

    updateNotificationsCount();
}

// Funzione per visualizzare il centro notifiche
function viewNotificationCentre(username, notifications) {
    let notificationHTML = generateNotificationCentre(username, notifications);
    const div = document.querySelector("main section div");
    div.innerHTML = notificationHTML;

    // Aggiungere gli eventi per "Mostra di più" e "Elimina"
    setupEventListeners();
}

// Funzione per impostare gli event listeners per i bottoni "Mostra di più" e "Elimina"
function setupEventListeners() {
    const buttonsShowMore = document.querySelectorAll('main section div > button:nth-child(2)');
    buttonsShowMore.forEach(button => {
        button.addEventListener('click', function () {
            const id = button.getAttribute('id');
            toggleNotificationReadStatus(id);
            updateNotificationsCount();
            toggleShowMoreText(button);
        });
    });

    const buttonsDelete = document.querySelectorAll('main section div > button:first-child');
    buttonsDelete.forEach(button => {
        button.addEventListener('click', function () {
            const id = button.getAttribute('id');
            deleteNotification(id);
            updateNotificationsCount();
        });
    });
}

// Funzione per aggiornare il conteggio delle notifiche non lette
async function updateNotificationsCount() {
    const url = 'api/api-notification.php';
    const formData = new FormData();
    formData.append('action', 'unreadNotificationsCount');

    const json = await fetchData(url, formData);

    if (json) {
        const badge = document.querySelector("section > h2 > span");
        const div = document.querySelector("main section div");

        if (json["count"] == 0) {
            div.innerHTML = '<div>Nessuna notifica</div>';
        }

        if (json["countUnread"] == 0) {
            badge.remove();
        } else {
            badge.innerHTML = json["countUnread"];
        }
    }
}

// Funzione per marcare una notifica come letta
async function readNotification(idnotification) {
    const url = 'api/api-notification.php';
    const formData = new FormData();
    formData.append('action', 'read');
    formData.append('id', idnotification);

    const json = await fetchData(url, formData);

    if (json) {
        const notificationElement = document.getElementById('div_' + idnotification);
        if (notificationElement && notificationElement.classList.contains("border-danger")) {
            notificationElement.classList.replace("border-danger", "border-success-subtle");
        }
    }
}

// Funzione per eliminare una notifica
async function deleteNotification(idnotification) {
    const url = 'api/api-notification.php';
    const formData = new FormData();
    formData.append('action', 'delete');
    formData.append('id', idnotification);

    const json = await fetchData(url, formData);

    if (json) {
        document.getElementById("div_" + idnotification).remove();
    }
}

// Funzione per generare il centro notifiche
function generateNotificationCentre(username, notifications) {
    let notificationCentre = "";

    if (notifications.length === 0) {
        notificationCentre += '<div>Nessuna notifica</div>';
    } else {
        notifications.forEach(notification => {
            notificationCentre += `
                <div class="d-flex flex-column border ${notification["isRead"] ? 'border-success-subtle' : 'border-danger'} rounded-4 p-3 mb-3" id="div_${notification["idnotification"]}">
                    <h3>${notification["title"]}</h3>
                    <div class="collapse" id="text_${notification["idnotification"]}">
                        <p class="mb-2">${notification["text"]}</p>
                        <p class="text-muted fs-8">${notification["date"]}: ${notification["time"]}</p>
                    </div>
                    <div class="d-flex flex-row justify-content-start">
                        <button class="btn material-icons" id="${notification["idnotification"]}">delete</button>
                        <button class="btn" data-bs-toggle="collapse" data-bs-target="#text_${notification["idnotification"]}" id="${notification["idnotification"]}" type="button" aria-expanded="false" aria-controls="text_${notification["idnotification"]}">Mostra di più</button>
                    </div>
                </div>
            `;
        });
    }

    return notificationCentre;
}

// Funzione per alternare la visualizzazione delle notifiche
function toggleShowMoreText(button) {
    const currentText = button.textContent.trim();
    button.textContent = currentText === 'Mostra di più' ? 'Mostra di meno' : 'Mostra di più';
}

// Funzione per cambiare lo stato di lettura di una notifica
async function toggleNotificationReadStatus(idnotification) {
    await readNotification(idnotification);
    updateNotificationsCount();
}

// Chiamata iniziale per ottenere le notifiche
getNotificationData();
