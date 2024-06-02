document.getElementById('logoutBtn').addEventListener('click', async () => {
    try {
        const response = await fetch('http://localhost:3000/api/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        });
    
        if (!response.ok) {
            console.error('Error al cerrar sesión: ', response.statusText);
            return;
        }
    
        console.log('Sesión cerrada correctamente'); // Log sesión cerrada correctamente
        window.location.href = '/inicio';
    } catch (error) {
        console.error('Error de conexión al cerrar sesión', error);
    }
});
