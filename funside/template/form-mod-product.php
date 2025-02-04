<section class="container-fluid">
    <h2>Modifica prodotto: <?php echo $_GET["idproduct"]?> - <?php echo $_GET["nameproduct"]?></h2>
    <div>
        <form id="formmodificaprodotto" name="modificaprodotto" enctype="multipart/form-data">
            <div class="form-group mb-2 d-flex">
                <div class="d-flex-column flex-grow-1 me-2">
                    <label for="nameproduct">Nome prodotto</label>
                    <input type="text" class="form-control" id="nameproduct" name="nameproduct"
                        placeholder=<?php echo $_GET["nameproduct"]?>>
                </div>
                <div class="d-flex-column">
                    <label for="priceproduct">Prezzo</label>
                    <input type="text" class="form-control" id="priceproduct" name="priceproduct" placeholder=<?php echo $_GET["price"]?>>
                </div>
            </div>
            <div class="form-group mb-2">
                <label for="descriptionproduct">Descrizione</label>
                <textarea class="form-control" id="descriptionproduct" name="descriptionproduct"
                    placeholder=<?php echo $_GET["description"]?>></textarea>
            </div>
            <div class="form-group mb-2 d-flex">
                <div class="d-flex-column me-2">
                    <label for="typeproduct">Categoria</label>
                    <select class="form-select" id="typeproduct" name="typeproduct" aria-label="Default select example">
                        <option value="" selected><?php echo $_GET["type"]?></option>
                    </select>
                </div>
                <div class="d-flex-column flex-grow-1">
                    <label for="brandproduct">Brand</label>
                    <input type="text" class="form-control" id="brandproduct" name="brandproduct" placeholder=<?php echo $_GET["brand"]?>>
                </div>
            </div>
            <div class="d-flex-column mb-2">
                <label for="imageproduct">Immagine</label>
                <input type="file" class="form-control" id="imageproduct" name="imageproduct">
            </div>
            <button type="submit" class="btn btn-primary display-inline-block">Modifica</button>
            <a href="admin-product.php?mod=2" class="btn btn-primary">Indietro</a>
            <p class="mt-2"></p>
        </form>
    </div>
</section>