<section class="container-fluid">
    <h2 class=" text-center">Elimina prodotto</h2>
    <div>
        <label for="searchProduct">Ricerca prodotto</label>
        <input class="form-control mb-4" type="text" id="searchProduct" placeholder="Cerca un prodotto"/>

        <label for="productSelect">Selezione prodotto</label>
        <select class="form-select mb-4" size="6" id="productSelect">

        </select>
        <span class="text-light">
            L'elemento selezionato è : <strong></strong>
        </span>
        <div>
            <button type="button" class="btn btn-danger" disabled>Elimina</button>
        </div>
        <div class="modal fade" id="eliminationModal" tabindex="-1" aria-labelledby="labelModal" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="labelModal">Eliminazione avvenuta con successo</h1>
                    </div>
                    <div class="modal-body">
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>