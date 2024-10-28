import { addProduct, initProducts } from "./product-management";

/* const addProduct = async (event: SubmitEvent) => {
	const module = await import("./product-management.js");
	module.addProduct(event);
}; */

const addProductForm = document.getElementById("new-product") as HTMLFormElement;

initProducts();

addProductForm.addEventListener("submit", addProduct);
