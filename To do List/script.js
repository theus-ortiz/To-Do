
document.addEventListener('DOMContentLoaded', function () {
    const taskInput = document.getElementById('task');
    const addTaskButton = document.getElementById('add-task');
    const taskList = document.getElementById('task-list');

    addTaskButton.addEventListener('click', function () {
        const taskText = taskInput.value.trim();

        if (taskText !== '') {
            const listItem = document.createElement('li');

            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remover';
            removeButton.addEventListener('click', function () {
                listItem.remove();
                updateLocalStorage();
            });

            listItem.textContent = taskText;
            listItem.appendChild(removeButton);
            taskList.appendChild(listItem);

            taskInput.value = '';

            updateLocalStorage();
        }
    });


    loadFromLocalStorage();

    function loadFromLocalStorage() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        storedTasks.forEach(function (taskText) {
            const listItem = document.createElement('li');
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remover';
            removeButton.addEventListener('click', function () {
                listItem.remove();
                updateLocalStorage();
            });
            listItem.textContent = taskText;
            listItem.appendChild(removeButton);
            taskList.appendChild(listItem);
        });
    }

    function updateLocalStorage() {
        const tasks = [];
        const taskItems = taskList.querySelectorAll('li');
        taskItems.forEach(function (taskItem) {
            tasks.push(taskItem.textContent.replace('Remover', '').trim());
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});
