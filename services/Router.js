/**
 * Client-side router
 * @typedef {Object} Router
 * @property {function} init - Initialize the router and set up the event listener
 * @property {function} go - Navigate to a route
 */
const Router = {
    /**
     * Initialize the router and set up the event listener
     * @returns {void}
     */
    init: function init() {
        document.querySelectorAll("a.navlink").forEach(useRouterInsteadOfDefault);
        window.addEventListener("popstate", (e) => {
            const route = e.state.route;
            Router.go(route, false);
        });

        app.router.go(location.pathname);
    },
    /**
     * Navigate to a route
     * @param {string} route 
     * @param {boolean} addToHistory 
     */
    go: function go(route, addToHistory = true) {
        console.log("Going to ", route);

        const state = { route };
        if(addToHistory) {
            history.pushState(state, "", route);
        }

        /** @type {HTMLElement} */
        let content = getContentByRoute(route);
        if(!content) {
            content = createH1WithText("404 - Page not found");
        }
        renderMain(content);
    }
}

/**
 * Use the router instead of the default behavior
 * @param {HTMLAnchorElement} link
 * @returns {void}
 */
function useRouterInsteadOfDefault(link) {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        const url = link.getAttribute("href");
        Router.go(url);
    });
}

/**
 * Get the content for a route - the brains of the router
 * @param {string} route
 * @returns {HTMLElement}
 */
function getContentByRoute(route) {
    /** @type {HTMLElement} */
    let content = null;

    switch(route) {
        case "/":
            content = document.createElement("menu-page");
            break;
        case "/order":
            content = document.createElement("order-page");
            break;
        default:
            if (route.startsWith("/product-")) {
                content = document.createElement("details-page");
                const paramId = route.substring(route.lastIndexOf("-") + 1);
                content.dataset.id = paramId;
            }
    }

    return content;
}

/**
 * Create an h1 element with the given text
 * @param {string} text
 * @returns {HTMLHeadingElement}
 */
function createH1WithText(text) {
    const h1 = document.createElement("h1");
    h1.textContent = text;
    return h1;
}

/**
 * Render the content inside the main element
 * @param {HTMLElement} content
 * @returns {void}
 */
function renderMain(content) {
    const mainElement = document.querySelector("main");
    render(mainElement, content);
}

/**
 * Render the content inside the target element
 * @param {HTMLElement} target
 * @param {HTMLElement} content
 * @returns {void}
 */
function render(target, content) {
    target.innerHTML = "";
    target.appendChild(content);
    window.scrollTo(0, 0);
}

export default Router;