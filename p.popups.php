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

	<h1>PopUps</h1>
		
	<h2>Ajax</h2>
	<a href="popupexample.html" data-type="popup" data-popup-type="ajax">Click here</a>
	<code data-type="codeeditor" data-lang="html"><?php echo htmlspecialchars('<a href="popupexample.html" data-type="popup" data-popup-type="ajax">Click here</a>'); ?></code>

	<h2>Image</h2>
	<a href="logo.png" data-type="popup" data-popup-type="image" title="Mi Logo">Click here</a>
	<code data-type="codeeditor" data-lang="html"><?php echo htmlspecialchars('<a href="logo.png" data-type="popup" data-popup-type="image" title="Mi Logo">Click here</a>'); ?></code>

	<h2>Image Group</h2>
	<div data-type="popup" data-popup-type="image">
		<a href="http://farm9.staticflickr.com/8242/8558295633_f34a55c1c6_b.jpg" title="Example">Click here</a>
		<a href="http://farm9.staticflickr.com/8382/8558295631_0f56c1284f_b.jpg" title="Example2">Click here</a>
	</div>
		
	<code data-type="codeeditor" data-lang="html"><?php echo htmlspecialchars('<div data-type="popup" data-popup-type="image">
	<a href="http://farm9.staticflickr.com/8242/8558295633_f34a55c1c6_b.jpg" title="Example">Click here</a>
	<a href="http://farm9.staticflickr.com/8382/8558295631_0f56c1284f_b.jpg" title="Example2">Click here</a>
</div>'); ?></code>

	<h2>Iframe</h2>
	<a href="https://www.youtube.com/watch?v=MVvIlcXudK8" data-type="popup" data-popup-type="iframe">Click here</a>
	<p>Works with Vimeo, Youtube and Google Maps</p>
	<code data-type="codeeditor" data-lang="html"><?php echo htmlspecialchars('<a href="https://www.youtube.com/watch?v=MVvIlcXudK8" data-type="popup" data-popup-type="iframe">Click here</a>'); ?></code>

	<h2>Inline</h2>
	<div id="popup1" style="background:#fff; width:300px; margin: 0 auto;position:relative;padding:20px;">
		<h1>Hola Mundo</h1>
		<p>This is a inline popup!</p>
	</div>
	<a href="#popup1" data-type="popup" data-popup-type="inline">Click here</a>
	<code data-type="codeeditor" data-lang="html"><?php echo htmlspecialchars('<div id="popup1" style="background:#fff; width:300px; margin: 0 auto;position:relative;padding:20px;">
	<h1>Hola Mundo</h1>
	<p>This is a inline popup!</p>
</div>
<a href="#popup1" data-type="popup" data-popup-type="inline">Click here</a'); ?></code>
	
	<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
	<script type="text/javascript" src="library/script.js"></script>
</body>
</html>