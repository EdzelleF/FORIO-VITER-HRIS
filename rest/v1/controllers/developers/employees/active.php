<?php

require '../../../core/header.php';
require '../../../core/functions.php';
require '../../../models/developers/employees/Employees.php';

// check database connection
$conn = null;
$conn = checkDbConnection($conn);

// make use of classes
$val = new Employees($conn);

$body = file_get_contents("php://input");
$data = json_decode($body, true);

if (array_key_exists('id', $_GET)) {
    checkPayLoad($data);
    $val->employee_aid = $_GET['id'];
    $val->employee_is_active = trim($data['isActive']);
    $val->employee_updated = date("Y-m-d H:m:s");

    checkId($val->employee_aid);

    $query = checkActive($val);
    http_response_code(200);
    returnSuccess($val, 'Employee active', $query);
}

checkEndpoint();