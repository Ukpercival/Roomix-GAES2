// Eliminar la cookie del token JWT
document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

function updatePreview() {
    document.getElementById('previewPlace').textContent = document.getElementById('place').value;
    document.getElementById('previewCheckin').textContent = document.getElementById('checkin').value;
    document.getElementById('previewCheckout').textContent = document.getElementById('checkout').value;
    document.getElementById('previewPeople').textContent = document.getElementById('people').value;
    document.getElementById('previewPayment').textContent = document.getElementById('payment').options[document.getElementById('payment').selectedIndex].text;
}

function submitForm() {
    const data = {
        place: document.getElementById('place').value,
        checkin: document.getElementById('checkin').value,
        checkout: document.getElementById('checkout').value,
        people: document.getElementById('people').value,
        payment: document.getElementById('payment').value
    };

    fetch('http://localhost:3000/reservations', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        alert('Reserva realizada con éxito');
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('Hubo un problema al realizar la reserva');
    });
}