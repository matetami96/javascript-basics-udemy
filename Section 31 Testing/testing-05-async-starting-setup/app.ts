import { printTitle } from "./util";

const button = document.querySelector("button") as HTMLButtonElement;
button.addEventListener("click", printTitle);
