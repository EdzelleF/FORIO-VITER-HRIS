<?php

$conn = null;
$conn = checkDbConnection($conn);

$val = new Department($conn);

if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkPayLoad($data);

    if (array_key_exists("id", $_GET)) {
        $val->department_aid = $_GET['id'];
        $val->department_name = trim($data['department_name']);
        $val->department_updated = date("Y-m-d H:i:s");

        checkId($val->department_aid);

        $query = checkUpdate($val);
        http_response_code(200);
        returnSuccess($val, "Department Update", $query);
    }
}

checkEndpoint();