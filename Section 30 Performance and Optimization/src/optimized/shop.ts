import { renderProducts } from "./rendering";
import { products } from "./products";

const addProduct = async (event: SubmitEvent) => {
	event.preventDefault();
	const module = await import("./product-management");
	module.addProduct();
};

const deleteProduct = async (id: string) => {
	const module = await import("./product-management");
	module.deleteProduct(id);
};

function initProducts() {
	renderProducts(products, deleteProduct);
}

const addProductForm = document.getElementById("new-product") as HTMLFormElement;

initProducts();

addProductForm.addEventListener("submit", addProduct);
