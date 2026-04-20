<?php

require '../../../../core/header.php';
require '../../../../core/functions.php';
require '../../../../models/developers/settings/users/Users.php';

// check database connection
$conn = null;
$conn = checkDbConnection($conn);
// make use of classes

$val = new Users($conn);

$body = file_get_contents("php://input");
$data = json_decode($body, true);

if(array_key_exists('id',$_GET)){
    checkPayLoad($data);
    $val->users_aid =$_GET['id'];
    $val->users_is_active = trim($data['isActive']);
    $val->users_updated = date("Y-m-d H:m:s");

    checkID($val->users_aid);

    $query = checkActive($val);
    http_response_code(200);
    returnSuccess($val, 'users active', $query);
}

checkEndpoint();
