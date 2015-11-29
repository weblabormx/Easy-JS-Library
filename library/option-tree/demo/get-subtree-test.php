<?php

$idClicked = (isset($_GET['id']) && is_numeric($_GET['id']) ? (int) $_GET['id'] : null);

$res = array();
if ($idClicked!=100) {
	$res[100] = "ejemplo $idClicked";
	$res[200] = "ejemplo 2";
	$res[300] = "ejemplo 3";
}


echo json_encode($res);