<?php
// set http header
require '../../../../core/header.php';

// handle preflight request first
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// use needed functions
require '../../../../core/functions.php';

// use models
require '../../../../models/developers/settings/roles/Roles.php';


// get payload from frontend
$body = file_get_contents("php://input");
$data = json_decode($body, true);

// create request 
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $result = require 'create.php';
    sendResponse($result);
    exit;
}

// read / get
if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    $result = require 'read.php';
    sendResponse($result);
    exit;
}

// update / put
if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $result = require 'update.php';
    sendResponse($result);
    exit;
}