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

<main>
	<section>
		<h2 class="mb-3"><?php echo $product["name"]?></h2>
		<div class="row">
			<div class="col-6 text-center">
				<img src="<?php echo $product["image"]?>" alt="<?php echo $product["name"]?>"> 
			</div>
			<div class="col-3 text-center">
				<h3><?php echo $product["type"]?></h3>
			</div>
		</div>
		<div class="row">
			<div class="col-6"></div>
			<div class="col-3 text-center"><p><?php echo generateStars($product["avgrating"]); ?></p></div>
		</div>
	</section>
</main>