function createTodoList(listTitle = "", savedTodos = [], completed, position, totalList) {
  const $newList = $(
    todoListTemplate.replace("{{listTitle}}", listTitle || "Nueva Lista")
  );

  const $todosContainer = $newList.find(".todos-container");
  const $todoList = $newList.find(".todo-list");
  const $newTodoInput = $newList.find(".new-todo-input");
  const $addTodoBtn = $newList.find(".add-todo-btn");
  const $newTodoImageInput = $newList.find(".new-todo-image-input");
  const $addTodoImageBtn = $newList.find(".add-todo-image-btn");
  const $dropzone = $newList.find(".custom-dropzone");
  const $fileInput = $newList.find(".file-input");
  const $fullscreenBtn = $newList.find(".btn-fullscreen");
  const $completeListChBx = $newList.find(".complete-list");
  const $moveLeft = $newList.find(".move-left");
  const $moveRight = $newList.find(".move-right");

  $todoList.data("position", position);

  // Configuración para agregar imagen a la tarea
  $addTodoImageBtn.on("click", function () {
    $newTodoImageInput.click();
  });
  $newTodoImageInput.on("change", function (e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (event) {
        $addTodoImageBtn.data("imageUrl", event.target.result);
        $addTodoImageBtn.html('<i class="bi bi-image-fill text-success"></i>');
      };
      reader.readAsDataURL(file);
    }
  });

  // Configurar el dropzone para importar archivos
  $dropzone.on("dragover", function (e) {
    e.preventDefault();
    $(this).addClass("dragover");
  });
  $dropzone.on("dragleave", function () {
    $(this).removeClass("dragover");
  });
  $dropzone.on("drop", function (e) {
    e.preventDefault();
    $(this).removeClass("dragover");
    const files = e.originalEvent.dataTransfer.files;
    handleFileSelection(files, $todosContainer);
  });
  $dropzone.on("click", function (e) {
    if ($(e.target).is(".file-input")) return;
    e.stopPropagation();
    $fileInput.click();
  });
  $fileInput.on("change", function (e) {
    const files = e.target.files;
    handleFileSelection(files, $todosContainer);
  });

  // Establecer el estado del checkbox basado en el valor de completed
  if (completed) {
    $completeListChBx.prop("checked", true);
    $todoList.addClass("completed");
    $newList.data("completed", true);
  }

  if (position == 0) {
    $moveLeft.addClass("disabled");
  } else if (position == totalList) {
    $moveRight.addClass("disabled");
  }

  // Mover posición al presionar .move-left
  $moveLeft.on("click", function () {
    moveLeft($newList.closest(".todo-list-container"));
  });

  // Mover posición al presionar .move-right
  $moveRight.on("click", function () {
    moveRight($newList.closest(".todo-list-container"));
  });

  // Marcar lista completa
  $completeListChBx.on("change", function () {
    const $list = $(this).closest(".todo-list"); // Obtiene la lista actual
    const isChecked = $(this).is(":checked");

    // Cambia el estado de completado solo para esta lista
    $list.data("completed", isChecked);
    $todoList.toggleClass("completed", isChecked);
    saveLists(window.username);
  });

  // Agregar tareas guardadas (si existen)
  savedTodos.forEach((todo) => {
    const $todoItem = createTodoItem(todo.text, todo.image);
    if (todo.completed) {
      $todoItem.addClass("completed");
      $todoItem.find(".form-check-input").prop("checked", true);
    }
    $todosContainer.append($todoItem);
  });

  // Agregar nueva tarea
  $addTodoBtn.on("click", function () {
    const todoText = $newTodoInput.val().trim();
    if (todoText) {
      const imageUrl = $addTodoImageBtn.data("imageUrl") || "";
      const $todoItem = createTodoItem(todoText, imageUrl);
      $todosContainer.append($todoItem);
      $newTodoInput.val("");
      $addTodoImageBtn.html('<i class="bi bi-image"></i>');
      $addTodoImageBtn.removeData("imageUrl");
      $newTodoImageInput.val("");
      saveLists(window.username);
    }
  });

  // Eliminar lista
  $newList.find(".btn-delete-list").on("click", function () {
    $newList.closest(".todo-list-container").remove();
    saveLists(window.username);
  });

  // Pantalla completa
  $fullscreenBtn.on("click", function () {
    const $listContainer = $newList.closest(".todo-list-container");
    $listContainer.toggleClass("fullscreen-list");
    $("body").css(
      "overflow",
      $listContainer.hasClass("fullscreen-list") ? "hidden" : "auto"
    );
  });

  $listsContainer.append($newList);
}

function createTodoItem(text, imageUrl = "") {
  const $todoItem = $(`
        <div class="list-item">
            <div class="form-check w-100">
                <input class="form-check-input" type="checkbox">
                <span class="todo-text">${text}</span>
            </div>
            <div class="list-item-actions">
                ${
                  imageUrl
                    ? `<img src="${imageUrl}" class="todo-image" alt="Tarea imagen">`
                    : ""
                }
                <button class="btn-edit-todo">
                    <i class="bi bi-pencil"></i>
                </button>
                <label class="btn-separator">|</label>
                <button class="btn-delete-todo">
                    <i class="bi bi-trash"></i>
                </button>

            </div>
        </div>
    `);

  // Hacer que el clic en el span marque o desmarque el checkbox
  $todoItem.find(".todo-text").on("click", function () {
    const $checkbox = $todoItem.find(".form-check-input");
    $checkbox.prop("checked", !$checkbox.prop("checked")).trigger("change");
  });

  // Mostrar imagen en modal al hacer clic
  $todoItem.find(".todo-image").on("click", function () {
    $("#modalImage").attr("src", $(this).attr("src"));
    $imageModal.show();
  });
  // Marcar tarea como completada y guardar cambios
  $todoItem.find(".form-check-input").on("change", function () {
    $todoItem.toggleClass("completed");
    saveLists(window.username);
  });
  // Editar tarea
  $todoItem.find(".btn-edit-todo").on("click", function () {
    if ($todoItem.find(".edit-container").length > 0) return;
    const $span = $todoItem.find("span");
    const currentText = $span.text();
    const editHtml = `
            <div class="edit-container">
                <input type="text" class="edit-input form-control" value="${currentText}">
                <div class="mt-2">
                    <input type="file" class="edit-image-input" accept="image/*" style="display: none;">
                    <button type="button" class="btn btn-sm btn-outline-secondary btn-edit-image">Agregar/Editar Imagen</button>
                </div>
            </div>
        `;
    $span.replaceWith(editHtml);
    const $editContainer = $todoItem.find(".edit-container");
    const $editInput = $editContainer.find(".edit-input");
    const $editImageInput = $editContainer.find(".edit-image-input");
    const $btnEditImage = $editContainer.find(".btn-edit-image");
    let newImageUrl = $todoItem.find(".todo-image").attr("src") || "";

    $btnEditImage.on("click", function () {
      $editImageInput.click();
    });
    $editImageInput.on("change", function (e) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
          newImageUrl = event.target.result;
          $btnEditImage.html(
            '<i class="bi bi-image-fill text-success"></i> Imagen cambiada'
          );
        };
        reader.readAsDataURL(file);
      }
    });
    function finishEditing() {
      const newText = $editInput.val().trim();
      const finalText = newText ? newText : currentText;
      $editContainer.replaceWith(`<span>${finalText}</span>`);
      const $imageElement = $todoItem.find(".todo-image");
      if (newImageUrl) {
        if ($imageElement.length) {
          $imageElement.attr("src", newImageUrl);
        } else {
          $todoItem
            .find(".list-item-actions")
            .prepend(
              `<img src="${newImageUrl}" class="todo-image" alt="Tarea imagen">`
            );
          $todoItem.find(".todo-image").on("click", function () {
            $("#modalImage").attr("src", $(this).attr("src"));
            $imageModal.show();
          });
        }
      }
      saveLists(window.username);
    }
    $editInput.on("blur", finishEditing);
    $editInput.on("keypress", function (e) {
      if (e.which === 13) finishEditing();
    });
  });
  // Eliminar tarea
  $todoItem.find(".btn-delete-todo").on("click", function () {
    $todoItem.remove();
    saveLists(window.username);
  });
  return $todoItem;
}

function moveLeft($list) {
  const $prev = $list.prev(".todo-list-container");
  if ($prev.length) {
    $list.insertBefore($prev);
    updateListPositions();
    updateMoveButtons(); // Actualiza los botones después de mover
  }
}

function moveRight($list) {
  const $next = $list.next(".todo-list-container");
  if ($next.length) {
    $list.insertAfter($next);
    updateListPositions();
    updateMoveButtons(); // Actualiza los botones después de mover
  }
}

function updateListPositions() {
  $(".todo-list-container").each(function (index) {
    $(this).find(".todo-list").data("position", index);
  });
  saveLists(window.username);
  updateMoveButtons(); // También se debe actualizar aquí
}

function updateMoveButtons() {
  $(".todo-list-container").each(function (index) {
    const $list = $(this);
    const $moveLeft = $list.find(".move-left");
    const $moveRight = $list.find(".move-right");

    // Obtener el total de listas
    const totalLists = $(".todo-list-container").length - 1;

    // Habilitar/deshabilitar botones según la posición
    if (index === 0) {
      $moveLeft.addClass("disabled");
    } else {
      $moveLeft.removeClass("disabled");
    }

    if (index === totalLists) {
      $moveRight.addClass("disabled");
    } else {
      $moveRight.removeClass("disabled");
    }
  });
}
