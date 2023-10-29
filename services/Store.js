/**
 * The store object
 * @typedef {Object} Store
 * @property {Object} menu - The menu data
 * @property {Array} cart - The cart data
 */
const Store = {
    menu: null,
    cart: [],
}

const proxiedStore = new Proxy(Store, {
    set: function(target, property, value) {
        target[property] = value;
        if(property == "menu") {
            console.log("menu changed");
            const event = new CustomEvent("AppMenuChanged");
            window.dispatchEvent(event);
        }
        if(property == "cart") {
            const event = new CustomEvent("AppCartChanged");
            window.dispatchEvent(event);
        }
        return true;
    }
});

/**
 * This function loads the menu data into the store
 * @async
 * @param {function} getMenuData - The function that fetches the menu data
 * @returns {Promise<void>} - A promise that resolves when the menu data is loaded
 */
export async function loadMenu(getMenuData) {
    app.store.menu = await getMenuData();
}

export default proxiedStore;