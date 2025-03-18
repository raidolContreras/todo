<?php
session_start();

// Si se recibe el parámetro GET para login rápido, se asigna y se redirige.
if (isset($_GET['username']) && !empty($_GET['username'])) {
    $_SESSION['username'] = trim($_GET['username']);
    header("Location: index.php");
    exit;
}

// Si no hay sesión iniciada, procesamos el login manual.
if (!isset($_SESSION['username'])) {
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && !empty($_POST['username'])) {
        $_SESSION['username'] = trim($_POST['username']);
        header("Location: index.php");
        exit;
    } else {
        // Obtener usuarios registrados desde el archivo JSON.
        $registeredUsers = [];
        $dataFile = 'data.json';
        if (file_exists($dataFile)) {
            $json = file_get_contents($dataFile);
            $data = json_decode($json, true);
            if (isset($data['users'])) {
                $registeredUsers = array_keys($data['users']);
            }
        }
        require_once "noSession.php";
        exit;
    }
}
$username = $_SESSION['username'];

// Parámetros generales
$width    = 1440;       // Ancho total del SVG
$height   = 320;        // Alto total del SVG
$baseline = 190;        // Línea base (altura media de la onda)

// Parámetros de aleatoriedad
$amplitude = rand(5, 60); // Amplitud de la onda (20 a 80 píxeles)
$nCycles   = rand(1, 2);   // Número entero de ciclos (ondas completas)
                          // que queremos dentro del ancho total
                          
// Para asegurar que al llegar a x = $width, la onda coincida con x = 0
// usamos un factor de frecuencia que complete un número entero de ciclos.
$frequency = (360 * $nCycles) / $width; 

// Generamos el path usando pequeños pasos en el eje X
$pathData = "M0,$baseline";
$step = 10;  // Ajusta este paso según el detalle que desees en la curva

for ($x = 0; $x <= $width; $x += $step) {
    // Función seno para la onda
    $y = $baseline + $amplitude * sin(deg2rad($x * $frequency));
    $pathData .= " L$x,$y";
}

// Cerramos la forma (rectángulo inferior para rellenar)
$pathData .= " L$width,$baseline L$width,$height L0,$height Z";

require_once "inSession.php";