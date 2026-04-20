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

if(isset($_SERVER['HTTP_AUTHORIZATION'])) {

if(array_key_exists('start',$_GET)){
    checkPayLoad($data);
    $val->start =$_GET['start'];
    $val->total = 10;
    $val->users_is_active = $data['filterData'];
    $val->search = $data['searchValue'];

    checkLimitId($val->start, $val->total);

    $query = checkReadLimit($val);
    $total_result = checkReadAll($val);
    http_response_code(200);
    checkReadQuery(
        $query,
        $total_result,
        $val->total,
        $val->start,
    );
}

    checkEndpoint();

}

// if access is not valid, return access error
checkAccess();



