<section class="container-fluid">
	<div class="row mx-2">
		<h2 class="mb-2">Carrello</h2>
		<div class="border rounded border-black p-2 col-12 col-md-6 checkoutContainer">
		</div>
	</div>
	<div class="row mx-2 border rounded border-black checkoutContainer">
		<div class="d-flex align-items-center justify-content-center" >
			<strong class="fa-solid fa-down-long"></strong><strong class="mx-2">Scegli l'indirizzo di consegna dell'ordine</strong><strong class="fa-solid fa-down-long"></strong>
		</div>
		<form class="row">
			<div class="my-3 col-12 col-md-6">
				<label for="address" class="form-label">Indirizzo</label>
				<input type="text" class="form-control" id="address" aria-describedby="adressHelp"/>
				<div id="addressHelp" class="form-text">Inserisci un nuovo indirizzo</div>
				<button type="button" class="btn btn-primary">Inserisci</button>
			</div>
			<div class="my-3 col-12 col-md-6">
			</div>
		</form>
	</div>
	<div class="row mx-2 border rounded border-black mt-4 checkoutContainer p-2" >
		<div class="d-flex align-items-center justify-content-center " >
			<strong class="fa-solid fa-down-long"></strong><strong class="mx-2">Seleziona il metodo di pagamento</strong><strong class="fa-solid fa-down-long"></strong>
		</div>
		<div class="form-check">
			<input class="form-check-input" type="radio" name="payment" id="payment1"/>
			<label class="form-check-label" for="payment1">
			<strong class="fa-regular fa-credit-card mx-2"></strong>Carta di credito
			</label>
		</div>
		<div class="form-check">
			<input class="form-check-input" type="radio" name="payment2" id="payment"/>
			<label class="form-check-label" for="payment2">
			<strong class="fa-brands fa-cc-visa mx-2"></strong>Visa card
			</label>
		</div>
		<div class="form-check">
			<input class="form-check-input" type="radio" name="payment3" id="payment"/>
			<label class="form-check-label" for="payment3">
			<strong class="fa-brands fa-paypal mx-2"></strong>PayPal
			</label>
		</div>
	</div>
	<div class="d-flex align-items-center justify-content-center mt-3">
		<button class='button btn btn-large btn-dark' data-bs-target="#orderRegistred">Ordina e paga</button>
	</div>
	<div class="modal fade" id="orderRegistred" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h3 class="modal-title fs-5" id="modalLabel">Ordine effetuato!</h3>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body">
					Il tuo ordine è stato registrato con successo!
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
				</div>
			</div>
		</div>
	</div>
</section>