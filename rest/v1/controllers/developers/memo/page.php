<?php

require '../../../core/header.php';
require '../../../core/functions.php';
require '../../../models/developers/memo/Memo.php';

$conn = null;
$conn = checkDbConnection($conn);

$val = new Memo($conn);

$body = file_get_contents("php://input");
$data = json_decode($body, true);
$data = is_array($data) ? $data : [];

if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    if (array_key_exists('start', $_GET)) {
        $val->memo_is_active = array_key_exists('filterData', $data) ? $data['filterData'] : "";
        $val->search = array_key_exists('searchValue', $data) ? $data['searchValue'] : "";
        $val->start = $_GET['start'];
        $val->total = 10;

        checkLimitId($val->start, $val->total);
        $query = checkReadLimit($val);
        $total_result = checkReadAll($val);
        http_response_code(200);
        getQueriedData($query, $total_result);
    }
}

checkEndpoint();