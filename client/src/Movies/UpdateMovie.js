import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
// import MovieCard from "./MovieCard";

const initialMovie = {
    id: "",
    title: "",
    director: "",
    metascore: null,
    stars: []
}


function UpdateMovie(props) {
    const { push } = useHistory();
    const [movie, setMovie] = useState(initialMovie);
    const { id } = useParams();

    // const { id } = props.match.params;
    // console.log(props);

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/movies/${id}`)
            .then((res) => {
                console.log(res.data);
                setMovie(res.data);
            })
            .catch(err => console.log(err))
    }, []);

    const changeHandler = ev => {
        ev.persist();
        let value = ev.target.value;
        if (ev.target.name === "price") {
            value = parseInt(value, 10);
        }
        setMovie({
            ...movie,
            [ev.target.name]: value
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        // make a PUT request to edit the item
        // "/items/:id"
        axios
            .put(`http://localhost:5000/api/movies/${id}`, movie)
            .then((res) => {
                const updateMovieList = [...props.movieList.filter((value) => {
                    return value.id != id
                }), res.data];
                props.setMovieList(updateMovieList);
                push(`/`);
                
            })
            .catch(err => console.log(err))
    };

    return (
    <div>
        <h2>Update Item</h2>
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

        {/* <input
            type="text"
            name="stars"
            onChange={changeHandler}
            placeholder="stars (temp)"
            value={movie.stars}
        />
        <div className="baseline" /> */}

        <button className="md-button form-button">Update</button>
        </form>
    </div>
    );

}

export default UpdateMovie;




// console.log(value.id);
// console.log(value);
// console.log(id);


// console.log(updateMovieList);

                // props.setMovieList([...props.movieList.filter((value) => {
                //     return value.id !== id
                // }), res.data]);
                // console.log(props.movieList);
// props.history.push(`/item-list/${id}`);
                // item

                // console.log(res.data);
                // props.setMovieList([...props.movieList, res.data]);
                // console.log(props.movieList);
                // const updateMovieList = props.movieList.filter((value) => {
                //     console.log(value.id);
                //     console.log(value);
                //     console.log(id);
                //     return value.id != id
                // });

                // [...props.movieList.filter((value) => {
                //     console.log(value.id);
                //     console.log(value);
                //     console.log(id);
                //     return value.id !== id
                // }), res.data];




                


// const [movie, setMovie] = useState(null);
// const params = useParams();

// const fetchMovie = (id) => {
//   axios
//     .get(`http://localhost:5000/api/movies/${id}`)
//     .then((res) => setMovie(res.data))
//     .catch((err) => console.log(err.response));
// };

// const saveMovie = () => {
//   addToSavedList(movie);
// };

// useEffect(() => {
//   fetchMovie(params.id);
// }, [params.id]);

// if (!movie) {
//   return <div>Loading movie information...</div>;
// }

// return (
//   <div className="save-wrapper">
//     <MovieCard movie={movie} />

//     <div className="save-button" onClick={saveMovie}>
//       Save
//     </div>
//   </div>
// );