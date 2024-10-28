type Movie = {
	id: string;
	title: string;
	image: string;
	rating: number;
};

// Backdrop
const backdrop = document.getElementById("backdrop") as HTMLDivElement;
// Add movie modal
const addMovieModal = document.getElementById("add-modal") as HTMLDivElement;
const startAddMovieButton = document.querySelector("header button") as HTMLButtonElement;
const cancelAddMovieButton = addMovieModal.querySelector(".btn--passive") as HTMLButtonElement;
const confirmAddMoviewButton = cancelAddMovieButton.nextElementSibling as HTMLButtonElement;
const userInputs = addMovieModal.querySelectorAll("input");
// Entry text section
const entryTextSection = document.getElementById("entry-text") as HTMLHeadingElement;
// Movie list
const listRoot = document.getElementById("movie-list") as HTMLUListElement;
// Delete movie modal
const deleteMovieModal = document.getElementById("delete-modal") as HTMLDivElement;

let currentlyActiveModal: "add-modal" | "delete-modal" | null = null;

const movies: Movie[] = [];

const toggleBackdrop = () => {
	backdrop.classList.toggle("visible");
};

const updateUI = () => {
	if (movies.length === 0) {
		entryTextSection.style.display = "block";
	} else {
		entryTextSection.style.display = "none";
	}
};

const closeMovieDeletionModal = () => {
	currentlyActiveModal = null;
	deleteMovieModal.classList.remove("visible");
	toggleBackdrop();
};

const deleteMovieHandler = (movieId: string) => {
	let movieIndex = 0;

	for (const movie of movies) {
		if (movie.id === movieId) {
			break;
		}
		movieIndex++;
	}

	movies.splice(movieIndex, 1);
	listRoot.children[movieIndex].remove();
	// listRoot.removeChild(listRoot.children[movieIndex]);
	closeMovieDeletionModal();
	updateUI();
};

const startDeleteMovieHandler = (movieId: string) => {
	currentlyActiveModal = "delete-modal";
	deleteMovieModal.classList.add("visible");
	toggleBackdrop();
	const cancelDeletionButton = deleteMovieModal.querySelector(".btn--passive") as HTMLButtonElement;
	let confirmDeletionButton = deleteMovieModal.querySelector(".btn--danger") as HTMLButtonElement;

	confirmDeletionButton.replaceWith(confirmDeletionButton.cloneNode(true));
	confirmDeletionButton = deleteMovieModal.querySelector(".btn--danger") as HTMLButtonElement;

	cancelDeletionButton.removeEventListener("click", closeMovieDeletionModal);
	cancelDeletionButton.addEventListener("click", closeMovieDeletionModal);
	confirmDeletionButton.addEventListener("click", deleteMovieHandler.bind(null, movieId));
};

const renderNewMovieElement = (id: string, title: string, imageUrl: string, rating: number) => {
	const newMovieElement = document.createElement("li");
	newMovieElement.className = "movie-element";
	newMovieElement.innerHTML = `
	<div class="movie-element__image">
	  <img
		src="${imageUrl}"
		alt="${title}"
	  />
	</div>
	<div class="movie-element__info">
	  <h2>${title}</h2>
	  <p>${rating}/5 stars</p>
	</div>
	`;
	newMovieElement.addEventListener("click", startDeleteMovieHandler.bind(null, id));
	listRoot.append(newMovieElement);
};

const closeMovieModal = () => {
	currentlyActiveModal = null;
	addMovieModal.classList.remove("visible");
	toggleBackdrop();
};

const showMovieModal = () => {
	currentlyActiveModal = "add-modal";
	addMovieModal.classList.add("visible");
	toggleBackdrop();
};

const clearMovieInput = () => {
	for (const userInput of userInputs) {
		userInput.value = "";
	}
};

const cancelAddMovieHandler = () => {
	closeMovieModal();
	clearMovieInput();
};

const addMovieHandler = () => {
	const titleValue = userInputs[0].value;
	const imageUrlValue = userInputs[1].value;
	const ratingValue = userInputs[2].value;

	if (
		titleValue.trim() === "" ||
		imageUrlValue.trim() === "" ||
		ratingValue.trim() === "" ||
		+ratingValue < 1 ||
		+ratingValue > 5
	) {
		alert("Please enter valid values (rating between 1 and 5).");
		return;
	}

	const newMovie = {
		id: Math.random().toString(),
		title: titleValue,
		image: imageUrlValue,
		rating: +ratingValue,
	};

	movies.push(newMovie);
	console.log(movies);
	closeMovieModal();
	clearMovieInput();
	renderNewMovieElement(newMovie.id, newMovie.title, newMovie.image, newMovie.rating);
	updateUI();
};

const backdropClickHandler = () => {
	if (currentlyActiveModal === "add-modal") {
		closeMovieModal();
		clearMovieInput();
	} else if (currentlyActiveModal === "delete-modal") {
		closeMovieDeletionModal();
	} else return;
};

backdrop.addEventListener("click", backdropClickHandler);
startAddMovieButton.addEventListener("click", showMovieModal);
cancelAddMovieButton.addEventListener("click", cancelAddMovieHandler);
confirmAddMoviewButton.addEventListener("click", addMovieHandler);
