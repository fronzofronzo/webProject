async function getNotificationData(){
    const url = 'api/api-notification.php';
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        console.log(json);
        viewNotificationCentre(json["username"] ,json["notifications"]);
    } catch (error) {
        console.log(error.message);
    }
}

function viewNotificationCentre(username, notifications) {
    let loginform = generateNotificationCentre(username, notifications);
    const div = document.querySelector("main section div");
    div.innerHTML = loginform;
}

function generateNotificationCentre(username, notifications) {
	let notificationCentre = "";
    if (notifications.length == 0) {
        notificationCentre += `
            <div>
                <p>Nessuna notifica</p>
            </div>
        `
    } else {
        
    }
    return notificationCentre;
}

getNotificationData();