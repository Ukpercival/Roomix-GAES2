document.addEventListener('DOMContentLoaded', function() {
    const apiUrl = 'http://localhost:3000/api/users';
    const userForm = document.getElementById('userForm');
    const userTable = document.getElementById('userTable').getElementsByTagName('tbody')[0];

    // Manejador de eventos para el formulario
    userForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        const userId = document.getElementById('userId').value;
        const userData = {
            nombre: document.getElementById('nombre').value,
            apellido: document.getElementById('apellido').value,
            documento: document.getElementById('documento').value,
            correo: document.getElementById('correo').value,
            telefono: document.getElementById('telefono').value,
        };

        if (userId) {
            await updateUser(userId, userData);
        } else {
            await createUser(userData);
        }

        userForm.reset();
        document.getElementById('userId').value = '';
        loadUsers();
    });

    // Funciones para interactuar con la API
    async function createUser(userData) {
        await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
    }

    async function updateUser(userId, userData) {
        await fetch(`${apiUrl}/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
    }

    async function deleteUser(userId) {
        await fetch(`${apiUrl}/${userId}`, {
            method: 'DELETE',
        });
        loadUsers();
    }

    async function loadUsers() {
        const response = await fetch(apiUrl);
        const users = await response.json();
        userTable.innerHTML = '';
        users.forEach(user => {
            const row = userTable.insertRow();
            row.insertCell(0).textContent = user.id;
            row.insertCell(1).textContent = user.nombre;
            row.insertCell(2).textContent = user.apellido;
            row.insertCell(3).textContent = user.documento;
            row.insertCell(4).textContent = user.correo;
            row.insertCell(5).textContent = user.telefono;
            const actionsCell = row.insertCell(6);

            const editButton = document.createElement('button');
            editButton.textContent = 'Editar';
            editButton.onclick = function() {
                document.getElementById('userId').value = user.id;
                document.getElementById('nombre').value = user.nombre;
                document.getElementById('apellido').value = user.apellido;
                document.getElementById('documento').value = user.documento;
                document.getElementById('correo').value = user.correo;
                document.getElementById('telefono').value = user.telefono;
            };
            actionsCell.appendChild(editButton);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Eliminar';
            deleteButton.onclick = function() {
                deleteUser(user.id);
            };
            actionsCell.appendChild(deleteButton);
        });
    }

    // Carga los usuarios al cargar la página
    loadUsers();
});
