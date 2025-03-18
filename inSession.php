<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Listas por hacer</title>
    <!-- Bootstrap 5 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Bootstrap Icons -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css">
    <!-- Google Fonts -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap">
    <!-- Custom CSS -->
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="spacing-utilities.css">
</head>

<body>
    <input type="hidden" id="username" value="<?php echo addslashes($username); ?>">
    <div class="container py-5">
        <div class="d-flex justify-content-between align-items-center header">
            <a href="logout.php" class="btn btn-secondary button">Cerrar Sesión</a>
        </div>
        <div class="row mb-4">
            <div class="col-12">
                <form class="input-group" id="addListForm">
                    <input type="text" id="newListTitle" class="form-control input" placeholder="Nombre de nueva lista">
                    <button type="submit" id="addListBtn" class="btn btn-primary">Agregar Lista</button>
                </form>
            </div>
        </div>
        <div id="listsContainer" class="row"></div>
    </div>

    <!-- Modal para imagen -->
    <div class="modal fade" id="imageModal" tabindex="-1">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Imagen de Tarea</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body text-center">
                    <img id="modalImage" src="" class="img-fluid" alt="Imagen de tarea">
                </div>
            </div>
        </div>
    </div>
    <!-- Template oculto para listas -->
    <template id="todoListTemplate">
        <div class="col-md-4 todo-list-container">
            <div class="todo-list">
                <div class="tools">
                    <div class="circle btn-delete-list" title="Eliminar lista">
                        <span class="red box"></span>
                    </div>
                    <div class="circle disabled">
                        <span class="yellow box"></span>
                    </div>
                    <div class="circle btn-fullscreen" title="Pantalla completa">
                        <span class="green box"></span>
                    </div>

                    <!-- alinear a la derecha -->
                    <div class="ml-auto align-items-center">
                        <!-- Botones para mover a la izquierda o derecha -->
                        <div class="d-flex justify-content-between">
                            <button class="btn-mover move-left" title="Mover a la izquierda">
                                <i class="bi bi-chevron-left"></i>
                            </button>

                            <!-- Botón para mover a la derecha -->
                            <button class="btn-mover move-right" title="Mover a la derecha">
                                <i class="bi bi-chevron-right"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="mb-2">
                    <!-- Check de completado -->
                    <div class="form-check">
                        <input type="checkbox" class="form-check-input complete-list mr-3">
                        <div class="d-flex justify-content-between align-items-center">
                            <h5 class="list-title mb-0">{{listTitle}}</h5>
                        </div>
                    </div>
                </div>
                <div class="input-group mb-3">
                    <input type="text" class="form-control input new-todo-input" placeholder="Nueva tarea">
                    <input type="file" class="new-todo-image-input" accept="image/*" style="display:none;">
                    <button class="btn btn-success add-todo-btn">Agregar</button>
                    <button class="btn btn-secondary add-todo-image-btn" title="Agregar imagen">
                        <i class="bi bi-image"></i>
                    </button>
                </div>
                <div class="custom-dropzone">
                    Arrastra y suelta archivos CSV o XLSX aquí
                    <input type="file" class="file-input" accept=".csv,.xlsx" style="display:none;">
                </div>
                <div class="todos-container"></div>
            </div>
        </div>
    </template>

    <!-- Footer con imagen SVG y nombre del usuario -->
    <footer>

        <div class="wave-container">
            <!-- Primera onda -->
            <svg class="animated-wave" viewBox="0 0 1440 320" preserveAspectRatio="none">
                <path fill="#0099ff" fill-opacity="1" d="<?php echo $pathData; ?>" />
            </svg>
            <!-- Segunda onda (misma forma, para continuidad) -->
            <svg class="animated-wave" viewBox="0 0 1440 320" preserveAspectRatio="none">
                <path fill="#0099ff" fill-opacity="1" d="<?php echo $pathData; ?>" />
            </svg>
        </div>

        <div class="footer-user">
            Listas de: <?php echo htmlspecialchars($username, ENT_QUOTES, 'UTF-8'); ?>
        </div>
    </footer>


    <!-- Bootstrap 5 JS y dependencias -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <!-- jQuery -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://code.jquery.com/ui/1.13.2/jquery-ui.min.js"></script>
    <!-- SheetJS (para archivos XLSX) -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.5/xlsx.full.min.js"></script>

    <script src="js/api.js"></script>
    <script src="js/fileProcessor.js"></script>
    <script src="js/todoList.js"></script>
    <script src="js/main.js"></script>
</body>

</html>