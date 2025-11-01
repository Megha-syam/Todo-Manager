// Get DOM elements
const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const list = document.getElementById('todo-list');

// Load todos from localStorage
const saved = localStorage.getItem('todos');
const todos = saved ? JSON.parse(saved) : [];

// Save todos to localStorage
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Create a todo item node
function createNode(todo, index) {
    const li = document.createElement('li');
    li.className = 'todo-item'; // Add class for styling

    // Checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = !!todo.completed;
    checkbox.addEventListener("change", () => {
        todo.completed = checkbox.checked;
        textSpan.style.textDecoration = todo.completed ? 'line-through' : '';
        textSpan.style.color = todo.completed ? '#999' : '#333';
        saveTodos();
    });

    // Todo text
    const textSpan = document.createElement("span");
    textSpan.textContent = todo.text;

    // Apply completed styling if needed
    if (todo.completed) {
        textSpan.style.textDecoration = 'line-through';
        textSpan.style.color = '#999';
    }

    // Double-click to edit
    textSpan.addEventListener("dblclick", () => {
        const newText = prompt("Edit Todo", todo.text);
        if (newText !== null && newText.trim() !== '') {
            todo.text = newText.trim();
            textSpan.textContent = todo.text;
            saveTodos();
        }
    });

    // Delete button
    const delBtn = document.createElement('button');
    delBtn.className = 'delete-btn'; // Add class for styling
    delBtn.textContent = "Delete";
    delBtn.addEventListener('click', () => {
        // Add fade-out animation before removing
        li.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            todos.splice(index, 1);
            render();
            saveTodos();
        }, 300);
    });

    // Append elements
    li.appendChild(checkbox);
    li.appendChild(textSpan);
    li.appendChild(delBtn);

    return li;
}

// Render all todos
function render() {
    list.innerHTML = '';

    // Show empty state if no todos
    if (todos.length === 0) {
        list.innerHTML = '<div class="empty-state">No tasks yet. Add one to get started! ✨</div>';
        return;
    }

    todos.forEach((todo, index) => {
        const node = createNode(todo, index);
        list.appendChild(node);
    });
}

// Add new todo
function addTodo() {
    const text = input.value.trim();

    if (!text) {
        // Add shake animation to input if empty
        input.style.animation = 'shake 0.3s ease';
        setTimeout(() => {
            input.style.animation = '';
        }, 300);
        return;
    }

    todos.push({ text: text, completed: false });
    input.value = '';
    render();
    saveTodos();
    
    // Focus back on input for quick task addition
    input.focus();
}

// Event listeners
addBtn.addEventListener("click", addTodo);

input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        addTodo();
    }
});

// Initial render
render();

// Optional: Add shake animation to CSS for empty input feedback
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
    
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(20px);
        }
    }
`;
document.head.appendChild(style);