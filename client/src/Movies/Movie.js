import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import MovieCard from "./MovieCard";

import { Route, NavLink, useHistory } from 'react-router-dom';

// import UpdateMovie from './UpdateMovie';


function Movie(props) {
  const addToSavedList = props.addToSavedList;
  const { push } = useHistory();

  const [movie, setMovie] = useState(null);
  const params = useParams();

  console.log(props);

  const movieItem = props.movieList.find(
    thing => `${thing.id}` === props.match.params.id
  );

  const handleUpdateMovie = () => {
    // console.log("clicked", item)
    push(`/update-movie/${movieItem.id}`);
  }

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  const handleDeleteMovie = () => {
    axios
      .delete(`http://localhost:5000/api/movies/${movieItem.id}`)
      .then((res) => {
        const updateMovieList = [...props.movieList.filter((value) => {
          return value.id != movieItem.id
        })];
        props.setMovieList(updateMovieList);
        push(`/`);
      })
      .catch((err) => console.log(err.response));
  }

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>

      <button onClick={handleUpdateMovie} className="md-button">
        Update Movie
      </button>

      <button onClick={handleDeleteMovie} className="md-button">
        Delete Movie
      </button>

      {/* <Route path="/update-movie/:id">
        <UpdateMovie setMovieList={props.setMovieList} />
      </Route> */}

    </div>
  );
}

export default Movie;
