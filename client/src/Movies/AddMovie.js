import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
// import MovieCard from "./MovieCard";

const initialMovie = {
    id: null,
    title: "",
    director: "",
    metascore: 0,
    stars: "",
}

function AddMovie(props) {
    const { push } = useHistory();
    const [movie, setMovie] = useState(initialMovie);
    // const [starsString, setStarsString] = useState("");
    // const { id } = useParams();
    const nextId = props.movieList.length;

    // const { id } = props.match.params;
    console.log(props);

    const changeHandler = ev => {
        // ev.persist();
        // let value = ev.target.value;
        // if (ev.target.name === "price") {
        //     value = parseInt(value, 10);
        // }
        setMovie({
            ...movie,
            [ev.target.name]: ev.target.value
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        // make a PUT request to edit the item
        // "/items/:id"
        // console.log(movie);
        const arrayOfStars = movie.stars.split(',');
        // console.log(arrayOfStars);
        // const nextId = props.movieList.length;
        // console.log(arrayOfStars);
        const newMovie = {
            ...movie,
            id: nextId,
            stars: arrayOfStars
        }
        // console.log(newMovie);
        axios
            .post(`http://localhost:5000/api/movies`, newMovie)
            .then((res) => {
                console.log(res);
                // const updateMovieList = [...props.movieList, res.data];
                props.setMovieList(res.data);
                push(`/`);
                
            })
            .catch(err => console.log(err))
    };

    return (
    <div>
        <h2>Add Movie</h2>
            <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="title"
                onChange={changeHandler}
                placeholder="title"
                value={movie.title}
            />
            <div className="baseline" />

            <input
                type="text"
                name="director"
                onChange={changeHandler}
                placeholder="director"
                value={movie.director}
            />
            <div className="baseline" />

            <input
                type="number"
                name="metascore"
                onChange={changeHandler}
                placeholder="metascore"
                value={movie.metascore}
            />
            <div className="baseline" />

            <input
                type="text"
                name="stars"
                onChange={changeHandler}
                placeholder="please separate stars with commas"
                value={movie.stars}
            />
            <div className="baseline" />

            <button className="md-button form-button">Add</button>
        </form>
    </div>
    );

}

export default AddMovie;