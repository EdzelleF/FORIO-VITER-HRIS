<?php
// check database connection
$conn = null;
$conn = checkDbConnection($conn);

// make use of classes
$val = new Users($conn);

if (array_key_exists("id", $_GET)) {
    $val->users_aid = $_GET['id'];
    $val->users_first_name = $data['users_first_name'];
    $val->users_last_name = $data['users_last_name'];
    $val->users_email = $data['users_email'];
    $val->users_role_id = $data['users_role_id'];
    $val->users_updated = date("Y-m-d H:m:s");

    $users_first_name_old = $data['users_first_name_old'];
    $users_last_name_old = $data['users_last_name_old'];

    checkId($val->users_aid);
    compareName(
        $val,
        $users_first_name_old,
        $val->users_first_name,
        $val->users_last_name,
        $users_last_name_old
    );

    $query = checkUpdate($val);
    http_response_code(200);
    returnSuccess($val, "Users Update", $query);
}

checkEndpoint();