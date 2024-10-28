"use strict";
class User {
    /* name: string;
    private age: number;
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    } */
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    print() {
        console.log(this.name);
    }
}
class Admin extends User {
    constructor(name, age, permissions) {
        super(name, age);
        this.permissions = permissions;
    }
}
const user = new User("Tomi", 28);
console.log(user.name);
const input1 = document.getElementById("num1");
const input2 = document.getElementById("num2");
const button = document.querySelector("button");
function add(a, b) {
    return a + b;
}
var OutputMode;
(function (OutputMode) {
    OutputMode[OutputMode["CONSOLE"] = 0] = "CONSOLE";
    OutputMode[OutputMode["ALERT"] = 1] = "ALERT";
})(OutputMode || (OutputMode = {}));
const printResult = (result, printMode = OutputMode.CONSOLE) => () => {
    if (printMode === OutputMode.CONSOLE) {
        console.log("Result: " + result);
    }
    else if (printMode === OutputMode.ALERT) {
        alert("Result: " + result);
    }
};
const result = add(5, 3);
let isDone = false;
const results = [];
const names = ["Max", "Anna"];
button.addEventListener("click", () => {
    const resultContainer = {
        res: add(+input1.value, +input2.value),
        print() {
            console.log(this.res);
        },
    };
    results.push(resultContainer);
    // results.push(5);
    printResult(resultContainer.res)();
});
