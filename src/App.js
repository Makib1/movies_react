import React, { useState, useEffect } from "react";


import MovieCard from "./MovieCard";
import SearchIcon from "./search.svg";
import "./App.css";
import axios from "axios";

// eb5bad0e
const API_URL = 'http://www.omdbapi.com?apikey=eb5bad0e';


const App = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [movies, setMovies] = useState([]);  //this is going to give the access of the set movies ,setter function
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        searchMovies('spiderman');
    }, [])
    const searchMovies = async (title) => {
        setLoading(true);

        const response = await axios.get(`${API_URL}&s=${title}`);
        setMovies(response?.data?.Search);
        setLoading(false);
        console.log(response?.data?.Search, "hello");
    };

    return (
        <div className="app">
            <h1>MovieLand</h1>
            <div className="search">

                <input
                    placeholder="search for movies"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img
                    src={SearchIcon}
                    alt="search"
                    onClick={() => searchMovies(searchTerm)
                    }
                />

            </div>
            {loading===true && <div className="loader"></div>}
            {loading!==true && movies?.length>0 && <div className="container">
                {
                    movies?.map((movie,index) => (
                        <MovieCard movie={movie} key={index}/>
                    ))
                }
            </div>}
        </div>
    );
}




export default App;