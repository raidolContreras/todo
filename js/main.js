$(document).ready(function () {
    // Variables globales accesibles en otros módulos
    window.username = $('#username').val();
    window.$listsContainer = $('#listsContainer');
    window.todoListTemplate = $('#todoListTemplate').html();
    window.$imageModal = new bootstrap.Modal(document.getElementById('imageModal'));
    
    // Manejo del formulario para agregar una nueva lista
    $('#addListForm').on('submit', function (e) {
        e.preventDefault();
        const listTitle = $('#newListTitle').val().trim();
        if (listTitle) {
            createTodoList(listTitle);
            $('#newListTitle').val('');
            saveLists(window.username);
        }
    });

    // Cargar las listas guardadas del usuario
    loadSavedLists(window.username, createTodoList);
});
