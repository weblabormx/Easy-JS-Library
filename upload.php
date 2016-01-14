<?php
$res = "failed";
/*foreach ($_FILES as $file) {
	$tmp_name = $file["tmp_name"];
  	$name = $file["name"];
  	$res = "Successfull";
  	move_uploaded_file($tmp_name, "images/".$name);
}*/

echo json_encode(array('status' => $res));

?>
