<?php 
require_once './product.php';

function generateStars($rating) {
    $fullStars = floor($rating);  // Numero di stelle piene
    $halfStar = ($rating - $fullStars) >= 0.5 ? 1 : 0; // Mezza stella se necessario
    $emptyStars = 5 - ($fullStars + $halfStar); // Stelle vuote rimanenti

    $starsHtml = str_repeat('<i class="fa fa-star text-warning"></i>', $fullStars);  // Stelle piene
    $starsHtml .= $halfStar ? '<i class="fa fa-star-half-alt text-warning"></i>' : ''; // Mezza stella se serve
    $starsHtml .= str_repeat('<i class="fa fa-star text-secondary"></i>', $emptyStars); // Stelle vuote

    return $starsHtml;
}

?>

<section class="container-fluid">
	<h2 class="mb-3 border-bottom border-black border-4">
		<?php echo $product["name"]?>
		<small class="text-body-secondary"><?php echo $product["brand"]?></small>
	</h2>
	<div class="row">
		<div class="col-12 col-md-6 text-center mb-3 ">
			<img src="./upload/<?php echo $product["image"]?>" class="product-image" alt="<?php echo $product["name"]?>"> 
		</div>
		<div class="col-12 col-md-6 text-center">
			<div class="row mb-3">
				<h3><?php echo $product["type"]?></h3>
			</div>
			<div class="row mb-3 text-center"><p><?php echo generateStars($product	["avgrating"]); ?></p>
			</div>
			<div class="row mb-3 text-center"><h4>€ <?php echo $product["price"]?></h4></div>
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
				<button class=" border-primary rounded-3 btn btn-primary" data-bs-toggle="popover" data-bs-title="Informazione" data-bs-content="Prodotto aggiunto al carrello" data-bs-placement="bottom" >
					<i class="fa-solid fa-cart-plus me-3"></i>
					<div >Aggiungi al carrello</div>
				</button> 
			</div>
		</div>
	</div>
</section>
<section class="container-fluid">
	<h2 class="mb-3 border-bottom border-black border-4">Informazioni</h2>
	<div class="tabs">
		<div class="tab-buttons">
			<button class="tab-button active" data-tab="description">Descrizione</button>
			<button class="tab-button" data-tab="reviews">Recensioni</button>
		</div>
		<div class="tab-content">
			<div class="tab-pane active" id="description">
				<!-- Contenuto della descrizione -->
				<p><?php echo $product["description"]?></p>
			</div>
			<div class="tab-pane " id="reviews">
				
			</div>
		</div>
	</div>
</section>
<section class="container-fluid">
	<h2 class="mb-3 border-bottom border-black border-4">
		Recensisci prodotto
	</h2>
	<div>
		<form action="#">
			<div class="form-group">
				<label for="review-text">Inserisci testo della recensione</label>
				<textarea class="form-control" name="review-text" id="review-text" placeholder="Inserisci la tua recensione"></textarea>
			</div>
			<div class="form-group my-2">
				<p>
				<input type="radio" id="star5" name="rating" value="5">
				<label for="star5"><?php echo generateStars(5)?></label>
				</p>
				<p>
				<input type="radio" id="star4" name="rating" value="4">
				<label for="star4"><?php echo generateStars(4)?></label>
				</p><p>
				<input type="radio" id="star3" name="rating" value="3">
				<label for="star3"><?php echo generateStars(3)?></label>
				</p><p>
				<input type="radio" id="star2" name="rating" value="2">
				<label for="star2"><?php echo generateStars(2)?></label>
				</p><p>
				<input type="radio" id="star1" name="rating" value="1">
				<label for="star1"><?php echo generateStars(1)?></label>
				</p>
			</div>
		</form>
	</div>
</section>