<?php

require '../../../../core/header.php';
require '../../../../core/functions.php';
require '../../../../models/developers/settings/department/Department.php';

$conn = null;
$conn = checkDbConnection($conn);

$val = new Department($conn);

if (array_key_exists("id", $_GET)) {
    $val->department_aid = $_GET['id'];

    checkId($val->department_aid);

    $query = checkActive($val);
    http_response_code(200);
    returnSuccess($val, "Department Active", $query);
}

checkEndpoint();