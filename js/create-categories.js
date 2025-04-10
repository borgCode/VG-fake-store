export function createCategories(categoriesArray) {
    const dropdownMenu = document.getElementById('dropdownMenu');
    if (!dropdownMenu) return;

    dropdownMenu.innerHTML = '';

    const allProductsItem = document.createElement('li');
    allProductsItem.innerHTML = `<a class="dropdown-item" href="category.html?id=all">All Products</a>`;
    dropdownMenu.appendChild(allProductsItem);

    const divider = document.createElement('li');
    divider.innerHTML = `<hr class="dropdown-divider" />`;
    dropdownMenu.appendChild(divider);

    categoriesArray.forEach((category) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<a class="dropdown-item" href="category.html?id=${category.id}">${category.name}</a>`;
        dropdownMenu.appendChild(listItem);
    });
}
