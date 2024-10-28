"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _ProductList_instances, _ProductList_products, _ProductList_fetchProducts;
class Product {
    constructor(title, imageUrl, price, description) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = description;
    }
}
class ElementAttribute {
    constructor(name, value) {
        this.name = name;
        this.value = value;
    }
}
class Component {
    constructor(hookId, shouldRender = true) {
        this.hookId = hookId;
        this.shouldRender = shouldRender;
        if (shouldRender) {
            this.render();
        }
    }
    render() { }
    createRootElement(tag, cssClasses = "", attributes = []) {
        const rootElement = document.createElement(tag);
        if (cssClasses) {
            rootElement.className = cssClasses;
        }
        if (attributes && attributes.length > 0) {
            for (const attribute of attributes) {
                rootElement.setAttribute(attribute.name, attribute.value);
            }
        }
        document.getElementById(this.hookId).append(rootElement);
        return rootElement;
    }
}
class ShoppingCart extends Component {
    set cartItems(value) {
        this.items = value;
        this.totalOutput.innerHTML = `<h2>Total: \$${this.totalAmount.toFixed(2)}</h2>`;
    }
    get totalAmount() {
        return this.items.reduce((previousValue, currentItem) => previousValue + currentItem.price, 0);
    }
    constructor(hookId) {
        super(hookId, false);
        this.items = [];
        this.orderProducts = () => {
            console.log("Ordering...");
            console.log(this.items);
        };
        this.render();
    }
    addProduct(item) {
        const updatedItems = [...this.items];
        updatedItems.push(item);
        this.cartItems = updatedItems;
    }
    render() {
        const cartElement = this.createRootElement("section", "cart");
        cartElement.innerHTML = `
			<h2>Total: \$${0}</h2>
			<button>Order Now!</button>
		`;
        const orderButton = cartElement.querySelector("button");
        orderButton.addEventListener("click", this.orderProducts);
        this.totalOutput = cartElement.querySelector("h2");
    }
}
class ProductItem extends Component {
    constructor(product, hookId) {
        super(hookId, false);
        this.product = product;
        this.hookId = hookId;
        this.render();
    }
    addToCart() {
        App.addProductToCart(this.product);
    }
    render() {
        const productElement = this.createRootElement("li", "product-item");
        productElement.innerHTML = `
            <div>
                <img src="${this.product.imageUrl}" alt="${this.product.title}" />
                <div class="product-item__content">
                    <h2>${this.product.title}</h2>
                    <h3>\$${this.product.price}</h3>
                    <p>${this.product.description}</p>
                    <button>Add to Cart</button>
                </div>
            </div>
            `;
        const addCartButton = productElement.querySelector("button");
        addCartButton.addEventListener("click", () => this.addToCart());
    }
}
class ProductList extends Component {
    constructor(hookId) {
        super(hookId, false);
        _ProductList_instances.add(this);
        this.hookId = hookId;
        _ProductList_products.set(this, []);
        this.render();
        __classPrivateFieldGet(this, _ProductList_instances, "m", _ProductList_fetchProducts).call(this);
    }
    renderProducts() {
        for (const product of __classPrivateFieldGet(this, _ProductList_products, "f")) {
            new ProductItem(product, "prod-list");
        }
    }
    render() {
        this.createRootElement("ul", "product-list", [new ElementAttribute("id", "prod-list")]);
        if (__classPrivateFieldGet(this, _ProductList_products, "f") && __classPrivateFieldGet(this, _ProductList_products, "f").length > 0) {
            this.renderProducts();
        }
    }
}
_ProductList_products = new WeakMap(), _ProductList_instances = new WeakSet(), _ProductList_fetchProducts = function _ProductList_fetchProducts() {
    __classPrivateFieldSet(this, _ProductList_products, [
        new Product("A Carpet", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdCoKy-jvCGbnkbbh0Fb85udzxysOWvo7b4Q&s", 29.99, "A carpet - it's pretty big!"),
        new Product("A Book", "https://miro.medium.com/v2/resize:fit:5120/1*42ebJizcUtZBNIZPmmMZ5Q.jpeg", 9.99, "The best book!"),
    ], "f");
    this.renderProducts();
};
class Shop {
    constructor() {
        this.render();
    }
    render() {
        this.cart = new ShoppingCart("app");
        new ProductList("app");
    }
}
class App {
    static init() {
        const shop = new Shop();
        this.cart = shop.cart;
    }
    static addProductToCart(product) {
        this.cart.addProduct(product);
    }
}
// calling the init method which is static
App.init();
