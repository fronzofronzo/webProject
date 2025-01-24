async function getNotificationData(){
    const url = 'api/api-notification.php';
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        console.log(json);
        if(json["isUserLogged"]){
            viewNotificationCentre(json["username"] ,json["notifications"]);
        }
        else{
            viewLoginForm();
        }
    } catch (error) {
        console.log(error.message);
    }
}

function viewNotificationCentre(username, notifiations) {
	document.title = "FunSide - Notification";
    let loginform = generateNotificationCentre(username, notifiations);
    main.innerHTML = loginform;
}

function generateNotificationCentre(username, notifiations) {
	let notificationCentre = `
	<section>
		<p>Notifiche</p>
	</section>`;
    return notificationCentre;
}