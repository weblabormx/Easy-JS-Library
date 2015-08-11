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
		
	<h2>With a form</h2>
	<a href="#popupLogin" data-rel="popup" data-position-to="window" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-icon-check ui-btn-icon-left ui-btn-a" data-transition="pop">Sign in</a>
	<div data-role="popup" id="popupLogin" data-theme="a" class="ui-corner-all">
	    <form>
	        <div style="padding:10px 20px;">
	            <h3>Please sign in</h3>
	            <label for="un" class="ui-hidden-accessible">Username:</label>
	            <input type="text" name="user" id="un" value="" placeholder="username" data-theme="a">
	            <label for="pw" class="ui-hidden-accessible">Password:</label>
	            <input type="password" name="pass" id="pw" value="" placeholder="password" data-theme="a">
	            <button type="submit" class="ui-btn ui-corner-all ui-shadow ui-btn-b ui-btn-icon-left ui-icon-check">Sign in</button>
	        </div>
	    </form>
	</div>
	<h3>Email Type</h3>
	<input type="text" data-type="multiple" name="hola">
	<p>In jquery get the multiples values with commas, in the server you get an array with the same name. The name and type attribute are mandatory. You can apply styles to the input and it will work all right</p>
	<code data-type="codeeditor" data-lang="html"><?php echo htmlspecialchars('<input type="text" data-type="multiple" name="hola">'); ?></code>

	<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
	<script type="text/javascript" src="library/script.js"></script>
</body>
</html>