class ShoppingCart {
    constructor() {
        this.items = this.loadCart();
    }
    
    loadCart() {
        const cartData = localStorage.getItem('cart');
        return cartData ? JSON.parse(cartData) : [];
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.items));
        this.updateCartCounter();
    }

    getItems() {
        return this.items;
    }

    addItem(product, quantity = 1) {
        const existingItemIndex = this.items.findIndex(item => item.id === product.id);

        if (existingItemIndex !== -1) {
            this.items[existingItemIndex].quantity += quantity;
        } else {
            this.items.push({
                ...product,
                quantity: quantity
            });
        }

        this.saveCart();
        return this.items;
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveCart();
        return this.items;
    }

    updateQuantity(productId, quantity) {
        const itemIndex = this.items.findIndex(item => item.id === productId);

        if (itemIndex !== -1) {
            if (quantity <= 0) {
                return this.removeItem(productId);
            } else {
                this.items[itemIndex].quantity = quantity;
                this.saveCart();
            }
        }
        return this.items;
    }

    clearCart() {
        this.items = [];
        this.saveCart();
        return this.items;
    }

    getTotalQuantity() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    getTotalPrice() {
        return this.items.reduce((total, item) => {
            const price = parseFloat(item.price.toString().replace('kr', '').trim());
            return total + (price * item.quantity);
        }, 0);
    }

    updateCartCounter() {
        const cartCounter = document.getElementById('cart-counter');
        if (cartCounter) {
            const totalQuantity = this.getTotalQuantity();
            cartCounter.textContent = totalQuantity;

            if (totalQuantity > 0) {
                cartCounter.classList.remove('d-none');
            } else {
                cartCounter.classList.add('d-none');
            }
        }
    }
}

const cart = new ShoppingCart();

document.addEventListener('DOMContentLoaded', () => {
    cart.updateCartCounter();
});

export default cart;