<?php 
require_once './product.php';

function generateStars($rating) {
    $fullStars = floor($rating);  // Numero di stelle piene
    $halfStar = ($rating - $fullStars) >= 0.5 ? 1 : 0; // Mezza stella se necessario
    $emptyStars = 5 - ($fullStars + $halfStar); // Stelle vuote rimanenti

    $starsHtml = str_repeat('<strong class="fa fa-star text-warning"></strong>', $fullStars);  // Stelle piene
    $starsHtml .= $halfStar ? '<strong class="fa fa-star-half-alt text-warning"></strong>' : ''; // Mezza stella se serve
    $starsHtml .= str_repeat('<strong class="fa fa-star text-secondary"></strong>', $emptyStars); // Stelle vuote

    return $starsHtml;
}

?>
<?php if($product["active"]):?>
<section class="container-fluid">
	<h2 class="mb-3 border-bottom border-white border-4">
		<?php echo $product["name"]?>
		<small ><?php echo $product["brand"]?></small>
	</h2>
	<div class="row">
		<div class="col-12 col-md-6 text-center mb-3 ">
			<img src="./upload/<?php echo $product["image"]?>" class="product-image" alt="<?php echo $product["name"]?>"/> 
		</div>
		<div class="col-12 col-md-6 text-center ">
			<div class="row mb-3 text-light">
				<h3><?php echo $product["type"]?></h3>
			</div>
			<div class="row mb-3 text-center text-light"><p><?php echo generateStars($product	["avgrating"]); ?></p>
			</div>
			<div class="row mb-3 text-center text-light"><h4>€ <?php echo $product["price"]?></h4></div>
			<div class="row mb-3 productSubmitCommand">
				<label for="quantity" class="form-label fw-bold">Quantità:</label>
				<select class="form-select border-primary rounded-3" id="quantity">
					<option value="1" selected>1</option>
					<option value="2">2</option>
					<option value="3">3</option>
					<option value="4">4</option>
					<option value="5">5</option>
				</select>
			</div>
			<div class="row productSubmitCommand" >
				<button class=" border-secondary rounded-3 btn btn-secondary" data-bs-toggle="popover" data-bs-title="Informazione" data-bs-content="Prodotto aggiunto al carrello" data-bs-placement="bottom" >
					<strong class="fa-solid fa-cart-plus me-3 d-block"></strong>
					Aggiungi al carrello
				</button> 
			</div>
		</div>
	</div>
</section>
<section class="container-fluid">
	<h2 class="mb-3 border-bottom border-white border-4">Informazioni</h2>
	<div class="tabs">
		<div class="tab-buttons">
			<button class="tab-button active" data-tab="description">Descrizione</button>
			<button class="tab-button" data-tab="reviews">Recensioni</button>
		</div>
		<div class="tab-content">
			<div class="tab-pane active" id="description">
				<p class="text-black"><?php echo $product["description"]?></p>
			</div>
			<div class="tab-pane " id="reviews">
				
			</div>
		</div>
	</div>
</section>
<section class="container-fluid">
	<h2 class="mb-3 border-bottom border-white border-4">
		Recensisci prodotto
	</h2>
	<div>
		<form>
			<div class="form-group">
				<label for="review-text">Inserisci testo della recensione</label>
				<textarea class="form-control" name="review-text" id="review-text" placeholder="Inserisci la tua recensione"></textarea>
			</div>
			<div class="form-group my-3">
				<fieldset>
					<legend class="d-none">Valutazione in stelle</legend>				
				<input type="radio" id="star5" name="rating" value="5"/>
				<label for="star5"><span class="d-none d-inline">Valutazione 5 stelle</span><?php echo generateStars(5)?></label>
				<input type="radio" id="star4" name="rating" value="4"/>
				<label for="star4"><span class="d-none d-inline">Valutazione 4 stelle</span><?php echo generateStars(4)?></label>
				<input type="radio" id="star3" name="rating" value="3"/>
				<label for="star3"><span class="d-none d-inline">Valutazione 3 stelle</span><?php echo generateStars(3)?></label>
				<input type="radio" id="star2" name="rating" value="2"/>
				<label for="star2"><span class="d-none d-inline">Valutazione 2 stelle</span><?php echo generateStars(2)?></label>
				<input type="radio" id="star1" name="rating" value="1"/>
				<label for="star1"><span class="d-none d-inline">Valutazione 1 stelle</span><?php echo generateStars(1)?></label>
				</fieldset>
			</div>
			<div class="form-group">
				<button type="button" class="btn btn-primary ">Invia</button>
			</div>
		</form>
	</div>
</section>
<?php else: ?>
	<section class="container-fluid">
		<h2>Prodotto non più disponibile</h2>
		<p>Il prodotto che stai cercando non è più disponibile</p>
	</section>
<?php endif; ?>