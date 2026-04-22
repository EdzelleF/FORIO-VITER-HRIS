<?php

require '../../../core/header.php';
require '../../../core/functions.php';
require '../../../models/developers/memo/Memo.php';

$body = file_get_contents("php://input");
$data = json_decode($body, true);

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $result = require 'page.php';
    sendResponse($result);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $result = require 'create.php';
    sendResponse($result);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $result = require 'update.php';
    sendResponse($result);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $result = require 'delete.php';
    sendResponse($result);
    exit;
}

checkEndpoint();