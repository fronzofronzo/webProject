<section class="container-fluid">
	<div class="row mx-2">
		<h2 class="mb-2">Carrello</h2>
		<div class="border rounded border-black p-2 col-12 col-md-6 checkoutContainer">
		</div>
	</div>
	<div class="row mx-2 border rounded border-black checkoutContainer">
		<div class="d-flex align-items-center justify-content-center" >
			<i class="fa-solid fa-down-long"></i><strong class="mx-2">Scegli l'indirizzo di consegna dell'ordine</strong><i class="fa-solid fa-down-long"></i>
		</div>
		<form class="row">
			<div class="my-3 col-12 col-md-6">
				<label for="address" class="form-label">Indirizzo</label>
				<input type="text" class="form-control" id="address" aria-describedby="adressHelp">
				<div id="addressHelp" class="form-text">Inserisci un nuovo indirizzo</div>
				<button type="button" class="btn btn-primary">Inserisci</button>
			</div>
			<div class="my-3 col-12 col-md-6">
			</div>
		</form>
	</div>
	<div class="row mx-2 border rounded border-black mt-4 checkoutContainer" >
	<div class="d-flex align-items-center justify-content-center p-2" >
			<i class="fa-solid fa-down-long"></i><strong class="mx-2">Seleziona il metodo di pagamento</strong><i class="fa-solid fa-down-long"></i>
		</div>
		<div class="form-check">
			<input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
			<label class="form-check-label" for="flexRadioDefault1">
			<i class="fa-regular fa-credit-card me-2"></i>Carta di credito
			</label>
		</div>
		<div class="form-check">
			<input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked>
			<label class="form-check-label" for="flexRadioDefault2">
			<i class="fa-brands fa-cc-visa"></i>Visa card
			</label>
		</div>
	</div>
</section>