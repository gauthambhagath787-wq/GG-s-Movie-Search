const BASE_URL = "https://imdb.iamidiotareyoutoo.com/search?q=";
const apikey = "&apikey=4ffe0fc5"
const infoURL = `https://www.omdbapi.com/?i=`

const form = document.querySelector("form");
const cover = document.querySelector(".cover");
const info = document.querySelector(".info")
const movieListContainer = document.getElementById('movie-list');
const error = document.getElementById('error');

const getMovieInfo = async (id, image) => {
    try {
        let url = `${infoURL}${id}${apikey}`
        let response = await fetch(url)
        let data = await response.json()
        const movies = {
            img: data["Poster"],
            plot: data["Plot"],
            title: data["Title"],
            released: data["Released"],
            runtime: data["Runtime"],
            director: data["Director"],
            writer: data["Writer"],
            actors: data["Actors"],
            language: data["Language"],
            imdbRating: data["imdbRating"]
        }
        console.log(image)
        console.log(movies.title)
        const container = document.createElement('div');
        container.className = 'container';
        container.innerHTML = `
            <div class="cover">
                <img src="${image}" alt="${movies.img} Poster">
            </div>
            <div class="info">
                <h2 class="movie-title">${movies.title}</h2>
                
                <div class="meta-tags">
                    <span class="badge">${movies.released ? movies.released.split(' ').pop() : ''}</span>
                    <span class="badge">${movies.runtime}</span>
                    <span class="badge">${movies.language}</span>
                    <span class="badge rating">⭐ ${movies.imdbRating}</span>
                </div>

                <p class="plot">${movies.plot}</p>
                
                <hr class="divider">

                <div class="credits">
                    <p><span class="label">Director(s):</span> ${movies.director}</p>
                    <p><span class="label">Writer:</span> ${movies.writer}</p>
                    <p><span class="label">Actors:</span> ${movies.actors}</p>
                </div>
            </div>
        `;
        movieListContainer.appendChild(container);
    } catch (err) {
        console.log(err);
    }
}
const getInfo = async () => {
    movieListContainer.innerHTML = "";
    const search = document.querySelector(".search-bar input").value
    try {
        let idUrl = `${BASE_URL}${search}`
        let response = await fetch(idUrl);
        let data = await response.json();
        let description = data.description;
        description.forEach(element => {
            let ID = element["#IMDB_ID"]
            let img = element["#IMG_POSTER"]
            getMovieInfo(ID, img)
        });
    } catch (err) {
        console.log(err)
        error.innerText = "Movie Not Found"
    }
}


form.addEventListener("submit", (evt) => {
    evt.preventDefault()
    getInfo()
})