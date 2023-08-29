const key = process.env.REACT_APP_API_KEY;
const url = "https://api.themoviedb.org/3/";

const requests = {
  requestNetflixOriginals: `${url}discover/tv?&api_key=${key}&with_networks=213`,
  requestUpcoming: `${url}movie/upcoming?api_key=${key}&language=en-US&page=1`,
  requestPopular: `${url}movie/popular?api_key=${key}&language=en-US&page=1`,
  requestTrending: `${url}trending/all/day?api_key=${key}&language=en-US&page=1`,
  requestTopRated: `${url}movie/top_rated?api_key=${key}&language=en-US&page=1`,
  requestComedy: `${url}discover/movie?api_key=${key}&language=en-US&with_genres=35&page=1`,
  requestSpecificMovie: {
    url: `${url}`,
    key: `${key}`,
  },
};

export default requests;
