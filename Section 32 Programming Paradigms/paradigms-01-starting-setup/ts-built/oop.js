"use strict";
// class Task {
// 	title: string;
// 	description: string;
// 	dueDate: Date;
// 	priority: number;
// 	isDone: boolean;
// 	constructor(title: string, description: string, dueDate: Date, priority: number, isDone: boolean) {
// 		this.title = title;
// 		this.description = description;
// 		this.dueDate = dueDate;
// 		this.priority = priority;
// 		this.isDone = isDone;
// 	}
// 	editIsDone() {
// 		if (this.isDone == false) {
// 			this.isDone = true;
// 		} else {
// 			this.isDone = false;
// 		}
// 	}
/*
This TypeScript code defines a method editTaskParameter2 that allows updating a specific property of a Task object.

Here's a breakdown:

K extends keyof Omit<Task, "editIsDone" | "editTaskParameter" | "editTaskParameter2">: This line restricts the type K to be a key of the Task type,
excluding the properties editIsDone, editTaskParameter, and editTaskParameter2.
parameter: K and value: Task[K]: The method takes two parameters: parameter of type K (a key of Task) and value of type Task[K]
(the type of the value associated with the parameter key in Task).
(this[parameter] as Task[K]) = value;: This line updates the parameter property of the current Task object with the provided value.
 The type assertion as Task[K] is used to ensure that the types are safe to assign,
 as TypeScript would otherwise throw an error due to the potential for incorrect property access.
 */
// 	// Use type assertion to ensure we can safely assign the value
// 	editTaskParameter2<K extends keyof Omit<Task, "editIsDone" | "editTaskParameter" | "editTaskParameter2">>(
// 		parameter: K,
// 		value: Task[K]
// 	) {
// 		(this[parameter] as Task[K]) = value; // Assert that the types are safe to assign
// 	}
// 	editTaskParameter(updates: Partial<Task>) {
// 		Object.assign(this, updates);
// 	}
// }
// const firstTask = new Task("title", "description", new Date(), 1, false);
// console.log(firstTask);
// firstTask.editTaskParameter2("title", "new title 2");
// firstTask.editTaskParameter2("description", "new description 2");
// firstTask.editTaskParameter({ title: "new title" });
// firstTask.editTaskParameter({ description: "new description" });
// console.log(firstTask);
class Validator {
    static validate(value, flag, validatorValue) {
        if (flag === Validator.REQUIRED) {
            return value.trim().length > 0;
        }
        if (flag === Validator.MIN_LENGTH) {
            return value.trim().length > validatorValue;
        }
    }
}
Validator.REQUIRED = "REQUIRED";
Validator.MIN_LENGTH = "MIN_LENGTH";
class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
    greet() {
        console.log("Hy I am " + this.username);
    }
}
class UserInputForm {
    constructor(form = document.getElementById("user-input"), userNameInput = document.getElementById("username"), passwordInput = document.getElementById("password")) {
        this.form = form;
        this.userNameInput = userNameInput;
        this.passwordInput = passwordInput;
        form.addEventListener("submit", this.signupHandler.bind(this));
    }
    signupHandler(event) {
        event.preventDefault();
        const enteredUserName = this.userNameInput.value;
        const enteredPassword = this.passwordInput.value;
        if (!Validator.validate(enteredUserName, Validator.REQUIRED) ||
            !Validator.validate(enteredPassword, Validator.MIN_LENGTH, 5)) {
            alert("Invalid input, username or password is wrong (password must be at least 6 characters).");
            return;
        }
        const newUser = new User(enteredUserName, enteredPassword);
        console.log(newUser);
        newUser.greet();
    }
}
new UserInputForm();
