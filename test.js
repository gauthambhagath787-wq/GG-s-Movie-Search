// const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
const url = `https://api.themoviedb.org/3/search/movie?query=salaar`;
let imdbURL = `https://api.themoviedb.org/3/movie/`
const apikey = "&apikey=4ffe0fc5"
const omdbURL = `https://www.omdbapi.com/?i=`
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OTc3YTY1ZTY0YzQwYTdhMzI4ZjU1NTI5MjBiNWNjNCIsIm5iZiI6MTc4MzEyMDM5MC43NjEsInN1YiI6IjZhNDg0MjA2NTZjZDY1MzBkZmVlZjc2NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.m4ggCFUP1tayevCgW_SfALL49OeUvB9eeoXfd-4c_RA'

  }
};

const imdbInfo = async(id) => {
  let imdbID = `${imdbURL}${id}/external_ids`
  let infoImdb = await axios.get(imdbID, options);
  return infoImdb.data.imdb_id
}

const omdbInfo = async (imdbID) => {
  let omdb = `${omdbURL}${imdbID}${apikey}`
  let info = await axios.get(omdb);
  return info
}

const info = async (search_val) => {
  try {
    let rawData = await axios.get(url, options)
    let dataArr = rawData.data.results;
    dataArr.forEach(element => {
      console.log(element);
    });
    for (i of dataArr) {
      let title = i.title
      let movieId = i.id
      let poster = `https://image.tmdb.org/t/p/original/${i.poster_path}`;
      let imdbID = await imdbInfo(movieId);
      if (imdbID != null) {
        let movieInfo = await omdbInfo(imdbID);
        let title = movieInfo.data;
      }
    }
      
  } catch (err) {
    console.log(err);
  }
}
info()

// const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OTc3YTY1ZTY0YzQwYTdhMzI4ZjU1NTI5MjBiNWNjNCIsIm5iZiI6MTc4MzEyMDM5MC43NjEsInN1YiI6IjZhNDg0MjA2NTZjZDY1MzBkZmVlZjc2NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.m4ggCFUP1tayevCgW_SfALL49OeUvB9eeoXfd-4c_RA'
//   }
// };

// fetch(url, options)
//   .then(res => res.json())
//   .then(json => console.log(json))
//   .catch(err => console.error(err));