async function getMovies() {
    try {
        const searchTerm = document.getElementById("search").value
        console.log(searchTerm)
        const url = "https://www.omdbapi.com/?apikey=85ab060e&s=" + searchTerm;

        const response = await fetch(url);
        const json = await response.json();

        console.log(json);

        const movieHolder = document.getElementById("movieHolder");

        movieHolder.innerHTML = "";

        if (json.Response === "False") {
            movieHolder.textContent = json.Error;
            return;
        }

        for (const movie of json.Search) {
            const divContainer = document.createElement("div");
            divContainer.classList.add("card");

            const img = document.createElement("img");
            img.src = movie.Poster;
            img.alt = movie.Title;
            img.width = 100;

            const card = document.createElement("div");
            card.classList.add("container");

            const titleHeader = document.createElement("h3");
            titleHeader.textContent = movie.Title + ": " + movie.Year;

            card.appendChild(titleHeader);
            divContainer.appendChild(img);
            divContainer.appendChild(card);

            movieHolder.appendChild(divContainer);
        }
    } catch (error) {
        console.log("Error fetching movies:", error);
    }
}