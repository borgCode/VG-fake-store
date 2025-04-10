import cart from './cart.js';


function renderCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartEmptyMessage = document.getElementById('cart-empty-message');
    const cartContainer = document.getElementById('cart-container');
    const cartItems = cart.getItems();

    cartItemsContainer.innerHTML = '';

    if (cartItems.length === 0) {
        cartEmptyMessage.classList.remove('d-none');
        cartContainer.classList.add('d-none');
        return;
    } else {
        cartEmptyMessage.classList.add('d-none');
        cartContainer.classList.remove('d-none');
    }

    cartItems.forEach(item => {
        const price = parseInt(item.price.toString().replace('kr', '').trim());
        const totalPrice = price * item.quantity;

        const row = document.createElement('tr');

        const productCell = document.createElement('td');
        productCell.className = 'd-flex align-items-center';

        const productImage = document.createElement('img');
        productImage.src = item.imageLink || 'default-image.jpg';
        productImage.alt = item.name;
        productImage.width = 50;
        productImage.height = 50;
        productImage.className = 'me-3';
        productImage.style.objectFit = 'cover';

        const productName = document.createElement('div');
        productName.textContent = item.name;

        productCell.appendChild(productImage);
        productCell.appendChild(productName);

        const priceCell = document.createElement('td');
        priceCell.textContent = item.price;

        const quantityCell = document.createElement('td');
        const quantityControls = document.createElement('div');
        quantityControls.className = 'd-flex align-items-center';

        const decreaseBtn = document.createElement('button');
        decreaseBtn.className = 'btn btn-sm btn-outline-dark';
        decreaseBtn.innerHTML = '<i class="fas fa-minus"></i>';
        decreaseBtn.addEventListener('click', () => {
            if (item.quantity > 1) {
                cart.updateQuantity(item.id, item.quantity - 1);
                renderCartItems();
                updateCartTotals();
            }
        });

        const quantityInput = document.createElement('input');
        quantityInput.type = 'number';
        quantityInput.className = 'form-control form-control-sm mx-2';
        quantityInput.style.width = '50px';
        quantityInput.min = 1;
        quantityInput.value = item.quantity;
        quantityInput.addEventListener('change', (e) => {
            const newQuantity = parseInt(e.target.value);
            if (newQuantity >= 1) {
                cart.updateQuantity(item.id, newQuantity);
                renderCartItems();
                updateCartTotals();
            } else {
                e.target.value = item.quantity;
            }
        });

        const increaseBtn = document.createElement('button');
        increaseBtn.className = 'btn btn-sm btn-outline-dark';
        increaseBtn.innerHTML = '<i class="fas fa-plus"></i>';
        increaseBtn.addEventListener('click', () => {
            cart.updateQuantity(item.id, item.quantity + 1);
            renderCartItems();
            updateCartTotals();
        });

        quantityControls.appendChild(decreaseBtn);
        quantityControls.appendChild(quantityInput);
        quantityControls.appendChild(increaseBtn);
        quantityCell.appendChild(quantityControls);

        const totalCell = document.createElement('td');
        totalCell.textContent = totalPrice + 'kr';

        const actionsCell = document.createElement('td');
        const removeBtn = document.createElement('button');
        removeBtn.className = 'btn btn-sm btn-danger';
        removeBtn.innerHTML = '<i class="fas fa-trash"></i>';
        removeBtn.addEventListener('click', () => {
            cart.removeItem(item.id);
            renderCartItems();
            updateCartTotals();
        });
        actionsCell.appendChild(removeBtn);

        row.appendChild(productCell);
        row.appendChild(priceCell);
        row.appendChild(quantityCell);
        row.appendChild(totalCell);
        row.appendChild(actionsCell);

        cartItemsContainer.appendChild(row);
    });
}


function updateCartTotals() {
    const subtotalElement = document.getElementById('cart-subtotal');
    const totalElement = document.getElementById('cart-total');

    const totalPrice = cart.getTotalPrice();

    subtotalElement.textContent = totalPrice + 'kr';
    totalElement.textContent = totalPrice + 'kr';
}

function initCartPage() {
    renderCartItems();
    updateCartTotals();

    const clearCartBtn = document.getElementById('clear-cart');
    clearCartBtn.addEventListener('click', () => {
        if (confirm('Är du säker på att du villa tömma varukogen?')) {
            cart.clearCart();
            renderCartItems();
            updateCartTotals();
        }
    });

    const checkoutBtn = document.getElementById('checkout-button');
    checkoutBtn.addEventListener('click', () => {
        window.location.href = 'checkout.html';
    });
}

document.addEventListener('DOMContentLoaded', initCartPage);