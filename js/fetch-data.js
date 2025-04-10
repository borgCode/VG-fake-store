import {createProducts} from './create-products.js';
import {createCategories} from './create-categories.js';

export async function fetchProducts(productsUrl) {
    try {
        const res = await fetch(productsUrl);
        const productsArray = await res.json();
        createProducts(productsArray);
    } catch (error) {
        console.log('Error fetching products:', error);
    }
}

export async function fetchCategories() {
    try {
        const res = await fetch('http://localhost:8080/api/categories');
        const categoriesArray = await res.json();
        createCategories(categoriesArray);
    } catch (error) {
        console.log('Error fetching products:', error);
    }
}
