document.getElementById('registerForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const nombre = document.getElementById('nombre').value;
  const apellido = document.getElementById('apellido').value;
  const documento = document.getElementById('documento').value;
  const correo = document.getElementById('correo').value;
  const telefono = document.getElementById('telefono').value;
  const contrasena = document.getElementById('contrasena').value;

  try {
    const response = await fetch('http://localhost:3000/api/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nombre,
        apellido,
        documento,
        correo,
        telefono,
        contrasena,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      document.getElementById('registerError').innerText = errorData.error || 'Error en el registro';
      return;
    }

    alert('Registro exitoso');
    document.getElementById('registerForm').reset();
  } catch (error) {
    document.getElementById('registerError').innerText = 'Error de conexión';
  }
});

document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const correo = document.getElementById('loginCorreo').value;
  const contrasena = document.getElementById('loginContrasena').value;

  try {
    const response = await fetch('http://localhost:3000/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ correo, contrasena }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      document.getElementById('loginError').innerText = errorData.error || 'Error en el inicio de sesión';
      return;
    }

    const data = await response.json();
    alert('Inicio de sesión exitoso');
    localStorage.setItem('token', data.token);
    document.getElementById('loginForm').reset();
  } catch (error) {
    document.getElementById('loginError').innerText = 'Error de conexión';
  }
});
