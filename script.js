let tasks = [];

let select = document.getElementById('category-select');
let customCategory = document.getElementById('custom-category');

select.addEventListener('change', function() {
    if (this.value === 'Otra') {
        customCategory.style.display = 'block'; 
    } else {
        customCategory.style.display = 'none';
    }
});

function addTask() {
    var taskInput = document.getElementById('task-input');
    var errorMessage = document.getElementById('error-message');
    var category = select.value;

    if (taskInput.value.trim() === '') {
        errorMessage.style.display = 'block';
        return;
    }

    errorMessage.style.display = 'none';

    if (category === 'Otra') {
        category = customCategory.value;
        if (category.trim() === '') {
            category = 'General';
        }
    }

    tasks.push({
        id: Date.now(),
        text: taskInput.value,
        category: category,
        done: false
    });

    taskInput.value = '';
    renderTasks();
}

function renderTasks() {
    let list = document.getElementById('task-list');
    list.innerHTML = '';

    for (let i = 0; i < tasks.length; i++) {
        let task = tasks[i];
        let li = document.createElement('li');
        li.textContent = task.text + ' (' + task.category + ')';
        list.appendChild(li);
    }
}


