$(document).ready(function () {
  window.username = $("#username").val() || "defaultUser";
  window.$listsContainer = $("#listsContainer");
  window.todoListTemplate = $("#todoListTemplate").html();
  window.$imageModal = new bootstrap.Modal(
    document.getElementById("imageModal")
  );

  $("#addListForm").on("submit", function (e) {
    e.preventDefault();
    const listTitle = $("#newListTitle").val().trim();
    if (listTitle) {
      createTodoList(listTitle);
      $("#newListTitle").val("");
      saveLists(window.username);
    }
  });

  try {
    loadSavedLists(window.username, createTodoList);
  } catch (error) {
    console.error("Error al cargar listas:", error);
  }
});
