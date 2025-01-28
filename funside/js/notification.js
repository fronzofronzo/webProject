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
    div.innerHTML = loginform; 7
    const buttonsShowMore = document.querySelectorAll('main section div > button:nth-child(2)');
    buttonsShowMore.forEach(button => {
        button.addEventListener('click', function () {
            readNotification(button.getAttribute('id'));
            console.log(button.getAttribute('id'));
            const currentText = button.textContent.trim();
            button.textContent = currentText === 'Mostra di più' ? 'Mostra di meno' : 'Mostra di più';
    
        });
    });
    const buttonsDelete = document.querySelectorAll('main section div > button:first-child');
    buttonsDelete.forEach(button => {
        button.addEventListener('click', function () {
            deleteNotification(button.getAttribute('id'));
            console.log(button.getAttribute('id'));
            
        });
    });
}

async function deleteNotification(idnotification) {
    const url = 'api/api-notification.php';
    const formData = new FormData();
    formData.append('action', 'delete');
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
        //document.getElementById('div_' + idnotification).remove();
        getNotificationData();
    } catch (error) {
        console.log(error.message);
    }
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
        document.getElementById('msg_' + idnotification).remove();
        if ($result["notificationCenterEmpty"]) {
            document.querySelector("section > div").innerHTML= `
            <div>
                Nessuna notifica
            </div>`;
        }
    } catch (error) {
        console.log(error.message);
    }
}


function generateNotificationCentre(username, notifications) {
    let notificationCentre = "";
    if (notifications.length == 0) {
        notificationCentre += `
            <div>
                Nessuna notifica
            </div>
        `
    } else {
        for (let i = 0; i < notifications.length; i++) {
            notificationCentre += `
                <div class="d-flex flex-column border border-success-subtle rounded-4 p-3 mb-3" id="div_${notifications[i]["idnotification"]}">
                    <h3>${notifications[i]["title"]}</h3>
                    `;
            if (!notifications[i]["isRead"]) {
                notificationCentre += `
                    <p id="msg_${notifications[i]["idnotification"]}">Da leggere</p>
                `
            }
            notificationCentre += `
                    <div class="collapse" id="text_${notifications[i]["idnotification"]}">
                        <p class="mb-2">${notifications[i]["text"]}</p>
                    </div>
                    <div class="d-flex flex-row justify-content-start">
                        <button class="btn material-icons " id="${notifications[i]["idnotification"]}">delete</button>
                        <button class=" btn" data-bs-toggle="collapse" data-bs-target="#text_${notifications[i]["idnotification"]}" id="${notifications[i]["idnotification"]}" type="button" aria-expanded="false" aria-controls="text_${notifications[i]["idnotification"]}">Mostra di più</button>
                    </div>
                </div>
            `;
        }
    }
    return notificationCentre;
}

getNotificationData();