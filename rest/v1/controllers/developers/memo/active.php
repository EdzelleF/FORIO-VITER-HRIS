<?php

require '../../../core/header.php';
require '../../../core/functions.php';
require '../../../models/developers/memo/Memo.php';

$conn = null;
$conn = checkDbConnection($conn);

$val = new Memo($conn);

if (array_key_exists("id", $_GET)) {
    $val->memo_aid = $_GET['id'];

    checkId($val->memo_aid);

    $query = checkActive($val);
    http_response_code(200);
    returnSuccess($val, "Memo Active", $query);
}

checkEndpoint();