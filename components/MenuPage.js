export class MenuPage extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({ mode: "open" });
        
        const styles = document.createElement("style");
        this.root.appendChild(styles);

        async function loadCss() {
            const request = await fetch("/components/MenuPage.css");
            const css = await request.text();
            styles.textContent = css;
        }
        loadCss();
    }

    connectedCallback() {
        const template = document.getElementById("menu-page-template");
        // @ts-ignore
        const content = template.content.cloneNode(true);
        this.root.appendChild(content);

        window.addEventListener("AppMenuChanged", this.render.bind(this));
        this.render();
    }

    render() {
        const menu = this.getAndClearMenuElement();
        if(app.store.menu) {
            for (const category of app.store.menu) {
                const liCategory = this.createMenuItemCategory(category);
                menu.appendChild(liCategory);

                category.products.forEach(product => {
                    const item = document.createElement("product-item");
                    item.dataset.product = JSON.stringify(product);
                    liCategory.querySelector("ul").appendChild(item);
                });
            }
        } else {
            menu.innerHTML = "Loading..";
        }
    }

    getAndClearMenuElement() {
        const menu = this.root.querySelector("#menu");
        menu.innerHTML = "";
        return menu;
    }

    createMenuItemCategory(category) {
        const liCategory = document.createElement("li");
        liCategory.innerHTML = `
            <h3>${category.name}</h3>
            <ul class='category'></ul>
        `;
        return liCategory;
    }
}