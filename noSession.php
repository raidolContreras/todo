<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Login Moderno</title>
    <!-- Bootstrap y Google Fonts -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" rel="stylesheet">
    <style>
        /* Fondo animado con degradado */
        body {
            margin: 0;
            padding: 0;
            background: linear-gradient(45deg,#402bff,#41f9ff, #833ab4, #5851db);
            background-size: 400% 400%;
            animation: gradientBG 15s ease infinite;
            height: 100vh;
            font-family: 'Roboto', sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        @keyframes gradientBG {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        /* Tarjeta con efecto glassmorphism */
        .login-card {
            background: rgba(255, 255, 255, 0.2);
            border-radius: 15px;
            padding: 2rem;
            width: 100%;
            max-width: 400px;
            box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
            border: 1px solid rgba(255, 255, 255, 0.18);
        }
        .login-card h2 {
            color: #ffffff;
            text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
            text-align: center;
            margin-bottom: 1.5rem;
        }
        .login-card .form-label {
            color: #ffffff;
            font-weight: 500;
        }
        .login-card .form-control {
            background: rgba(255, 255, 255, 0.5);
            border: none;
            border-radius: 5px;
            padding: 10px 15px;
            color: #333;
            transition: border 0.3s ease, box-shadow 0.3s ease;
        }
        .login-card .form-control:focus {
            box-shadow: 0 0 10px rgba(255, 65, 108, 0.5);
            border: 2px solid #ff416c;
        }
        .login-card .btn-primary {
            background: #ff416c;
            border: none;
            border-radius: 5px;
            padding: 10px 15px;
            font-size: 16px;
            transition: background 0.3s ease;
        }
        .login-card .btn-primary:hover {
            background: #ff4b2b;
        }
        .login-card hr {
            border-color: rgba(255, 255, 255, 0.4);
        }
        /* Estilo para la lista de usuarios con efecto hover */
        .list-group-item {
            background: rgba(255, 255, 255, 0.4);
            color: #333;
            border: none;
            border-bottom: 1px solid rgba(255,255,255,0.6);
            transition: background 0.3s;
        }
        .list-group-item:hover {
            background: rgba(255, 255, 255, 0.6);
        }
        /* Encabezado de la lista */
        .login-card h4 {
            color: #ffffff;
            text-align: center;
            margin-top: 1.5rem;
        }
    </style>
</head>
<body>
    <div class="login-card">
        <h2>Iniciar Sesión</h2>
        <form method="POST" action="index.php">
            <div class="mb-3">
                <label for="username" class="form-label">Nombre:</label>
                <input type="text" class="form-control" id="username" name="username" required>
            </div>
            <button type="submit" class="btn btn-primary w-100">Entrar</button>
        </form>
        <?php if (!empty($registeredUsers)) { ?>
            <hr>
            <h4>Usuarios Registrados</h4>
            <div class="list-group">
                <?php foreach ($registeredUsers as $user) { ?>
                    <!-- Login rápido mediante GET -->
                    <a href="index.php?username=<?php echo urlencode($user); ?>" class="list-group-item list-group-item-action">
                        <?php echo htmlspecialchars($user, ENT_QUOTES, 'UTF-8'); ?>
                    </a>
                <?php } ?>
            </div>
        <?php } ?>
    </div>
</body>
</html>
