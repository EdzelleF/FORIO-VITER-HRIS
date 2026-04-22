<?php

// Required headers + CORS + OPTIONS handler
require '../../../core/header.php';

// Core helper functions
require '../../../core/functions.php';

// Memo model
require '../../../models/developers/memo/Memo.php';

// Database connection
$conn = null;
$conn = checkDbConnection($conn);

// Initialize model
$val = new Memo($conn);

// DELETE logic
if (array_key_exists("id", $_GET)) {
    $val->memo_aid = $_GET['id'];

    // Validate ID
    checkId($val->memo_aid);

    // Execute delete
    $query = checkDelete($val);

    // Return success response
    http_response_code(200);
    returnSuccess($val, "Memo Delete", $query);
}

// Fallback if endpoint is incorrect
checkEndpoint();