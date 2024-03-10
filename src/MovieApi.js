import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3";

const options = {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMDkwMTYyZTU2ZjkyYWM0NjZmMzRlN2JkMjNlODRjZSIsInN1YiI6IjY1ZWIzNTU5NzJjMTNlMDE4NWM3ZDc1MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5YfPNqMwLTEY2wmX-iUO4t19KkSUeBrW0YaGogaaTyQ",
    accept: "application/json",
  },
};

export const GetMoviesPopular = async (page) => {
  const response = await axios.get("/trending/movie/day?language=en-US", {
    params: {
      page,
    },
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMDkwMTYyZTU2ZjkyYWM0NjZmMzRlN2JkMjNlODRjZSIsInN1YiI6IjY1ZWIzNTU5NzJjMTNlMDE4NWM3ZDc1MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5YfPNqMwLTEY2wmX-iUO4t19KkSUeBrW0YaGogaaTyQ",
      accept: "application/json",
    },
  });

  return response.data;
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

export const searchMovie = async (value, page) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/search/movie`,
    {
      params: {
        query: value,
        page,
      },
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMDkwMTYyZTU2ZjkyYWM0NjZmMzRlN2JkMjNlODRjZSIsInN1YiI6IjY1ZWIzNTU5NzJjMTNlMDE4NWM3ZDc1MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5YfPNqMwLTEY2wmX-iUO4t19KkSUeBrW0YaGogaaTyQ",
        accept: "application/json",
      },
    }
  );
  return response;
};
