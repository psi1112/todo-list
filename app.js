// app.js: todo-list의 핵심 JavaScript 로직
// TailwindCSS 기반 TODO LIST 기능 구현

// 주요 DOM 요소 선택
const todoForm = document.getElementById('todo-form'); // 할 일 입력 폼
const todoInput = document.getElementById('todo-input'); // 입력 필드
const todoList = document.getElementById('todo-list'); // 할 일 목록 리스트
const clearBtn = document.getElementById('clear-btn'); // 전체 삭제 버튼

// 로컬스토리지에서 기존 할 일 목록 불러오기 (없으면 빈 배열)
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// 할 일 목록을 화면에 렌더링하는 함수
function renderTodos() {
  todoList.innerHTML = ''; // 기존 목록 초기화
  todos.forEach((todo, idx) => {
    const li = document.createElement('li'); // 리스트 아이템 생성
    li.className = 'flex items-center justify-between bg-gray-50 px-4 py-2 rounded shadow-sm';
    
    const span = document.createElement('span'); // 할 일 텍스트 영역
    span.textContent = todo.text;
    // 완료된 항목은 취소선 및 색상 변경
    span.className = 'flex-1' + (todo.completed ? ' line-through text-gray-400' : '');
    span.onclick = () => toggleTodo(idx); // 클릭 시 완료/미완료 토글

    const delBtn = document.createElement('button'); // 삭제 버튼 생성
    delBtn.textContent = '삭제';
    delBtn.className = 'ml-4 bg-red-400 text-white px-2 py-1 rounded hover:bg-red-600 delete-btn';
    delBtn.onclick = (e) => {
      e.stopPropagation(); // 이벤트 버블링 방지
      deleteTodo(idx); // 삭제 함수 호출
    };

    li.appendChild(span); // 텍스트 추가
    li.appendChild(delBtn); // 삭제 버튼 추가
    todoList.appendChild(li); // 리스트에 추가
  });
}

// 할 일 추가 함수 (입력값을 todos 배열에 추가)
function addTodo(text) {
  todos.push({ text, completed: false }); // 새 할 일 객체 추가
  saveTodos(); // 로컬스토리지에 저장
  renderTodos(); // 화면 갱신
}

// 할 일 삭제 함수 (특정 인덱스의 항목 삭제)
function deleteTodo(idx) {
  todos.splice(idx, 1); // 해당 인덱스 삭제
  saveTodos(); // 저장
  renderTodos(); // 갱신
}

// 할 일 완료/미완료 토글 함수
function toggleTodo(idx) {
  todos[idx].completed = !todos[idx].completed; // 상태 반전
  saveTodos();
  renderTodos();
}

// todos 배열을 로컬스토리지에 저장하는 함수
function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

// 폼 제출 이벤트: 할 일 추가
// 입력값이 있으면 addTodo 호출 후 입력 필드 초기화
// 새로고침 방지(e.preventDefault)
todoForm.onsubmit = function(e) {
  e.preventDefault();
  const value = todoInput.value.trim(); // 공백 제거
  if (value) {
    addTodo(value);
    todoInput.value = '';
  }
};

// 전체 삭제 버튼 클릭 시 todos 배열 초기화 및 저장/갱신
clearBtn.onclick = function() {
  todos = [];
  saveTodos();
  renderTodos();
};

// 삭제 애니메이션 적용 (UX 개선)
document.getElementById('todo-list').addEventListener('click', function(e) {
  if (e.target.classList.contains('delete-btn')) {
    const li = e.target.closest('li'); // 삭제 버튼이 속한 li 찾기
    removeTodoElement(li); // 애니메이션 적용
  }
});

// 삭제 애니메이션 함수: li에 removing 클래스 추가 후 0.4초 뒤 삭제
function removeTodoElement(li) {
  li.classList.add('removing'); // CSS 애니메이션 트리거
  setTimeout(() => li.remove(), 400); // 0.4초 후 DOM에서 제거
}

// 페이지 로드 시 최초 렌더링
renderTodos();