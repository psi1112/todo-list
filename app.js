// TailwindCSS 기반 TODO LIST 기능 구현
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const clearBtn = document.getElementById('clear-btn');

let todos = JSON.parse(localStorage.getItem('todos')) || [];

function renderTodos() {
  todoList.innerHTML = '';
  todos.forEach((todo, idx) => {
    const li = document.createElement('li');
    li.className = 'flex items-center justify-between bg-gray-50 px-4 py-2 rounded shadow-sm';
    
    const span = document.createElement('span');
    span.textContent = todo.text;
    // 템플릿 리터럴 대신 문자열 연결로 변경 (ES5 호환)
    span.className = 'flex-1' + (todo.completed ? ' line-through text-gray-400' : '');
    span.onclick = () => toggleTodo(idx);

    const delBtn = document.createElement('button');
    delBtn.textContent = '삭제';
    delBtn.className = 'ml-4 bg-red-400 text-white px-2 py-1 rounded hover:bg-red-600 delete-btn';
    delBtn.onclick = (e) => {
      e.stopPropagation();
      deleteTodo(idx);
    };

    li.appendChild(span);
    li.appendChild(delBtn);
    todoList.appendChild(li);
  });
}

// 애니메이션 적용을 위한 클래스 추가/제거
function addTodo(text, completed) {
  const todoList = document.getElementById('todo-list');
  const li = document.createElement('li');
  li.className = completed ? 'completed flex items-center bg-pink-50 rounded-xl px-4 py-2 shadow group' : 'flex items-center bg-pink-50 rounded-xl px-4 py-2 shadow group';
  
  const span = document.createElement('span');
  span.textContent = text;
  span.className = 'flex-1' + (completed ? ' line-through text-gray-400' : '');
  span.onclick = () => toggleTodo(idx);

  const delBtn = document.createElement('button');
  delBtn.textContent = '삭제';
  delBtn.className = 'ml-4 bg-red-400 text-white px-2 py-1 rounded hover:bg-red-600 delete-btn';
  delBtn.onclick = (e) => {
    e.stopPropagation();
    deleteTodo(idx);
  };

  li.appendChild(span);
  li.appendChild(delBtn);
  todoList.appendChild(li);

  setTimeout(() => { li.style.opacity = '1'; }, 10); // 트리거용
}

function removeTodoElement(li) {
  li.classList.add('removing');
  setTimeout(() => li.remove(), 400);
}

function addTodo(text) {
  todos.push({ text, completed: false });
  saveTodos();
  renderTodos();
}

function deleteTodo(idx) {
  todos.splice(idx, 1);
  saveTodos();
  renderTodos();
}

function toggleTodo(idx) {
  todos[idx].completed = !todos[idx].completed;
  saveTodos();
  renderTodos();
}

function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

todoForm.onsubmit = function(e) {
  e.preventDefault();
  const value = todoInput.value.trim();
  if (value) {
    addTodo(value);
    todoInput.value = '';
  }
};

clearBtn.onclick = function() {
  todos = [];
  saveTodos();
  renderTodos();
};

document.getElementById('todo-list').addEventListener('click', function(e) {
  if (e.target.classList.contains('delete-btn')) {
    const li = e.target.closest('li');
    removeTodoElement(li);
  }
});

renderTodos();