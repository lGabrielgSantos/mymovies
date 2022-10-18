import React, { FormEvent, useEffect, useState, useContext } from 'react';
import { Header } from '../components/Header';
import { Highlight } from '../components/Highlight';
import { SelectBox } from '../components/SelectBox';
import { Movie } from '../components/MovieCard';
import styles from './styles.module.scss';
import { useRouter } from 'next/router';
export default function Home() {
  const [results, setResults] = useState([]);
  const [genre, setGenre] = useState([]);
  const [selectGenre, setSelectGenre] = useState('all');
  const [search, setSearch] = useState('off');
  const [pagination, setPagination] = useState(1);
  const router = useRouter();
  var searchValue;
  useEffect(() => {
    function getMovies() {
      if (selectGenre === 'all' && search === 'off') {
        fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=eb47659ba7a9220356f6958d4f16e72f&language=en-US&page=${pagination}`,
        )
          .then((response) => response.json())
          .then((data) => setResults(data.results));
      } else if(selectGener != 'all'  && search === 'off') {

        fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=eb47659ba7a9220356f6958d4f16e72f&language=en-US&with_genres=${selectGenre}&page=${pagination}`,
        )
          .then((response) => response.json())
          .then((data) => setResults(data.results));
      }else if(search != 'off') {
        fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=eb47659ba7a9220356f6958d4f16e72f&query=${search}`,
        )
          .then((response) => response.json())
          .then((data) => setResults(data.results));
      }
    }
    getMovies();
    function getGenre() {
      fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=eb47659ba7a9220356f6958d4f16e72f&language=en-US`,
      )
        .then((response) => response.json())
        .then((data) => setGenre(data.genres));
    }
    getGenre();
  }, [pagination, selectGenre, search]);

  var topMovie = {
    title: results[0]?.original_title,
    img: results[0]?.backdrop_path,
    genre: results[0]?.genre_ids,
    date: results[0]?.release_date,
    overview: results[0]?.overview,
    poster: results[0]?.poster_path,
  };

  function selectGener(event) {
    event.preventDefault();
    setPagination(1);
    setSelectGenre(event.target[0].value);
    setSearch('off')

  }
  function searcMovie(event) {
    event.preventDefault();
    setPagination(1);
    setSelectGenre('');
    setSearch(searchValue);
  }

  return (
    <>
      <Header />
      <Highlight movies={topMovie} />
      <div>
        <button onClick={() => setPagination(pagination + 1)}>NEXT PAGE</button>
        <button onClick={() => setSelectGenre(14)}>Select genre</button>
        <button onClick={() => setSelectGenre('all')}>Select all</button>
        <button onClick={() => router.push(`/oi`)}>NEXT PAGE</button>
        <section className={styles.containerMovies}>
          <div className={styles.selectHeader}>
            <SelectBox geners={genre} fuctionSelect={selectGener} />

            <form onSubmit={searcMovie}>
              <input type="text" placeholder="Seach"  onChange={(event) => {
                searchValue = event.target.value;
              }}/>
              <button type="submit">Search</button>
            </form>
          </div>
          <div className={styles.title}>
            <h1>Popular Movies</h1>
          </div>
          <div className={styles.contentMovies}>
            {results.map((result) => {
              return <Movie movie={result} />;
            })}
          </div>
        </section>
      </div>
    </>
  );
}
