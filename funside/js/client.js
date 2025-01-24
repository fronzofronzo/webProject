async function logout() {
    const url = "api/api-login.php";
    const formData = new FormData();
    formData.append('action', 'logout');
    try {
        const response = await fetch(url, {
            method: "POST",
            body: formData
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        if (json["logoutresult"]) {
            window.location.reload();
        }
    } catch (error) {
        console.log(error.message);
    }
}

const logoutButton = document.querySelector("main section div button");
logoutButton.addEventListener("click", function (e) {
    console.log("Logout press")
    e.preventDefault();
    logout();
});

