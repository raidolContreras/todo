<?php
session_start();
header('Content-Type: application/json');

if(!isset($_SESSION['username'])){
    echo json_encode(['success' => false, 'message' => 'No autenticado']);
    exit;
}

$username = $_SESSION['username'];
$dataFile = 'data.json';

// Función para cargar el archivo JSON
function loadData($dataFile) {
    if (!file_exists($dataFile)) {
        return [];
    }
    $json = file_get_contents($dataFile);
    $data = json_decode($json, true);
    return $data ? $data : [];
}

// Función para guardar datos en el archivo JSON
function saveData($dataFile, $data) {
    file_put_contents($dataFile, json_encode($data, JSON_PRETTY_PRINT));
}

$data = loadData($dataFile);
if (!isset($data['users'])) {
    $data['users'] = [];
}

switch ($_REQUEST['action']) {
    case 'getLists':
        if(isset($data['users'][$username])) {
            $lists = $data['users'][$username]['lists'];
        } else {
            $lists = [];
        }
        echo json_encode(['success' => true, 'lists' => $lists]);
        break;
    case 'saveLists':
        $lists = json_decode($_POST['lists'], true);
        $data['users'][$username]['lists'] = $lists;
        saveData($dataFile, $data);
        echo json_encode(['success' => true]);
        break;
    default:
        echo json_encode(['success' => false, 'message' => 'Acción no válida']);
        break;
}
