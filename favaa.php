<?php

$posts = [
     '0' => [
          'postID' => 1, 
          'title' => 'Updated Content1', 
          'content' => 'Here is some content for you!',          
     ] , 
     '1' => [
          'postID' => 2, 
          'title' => 'Updated Content1', 
          'content' => 'Here is some content for you!',          
     ] , 
     '2' => [
          'postID' => 3, 
          'title' => 'Updated Content2', 
          'content' => 'Here is some content for you!',          
     ] , 
     '3' => [
          'postID' => 4, 
          'title' => 'Updated Content3', 
          'content' => 'Here is some content for you!',          
     ] , 
     '4' => [
          'postID' => 5, 
          'title' => 'Updated Content4', 
          'content' => 'Here is some content for you!',          
     ] , 
     '5' => [
          'postID' => 6, 
          'title' => 'Updated Content5', 
          'content' => 'Here is some content for you!',          
     ] , 
     '6' => [
          'postID' => 7, 
          'title' => 'Updated Content6', 
          'content' => 'Here is some content for you!',          
     ] , 
];

$posts = [ 
     [ 'post' => [  ] ] 
]; 

// $id = $_GET['post_id'];
// echo json_encode( [ "Post" => $posts[$id] ] ); 

echo json_encode( [ "PostList" => $posts ] ); 

?>