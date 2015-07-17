<?php 
  header('Content-Type: application/json');
  if (!isset($_GET["page"])) {
    $_GET["page"] = "null";
  } 
  if (!isset($_GET["perPage"])) {
    $_GET["perPage"] = "null";
  }
  if (!isset($_GET["sorts"])) {
    $_GET["sorts"] = "null";
  } else {
    foreach ($_GET["sorts"] as $key => $value) {
      $_GET["sorts"] = $key."=".$value;
      break;
    }
  }
  if (!isset($_GET["queries"])) {
    $_GET["queries2"] = "null";
  } else {
    $_GET["queries2"] = "";
    foreach ($_GET["queries"] as $key => $value) {
      $_GET["queries2"] .= $key."=".$value.", ";
    }
  }
  if (!isset($_GET["offset"])) {
    $_GET["offset"] = "null";
  }
?>
{
  "records": [
    {
      "band": "Page: <?php echo $_GET["page"]; ?>",
      "year": "",
      "song": "Queries: <?php echo $_GET["queries2"]; ?>"
    },
    {
      "band": "Sorts: <?php echo $_GET["sorts"]; ?>",
      "year": "", 
      "song": "Offset: <?php echo $_GET["offset"]; ?>"
    },
    {
      "band": "PerPage: <?php echo $_GET["perPage"]; ?>",
      "year": 2015,
      "song": "El Scorcho"
    },
    {
      "band": "Chevelle",
      "year": 2014, 
      "song": "Family System"
    },
    {
      "band": "Weezer",
      "year": 2015,
      "song": "El Scorcho"
    },
    {
      "band": "Chevelle",
      "year": 2015, 
      "song": "Family System"
    },
    {
      "band": "Chevelle",
      "year": 2015, 
      "song": "Family System"
    },
    {
      "band": "Weezer",
      "year": 2015,
      "song": "El Scorcho"
    },
    {
      "band": "Chevelle",
      "year": 2015, 
      "song": "Family System"
    },
    {
      "band": "Chevelle",
      "year": 2015, 
      "song": "Family System"
    }
  ],
  "queryRecordCount": 300,
  "totalRecordCount": 10
}