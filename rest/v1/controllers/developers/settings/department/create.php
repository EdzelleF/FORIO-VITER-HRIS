<?php

$conn = null;
$conn = checkDbConnection($conn);

$val = new Department($conn);

if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkPayLoad($data);

    $val->department_is_active = 1;
    $val->department_name = trim($data['department_name']);
    $val->department_created = date("Y-m-d H:i:s");
    $val->department_updated = date("Y-m-d H:i:s");

    $query = checkCreate($val);
    http_response_code(200);
    returnSuccess($val, "Department Create", $query);
}

checkEndpoint();