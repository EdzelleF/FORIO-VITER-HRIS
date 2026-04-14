<?php

// set http header
require '../../../../core/header.php';
// use needed functions
require '../../../../core/functions.php';


// get payload frokm frontend
$body = file_get_contents("php://input");
$data = json_decode($body, true);

// create request 
if($_SERVER['REQUEST_METHOD'] === 'POST') {
    $result = require 'create.php';
    sendResponse($result);
    exit;
}