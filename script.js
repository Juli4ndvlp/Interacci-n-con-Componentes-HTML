let tasks = [];

const selectElement = document.getElementById('category-select');
selectElement.addEventListener('change', function() {
    const customInput = document.getElementById('custom-category');
    customInput.style.display = this.value === 'Otra' ? 'block' : 'none';
});


function addTask() {
    const input = document.getElementById('task-input');
    const select = document.getElementById('category-select');
    const errorDiv = document.getElementById('error-message');
    const customInput = document.getElementById('custom-category');

    if (input.value.trim() === "") {
        errorDiv.style.display = "block";
        return;
    }

    errorDiv.style.display = "none";
    const finalCategory = select.value === 'Otra' ? customInput.value : select.value;

    const newTask = {
        id: Date.now(),
        text: input.value,
        category: finalCategory || "General",
        done: false,
        urgent: select.value === "Urgente"
    };

    tasks.push(newTask);
    console.log("Tarea creada:", newTask.text); 
    
    input.value = "";
    renderTasks();
}

function renderTasks() {
    const list = document.getElementById('task-list');
    list.innerHTML = "";

    tasks.forEach(t => {
        const li = document.createElement('li');
        li.className = `task-card ${t.done ? 'is-done' : ''} ${t.urgent ? 'is-urgent' : ''}`;
        
        li.innerHTML = `
            <span>${t.text} <small>(${t.category})</small></span>
            <div>
                <button onclick="toggleDone(${t.id})">✅</button>
                <button onclick="deleteTask(${t.id})">🗑️</button>
            </div>
        `;
        list.appendChild(li);
    });

    updateCounter();
}

function toggleDone(id) {
    tasks = tasks.map(t => t.id === id ? {...t, done: !t.done} : t);
    console.log("Estado de tarea cambiado. ID:", id); 
    renderTasks();
}

function deleteTask(id) {
    if (confirm("¿Seguro que quieres eliminar esta tarea?")) {
        tasks = tasks.filter(t => t.id !== id);
        console.log("Tarea eliminada."); 
        renderTasks();
    }
}

function updateCounter() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.done).length;
    document.getElementById('total-count').innerText = total;
    document.getElementById('completed-count').innerText = completed;
    
    document.getElementById('clear-completed').style.display = completed > 0 ? 'block' : 'none';
}

document.getElementById('clear-completed').addEventListener('click', () => {
    const totalDone = tasks.filter(t => t.done).length;
    if (confirm(`¿Eliminar ${totalDone} tareas hechas?`)) {
        tasks = tasks.filter(t => !t.done);
        renderTasks();
    }
});