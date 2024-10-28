// tagged template example
function productDescription(strings, productName, productPrice) {
    console.log(strings);
    console.log(productName);
    console.log(productPrice);
    let priceCategory = "pretty cheap regarding its price";
    if (productPrice > 20) {
        priceCategory = "fairly priced";
    }
    return `${strings[0]}${productName}${strings[1]}${priceCategory}${strings[2]}`;
}
const prodName = "JavaScript course";
const prodPrice = 29.99;
export const productOutput = productDescription `This product (${prodName}) is ${prodPrice}.`;
