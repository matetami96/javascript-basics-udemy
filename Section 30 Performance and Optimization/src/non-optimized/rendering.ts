type ProductType = {
	id: string;
	title: string;
	price: number;
};

export function renderProducts(products: ProductType[], deleteProductFn: (id: string) => void) {
	const productListEl = document.getElementById("product-list") as HTMLUListElement;
	productListEl.innerHTML = "";

	products.forEach((product) => {
		const newListEl = document.createElement("li");
		const prodTitleEl = document.createElement("h2");
		const prodPriceEl = document.createElement("p");
		const prodDeleteButtonEl = document.createElement("button");

		prodTitleEl.innerHTML = product.title;
		prodPriceEl.innerHTML = product.price.toString();
		prodDeleteButtonEl.innerHTML = "DELETE";

		prodDeleteButtonEl.addEventListener("click", deleteProductFn.bind(null, product.id));

		newListEl.appendChild(prodTitleEl);
		newListEl.appendChild(prodPriceEl);
		newListEl.appendChild(prodDeleteButtonEl);

		productListEl.appendChild(newListEl);
	});
}
