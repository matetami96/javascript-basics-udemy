"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
const addMovieButton = document.getElementById("add-movie-btn");
const searchButton = document.getElementById("search-btn");
const movies = [];
const renderMovies = (filter = "") => {
    const movieList = document.getElementById("movie-list");
    if (movies.length === 0) {
        movieList.classList.remove("visible");
    }
    else {
        movieList.classList.add("visible");
    }
    movieList.innerHTML = "";
    const filteredMovies = !filter ? movies : movies.filter((movie) => movie.info.title.includes(filter));
    filteredMovies.forEach((movie) => {
        const movieEl = document.createElement("li");
        const { info, getFormattedTitle } = movie, otherProps = __rest(movie, ["info", "getFormattedTitle"]);
        console.log(otherProps);
        // const { title: movieTitle } = info;
        let text = getFormattedTitle.apply(movie) + " - ";
        // executes a function for you when you want to change what "this" refers to
        // let text = getFormattedTitle.call(movie) + " - ";
        // let text = getFormattedTitle.bind(movie)() + " - ";
        // let text = movie.getFormattedTitle() + " - ";
        for (const key in info) {
            if (key !== "title" && key !== "_title") {
                text = text + `${key}: ${info[key]}`;
            }
        }
        movieEl.textContent = text;
        movieList.append(movieEl);
    });
};
const addMovieHandler = () => {
    const title = document.getElementById("title");
    const extraName = document.getElementById("extra-name");
    const extraValue = document.getElementById("extra-value");
    if (extraName.value.trim() === "" || extraValue.value.trim() === "") {
        return;
    }
    const newMovie = {
        info: {
            set title(val) {
                if (val.trim() === "") {
                    this._title = "DEFAULT";
                    return;
                }
                this._title = val;
            },
            get title() {
                return this._title;
            },
            [extraName.value]: extraValue.value,
        },
        id: Math.random().toString(),
        getFormattedTitle() {
            console.log(this);
            // this refers to whatever calls that function
            return this.info.title.toUpperCase();
        },
        // getFormattedTitle: function () {
        // 	// this refers to whatever calls that function
        // 	return this.info.title.toUpperCase();
        // },
    };
    // call setter
    newMovie.info.title = title.value;
    // call getter
    console.log(newMovie.info.title);
    movies.push(newMovie);
    renderMovies();
    title.value = "";
    extraName.value = "";
    extraValue.value = "";
};
const searchMovieHandler = () => {
    const filterTerm = document.getElementById("filter-title").value;
    renderMovies(filterTerm);
};
addMovieButton.addEventListener("click", addMovieHandler);
searchButton.addEventListener("click", searchMovieHandler);
/* const movieList = document.getElementById("movie-list") as HTMLUListElement;
movieList.style["backgroundColor"] = "red";
movieList.style.display = "block";
const userChosenKeyName = "level";
let person: {
    [key: string]: any;
} = {
    "first name": "Tomi",
    age: 27,
    hobbies: ["Gaming", "Reading"],
    [userChosenKeyName]: 1,
    greet: () => console.log(`Hello ${person["first name"]}`),
    1.5: "test",
};
// person.age = 28
// delete person.age; // completely delete the property
// person.age = undefined; // it is there but we dont care
// person.age = null; // reset it
person.isAdmin = true;
// person.greet();
const keyName = "first name";
console.log(person[keyName]);
console.log(person[1.5]);
console.log(person);
 */
