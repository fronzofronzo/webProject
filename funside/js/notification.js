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
    const main = document.querySelector("main");
    main.innerHTML = loginform;
}

function generateNotificationCentre(username, notifications) {
	let notificationCentre = `
	<section>
        <div class="container">
		    <h2>Notifiche</h2>
            `
    if (notifications.length == 0) {
        notificationCentre += `
            <div>
                <p>Nessuna notifica</p>
            </div>
        `
    } else {
        
    }
    notificationCentre += `      
        </div>
	</section>`;
    return notificationCentre;
}

getNotificationData();