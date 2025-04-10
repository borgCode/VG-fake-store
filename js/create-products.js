import cart from "./cart.js";

export function createProducts(productsArray) {
    productsArray.forEach((product) => {
        const productsGrid = document.getElementById('products-grid');

        const gridColumn = document.createElement('div');
        gridColumn.classList.add('col-6', 'col-md-4', 'col-lg-3');

        const cardElement = document.createElement('div');
        cardElement.classList.add('card', 'card-product');
        const cardProductImage = document.createElement('img');

        cardProductImage.src = product.imageLink || 'default-image.jpg';
        cardProductImage.classList.add('card-img-top');

        cardProductImage.width = 431;
        cardProductImage.height = 647;

        const cardBodyElement = document.createElement('div');
        cardBodyElement.classList.add('card-body');

        const cardBodyTitle = document.createElement('div');
        cardBodyTitle.classList.add('card-title');

        cardBodyTitle.innerHTML = product.name;

        const cardBodyText = document.createElement('div');
        cardBodyText.classList.add('card-text');

        cardBodyText.innerHTML = product.price + 'kr';

        const addToCartBtn = document.createElement('button');
        addToCartBtn.classList.add('btn', 'btn-dark', 'w-100', 'mt-2');
        addToCartBtn.textContent = 'Lägg till i varukorg';

        addToCartBtn.addEventListener('click', (e) => {
            e.preventDefault();
            cart.addItem(product);

            const originalText = addToCartBtn.textContent;
            addToCartBtn.textContent = 'Lagd i varukorg!';
            setTimeout(() => {
                addToCartBtn.textContent = originalText;
            }, 1000);
        });

        cardBodyElement.appendChild(cardBodyTitle);
        cardBodyElement.appendChild(cardBodyText);
        cardBodyElement.appendChild(addToCartBtn);

        cardElement.appendChild(cardProductImage);
        cardElement.appendChild(cardBodyElement);

        gridColumn.appendChild(cardElement);
        productsGrid.appendChild(gridColumn);

    });
}
