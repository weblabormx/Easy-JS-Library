<!DOCTYPE html>
<html>
<head>
	<title>Inputs plugin</title>
	<link rel="stylesheet" type="text/css" href="style.css">
	<link rel="stylesheet" type="text/css" href="library/style.css">
</head>
<body data-type="progressbar">
	<img src="logo.png" width="400" />
	<ul>
		<li><a href="index.php">Return</a></li>
	</ul>
	<h1>Complements</h1>
	<h2>Sortable</h2>
	<ul id="sortable" data-type="sort">
	  	<li>Item 1</li>
	  	<li>Item 2</li>
	  	<li>Item 3</li>
	  	<li>Item 4</li>
	  	<li>Item 5</li>
	  	<li>Item 6</li>
	  	<li>Item 7</li>
	  	<li>Item 8</li>
	</ul>
	<p>Works just with list (ul) elements. Style is not included.</p>
	<code data-type="codeeditor" data-lang="html"><?php echo htmlspecialchars('<ul data-type="sort">
  	<li>Item 1</li>
  	<li>Item 2</li>
  	<li>Item 3</li>
  	<li>Item 4</li>
  	<li>Item 5</li>
  	<li>Item 6</li>
  	<li>Item 7</li>
  	<li>Item 8</li>
</ul>'); ?></code>

	<h2>Show code</h2>	
	<p>It can be selected the color between: black, white, gray and blue with data-color property</p>
	<h3>Highlight</h3>
	<code data-type="codeeditor" data-lang="javascript">function ejemplo() {
console.log("Este es un ejemplo de un codigo javascript");
}</code>
	<code data-type="codeeditor" data-lang="html"><?php echo htmlspecialchars('<code data-type="codeeditor" data-lang="javascript">function ejemplo() {
	console.log("Este es un ejemplo de un codigo javascript");
}</code>'); ?></code>

	<h2>Change on click</h2>
	<div id="country" data-type="changeOnClick">
		<img src="http://www.ssn.unam.mx/imagenes/bandera-mexico.png" />México
	</div>
	<div for="country">
		<input data-type="autocomplete" name="aut2" src="autocomplete.php" />
	</div>
	<code data-type="codeeditor" data-lang="html"><?php echo htmlspecialchars('<div id="country" data-type="changeOnClick">
	<img src="http://www.ssn.unam.mx/imagenes/bandera-mexico.png" />México
</div>
<div for="country">
	<input data-type="autocomplete" name="aut2" src="autocomplete.php" />
</div>'); ?></code>
	<h2>Progress Bar</h2>
	<p>Demo can be seen in this form, while loading a progress bar appears. It needs to be added in the body.</p>
	<code data-type="codeeditor" data-lang="html"><?php echo htmlspecialchars('<body data-type="progressbar">
// All the content goes here
</body>'); ?></code>

	<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
	<script type="text/javascript" src="library/script.js"></script>
</body>
</html>