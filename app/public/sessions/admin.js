document.addEventListener('DOMContentLoaded', async () => {
    const todoForm = document.getElementById('todoForm');
    const todoList = document.getElementById('todoList');

    const fetchTodos = async () => {
      try {
        const response = await fetch('http://localhost:3000/admin');
        const todos = await response.json();
        todoList.innerHTML = '';
        todos.forEach(todo => {
          const li = document.createElement('li');
          li.textContent = `${todo.nombre} ${todo.apellido} (${todo.rol})`;
          todoList.appendChild(li);
        });
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    fetchTodos();

    todoForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const formData = new FormData(todoForm);
      const data = Object.fromEntries(formData.entries());
      try {
        await fetch('http://localhost:3000/todos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
        
        fetchTodos();
        
        todoForm.reset();
      } catch (error) {
        console.error('Error adding todo:', error);
      }
    });
  });

  const socket= io();

  socket.on('newUser', (user) => {

      const todoList = document.getElementById('todoList');
      const li = document.createElement('li');
      li.textContent = `${user.nombre} ${user.apellido} (${user.rol})`;
      todoList.appendChild(li);
    });