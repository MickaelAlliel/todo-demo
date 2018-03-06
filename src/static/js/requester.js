const addTodo = () => {
    const input = $('.new-todo');
    const title = input.val();
    $.ajax('/todos', {
        contentType: "application/json",
        method: 'POST',
        data: JSON.stringify({title: title}),
        dataType: 'json'
    })
    .done(function() {
        location.reload();
    });
}

const deleteTodo = (e) => {
    const todoId = $(e.target.parentElement.parentElement).data('id');
    $.ajax('/todos/' + todoId, {
        method: 'DELETE'
    })
    .done(function() {
        location.reload();
    });
}

const duplicateTodo = (e) => {
    const todoId = $(e.target.parentElement.parentElement).data('id');
    $.ajax('/todos/duplicate/' + todoId, {
        method: 'POST'
    })
    .done(function() {
        location.reload();
    });
}

const updateTodo = (e) => {
    const todoElement = $(e.target.parentElement.parentElement);
    todoElement.addClass('editing');

    const editingElement = $(e.target.parentElement.nextElementSibling);
    editingElement.focus();
    editingElement[0].setSelectionRange(editingElement.val().length, editingElement.val().length); // Focusing on end of input
    $(editingElement).on('keydown', (e) => {
        if (e.keyCode == '27') {
            $('.editing').removeClass('editing');
        }
    });

    $(editingElement).on('keypress', (e) => {
        if (e.keyCode == '13') {
            const todoId = $(e.target.parentElement).data('id');
            const title = $(e.target).val();
            $.ajax('/todos/' + todoId, {
                contentType: "application/json",
                method: 'PUT',
                data: JSON.stringify({title: title}),
                dataType: 'json'
            })
            .done(function() {
                location.reload();
            });
            $('.editing').removeClass('editing');
        }
    });
}

const toggle = (e) => {
    const todoId = $(e.target.parentElement.parentElement).data('id');
    const completed = $(e.target).is(":checked");
    $.ajax('/todos/' + todoId, {
        contentType: "application/json",
        method: 'PUT',
        data: JSON.stringify({completed: completed}),
        dataType: 'json'
    })
    .done(function() {
        location.reload();
    });
}

const toggleAll = () => {
    $.ajax('/todos/toggleall', {
        method: 'POST'
    })
    .done(function() {
        location.reload();
    });
}

const clearCompleted = () => {
    $.ajax('/todos/clear', {
        method: 'POST'
    })
    .done(function() {
        location.reload();
    });
}