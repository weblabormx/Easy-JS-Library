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
	<span id="form-msg"></span>
	<form action="send.php" method="POST" data-type="ajax" id="form">
		<h1>Forms and inputs</h1>
		
		<h2>Multiple</h2>
		<h3>Email Type</h3>
		<input type="text" data-type="multiple" name="hola">
		<p>In jquery get the multiples values with commas, in the server you get an array with the same name. The name and type attribute are mandatory. You can apply styles to the input and it will work all right</p>
		<code data-type="codeeditor" data-lang="html"><?php echo htmlspecialchars('<input type="text" data-type="multiple" name="hola">'); ?></code>

		<h3>With some fields</h3>
		<span id="multiple-add">Agregar</span>
		<ul data-type="multiple" data-name="multiple">
			<li>
				<label>Nombre</label><input type="text" name="nombre" />
				<label>Costo</label><input type="text" name="costo" />
				<span class="multiple-remove">Eliminar</span>
			</li>
		</ul>
		<p>Envia al servidor $_POST[data-name][cont][nameinput], para los botones se debe usar el nombre {data-name}-[add|remove]</p>
		<code data-type="codeeditor" data-lang="html"><?php echo htmlspecialchars('<span id="multiple-add">Agregar</span>
<div data-type="multiple" data-name="multiple">
	<li>
		<label>Nombre</label><input type="text" name="nombre" />
		<label>Costo</label><input type="text" name="costo" />
		<span class="multiple-remove">Eliminar</span>
	</li>
</div>'); ?></code>

		<h2>Date picker</h2>

		<h3>Date</h3>
		<input type="text" name="date" data-type="date" lang="es" />
		<code data-type="codeeditor" data-lang="html"><?php echo htmlspecialchars('<input type="text" data-type="date" lang="es" />'); ?></code>

		<h3>Date 2nd style</h3>
		<input type="text" name="midate" data-type="date2" lang="es" />
		<code data-type="codeeditor" data-lang="html"><?php echo htmlspecialchars('<input type="text" data-type="date2" lang="es" />'); ?></code>

		<h3>DateTime</h3>
		<input type="text" name="datetime" data-type="datetime" lang="es" />
		<code data-type="codeeditor" data-lang="html"><?php echo htmlspecialchars('<input type="text" data-type="datetime" lang="es" />'); ?></code>

		<h3>Time</h3>
		<input type="text" name="time" data-type="time" />
		<code data-type="codeeditor" data-lang="html"><?php echo htmlspecialchars('<input type="text" data-type="time" />'); ?></code>
		
		<h2>WYSIWYG</h2>
		<textarea data-type="wysiwyg" name="wysiwyg"></textarea>
		<code data-type="codeeditor" data-lang="html"><?php echo htmlspecialchars('<textarea data-type="wysiwyg"></textarea>'); ?></code>

		<h2>Autocomplete</h2>
		<h3>Normal</h3>
		<label for="in1">Ejemplo: </label>
  		<input id="in1" data-type="autocomplete" name="aut" src="autocomplete.php" />
  		<p>Autocompletes a text field. It is necessary the name attribute. The PHP Code recieves $_GET['term'] with the searched word</p>
  		<h4>HTML Code</h4>
  		<code data-type="codeeditor" data-lang="html"><?php echo htmlspecialchars('<input data-type="autocomplete" name="aut" src="autocomplete.php" />'); ?></code>
  		<h4>PHP Code (autocomplete.php)</h4>
  		<code data-type="codeeditor" data-lang="php"><?php echo htmlspecialchars('<?php

  	$res = array();
	// id is what is passed to the field
	$res[] = array("label"=>$_GET["term"], "id" => 99, "value" => $_GET["term"]);
	$res[] = array("label"=>"dos", "id" => 2, "value" => "dos");
	$res[] = array("label"=>"tres", "id" => 3, "value" => "tres");
	print json_encode($res);

?>'); ?></code>
		<h3>With reload and with action</h3>
		<p>It will be send a $_POST variable called "result" with the selected data. First the action will be called and then it will be reloaded.</p>
		<label for="in2">Example: </label>
  		<input id="in2" data-type="autocomplete" name="aut2" src="autocomplete.php" data-reload="true" data-action="sautocomplete.php" />
  		<code data-type="codeeditor" data-lang="html"><?php echo htmlspecialchars('<input data-type="autocomplete" name="aut2" src="autocomplete.php" data-reload="true" data-action="sautocomplete.php" />'); ?></code>

  		<p>Example of $_POST["result"]</p>
  		<code data-type="codeeditor" data-lang="html">
object(stdClass)#1 (3) {
  ["label"]=>
  string(3) "aaa"
  ["id"]=>
  int(99)
  ["value"]=>
  string(3) "aaa"
}
  		</code>
		<h2>Button</h2>
		<h3>Checkbox</h3>
		<div data-type='button'>
			<input type="checkbox" name="checkbutton[]" value="l" id="check1"><label for="check1">Lunes</label>
			<input type="checkbox" name="checkbutton[]" value="m" id="check2"><label for="check2">Martes</label>
			<input type="checkbox" name="checkbutton[]" value="w" id="check3"><label for="check3">Miércoles</label>
		</div>
		<code data-type="codeeditor" data-lang="html"><?php echo htmlspecialchars('<div data-type="button">
	<input type="checkbox" name="checkbutton[]" value="l" id="check1"><label for="check1">Lunes</label>
	<input type="checkbox" name="checkbutton[]" value="m" id="check2"><label for="check2">Martes</label>
	<input type="checkbox" name="checkbutton[]" value="w" id="check3"><label for="check3">Miércoles</label>
</div>'); ?></code>
		<h3>Radio</h3>
		<div data-type='button'>
			<input type="radio" name="radiobutton" value="l" id="scheck1"><label for="scheck1">Lunes</label>
			<input type="radio" name="radiobutton" value="m" id="scheck2"><label for="scheck2">Martes</label>
			<input type="radio" name="radiobutton" value="w" id="scheck3"><label for="scheck3">Miércoles</label>
		</div>
		<code data-type="codeeditor" data-lang="html"><?php echo htmlspecialchars('<div data-type="button">
	<input type="radio" name="radiobutton" value="l" id="scheck1"><label for="scheck1">Lunes</label>
	<input type="radio" name="radiobutton" value="m" id="scheck2"><label for="scheck2">Martes</label>
	<input type="radio" name="radiobutton" value="w" id="scheck3"><label for="scheck3">Miércoles</label>
</div>'); ?></code>

		<h2>Slider</h2>
		<div style="width:200px;">
			<p>$<span id="slider-min">100</span> - $<span id="slider-max">200</span></p>
			<input data-type="slider" data-max="200" data-min="100" name="slider" />
		</div>
		<p>El id del span esta conformado por el name del input + "-min" o "-max". Se devuelve en el servidor un arreglo con el name con la llave max y min con sus valores.</p>
 		<code data-type="codeeditor" data-lang="html"><?php echo htmlspecialchars('<p>$<span id="slider-min">100</span> - $<span id="slider-max">200</span></p>
<input data-type="slider" data-max="200" data-min="100" name="slider" />'); ?></code>

		<h2>Tooltip</h2>	
		<input title="Selecciona una fecha" name="tooltip" data-type="tooltip" />
		<p>Puede ser agregado a cualquier tag, directamente en el input, en un div o en el form y aplicará con todos los datos con tittle.</p>
		<code data-type="codeeditor" data-lang="html"><?php echo htmlspecialchars('<input title="Selecciona una fecha" name="tooltip" data-type="tooltip" />'); ?></code>

		<h2>On / Off selector</h2>	
		<input name="onoff" data-type="onoff" value="0" data-on = "Activar" data-off="Desactivar" />
		<code data-type="codeeditor" data-lang="html"><?php echo htmlspecialchars('<input name="onoff" data-type="onoff" value="0" data-on = "Activar" data-off="Desactivar" />'); ?></code>
		<h2>Show code</h2>	
		<p>It can be selected the color between: black, white, gray and blue with data-color property</p>
		<h3>Editor</h3>
		<textarea data-type="codeeditor" data-lang="javascript" data-color="black" name="code">function foo(items) {
    var x = "All this is syntax highlighted";
    return x;
}</textarea>
		<code data-type="codeeditor" data-lang="html"><?php echo htmlspecialchars('<textarea data-type="codeeditor" data-lang="javascript" data-color="black" name="code">function foo(items) {
    var x = "All this is syntax highlighted";
    return x;
}</textarea>'); ?></code>

		<h2>Send form in Ajax</h2>
		<p>Demo can be seen in this form, the form is send via ajax and not in php direct. The id is needed. With id+"-msg" the data is print. If the php file returns a url it will redirect to there.</p>
		<code data-type="codeeditor" data-lang="html"><?php echo htmlspecialchars('<span id="form-msg"></span>
<form action="send.php" method="POST" data-type="ajax" id="form">
// Content
</form>'); ?></code>

		<h2>Validation</h2>
		<p>Works with date, time, datetime too.</p>
		<h3>Alpha Numeric</h3>
		<input type="text" data-validation="alphanumeric" />
		<code data-type="codeeditor" data-lang="html"><?php echo htmlspecialchars('<input type="text" data-validation="alphanumeric" />'); ?></code>
		<h3>Numeric</h3>
		<input type="text" data-validation="numeric" />
		<code data-type="codeeditor" data-lang="html"><?php echo htmlspecialchars('<input type="text" data-validation="numeric" />'); ?></code>
		<h3>URL</h3>
		<input type="text" data-validation="url" />
		<code data-type="codeeditor" data-lang="html"><?php echo htmlspecialchars('<input type="text" data-validation="url" />'); ?></code>
		<h3>Day</h3>
		<input type="text" data-validation="day" />
		<code data-type="codeeditor" data-lang="html"><?php echo htmlspecialchars('<input type="text" data-validation="day" />'); ?></code>
		<h3>Year</h3>
		<input type="text" data-validation="year" />
		<code data-type="codeeditor" data-lang="html"><?php echo htmlspecialchars('<input type="text" data-validation="year" />'); ?></code>
		<br /><br />
		<input type="submit" value="Click aqui" />
	</form>
	<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
	<script type="text/javascript" src="library/script.js"></script>
</body>
</html>