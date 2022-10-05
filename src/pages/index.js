import React, { FormEvent, useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { Highlight } from '../components/Highlight';
import { Movie } from '../components/MovieCard';
import styles from './styles.module.scss';

export default function Home() {
  const [results, setResults] = useState([]);
  const [pagination, setPagination] = useState(1);
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=chavaeb47659ba7a9220356f6958d4f16e72f&language=en-US&page=${pagination}`,
    )
      .then((response) => response.json())
      .then((data) => setResults(data.results));
  }, [pagination]);

    var topMovie = {
      title: results[0]?.original_title,
      img: results[0]?.backdrop_path,
      genre: results[0]?.genre_ids,
      date: results[0]?.release_date,
      overview: results[0]?.overview,
      poster: results[0]?.poster_path
    }
 
  return (
    <>
      <Header />
      <Highlight movies={topMovie} />
      <div>
      <button onClick={() => setPagination(pagination + 1)}>NEXT PAGE</button>
      <section className={styles.containerMovies}>
      {results.map((result) => {
        return(
          <Movie movie={result}/>

        );
      })}
      </section>
     
      </div>
      
    </>
  );
}
