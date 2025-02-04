<!DOCTYPE html>
<html lang="it">

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <link rel="stylesheet" href="./css/style.css">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
        crossorigin="anonymous"></script>
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap" rel="stylesheet">
    <title><?php echo $templateParams["title"]; ?></title>
</head>

<body>
    <header class="text-center text-black py-3">
        <h1><a href="index.php">FUN SIDE</a></h1>
    </header>

    <div class="collapse" id="navbarToggleExternalContent" data-bs-theme="dark">
        <div class="bg-dark p-4">
            <span class="text-body-secondary">Toggleable via the navbar brand.</span>
        </div>
    </div>
    <nav class="navbar bg-body-tertiary ">
        <div class="container-fluid row">
            <a href="notification.php" class="fa-solid fa-bell btn btn-light col-1" title='Notifiche'></a>
            <a href="login.php" class="fa-solid fa-user btn btn-light col-1" title="Account"></a>
            <a href="cart.php" class="fa-solid fa-cart-shopping btn btn-light col-1" title="Carrello"></a>
            <a href="catalogue.php" class="fa-solid fa-bars btn btn-light col-1" title="Catalogo"></a>
        </div>
    </nav>
    <main>
        <?php
        if(isset($templateParams["name"])){
          require($templateParams["name"]);
        }
    ?>
    </main>
    <footer class="text-center text-black py-3">
        <a href="">Contatti</a>
        <a href="">Servizi</a>
    </footer>
    <?php
    if(isset($templateParams["js"])):
        foreach($templateParams["js"] as $script):
    ?>
        <script src="<?php echo $script; ?>"></script>
    <?php
        endforeach;
    endif;
    ?>
</body>


</html>