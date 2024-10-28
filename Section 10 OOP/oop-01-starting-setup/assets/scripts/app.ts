class Product {
	constructor(public title: string, public imageUrl: string, public price: number, public description: string) {}
}

class ElementAttribute {
	constructor(public name: string, public value: string) {}
}

class Component {
	constructor(public hookId: string, public shouldRender = true) {
		if (shouldRender) {
			this.render();
		}
	}

	render() {}

	createRootElement(tag: string, cssClasses: string = "", attributes: ElementAttribute[] = []) {
		const rootElement = document.createElement(tag);

		if (cssClasses) {
			rootElement.className = cssClasses;
		}

		if (attributes && attributes.length > 0) {
			for (const attribute of attributes) {
				rootElement.setAttribute(attribute.name, attribute.value);
			}
		}

		document.getElementById(this.hookId)!.append(rootElement);

		return rootElement;
	}
}

class ShoppingCart extends Component {
	items: Product[] = [];
	totalOutput!: HTMLElement;
	orderProducts: () => void;

	set cartItems(value: Product[]) {
		this.items = value;
		this.totalOutput.innerHTML = `<h2>Total: \$${this.totalAmount.toFixed(2)}</h2>`;
	}

	get totalAmount() {
		return this.items.reduce((previousValue, currentItem) => previousValue + currentItem.price, 0);
	}

	constructor(hookId: string) {
		super(hookId, false);
		this.orderProducts = () => {
			console.log("Ordering...");
			console.log(this.items);
		};
		this.render();
	}

	addProduct(item: Product) {
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
		const orderButton = cartElement.querySelector("button") as HTMLButtonElement;
		orderButton.addEventListener("click", this.orderProducts);
		this.totalOutput = cartElement.querySelector("h2")!;
	}
}

class ProductItem extends Component {
	constructor(public product: Product, public hookId: string) {
		super(hookId, false);
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
		const addCartButton = productElement.querySelector("button")! as HTMLButtonElement;
		addCartButton.addEventListener("click", () => this.addToCart());
	}
}

class ProductList extends Component {
	#products: Product[] = [];

	constructor(public hookId: string) {
		super(hookId, false);
		this.render();
		this.#fetchProducts();
	}

	#fetchProducts() {
		this.#products = [
			new Product(
				"A Carpet",
				"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdCoKy-jvCGbnkbbh0Fb85udzxysOWvo7b4Q&s",
				29.99,
				"A carpet - it's pretty big!"
			),
			new Product(
				"A Book",
				"https://miro.medium.com/v2/resize:fit:5120/1*42ebJizcUtZBNIZPmmMZ5Q.jpeg",
				9.99,
				"The best book!"
			),
		];

		this.renderProducts();
	}

	renderProducts() {
		for (const product of this.#products) {
			new ProductItem(product, "prod-list");
		}
	}

	render() {
		this.createRootElement("ul", "product-list", [new ElementAttribute("id", "prod-list")]);

		if (this.#products && this.#products.length > 0) {
			this.renderProducts();
		}
	}
}

class Shop {
	cart!: ShoppingCart;

	constructor() {
		this.render();
	}

	render() {
		this.cart = new ShoppingCart("app");
		new ProductList("app");
	}
}

class App {
	static cart: ShoppingCart;
	static init() {
		const shop = new Shop();
		this.cart = shop.cart;
	}

	static addProductToCart(product: Product) {
		this.cart.addProduct(product);
	}
}

// calling the init method which is static
App.init();
