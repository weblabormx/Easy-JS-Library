<!DOCTYPE html>
<html>
<head>
	<title>Inputs plugin</title>
	<link rel="stylesheet" type="text/css" href="style.css">
	<link rel="stylesheet" type="text/css" href="library/style.css">
	<link rel="stylesheet" href="http://www.w3schools.com/lib/w3.css">
</head>
<body data-type="progressbar">
	<img src="logo.png" width="400" />
	<ul>
		<li><a href="index.php">Return</a></li>
	</ul>
	<span id="form-msg"></span>
	<h1>Ajax Image Uploader</h1>

	<div class="w3-row">
		<div class="w3-container w3-half">
			<!-- D&D Zone-->
			<div data-type="imageUploader" src="upload.php" class="uploader">
				<div>Drag &amp; Drop Images Here</div>
				<div class="or">-or-</div>
				<div class="browser">
					<label>
						<span>Click to open the file Browser</span>
						<input type="file" name="files[]"  accept="image/*" multiple="multiple" title='Click to add Images'>
					</label>
				</div>
			</div>
			<!-- /D&D Zone -->
			<!-- Debug box -->
			<div class="panel panel-default w3-card">
				<div class="w3-container w3-light-grey">
					<h4>Debug</h4>
				</div>
				<div class="panel-body demo-panel-debug w3-container">
					<ul id="demo-debug">
					</ul>
				</div>
			</div>
			<!-- /Debug box -->
		</div>
		<div class="w3-container w3-half">
			<div class="w3-card">
				<div class="w3-container w3-light-grey">
					<h4>Uploads</h4>
				</div>
				<div class="panel-body demo-panel-files w3-container" id='demo-files'>
					<span class="demo-note">No Files have been selected/droped yet...</span>
				</div>
			</div>
				
		</div>
	</div>
	<h3>HTML</h3>
	<code data-type="codeeditor" data-lang="html"><?php echo htmlspecialchars('<div class="w3-row">
	<div class="w3-container w3-half">
		<!-- D&D Zone-->
		<div data-type="imageUploader" src="upload.php" class="uploader">
			<div>Drag &amp; Drop Images Here</div>
			<div class="or">-or-</div>
			<div class="browser">
				<label>
					<span>Click to open the file Browser</span>
					<input type="file" name="files[]"  accept="image/*" multiple="multiple" title=\'Click to add Images\'>
				</label>
			</div>
		</div>
		<!-- /D&D Zone -->
		<!-- Debug box -->
		<div class="panel panel-default w3-card">
			<div class="w3-container w3-light-grey">
				<h4>Debug</h4>
			</div>
			<div class="panel-body demo-panel-debug w3-container">
				<ul id="demo-debug">
				</ul>
			</div>
		</div>
		<!-- /Debug box -->
	</div>
	<div class="w3-container w3-half">
		<div class="w3-card">
			<div class="w3-container w3-light-grey">
				<h4>Uploads</h4>
			</div>
			<div class="panel-body demo-panel-files w3-container" id=\'demo-files\'>
				<span class="demo-note">No Files have been selected/droped yet...</span>
			</div>
		</div>
			
	</div>
</div>'); ?></code>

	<h3>PHP</h3>
	<code data-type="codeeditor" data-lang="php"><?php echo htmlspecialchars('<?php
$res = "failed";
foreach ($_FILES as $file) {
	$tmp_name = $file["tmp_name"];
  	$name = $file["name"];
  	$res = "Successfull";
  	move_uploaded_file($tmp_name, $name);
}

echo json_encode(array(\'status\' => $res));

?>'); ?></code>

	<script type="text/javascript" src="library/jquery.min.js"></script>
	<script type="text/javascript" src="library/script.js"></script>
	

</body>
</html>