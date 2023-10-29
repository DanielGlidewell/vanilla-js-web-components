import Store from "./services/Store.js";
import { loadMenu } from "./services/Store.js";
import { fetchMenuData } from "./services/DataAccess.js";
import Router from "./services/Router.js";
import { registerComponentsWithBrowser } from "./services/ComponentRegistry.js";

registerComponentsWithBrowser();

// @ts-ignore
window.app = {};
app.store = Store;
app.router = Router;

// It's better to wait for the event before manipulation
window.addEventListener("DOMContentLoaded", async () => {
    loadMenu(fetchMenuData);
    app.router.init();
});

window.addEventListener("AppCartChanged", () => {
    const badge = document.getElementById("badge");
    const qty = app.store.cart.reduce((acc, item) => acc + item.quantity, 0);
    badge.textContent = qty;
    badge.hidden = qty == 0;
});