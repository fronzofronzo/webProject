async function getNotificationData() {
    const url = 'api/api-notification.php';
    const formData = new FormData();
    formData.append('action', 'getall');
    try {
        const response = await fetch(url, {
            method: "POST",
            body: formData
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        console.log(json);
        viewNotificationCentre(json["username"], json["notifications"]);
    } catch (error) {
        console.log(error.message);
    }
}

function viewNotificationCentre(username, notifications) {
    let loginform = generateNotificationCentre(username, notifications);
    const div = document.querySelector("main section div");
    div.innerHTML = loginform; const buttons = document.querySelectorAll('main section div > button:nth-child(2)');
    buttons.forEach(button => {
        button.addEventListener('click', function () {
            readNotification(button.getAttribute('id'));
            //viewNotificationCentre(username, notifications);
            console.log(button.getAttribute('id'));
            const currentText = button.textContent.trim();
            button.textContent = currentText === 'Mostra di più' ? 'Mostra di meno' : 'Mostra di più';
    
        });
    });
}

async function readNotification(idnotification) {
    const url = 'api/api-notification.php';
    const formData = new FormData();
    formData.append('action', 'read');
    formData.append('id', idnotification);
    try {
        const response = await fetch(url, {
            method: "POST",
            body: formData
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        console.log(json);
    } catch (error) {
        console.log(error.message);
    }
}


function generateNotificationCentre(username, notifications) {
    let notificationCentre = "";
    if (notifications.length == 0) {
        notificationCentre += `1
            <div>
                Nessuna notifica
            </div>
        `
    } else {
        for (let i = 0; i < notifications.length; i++) {
            notificationCentre += `
                <div class="d-flex flex-column border border-success-subtle rounded-4 p-3 mb-3">
                    <h3>${notifications[i]["title"]}</h3>
                    `;
            if (!notifications[i]["isRead"]) {
                notificationCentre += `
                    <p>Da leggere</p>
                `
            }
            notificationCentre += `
                    <div class="collapse" id="p_${notifications[i]["idnotification"]}">
                        <p class="mb-2">${notifications[i]["text"]}</p>
                    </div>
                    <div class="row">
                        <button class="btn material-icons col-1" id="delete-${notifications[i]["idnotification"]}">delete</button>
                        <button class="col-2 btn" data-bs-toggle="collapse" data-bs-target="#p_${notifications[i]["idnotification"]}" id="${notifications[i]["idnotification"]}" type="button" aria-expanded="false" aria-controls="p_${notifications[i]["idnotification"]}">Mostra di più</button>
                    </div>
                </div>
            `;
        }
    }
    return notificationCentre;
}

getNotificationData();