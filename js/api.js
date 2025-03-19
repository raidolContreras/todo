function loadSavedLists(username, createTodoListCallback) {
  $.ajax({
    url: "api.php",
    method: "GET",
    data: { action: "getLists", username: username },
    dataType: "json",
  })
    .done(function (response) {
      if (response.success) {
        const sortedLists = response.lists.sort(
          (a, b) => a.position - b.position
        );
        const totalList = sortedLists.length - 1;
        sortedLists.forEach((list) => {
          createTodoListCallback(
            list.title,
            list.todos,
            list.completed,
            list.position,
            totalList,
            list.minimized
          );
        });
      } else {
        console.error("Error al cargar las listas:", response.message);
      }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      console.error("Error en la solicitud AJAX:", textStatus, errorThrown);
    });
}

function saveLists(username) {
  const lists = [];
  $(".todo-list-container").each(function (index) {
    const $list = $(this).find(".todo-list");
    const listTitle = $list.find(".list-title").text();
    const todos = [];

    $list.find(".list-item").each(function () {
      const $todoItem = $(this);
      todos.push({
        text: $todoItem.find(".todo-text").text(),
        completed: $todoItem.hasClass("completed"),
        image: $todoItem.find(".todo-image").attr("src") || "",
      });
    });

    lists.push({
      title: listTitle,
      todos: todos,
      completed: $list.data("completed") || false,
      position: index,
      minimized: $list.hasClass("minimized-list"),
    });
  });

  $.ajax({
    url: "api.php",
    method: "POST",
    data: {
      action: "saveLists",
      username: username,
      lists: JSON.stringify(lists),
    },
    dataType: "json",
  })
    .done(function (response) {
      if (!response.success) {
        console.error("Error al guardar las listas:", response.message);
      }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      console.error("Error en la solicitud AJAX:", textStatus, errorThrown);
    });
}
