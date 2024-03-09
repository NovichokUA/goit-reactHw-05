import axios from "axios";

// const url = "https://api.themoviedb.org/3/trending/movie/day?language=en-US";
axios.defaults.baseURL = "https://api.themoviedb.org/3";

const options = {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMDkwMTYyZTU2ZjkyYWM0NjZmMzRlN2JkMjNlODRjZSIsInN1YiI6IjY1ZWIzNTU5NzJjMTNlMDE4NWM3ZDc1MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5YfPNqMwLTEY2wmX-iUO4t19KkSUeBrW0YaGogaaTyQ",
    accept: "application/json",
  },
};

export const GetMoviesPopular = async () => {
  const response = await axios.get(
    "/trending/movie/day?language=en-US",
    options
  );

  return response.data.results;
};

export const DetailsMovieById = async (id) => {
  const response = await axios.get(`/movie/${id}?language=en-US`, options);

  return response;
};

export const GetMovieCastById = async (id) => {
  const response = await axios.get(`/movie/${id}/credits`, options);
  return response;
};

export const GetReviewsById = async (id) => {
  const response = await axios.get(`/movie/${id}/reviews`, options);
  return response;
};
