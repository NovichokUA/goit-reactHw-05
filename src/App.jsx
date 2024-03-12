import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";

import { Toaster } from "react-hot-toast";
import { Spiner } from "./Components/Spiner/Spiner";

import "./App.css";

const HomePages = lazy(() => import(`./pages/HomePage/HomePage`));
const MoviesPage = lazy(() => import("./pages/MoviesPage/MoviesPage"));
const Navigation = lazy(() => import("./Components/Navigation/Navigation"));
const MovieDetailsPage = lazy(() =>
  import("./pages/MovieDetailsPage/MovieDetailsPage")
);
const MovieCast = lazy(() => import("./Components/MovieCast/MovieCast"));
const MovieReviews = lazy(() =>
  import("./Components/MovieReviews/MovieReviews")
);

function App() {
  return (
    <>
      <Navigation />
      <Suspense fallback={<Spiner />}>
        <Routes>
          <Route path="/" element={<HomePages />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
        </Routes>
      </Suspense>
      <Toaster />
    </>
  );
}

export default App;
