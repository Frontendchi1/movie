const API_KEY = "ce762116";
const movieContainer = document.getElementById("movie-container");

const backgroundMusic = document.getElementById('backgroundMusic');
const muteButton = document.getElementById('muteButton');

// muzika uchadi
let isMuted = false;

//  mute/unmute qilish
function toggleMute() {
    if (isMuted) {
        backgroundMusic.muted = false;
        muteButton.textContent = 'Mute';
    } else {
        backgroundMusic.muted = true;
        muteButton.textContent = 'Unmute';
    }
    isMuted = !isMuted;
}

//  mute button click qilish
muteButton.addEventListener('click', toggleMute);

// kinolarni izlash input
function clearMovieContainer() {
  movieContainer.innerHTML = "";
}

async function searchMovie() {
  const searchInput = document.getElementById("search-input");
  const movieName = searchInput.value.trim();

  if (!movieName) {
    alert("Please enter a movie name.");
    return;
  }

  clearMovieContainer();

  try {
    await displayMovieCard(movieName);
  } catch (error) {
    console.error("Error fetching movie data:", error.message);
  }

  searchInput.value = "";
}

async function fetchMovieData(movieName) {
  const response = await fetch(
    `http://www.omdbapi.com/?apikey=${API_KEY}&t=${movieName}`
  );
  const data = await response.json();
  return data;
}

async function displayMovieCard(movieName) {
  try {
    const movieData = await fetchMovieData(movieName);
    if (movieData.Response === "False") {
      throw new Error("Movie not found");
    }

    const card = document.createElement("div");
    card.className = "card";

    const posterUrl =
      movieData.Poster !== "N/A" ? movieData.Poster : "placeholder.jpg";

    card.innerHTML = `
      <img src="${posterUrl}" alt="${movieData.Title}">
      <h3>${movieData.Title}</h3>
      <p>Released: ${movieData.Year}</p>
      <p>Director: ${movieData.Director}</p>
      <p>Plot: ${movieData.Plot}</p>
    `;

    movieContainer.appendChild(card);
  } catch (error) {
    console.error("Error fetching movie data:", error.message);
  }
}

// Example usage:
const movieNames = ["Movie 1", "Movie 2", "Movie 3", "Movie 4"]; // Add your movie names here
movieNames.forEach((movieName) => displayMovieCard(movieName));
