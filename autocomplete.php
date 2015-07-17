<?php
	$res = array();
	// id is what is passed to the field
	$res[] = array("label"=>$_GET["term"], "id" => 99, "value" => $_GET["term"]);
	$res[] = array("label"=>"dos", "id" => 2, "value" => "dos");
	$res[] = array("label"=>"tres", "id" => 3, "value" => "tres");
	print json_encode($res);
?>