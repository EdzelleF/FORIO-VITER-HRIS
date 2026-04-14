<?php
// check database connection
$conn = null;
$conn = checkDbConnection($conn);
// make use of classes

$role_name = $data['role_name'];

returnError($role_name);