document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const correo = document.getElementById('loginCorreo').value;
    const contrasena = document.getElementById('loginContrasena').value;
  
    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correo, contrasena }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        document.getElementById('loginError').innerText = 'Error en el inicio de sesión';
        return;
      }
  
      const data = await response.json();
      window.location.href = '/roomie';
    } catch (error) {
      document.getElementById('loginError').innerText = 'Error de conexión';
    }
  });
