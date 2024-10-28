import { products } from "./products";
import { updateProducts } from "./rendering";

const titleEl = document.getElementById("title") as HTMLInputElement;
const priceEl = document.getElementById("price") as HTMLInputElement;

export function deleteProduct(prodId: string) {
	const deletedProductIndex = products.findIndex((prod) => prod.id === prodId);
	const deletedProduct = products[deletedProductIndex];
	products.splice(deletedProductIndex, 1);
	updateProducts(deletedProduct!, "delete");

	/* const listitemtoDelete = document.getElementById(prodId) as HTMLLIElement;
	const deletedProduct = {
		id: listitemtoDelete.id,
		title: listitemtoDelete.querySelector("h2")!.textContent!,
		price: +listitemtoDelete.querySelector("p")!.textContent!,
	}; */

	/* let deletedProduct: ProductType | null = null;
	const listElements = document.querySelectorAll("li") as NodeListOf<HTMLLIElement>;

	for (const listElement of listElements) {
		if (listElement.id === prodId) {
			deletedProduct = {
				id: listElement.id,
				title: listElement.querySelector("h2")!.textContent!,
				price: +listElement.querySelector("p")!.textContent!,
			};
		}
	} */

	// console.log("calling updateProducts with deletedProduct and prodId", deletedProduct, prodId);
	// updateProducts(deletedProduct!, "delete");
}

export function addProduct() {
	const title = titleEl.value;
	const price = priceEl.value;

	if (title.trim().length === 0 || price.trim().length === 0 || +price < 0) {
		alert("Please enter some valid input values for title and price.");
		return;
	}

	const newProduct = {
		id: new Date().toString(),
		title: title,
		price: +price,
	};

	products.unshift(newProduct);
	updateProducts(newProduct, "add", deleteProduct);
}
