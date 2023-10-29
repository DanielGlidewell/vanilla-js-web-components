// Link my Web Components
import { MenuPage } from "../components/MenuPage.js";
import { DetailsPage } from "../components/DetailsPage.js";
import { OrderPage } from "../components/OrderPage.js";
import { ProductItem } from "../components/ProductItem.js";
import { CartItem } from "../components/CartItem.js";

export function registerComponentsWithBrowser(){
    customElements.define("menu-page", MenuPage);
    customElements.define("details-page", DetailsPage);
    customElements.define("order-page", OrderPage);
    customElements.define("product-item", ProductItem);
    customElements.define("cart-item", CartItem);
}