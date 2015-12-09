<!DOCTYPE html>
<html>
<head>
	<title>Inputs plugin</title>
	<link rel="stylesheet" type="text/css" href="style.css">
	<link rel="stylesheet" type="text/css" href="library/style.css">
</head>
<body>
	<img src="logo.png" width="400" />
	<ul>
		<li><a href="index.php">Return</a></li>
	</ul>

	<h1>Messages</h1>
		
	<h2>Confirm</h2>
	<button data-type="confirm" title="Are you sure?" data-info="This will delete all the data" data-button-yes="Si" data-button-no="No" data-action="README.md">Delete</button>
	<p>Action will tell you what to load (in ajax and in post) after someone click yes, then it will reload.</p>
	<code data-type="codeeditor" data-lang="html"><?php echo htmlspecialchars('<button data-type="confirm" title="Are you sure?" data-info="This will delete all the data" data-button-yes="Si" data-button-no="No" data-action="README.md">Delete</button>'); ?></code>

	<h2>Prompt</h2>
	<button data-type="prompt" title="Whats your name" data-button-ok="Chido one" data-button-cancel="Nopi" data-action="README.md">Add a name</button>
	<p>Action will tell you what to load (in ajax and in post will send a variable called "value") after someone click Ok, then it will reload.</p>
	<code data-type="codeeditor" data-lang="html"><?php echo htmlspecialchars('<button data-type="prompt" title="Whats your name" data-button-ok="Chido one" data-button-cancel="Nopi" data-action="README.md">Add a name</button>'); ?></code>


	<script type="text/javascript" src="library/jquery.min.js"></script>
	<script type="text/javascript" src="library/script.js"></script>
	
</body>
</html>