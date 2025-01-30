<?php
require_once 'bootstrap.php';

if(isset(($_GET["id"]))) {
	$prodID = $_GET["id"];
}
require 'template/base.php';
?>

<main>
	<h2><?php echo $prodID?></h2>
</main>