<section class="container-fluid">
    <h2>Inserisci un nuovo prodotto</h2>
    <div>
        <form id="formnuovoprodotto" name="nuovoprodotto" enctype="multipart/form-data">
            <div class="form-group mb-2 d-flex">
                <div class="d-flex-column flex-grow-1 me-2">
                    <label for="nameproduct">Nome prodotto</label>
                    <input type="text" class="form-control" id="nameproduct" name="nameproduct"
                        placeholder="Nome prodotto" required />
                </div>
                <div class="d-flex-column me-2">
                    <label for="priceproduct">Prezzo</label>
                    <input type="text" class="form-control" id="priceproduct" name="priceproduct" placeholder="€ XX.XX"
                        required />
                </div>
                <div class="d-flex-column">
                    <label for="availabilityproduct">Disponibilità</label>
                    <input type="text" class="form-control" id="qproduct" name="availabilityproduct" placeholder="X"/>
                </div>
            </div>
            <div class="form-group mb-2">
                <label for="descriptionproduct">Descrizione</label>
                <textarea class="form-control" id="descriptionproduct" name="descriptionproduct"
                    placeholder="Descrizione..." required></textarea>
            </div>
            <div class="form-group mb-2 d-flex">
                <div class="d-flex-column me-2">
                    <label for="typeproduct">Categoria</label>
                    <select class="form-select" id="typeproduct" name="typeproduct" aria-label="Default select example">
                        <option value="" selected disabled>Seleziona una categoria</option>
                    </select>
                </div>
                <div class="d-flex-column flex-grow-1">
                    <label for="brandproduct">Brand</label>
                    <input type="text" class="form-control" id="brandproduct" name="brandproduct" placeholder="Brand"
                        required />
                </div>
            </div>
            <div class="d-flex-column mb-2">
                <label for="imageproduct">Immagine</label>
                <input type="file" class="form-control" id="imageproduct" name="imageproduct" required />
            </div>
            <button type="submit" class="btn btn-primary display-inline-block">Inserisci</button>
            <a href="login.php" class="btn btn-primary">Indietro</a>
            <p class="mt-2"></p>
        </form>
    </div>
</section>