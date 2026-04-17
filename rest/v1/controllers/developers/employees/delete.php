<?php
// check database connection
$conn = null;
$conn = checkDbConnection($conn);
// make use of classes

$val = new Roles($conn);

if(array_key_exists("id",$_GET)){
    $val->role_aid = $_GET['id'];

    checkId($val->role_aid);

    $query = checkDelete($val);
    http_response_code(200);
    returnSuccess($val, "Roles Delete", $query);
}

checkEndpoint();