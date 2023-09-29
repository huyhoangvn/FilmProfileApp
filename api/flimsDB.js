
const baseLink = 'https://api.themoviedb.org/3'
const apiKey = 'f2cf4dee03036aa9e6fe7b67466e5772'
const movieTrending = `${baseLink}/trending/movie/week?language=vi`;
const movieComings = `${baseLink}/movie/upcoming?language=vi&page=1`
const Authorization = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMmNmNGRlZTAzMDM2YWE5ZTZmZTdiNjc0NjZlNTc3MiIsInN1YiI6IjY1MDFjYjQ5ZGI0ZWQ2MTAzMmE3ZmQ3ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nIqg1lhxpcyV8swV4jmLSPeH-sOFVMPDdoftwcXPtFU';

const callApiMovie = async (link) => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: Authorization
    }
  };
  try {
    const response = await fetch(link, options);
    if(response.ok){
      const result = await response.json();
      return result.results;
    }
  }catch(err){
    console.error('Fetch error:', err);
  }
}
export const getMovieTrending = async () => {
    return callApiMovie(movieTrending)
}

export const getMovieComings = async () => {
    return callApiMovie(movieComings)
}



export const image500 = posterPath=> posterPath? 'https://image.tmdb.org/t/p/w500'+posterPath : null;
export const image185 = posterPath=> posterPath? 'https://image.tmdb.org/t/p/w185'+posterPath : null;
