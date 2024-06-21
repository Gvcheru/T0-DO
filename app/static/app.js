document.addEventListener('DOMContentLoaded', getTasks);

function getTasks() {
    fetch('/tasks')
        .then(response => response.json())
        .then(tasks => {
            const taskList = document.getElementById('task-list');
            taskList.innerHTML = '';
            tasks.forEach((task, index) => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <input type="checkbox" onchange="toggleTask(${index})" ${task.done ? 'checked' : ''}>
                    ${task.task}
                    <button onclick="deleteTask(${index})">Delete</button>
                `;
                taskList.appendChild(li);
            });
        });
}

function addTask() {
    const newTaskInput = document.getElementById('new-task');
    const task = newTaskInput.value;
    if (task) {
        fetch('/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ task })
        }).then(response => response.json()).then(() => {
            newTaskInput.value = '';
            getTasks();
        });
    }
}

function toggleTask(index) {
    fetch(`/tasks/${index}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ done: event.target.checked })
    }).then(() => getTasks());
}

function deleteTask(index) {
    fetch(`/tasks/${index}`, {
        method: 'DELETE'
    }).then(() => getTasks());
}
