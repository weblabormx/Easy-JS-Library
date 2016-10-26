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
		<span id="shipment.weight_costs-add">Agregar</span>
		<ul data-type="multiple" data-name="shipment.weight_costs">
			<li>
				<label>Nombre</label><input type="text" name="nombre" />
				<label>Costo</label><input type="text" name="costo" value="100" />
				<label>Obligatorio</label>
				<div style="display:inline-block;vertical-align:bottom;margin-left:10px;">
		        	<input data-type="onoff" name="needess" value="0" />
		        </div>
				<span class="shipment.weight_costs-remove">Eliminar</span>
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
		
		<h3>With some fields and with data</h3>
		<?php
			$array = array(
				0 => array(
					'nombre' => 'Ejemplo1',
					'costo'	=> '100',
					'required' => 1
				),
				1 => array(
					'nombre' => 'Ejemplo2',
					'costo'	=> '200',
					'required' => 0
				),
				2 => array(
					'nombre' => 'Ejemplo3',
					'costo'	=> '300',
					'required' => 1
				),
			);
			$array = json_encode($array);
		?>

		<span id="multiple2-add">Agregar</span>
		<ul data-type="multiple" data-name="multiple2" data-values='<?php echo $array; ?>'>
			<li>
				<label>Nombre</label><input type="text" name="nombre" />
				<label>Costo</label><select name="costo">
					<option value="100">100</option>
					<option value="200">200</option>
					<option value="300">300</option>
				</select>
				<label>Requerido</label><input type="checkbox" value="1" name="required" />
				<span class="multiple2-remove">Eliminar</span>
			</li>
		</ul>
		<code data-type="codeeditor" data-lang="php"><?php echo htmlspecialchars('<?php
$array = array(
	0 => array(
		\'nombre\' => \'Ejemplo1\',
		\'costo\'	=> \'100\',
	),
	1 => array(
		\'nombre\' => \'Ejemplo2\',
		\'costo\'	=> \'200\',
	),
	2 => array(
		\'nombre\' => \'Ejemplo3\',
		\'costo\'	=> \'300\',
	),
);
$array = json_encode($array);
?>'); ?></code>
		<code data-type="codeeditor" data-lang="html"><?php echo htmlspecialchars('<span id="multiple2-add">Agregar</span>
<ul data-type="multiple" data-name="multiple2" data-values=\'<?php echo $array; ?>\'>
	<li>
		<label>Nombre</label><input type="text" name="nombre" />
		<label>Costo</label><input type="text" name="costo" />
		<span class="multiple2-remove">Eliminar</span>
	</li>
</ul>'); ?></code>

		<h2>Select hierarchical</h2>
		<input type="text" name="category" id="category" data-type="hselect" src="library/option-tree/demo/get-subtree.php" data-value-select="220,226" />
		<p>Sends $_GET["id"] to php, you need to send a json with title (value) and value (name showed here). Add data-parent attribute to select who should be the default parent. With value will select automatically that value, add "," to separate actions.</p>
		<code data-type="codeeditor" data-lang="html"><?php echo htmlspecialchars('<input type="text" name="category" id="category" data-type="hselect" src="library/option-tree/demo/get-subtree.php" data-value-select="220,226" />'); ?></code>
		<h2>Date picker</h2>
		<p>All inputs accepts value attr.</p>
		<h3>Date</h3>
		<input type="text" name="date" data-type="date" lang="es" value="2015-12-01" />
		<code data-type="codeeditor" data-lang="html"><?php echo htmlspecialchars('<input type="text" data-type="date" lang="es" />'); ?></code>

		<h3>Date 2nd style</h3>
		<input type="text" name="midate" data-type="date2" lang="es" value="2015-02-04" />
		<code data-type="codeeditor" data-lang="html"><?php echo htmlspecialchars('<input type="text" data-type="date2" lang="es" />'); ?></code>

		<h3>DateTime</h3>
		<input type="text" name="datetime" data-type="datetime" lang="es" value="2015-12-04 00:00" />
		<code data-type="codeeditor" data-lang="html"><?php echo htmlspecialchars('<input type="text" data-type="datetime" lang="es" />'); ?></code>

		<h3>Time</h3>
		<input type="text" name="time" data-type="time" value="15:06"/>
		<code data-type="codeeditor" data-lang="html"><?php echo htmlspecialchars('<input type="text" data-type="time" />'); ?></code>
		
		<h2>WYSIWYG</h2>
		<textarea data-type="wysiwyg" name="wysiwyg"></textarea>
		<code data-type="codeeditor" data-lang="html"><?php echo htmlspecialchars('<textarea data-type="wysiwyg"></textarea>'); ?></code>

		<h2>Autocomplete</h2>
		<h3>Normal</h3>
		<label for="in1">Ejemplo: </label>
			<input id="in1" data-type="autocomplete" name="aut" src="autocomplete.php" style="width:50%;" />
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
			<h3>With selected data</h3>
			<input id="in012" data-type="autocomplete" data-selected-text="Hola" data-selected-value="valor" name="aut20" src="autocomplete.php" />
			<p>Put a default value</p>
			<h4>HTML Code</h4>
			<code data-type="codeeditor" data-lang="html"><?php echo htmlspecialchars('<input id="in012" data-type="autocomplete" data-selected-text="Hola" data-selected-value="valor" name="aut20" src="autocomplete.php" />'); ?></code>

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
		<h3>Range</h3>
		<div style="width:200px;">
			<p>$<span id="slider-min">100</span> - $<span id="slider-max">200</span></p>
			<input data-type="slider" data-slider="range" data-max="200" data-min="100" name="slider" />
		</div>
		<p>El id del span esta conformado por el name del input + "-min" o "-max". Se devuelve en el servidor un arreglo con el name con la llave max y min con sus valores.</p>
		<code data-type="codeeditor" data-lang="html"><?php echo htmlspecialchars('<p>$<span id="slider-min">100</span> - $<span id="slider-max">200</span></p>
<input data-type="slider" data-slider="range" data-max="200" data-min="100" name="slider" />'); ?></code>
		<h3>Increments</h3>
		<div style="width:200px;">
			<p>$<span id="slider2-val">0</span></p>
			<input data-type="slider" data-slider="increments" data-max="20" data-min="0.5" data-step="0.5" name="slider2" />
		</div>
		<p>El id del span esta conformado por el name del input + "-min" o "-max". Se devuelve en el servidor un arreglo con el name con la llave max y min con sus valores.</p>
		<code data-type="codeeditor" data-lang="html"><?php echo htmlspecialchars('<p>$<span id="slider-val">100</span></p>
<input data-type="slider" data-slider="increments" data-max="2000" data-min="100" data-step="100" name="slider2" />'); ?></code>
		
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
		
		<h2>Imgur JS Uploader</h2>
		<input data-type='imgur' type="text" />

		<code data-type="codeeditor" data-lang="html"><?php echo htmlspecialchars('<input data-type=\'imgur\' type="text" />'); ?></code>

		<h2>Conditional forms fields</h2>
		<label><input type="radio" name="example1" value="yes"><span></span> Yes</label>
		<label><input type="radio" name="example1" value="no"><span></span> No</label>

		<div data-type="conditional" data-cond-option="example1" data-cond-value="yes">
			<label><input type="checkbox" name="example2"><span></span> Are you sure?</label>
			<label><input type="checkbox" name="example3"><span></span> Really super sure?</label>
			
			<div data-type="conditional" data-cond-option="example2" data-cond-value="on">
				Hooray!
			</div>
			<div data-type="conditional" data-cond-option="example3" data-cond-value="on">
				Don't get cocky!
			</div>
		</div>
		
		<div data-type="conditional" data-cond-option="example1" data-cond-value="no">
			<p>That's a shame. Will you change your mind?</p>
			
			<label><input type="radio" name="example4" value="yes"><span></span> Yes</label>
			<label><input type="radio" name="example4" value="no"><span></span> No</label>
			
			<div data-type="conditional" data-cond-option="example4" data-cond-value="yes">
				Great!
			</div>
		</div>
		
		<p>
			<label>or choose:</label>
			<select class="select" name="example5">
				<option>Pick one!</option>
				<option value="yes">Yes!</option>
				<option value="no">No!</option>
			</select>
		</p>
		<div data-type="conditional" data-cond-option="example5" data-cond-value="yes">
			Works with selects!
		</div>
		 <p>
			<label>or type:</label>
			<input type="text" name="example6" placeholder="yay">
		</p>
		<div data-type="conditional" data-cond-option="example6" data-cond-value="yay">
			Works with text input
		</div>

		<code data-type="codeeditor" data-lang="html"><?php echo htmlspecialchars('<label><input type="radio" name="example1" value="yes"><span></span> Yes</label>
<label><input type="radio" name="example1" value="no"><span></span> No</label>

<div data-type="conditional" data-cond-option="example1" data-cond-value="yes">
	<label><input type="checkbox" name="example2"><span></span> Are you sure?</label>
	<label><input type="checkbox" name="example3"><span></span> Really super sure?</label>
	
	<div data-type="conditional" data-cond-option="example2" data-cond-value="on">
		Hooray!
	</div>
	<div data-type="conditional" data-cond-option="example3" data-cond-value="on">
		Don\'t get cocky!
	</div>
</div>

<div data-type="conditional" data-cond-option="example1" data-cond-value="no">
	<p>That\'s a shame. Will you change your mind?</p>
	
	<label><input type="radio" name="example4" value="yes"><span></span> Yes</label>
	<label><input type="radio" name="example4" value="no"><span></span> No</label>
	
	<div data-type="conditional" data-cond-option="example4" data-cond-value="yes">
		Great!
	</div>
</div>

<p>
	<label>or choose:</label>
	<select class="select" name="example5">
		<option>Pick one!</option>
		<option value="yes">Yes!</option>
		<option value="no">No!</option>
	</select>
</p>
<div data-type="conditional" data-cond-option="example5" data-cond-value="yes">
	Works with selects!
</div>
 <p>
	<label>or type:</label>
	<input type="text" name="example6" placeholder="yay">
</p>
<div data-type="conditional" data-cond-option="example6" data-cond-value="yay">
	Works with text input
</div>'); ?></code>
		
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
		<h3>Email</h3> 
		<input type="text" data-validation="email" />
		<code data-type="codeeditor" data-lang="html"><?php echo htmlspecialchars('<input type="text" data-validation="email" />'); ?></code>
		<h3>Two Fields Check</h3> 
		<input type="text" data-validation="same" for="field-two" />
		<input type="text" id="field-two" />
		<code data-type="codeeditor" data-lang="html"><?php echo htmlspecialchars('<input type="text" data-validation="same" for="field-two" />
<input type="text" id="field-two" />'); ?></code>
		
		<h2>Slug generator</h2>
		<input type="text" id="copyHere" placeholder="Titulo" /><br /><br />
		<input data-type='slug' for="copyHere" type="text" />

		<code data-type="codeeditor" data-lang="html"><?php echo htmlspecialchars('<input type="text" id="copyHere" placeholder="Titulo" />
<input data-type="slug" for="copyHere" type="text" />'); ?></code>
		<br /><br />
		<input type="submit" value="Click aqui" />
	</form>
	<script type="text/javascript" src="library/jquery.min.js"></script>
	<script type="text/javascript" src="library/script.js"></script>
	

</body>
</html>