
<?php
$dir = __DIR__ . DIRECTORY_SEPARATOR . 'sessions' . DIRECTORY_SEPARATOR;
$request = (object)$_POST;

$file = $request->track == 1 ? 2 : 1;
$target = $request->track == 1 ? 1 : 2;

if (!isset($_SERVER['HTTP_SESSION_IDENTIFIER'])) {
    return;
}
$session = $_SERVER['HTTP_SESSION_IDENTIFIER'];
if (!file_exists($dir . $session)) {
    mkdir($dir . $session);
}

$meFile = $dir . $session . DIRECTORY_SEPARATOR . $file;
$targetFile = $dir . $session . DIRECTORY_SEPARATOR . $target;

$position = (object)['lat' => $request->lat, 'lng' => $request->lng];

file_put_contents($meFile, json_encode($position));

$target = new stdClass();
$connected = false;
if (file_exists($targetFile)) {
    $target = json_decode(file_get_contents($targetFile));
    $connected = filemtime($targetFile) > ((new DateTime())->format('U') - 20);
}
$response = [
    'position' => $target,
    'connected' => $connected
];

echo json_encode($response);