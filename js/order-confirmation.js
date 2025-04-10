function displayOrderConfirmation() {

    const orderData = JSON.parse(localStorage.getItem('orderData'));

    if (!orderData) {

        window.location.href = 'index.html';
        return;
    }

    const orderItemsContainer = document.getElementById('order-items');
    orderItemsContainer.innerHTML = '';

    orderData.items.forEach(item => {
        const price = parseFloat(item.price.toString().replace('kr', '').trim());
        const totalPrice = price * item.quantity;

        const itemRow = document.createElement('div');
        itemRow.className = 'row mb-3';

        const detailsCol = document.createElement('div');
        detailsCol.className = 'col-8';
        detailsCol.innerHTML = `
      <p class="mb-0">${item.name}</p>
      <small class="text-muted">Quantity: ${item.quantity}</small>
    `;

        const priceCol = document.createElement('div');
        priceCol.className = 'col-4 text-end';
        priceCol.innerHTML = `<p>${totalPrice}kr</p>`;

        itemRow.appendChild(detailsCol);
        itemRow.appendChild(priceCol);
        orderItemsContainer.appendChild(itemRow);
    });

    document.getElementById('order-total').textContent = orderData.total + 'kr';

    if (orderData.customer) {
        const customerInfo = document.getElementById('customer-info');

        customerInfo.innerHTML = `
      <p><strong>${orderData.customer.firstName} ${orderData.customer.lastName}</strong></p>
      <p>${orderData.customer.address}</p>
      <p>${orderData.customer.postalCode} ${orderData.customer.postalCity}</p>
      <p>Email: ${orderData.customer.email}</p>
      <p>Phone: ${orderData.customer.phone}</p>
    `;
    }

    if (orderData.customer && orderData.customer.firstName) {
        document.getElementById('complete-message').textContent =
            `Tack för din beställning, ${orderData.customer.firstName}!`;
    }
}


document.addEventListener('DOMContentLoaded', displayOrderConfirmation);