<section class="container-fluid">
    <h2>Modifica prodotto</h2>
    <div>
        <form>
            <div>
                <label for="searchbarid">Cerca prodotto dall'ID</label>
                <input type="text" class="form-control" id="serchbarid" aria-describedby="emailHelp"
                    placeholder="id prodotto">
                <button type="button" class="btn btn-primary mt-2" id="buttonsearchbarid">Cerca con ID</button>
            </div>
            <p></p>
        </form>
    </div>
    <div>
        <form>
            <div>
                <label for="searchbarname">Cerca prodotto dal nome</label>
                <input type="text" class="form-control" id="searchbarname" aria-describedby="emailHelp"
                    placeholder="nome prodotto">
                <button type="button" class="btn btn-primary mt-2" id="buttonsearchbarname">Cerca con nome</button>
            </div>
            <p></p>
        </form>
    </div>
    <div>
        <p>Seleziona prodotto</p>
        <div class="form-check">
            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
            <label class="form-check-label" for="flexRadioDefault1">
                Default radio
            </label>
        </div>
        <div class="form-check">
            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked>
            <label class="form-check-label" for="flexRadioDefault2">
                Default checked radio
            </label>
        </div>        
        <button class="btn btn-primary mt-2" id="buttonselectproduct">Modifica prodotto selezionato</button>
    </div>
</section>