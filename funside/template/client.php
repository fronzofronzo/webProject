<section class="container-fluid">
    <h2>Benvenuto <?php echo $_SESSION["username"] ?></h2>
    <div><button type="submit" class="btn btn-secondary">Logout</button></div>
</section>
<section class="container-fluid">
    <h2>Info</h2>
    <div class="text-light">
        <p>Username: <strong><?php echo $_SESSION["username"] ?></strong></p>
        <p>Nome: <strong><?php echo $_SESSION["name"] ?></strong></p>
        <p>Cognome: <strong><?php echo $_SESSION["surname"] ?></strong></p>
        <p>Indirizzi: </p>
        <ul id="ul_address">
        </ul>
        <button class="btn btn-secondary">Modifica password</button>
        <button class="btn btn-secondary">Modifica indirizzi</button>
        <?php if (isset($templateParams["message"])): ?>
            <p><?php echo $templateParams["message"]; ?></p>
        <?php endif; ?>
    </div>
</section>
<section class="container-fluid">
    <h2>Ordini</h2>
    <div>
    </div>
</section>