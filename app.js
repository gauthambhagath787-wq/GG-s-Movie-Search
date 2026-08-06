const apikey = "&apikey=4ffe0fc5"
const omdbURL = `https://www.omdbapi.com/?i=`
let imdbURL = `https://api.themoviedb.org/3/movie/`
const searchUrl = `https://api.themoviedb.org/3/search/movie?query=`;
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OTc3YTY1ZTY0YzQwYTdhMzI4ZjU1NTI5MjBiNWNjNCIsIm5iZiI6MTc4MzEyMDM5MC43NjEsInN1YiI6IjZhNDg0MjA2NTZjZDY1MzBkZmVlZjc2NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.m4ggCFUP1tayevCgW_SfALL49OeUvB9eeoXfd-4c_RA'

  }
};

const form = document.querySelector("form");
const cover = document.querySelector(".cover");
const info = document.querySelector(".info")
const movieListContainer = document.getElementById('movie-list');
const error = document.getElementById('error');




const omdbInfo = async (imdbID) => {
  let omdb = `${omdbURL}${imdbID}${apikey}`
  let info = await axios.get(omdb);
  return info
}

const getMovieInfo = async (imdb_id) => {
    try {
        let rawData = await omdbInfo(imdb_id);
        let dataArr = rawData.data;
        console.log(dataArr)
        const movies = {
            img: dataArr["Poster"],
            plot: dataArr["Plot"],
            title: dataArr["Title"],
            released: dataArr["Released"],
            runtime: dataArr["Runtime"],
            director: dataArr["Director"],
            writer: dataArr["Writer"],
            actors: dataArr["Actors"],
            language: dataArr["Language"],
            imdbRating: dataArr["imdbRating"]
        }
        const container = document.createElement('div');
        container.className = 'container';
        container.innerHTML = `
            <div class="cover">
                <img src="${movies.img}" alt="${movies.title} poster">
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

const imdbInfo = async(id) => {
  let imdbID = `${imdbURL}${id}/external_ids`
  let infoImdb = await axios.get(imdbID, options);
  return infoImdb.data.imdb_id
}

const getInfo = async () => {
    movieListContainer.innerHTML = "";
    const search = document.querySelector(".search-bar input").value
    try {
        let idUrl = `${searchUrl}${search}`
        // let response = await fetch(idUrl);
        let datainfo = await axios.get(idUrl, options)
        let dataArr = datainfo.data.results;
        dataArr.forEach(async element => {
            let movieId = element.id;
            let imdbId = await imdbInfo(movieId);
            if (imdbId != null) {
                getMovieInfo(imdbId);
            }
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