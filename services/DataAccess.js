/**
 * This object contains the urls for the API endpoints
 * @typedef {Object} EndPoints
 * @property {string} Menu - The url for the menu endpoint
 */
const EndPoints = {
    Menu: "/data/menu.json",
}

/**
 * This function returns JSON data from the given url
 * @param {string} url 
 * @returns {Promise<Object>} - A promise that resolves with the JSON data
 */
async function fetchJsonData(url) {
    const result = await fetch(url);
    return await result.json();
}

/**
 * This function returns the menu data
 * @returns {Promise<Object>} - A promise that resolves with the menu data
 */
export async function fetchMenuData() {
    return await fetchJsonData(EndPoints.Menu);
}

/**
 * This function returns a product by its id
 * @param {number|string} id
 * @returns {Promise<Object>} - A promise that resolves with the product
 * or null if the product is not found
 */
export async function fetchProductById(id) {
    if (app.store.menu == null)
        await fetchMenuData();
    
    for (const category of app.store.menu) {
        const product = category.products.find(
            function productIdMatchesId (p) { return p.id == id; }
        );
        
        if (product)
            return product;
    }
    return null;
}