document.addEventListener('DOMContentLoaded', () => {
    // --- CONTADOR DE VISITAS ---
    const visitCounter = document.getElementById('visit-counter');
    let visits = localStorage.getItem('visitCount') || 0;
    visits++;
    visitCounter.textContent = visits;
    localStorage.setItem('visitCount', visits);
 

    // --- DATOS INICIALES Y DEL LOCALSTORAGE ---
    let availableItems = JSON.parse(localStorage.getItem('availableItems')) || [
    { name: 'Caja de Lápices', image: './imagenes/Lapices.jpg', cantidad: 2 },
    { name: 'Cuaderno Pequeño', image: './imagenes/cuaderno.jpg', cantidad: 1 },
    { name: 'Gomas', image: './imagenes/Gomas.jpg', cantidad: 2 },
    { name: 'Tijeras', image: './imagenes/tijeras.jpg', cantidad: 1 },
    { name: 'Plasticola', image: './imagenes/plasticola.jpg', cantidad: 2 },
    { name: 'Cartuchera', image: './imagenes/cartuchera.jpg', cantidad: 1 }
];



    let leftItems = JSON.parse(localStorage.getItem('leftItems')) || [];

    const availableItemsList = document.getElementById('available-items-list');
    const leftItemsList = document.getElementById('left-items-list');
    const addItemForm = document.getElementById('add-item-form');

    // --- FUNCIONES PARA MOSTRAR LOS ARTÍCULOS ---
    const renderAvailableItems = () => {
        availableItemsList.innerHTML = '';
        availableItems.forEach((item, index) => {
            const itemCard = document.createElement('div');
            itemCard.className = 'item-card';
            itemCard.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>Cantidad disponible: ${item.cantidad}</p>
            <button onclick="retireItem(${index})">Retirar</button>
`;

            availableItemsList.appendChild(itemCard);
        });
        localStorage.setItem('availableItems', JSON.stringify(availableItems));
    };
    
    const renderLeftItems = () => {
        leftItemsList.innerHTML = '';
        leftItems.forEach(item => {
            const itemCard = document.createElement('div');
            itemCard.className = 'item-card';
            itemCard.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <h3>${item.name}</h3>
            `;
            leftItemsList.appendChild(itemCard);
        });
        localStorage.setItem('leftItems', JSON.stringify(leftItems));
    };


    // --- FUNCIÓN PARA RETIRAR UN ARTÍCULO ---
    window.retireItem = (index) => {
    if (confirm(`¿Querés retirar "${availableItems[index].name}"?`)) {
        availableItems[index].cantidad--;
        if (availableItems[index].cantidad <= 0) {
            availableItems.splice(index, 1); // elimina si ya no quedan
        }
        renderAvailableItems();
    }
};

    // --- MANEJO DEL FORMULARIO PARA AÑADIR ARTÍCULOS ---
addItemForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const itemName = document.getElementById('item-name').value;
    const itemImageInput = document.getElementById('item-image');
    
    if (itemImageInput.files && itemImageInput.files[0]) {
        const reader = new FileReader();
        reader.onload = (event) => {
            const newItem = {
                name: itemName,
                image: event.target.result
            };
            leftItems.push(newItem);
            renderLeftItems();

            // 🔢 Mostrar código fijo de intercambio
            const codigo = 4582; // Cambiá este número si querés
            alert(`✅ ¡Gracias por participar! Tu código de intercambio es: ${codigo}`);

            addItemForm.reset();
        };
        reader.readAsDataURL(itemImageInput.files[0]);
    }
});
 
    // --- INICIALIZAR LAS LISTAS ---
    renderAvailableItems();
    renderLeftItems();
});

// --- FUNCIÓN DE CONTRASEÑA ---
function checkPassword() {
    const password = document.getElementById('password-input').value;
    const errorMessage = document.getElementById('error-message');
    // Puedes cambiar la contraseña aquí
    if (password === 'escolar2024') {
        document.getElementById('password-container').classList.add('hidden');
        document.getElementById('main-content').classList.remove('hidden');
        errorMessage.classList.add('hidden');
    } 
    else {
        errorMessage.classList.remove('hidden');
    }
}