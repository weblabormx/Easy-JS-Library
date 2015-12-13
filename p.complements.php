<!DOCTYPE html>
<html>
<head>
	<title>Inputs plugin</title>
	<link rel="stylesheet" type="text/css" href="style.css">
	<link rel="stylesheet" type="text/css" href="library/style.css">
	<style type="text/css">
	#carousel .item{
	  background: #3fbf79;
	  padding: 30px 0px;
	  margin: 10px;
	  color: #FFF;
	  -webkit-border-radius: 3px;
	  -moz-border-radius: 3px;
	  border-radius: 3px;
	  text-align: center;
	}
	</style>
</head>
<body>
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
	
	<h2>Click on change</h2>
	<p>When changing the data in the input type file will automatically click in the submit input.</p>
	
	<form action="envia.php">
		<input data-type="clickOnChange" type="file" id="coc" name="archivos[]" multiple="true"/>
		<input type="submit" for="coc" style="display:none;" />
 	</form>
	<code data-type="codeeditor" data-lang="html"><?php echo htmlspecialchars('<form action="envia.php">
	<input data-type="clickOnChange" type="file" id="coc" name="archivos[]" multiple="true"/>
	<input type="submit" for="coc" style="display:none;" />
</form>'); ?></code>

	<h2>Load on hover</h2>
	<div style="width:200px;background:#ccc;height:200px;" data-type="loadOnHover" id="square">
		<p  for="square">Mostrar</p>
	</div>
	<code data-type="codeeditor" data-lang="html"><?php echo htmlspecialchars('<div style="width:200px;background:#ccc;height:200px;" data-type="loadOnHover" id="square">
	<p  for="square">Mostrar</p>
</div>'); ?></code>

	<h2>Progress Bar</h2>
	<p>Demo can be seen in this form, while loading a progress bar appears. It needs to be added in the body.</p>
	<code data-type="codeeditor" data-lang="html"><?php echo htmlspecialchars('<body data-type="progressbar">
// All the content goes here
</body>'); ?></code>

	<h2>Fake click</h2>
	<p>Click in some place and automatically clicks in something else. Ideally to put a fake button for a select file input for example.</p>
	<button data-type="fakeButton" id="mifake">Agregar foto de perfil</button>
	<input for="mifake" type="file" id="file" name="archivos[]" multiple="true" style="display:none"/>

	<code data-type="codeeditor" data-lang="html"><?php echo htmlspecialchars('<button data-type="fakeButton" id="mifake">Agregar foto de perfil</button>
<input for="mifake" type="file" id="file" name="archivos[]" multiple="true" required style="display:none"/>'); ?></code>
	
	<h2>Tooltip</h2>	
	<input title="Selecciona una fecha" name="tooltip" data-type="tooltip" />
	<p>Puede ser agregado a cualquier tag, directamente en el input, en un div o en el form y aplicará con todos los datos con tittle.</p>
	<code data-type="codeeditor" data-lang="html"><?php echo htmlspecialchars('<input title="Selecciona una fecha" name="tooltip" data-type="tooltip" />'); ?></code>

	<h2>Ajax loader</h2>
	<span data-type="ajax" src="README.md" for="carga">Load</span>
	<br /><br />
	<div id="carga" style="display:block; width:500px; height:300px; padding:20px; border:1px solid #000;"></div>
	<code data-type="codeeditor" data-lang="html"><?php echo htmlspecialchars('<span data-type="ajax" src="README.md" for="carga">Load</span>
<br /><br />
<div id="carga" style="display:block; width:500px; height:300px; padding:20px; border:1px solid #000;"></div>'); ?></code>

	<h2>Carousel</h2>
	<div data-type="carousel" data-carousel-time="1000" data-carousel-items="10" id="carousel">
	  	<div class="item"><h1>1</h1></div>
		<div class="item"><h1>2</h1></div>
		<div class="item"><h1>3</h1></div>
		<div class="item"><h1>4</h1></div>
		<div class="item"><h1>5</h1></div>
		<div class="item"><h1>6</h1></div>
		<div class="item"><h1>7</h1></div>
		<div class="item"><h1>8</h1></div>
		<div class="item"><h1>9</h1></div>
		<div class="item"><h1>10</h1></div>
		<div class="item"><h1>11</h1></div>
		<div class="item"><h1>12</h1></div>
		<div class="item"><h1>13</h1></div>
		<div class="item"><h1>14</h1></div>
		<div class="item"><h1>15</h1></div>
		<div class="item"><h1>16</h1></div>
	</div>
	<span data-carousel-type="prev" for="carousel">Previous</span>
	<span data-carousel-type="next" for="carousel">Next</span>
	<span data-carousel-type="play" for="carousel">Autoplay</span>
	<span data-carousel-type="stop" for="carousel">Stop</span>
	<p>It is necessary to have ID</p>
	<code data-type="codeeditor" data-lang="html"><?php echo htmlspecialchars('<div data-type="carousel" data-carousel-time="1000" data-carousel-items="10" id="carousel">
  	<div class="item"><h1>1</h1></div>
	<div class="item"><h1>2</h1></div>
	<div class="item"><h1>3</h1></div>
	<div class="item"><h1>4</h1></div>
	<div class="item"><h1>5</h1></div>
	<div class="item"><h1>6</h1></div>
	<div class="item"><h1>7</h1></div>
	<div class="item"><h1>8</h1></div>
	<div class="item"><h1>9</h1></div>
	<div class="item"><h1>10</h1></div>
	<div class="item"><h1>11</h1></div>
	<div class="item"><h1>12</h1></div>
	<div class="item"><h1>13</h1></div>
	<div class="item"><h1>14</h1></div>
	<div class="item"><h1>15</h1></div>
	<div class="item"><h1>16</h1></div>
</div>
<span data-carousel-type="prev" for="carousel">Previous</span>
<span data-carousel-type="next" for="carousel">Next</span>
<span data-carousel-type="play" for="carousel">Autoplay</span>
<span data-carousel-type="stop" for="carousel">Stop</span>'); ?></code>
	
	<h2>Mobile Menu</h2>
	<a data-type="mobmenu" for="menuizq" data-submenu-pos="left" href="#sidr">Toggle menu</a>

	<div id="menuizq">
	  <!-- Your content -->
	  <ul>
	    <li><a href="#">List 1</a></li>
	    <li class="active"><a href="#">List 2</a></li>
	    <li><a href="#">List 3</a></li>
	  </ul>
	</div>
	<code data-type="codeeditor" data-lang="html"><?php echo htmlspecialchars('<a data-type="mobmenu" for="menuizq" data-submenu-pos="left" href="#sidr">Toggle menu</a>

<div id="menuizq">
  <!-- Your content -->
  <ul>
    <li><a href="#">List 1</a></li>
    <li class="active"><a href="#">List 2</a></li>
    <li><a href="#">List 3</a></li>
  </ul>
</div>'); ?></code>

	<script type="text/javascript" src="library/jquery.min.js"></script>
	<script type="text/javascript" src="library/script.js"></script>
</body>
</html>