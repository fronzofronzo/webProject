<section class="container-fluid">
    <h2>Admin: <?php echo $_SESSION["username"] ?></h2>
    <div><button type="submit" class="btn btn-primary">Logout</button></div>
</section>
<section class="container-fluid">
    <h2>Grafico vendite <?php if (isset($templateParams["annocorrente"])) {
        echo $templateParams["annocorrente"];
    } ?>
    </h2>
    <div class="d-flex justify-content-center align-items-center w-100 vh-80">
        <canvas id="grafico" class="w-100 h-100"></canvas>
    </div>
    <div>
        <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="anno" id="button_anno_2024" value="2024">
            <label class="form-check-label" for="button_anno_2024">2024</label>
        </div>
        <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="anno" id="button_anno_2025" value="2025" checked>
            <label class="form-check-label" for="button_anno_2025">2025</label>
        </div>
    </div>
</section>
<section class="container-fluid">
    <h2>Gestisci prodotti</h2>
    <div class="d-flex flex-row justify-content-between">
        <a href="admin-product.php?mod=1" class="btn btn-primary me-2">Inserisci un nuovo prodotto</a>
        <a href="admin-product.php?mod=2" class="btn btn-primary me-2">Modifica un prodotto</a>
        <a href="admin-product.php?mod=3" class="btn btn-primary me-2">Elimina un prodotto</a>
        <a href="admin-product.php?mod=4" class="btn btn-primary me-2">Visualizza prodotti</a>
    </div>
</section>
<section class="container-fluid">
    <h2>Gestisci ordini</h2>
</section>