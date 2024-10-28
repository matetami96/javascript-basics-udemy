type ProductType = {
	id: string;
	title: string;
	price: number;
};

const productListEl = document.getElementById("product-list") as HTMLUListElement;

const createListElement = (product: ProductType, deleteProductFn: (id: string) => void) => {
	const newListEl = document.createElement("li");
	newListEl.innerHTML = `<h2>${product.title}</h2><p>${product.price}</p>`;
	const prodDeleteButtonEl = document.createElement("button");

	newListEl.id = product.id;
	prodDeleteButtonEl.textContent = "DELETE";
	prodDeleteButtonEl.addEventListener("click", deleteProductFn.bind(null, product.id));

	newListEl.appendChild(prodDeleteButtonEl);

	return newListEl;
};

export function renderProducts(products: ProductType[], deleteProductFn: (id: string) => void) {
	productListEl.innerHTML = "";
	products.forEach((product) => {
		const newListEl = createListElement(product, deleteProductFn);
		productListEl.appendChild(newListEl);
	});
	// const startTime = performance.now();
	// for (let i = 0; i < products.length; i++) {
	// 	const newListEl = createListElement(products[i], deleteProductFn);
	// 	productListEl.appendChild(newListEl);
	// }
	// const endTime = performance.now();
	// console.log(`rendering took ${endTime - startTime} ms`);
}

export const updateProducts = (
	product: ProductType,
	mode: "add" | "delete",
	deleteProductFn?: (id: string) => void
) => {
	if (mode === "add") {
		const newListEl = createListElement(product, deleteProductFn!);
		productListEl.insertAdjacentElement("afterbegin", newListEl);
	} else {
		const productEl = document.getElementById(product.id) as HTMLLIElement;
		productEl.remove();
		// productEl.parentNode!.removeChild(productEl);
	}
};
