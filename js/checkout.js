import cart from './cart.js';
import {validateCheckoutForm} from "./validate-checkout.js";


function displayCheckoutItems() {
    const checkoutItems = document.getElementById('checkout-items');
    const orderTotal = document.getElementById('order-total');
    const cartItems = cart.getItems();


    checkoutItems.innerHTML = '';

    if (cartItems.length === 0) {
        checkoutItems.innerHTML = '<div class="alert alert-info">Varukorgen är tom.</div>';
        return;
    }

    cartItems.forEach(item => {
        const price = parseFloat(item.price.toString().replace('kr', '').trim());
        const totalPrice = price * item.quantity;

        const itemEl = document.createElement('div');
        itemEl.className = 'd-flex justify-content-between align-items-center mb-2 pb-2 border-bottom';

        itemEl.innerHTML = `
      <div>
        <h6 class="mb-0">${item.name}</h6>
        <small class="text-muted">${item.quantity} × ${item.price}</small>
      </div>
      <span>${totalPrice}kr</span>
    `;

        checkoutItems.appendChild(itemEl);
    });

    orderTotal.textContent = cart.getTotalPrice() + 'kr';
}

document.getElementById('submitButton').addEventListener('click', () => {
    if (validateCheckoutForm()) {
        const orderData = {
            items: cart.getItems(),
            total: cart.getTotalPrice(),
            customer: {
                email: document.getElementById('emailInput').value,
                phone: document.getElementById('phoneInput').value,
                firstName: document.getElementById('firstNameInput').value,
                lastName: document.getElementById('lastNameInput').value,
                address: document.getElementById('addressInput').value,
                postalCity: document.getElementById('postalCityInput').value,
                postalCode: document.getElementById('postalCodeInput').value
            }
        };

        localStorage.setItem('orderData', JSON.stringify(orderData));

        cart.clearCart();

        window.location.href = 'order-confirmation.html';
    }
});

document.addEventListener('DOMContentLoaded', displayCheckoutItems);