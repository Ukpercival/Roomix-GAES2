document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const editIndex = urlParams.get('edit');
    let publications = JSON.parse(localStorage.getItem('publications')) || [];

    if (editIndex !== null) {
        const publication = publications[editIndex];

        document.getElementById('name').value = publication.name;
        document.getElementById('email').value = publication.email;
        document.getElementById('phone').value = publication.phone;
        document.getElementById('locality').value = publication.locality;
        document.getElementById('address').value = publication.address;
        document.getElementById('price').value = publication.price;
        document.getElementById('description').value = publication.description;
        document.getElementById('imagePreview').src = publication.image;
        document.getElementById('imagePreview').style.display = 'block';
    }

    document.getElementById('rentalForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const locality = document.getElementById('locality').value;
        const address = document.getElementById('address').value;
        const price = document.getElementById('price').value;
        const description = document.getElementById('description').value;
        const image = document.getElementById('image').files[0];

        const reader = new FileReader();
        reader.onload = function(e) {
            const publication = {
                name: name,
                email: email,
                phone: phone,
                locality: locality,
                address: address,
                price: price,
                description: description,
                image: e.target.result
            };

            if (editIndex !== null) {
                publications[editIndex] = publication;
            } else {
                publications.push(publication);
            }
            localStorage.setItem('publications', JSON.stringify(publications));

            alert('Publicación exitosa');
            window.location.href = '/hosterView';
        };

        if (image) {
            reader.readAsDataURL(image);
        } else {
            if (editIndex !== null) {
                publications[editIndex] = {
                    ...publications[editIndex],
                    name: name,
                    email: email,
                    phone: phone,
                    locality: locality,
                    address: address,
                    price: price,
                    description: description
                };
                localStorage.setItem('publications', JSON.stringify(publications));
                alert('Publicación actualizada');
                window.location.href = '/hosterView';
            } else {
                alert('Debes seleccionar una imagen');
            }
        }
    });
});

document.getElementById('image').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imagePreview = document.getElementById('imagePreview');
            imagePreview.src = e.target.result;
            imagePreview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
});
