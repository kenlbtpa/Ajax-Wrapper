<?php
?>

<!-- <link rel="stylesheet" type="text/css" href="http://necolas.github.io/normalize.css/3.0.2/normalize.css"> -->
<!-- <link rel="stylesheet" type="text/css" href="<?=CSS_PATH?>/bootstrap.min.css">
<link rel="stylesheet" type="text/css" href="<?=CSS_PATH?>/bootstrap-theme.css">
<link rel="stylesheet" type="text/css" href="<?=CSS_PATH?>/font-awesome.min.css">
<link rel="stylesheet" type="text/css" href="<?=CSS_PATH?>/sitewide.css"> -->

<!--
<script src="<?=JS_PATH?>/jquery-1.11.2.min.js"></script>
<script src="<?=JS_PATH?>/bootstrap.min.js"></script>
-->


<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Registration & Login</title>
  </head>
  <body>

  <div templateClass='postList' >
    <section>
        <?php for($i = 0; $i < 10; $i++): ?>
        <div templateClass='post' postID='<?=$i?>' >
            <div> <h1 templateField='title' ><?=$i?></h1></div>
            <div> <p templateField='content'> </p> </div>
        </div>
        <?php endfor; ?>
    </section>
  </div>

  </body>

  <script src="favaa.js"></script>


</html>

<!-- Callouts CSS -->
<style>
</style>

<!-- Inputs CSS -->
<style>
input:invalid
{
  color:red;
  opacity:0.8;
}
</style>

<style>
[ajax-template]
{
  display:none;
}
[ajax-template][template-display~='hide']
{
  display:none;
}
[ajax-template][template-display~='show']
{
  display:inherit;
}


</style>



