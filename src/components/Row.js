import React, { useEffect, useState } from 'react'
import './Row.css';
import axios from '../axios'
import YouTube from 'react-youtube';
// import movieTrailer from 'movie-trailer';

function Row({title, fetchUrl, isLargeRow}) {
    const [movies, setMovies] = useState([]);
    const base_url = 'https://image.tmdb.org/t/p/original/';
    const [trailerUrl, setTrailerUrl] = useState("")

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            // return request;
        }
        fetchData();
    }, [fetchUrl]);

    const opts = {
        height: "390",
        width: "100%",
        playerVars : {
            autoplay: 1
        },
    };

    const handleClick = async (movie) => {
        if (trailerUrl) {
          setTrailerUrl("");
        } else {
          let trailerurl = await axios.get(
            `/movie/${movie.id}/videos?api_key=f591e95509359a630e8338b5180e5561`
          );
          setTrailerUrl(trailerurl.data.results[0]?.key);
        }
      };
    return (
        <div className="row">
            <h2>{title}</h2>
            <div className="row__posters">
                {movies.map((movie) => (
                    <img
                        onClick={() => handleClick(movie)}
                        className={`row__poster ${isLargeRow && "row__posterLarge"}`} 
                        key={movie.id}  
                        src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} 
                        alt={movie.name}
                    />
                ))}
            </div>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts}/>}
        </div>
    )
}

export default Row;
