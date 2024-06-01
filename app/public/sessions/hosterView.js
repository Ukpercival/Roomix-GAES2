document.addEventListener('DOMContentLoaded', function() {
    const inventoryDiv = document.getElementById('inventory');
    let publications = JSON.parse(localStorage.getItem('publications')) || [];

    if (publications.length === 0) {
        inventoryDiv.innerHTML = '<p>¡Ups! Aún no has publicado tu habitación.</p>';
    } else {
        publications.forEach((publication, index) => {
            const publicationDiv = document.createElement('div');
            publicationDiv.classList.add('publication');

            publicationDiv.innerHTML = `
                <h2>Publicación ${index + 1}</h2>
                <p><strong>Nombre:</strong> ${publication.name}</p>
                <p><strong>Correo Electrónico:</strong> ${publication.email}</p>
                <p><strong>Teléfono:</strong> ${publication.phone}</p>
                <p><strong>Dirección:</strong> ${publication.address}</p>
                <p><strong>Precio por Noche:</strong> ${publication.price}</p>
                <p><strong>Localidad:</strong> ${publication.locality}</p>
                <p><strong>Descripción:</strong> ${publication.description}</p>
                <img src="${publication.image}" alt="Imagen de la habitación" style="max-width: 100%;">
                <button class="edit" onclick="editPublication(${index})">Editar</button>
                <button onclick="deletePublication(${index})">Borrar</button>
            `;

            inventoryDiv.appendChild(publicationDiv);
        });
    }
});

function deletePublication(index) {
    let publications = JSON.parse(localStorage.getItem('publications')) || [];
    publications.splice(index, 1);
    localStorage.setItem('publications', JSON.stringify(publications));
    location.reload();
}

function editPublication(index) {
    window.location.href = '/hosterPost';
}
