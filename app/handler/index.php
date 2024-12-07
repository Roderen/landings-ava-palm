<?php
/*
 * Form handler for Webflow HTML landings
 * Ver 0.0.2
 * Telegram: @rockwebdev
 */
mb_internal_encoding("UTF-8");
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: POST, GET');
header('Content-Type: text/html; charset=UTF-8');
header("Content-type: application/json; charset=utf-8");

$user_score = (isset($_COOKIE['user_score'])) ? $_COOKIE['user_score'] * 100 : false;
$user_score = ($user_score) ? round($user_score) : $user_score;

if($user_score && $user_score >= 50){
    if (
        (!isset($_POST['name']) || mb_strlen($_POST['name']) < 2)
        || (!isset($_POST['phone']) || mb_strlen($_POST['phone']) < 7)
    ) {die();}

    $data = $_POST;
    $data['handler'] = 'html';
    //$data['lead_email'] = 'toptalent@mpd.ae';
    $utms = (isset($_COOKIE['lp_utm'])) ? $_COOKIE['lp_utm'] : false;
    if($utms){
        $utms = (json_decode($utms)) ? json_decode($utms) : json_decode($utms.'"}');
    }
    $data['utm_medium'] = (isset($utms->utm_medium)) ? $utms->utm_medium : '';
    $data['utm_campaign'] = (isset($utms->utm_campaign)) ? $utms->utm_campaign : '';
    $data['utm_content'] = (isset($utms->utm_content)) ? $utms->utm_content : '';
    $data['utm_term'] = (isset($utms->utm_term)) ? $utms->utm_term : '';
    $data['utm_source'] = (isset($utms->utm_source)) ? $utms->utm_source : '';

    if(isset($_SERVER["HTTP_REFERER"])) {
        $url_components = parse_url($_SERVER["HTTP_REFERER"]);
        $url = $url_components['scheme'] . '://' . $url_components['host'].$url_components['path'];

        $data['source_url'] = $url;
        $data['source_domain'] = $url_components['host'];
    }
    $data['user_ip'] = get_ip();

    if(isset($_FILES['cv']) && $_FILES['cv']['size'] <= 10485760){
        $data['cv_file'] = chunk_split(base64_encode(file_get_contents($_FILES['cv']['tmp_name'])));
        $data['cv_file_name'] = $_FILES['cv']['name'];
        $data['cv_file_type'] = $_FILES['cv']['type'];
    }

    //deblog($data, 'User Data');
    $curl = curl_init();
    curl_setopt_array($curl, array(
        CURLOPT_SSL_VERIFYPEER => 0,
        CURLOPT_HEADER => 0,
        CURLOPT_URL => 'https://api.mpd.ae/webhook/auto/',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => http_build_query($data),
        CURLOPT_TIMEOUT => 2
    ));
    $response = curl_exec($curl);
    curl_close($curl);

    //deblog($response, 'Webhook Response');
    $response = json_decode($response, true);
    //Clear responce to Front
    if($response && $response['status'] == 'error'){
        $response = [
            'status' => 'error',
            'response' => 'We are seeing a problem with data delivery'
        ];
    }else{
        $response = [
            'status' => 'success',
            'response' => 'Data successfully transferred'
        ];
    }
}else{
    $response = [
        'status' => 'error',
        'response' => 'This looks like spam.'
    ];
}
print(json_encode($response));

function get_ip() {
    $keys = [
        'HTTP_CLIENT_IP',
        'HTTP_X_FORWARDED_FOR',
        'REMOTE_ADDR'
    ];
    foreach ($keys as $key) {
        if (!empty($_SERVER[$key])) {
            $serv = explode(',', $_SERVER[$key]);
            $ip = trim(end($serv));
            if (filter_var($ip, FILTER_VALIDATE_IP)) {
                return $ip;
                break;
            }
        }
    }
}
function deblog($arr, $title = 'POST DATA'){
    $logFile = 'debug.log';
    $log = "\n------------------------\n";
    $log .= "<! ".(strlen($title) > 0 ? $title : 'DEBUG') ." !> | ". date("Y.m.d G:i:s") . "\n";
    $log .= print_r($arr, 1);
    $log .= "\n------------------------\n";
    file_put_contents($logFile, $log, FILE_APPEND);
}