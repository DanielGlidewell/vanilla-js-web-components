import { fetchProductById } from "./DataAccess.js";

/**
 * This function adds a product to the cart
 * @param {number} id 
 * @returns {Promise<void>} - A promise that resolves when the product is added
 */
export async function addToCart(id) {
    const product = await fetchProductById(id);
    const results = app.store.cart.filter (
        prodInCart => prodInCart.product.id == id
    );
    if (results.length == 1){
        app.store.cart = app.store.cart.map (
            p => p.product.id == id 
                ? { product, quantity: p.quantity + 1 }
                : p
        );
    } else {
        app.store.cart = [...app.store.cart, { product, quantity: 1 }];
    }
}

/**
 * This function removes a product from the cart
 * @param {number} id
 * @returns {void}
 */
export function removeFromCart(id) {
    app.store.cart = app.store.cart.filter (
        p => p.product.id != id
    );
}