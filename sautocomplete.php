<?php
	$array = json_decode($_POST["result"]);
	var_dump($array);
	echo $array->label;
	return;
?>