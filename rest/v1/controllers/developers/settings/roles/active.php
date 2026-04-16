<?php

require '../../../../core/header.php';
require '../../../../core/functions.php';
require '../../../../models/developers/settings/roles/Roles.php';

// check database connection
$conn = null;
$conn = checkDbConnection($conn);
// make use of classes

$val = new Roles($conn);

$body = file_get_contents("php://input");
$data = json_decode($body, true);

if(array_key_exists('id',$_GET)){
    checkPayLoad($data);
    $val->role_aid =$_GET['id'];
    $val->role_is_active = trim($data['isActive']);
    $val->role_updated = date("Y-m-d H:m:s");

    checkID($val->role_aid);

    $query = checkActive($val);
    http_response_code(200);
    returnSuccess($val, 'role active', $query);
}

checkEndpoint();
