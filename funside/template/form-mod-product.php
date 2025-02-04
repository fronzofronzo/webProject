<section class="container-fluid">
    <h2>Modifica prodotto: <?php echo $_GET["idproduct"] ?></h2>
    <div>
        <div class="col-sm-9 col-md-7 col-lg-5 mb-2">
            <label for="field">Campo da modificare</label>
            <select class="form-select" id="field" name="field" aria-label="Default select example">
                <option value="nameproduct" selected>Nome</option>
                <option value="priceproduct">Prezzo</option>
                <option value="descriptionproduct">Descrizione</option>
                <option value="brandproduct">Brand</option>
                <option value="typeproduct">Categoria</option>
                <option value="imageproduct">Immagine</option>
            </select>
        </div>
        <div>
        </div>
        <button type="submit" class="btn btn-primary display-inline-block">Conferma</button>
        <a href="admin-product.php?mod=2" class="btn btn-primary">Indietro</a>
        <p class="mt-2"></p>
    </div>
</section>