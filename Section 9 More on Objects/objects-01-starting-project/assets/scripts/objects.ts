type Movie = {
	info: {
		title: string;
		[key: string]: string;
	};
	id: string;
	getFormattedTitle(): string;
};

const addMovieButton = document.getElementById("add-movie-btn") as HTMLButtonElement;
const searchButton = document.getElementById("search-btn") as HTMLButtonElement;

const movies: Movie[] = [];

const renderMovies = (filter: string = "") => {
	const movieList = document.getElementById("movie-list") as HTMLUListElement;

	if (movies.length === 0) {
		movieList.classList.remove("visible");
	} else {
		movieList.classList.add("visible");
	}

	movieList.innerHTML = "";

	const filteredMovies = !filter ? movies : movies.filter((movie) => movie.info.title.includes(filter));

	filteredMovies.forEach((movie) => {
		const movieEl = document.createElement("li");
		const { info, getFormattedTitle, ...otherProps } = movie;
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
	const title = document.getElementById("title") as HTMLInputElement;
	const extraName = document.getElementById("extra-name") as HTMLInputElement;
	const extraValue = document.getElementById("extra-value") as HTMLInputElement;

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
			get title(): string {
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
	const filterTerm = (document.getElementById("filter-title") as HTMLInputElement).value;
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
