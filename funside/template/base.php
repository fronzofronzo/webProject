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
    <title>Fun Side - Home</title>
</head>

<body>
    <header class="text-center text-black py-3">
        <h1>FUN SIDE</h1>
    </header>

    <div class="collapse" id="navbarToggleExternalContent" data-bs-theme="dark">
        <div class="bg-dark p-4">
            <span class="text-body-secondary">Toggleable via the navbar brand.</span>
        </div>
    </div>
    <nav class="navbar navbar-dark bg-dark">
        <div class="container-fluid">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent"
                aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button><nav>
        <div>
            <!--<button class="btn"><i class="material-icons">person</i></button>-->
            <button class="btn btn-light"><i class="material-icons">notifications_none</i></button>
            <button class="btn btn-light"><i class="material-icons">person_outline</i></button>
            <button class="btn btn-light"><i class="material-icons">shopping_cart</i></button>
        </div>
    </nav>
        </div>
    </nav>
    <main>
        <?php if(isset($templateParams["name"])) {
            require($templateParams["name"]);    
        }?>
    </main>
    <footer class="text-center text-black py-3">
        <a href="">Contatti</a>
        <a href="">Servizi</a>
    </footer>
    
</body>


</html>