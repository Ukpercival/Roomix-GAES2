document.getElementById('registerForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const nombre = document.getElementById('nombre').value;
  const apellido = document.getElementById('apellido').value;
  const documento = document.getElementById('documento').value;
  const correo = document.getElementById('correo').value;
  const telefono = document.getElementById('telefono').value;
  const contrasena = document.getElementById('contrasena').value;

  try {
    const response = await fetch('http://localhost:3000/api/register', {
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
      document.getElementById('registerError').innerText = 'Error en el registro';
      return;
    }

    alert('Registro exitoso');
    document.getElementById('registerForm').reset();
  } catch (error) {
    document.getElementById('registerError').innerText = 'Error de conexión';
  }
});
