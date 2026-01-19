import { fetchFromTMDB } from "../services/tmdb.service.js";

const ALLOWED_MOVIE_CATEGORIES = [
  "popular",
  "top_rated",
  "upcoming",
  "now_playing",
];

/**
 * GET TRENDING MOVIE (random one)
 */
export async function getTrendingMovie(req, res) {
  try {
    const data = await fetchFromTMDB(
      "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
    );

    if (!data?.results || data.results.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No trending movies found" });
    }

    const randomIndex = Math.floor(Math.random() * data.results.length);
    const randomMovie = data.results[randomIndex];

    res.json({ success: true, content: randomMovie });
  } catch (error) {
    console.error("getTrendingMovie error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}

/**
 * GET MOVIE TRAILERS
 */
export async function getMovieTrailers(req, res) {
  const { id } = req.params;

  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
    );

    res.json({
      success: true,
      trailers: data?.results ?? [],
    });
  } catch (error) {
    if (error.response?.status === 404) {
      return res.status(404).send(null);
    }

    console.error("getMovieTrailers error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}

/**
 * GET MOVIE DETAILS
 */
export async function getMovieDetails(req, res) {
  const { id } = req.params;

  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
    );

    res.json({ success: true, content: data });
  } catch (error) {
    if (error.response?.status === 404) {
      return res.status(404).send(null);
    }

    console.error("getMovieDetails error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}

/**
 * GET SIMILAR MOVIES
 */
export async function getSimilarMovies(req, res) {
  const { id } = req.params;

  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`,
    );

    res.json({
      success: true,
      similar: data?.results ?? [],
    });
  } catch (error) {
    console.error("getSimilarMovies error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}

/**
 * GET MOVIES BY CATEGORY
 */
export async function getMoviesByCategory(req, res) {
  const { category } = req.params;

  if (!ALLOWED_MOVIE_CATEGORIES.includes(category)) {
    return res.status(400).json({
      success: false,
      message: "Invalid movie category",
    });
  }

  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`,
    );

    res.json({
      success: true,
      content: data?.results ?? [],
    });
  } catch (error) {
    console.error("getMoviesByCategory error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}
