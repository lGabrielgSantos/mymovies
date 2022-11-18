import React, { FormEvent, useEffect, useState, useContext } from 'react';
import { Header } from '../components/Header';
import { Highlight } from '../components/Highlight';
import { SelectBox } from '../components/SelectBox';
import { Movie } from '../components/MovieCard';
import styles from './styles.module.scss';
import { useRouter } from 'next/router';
import { GlobalContext } from '../components/GlobalContext';
export default function Home() {
  const [results, setResults] = useState([]);
  const [genre, setGenre] = useState([]);
  const [selectGenre, setSelectGenre] = useState('all');
  const [titlePage, setTitlePage] = useState('Popular Movies');
  const [search, setSearch] = useState('off');
  const [pagination, setPagination] = useState(1);
  const router = useRouter();
  const globalContext = useContext(GlobalContext);
  var searchValue;



  useEffect(() => {

    if (selectGenre === 'all' && search === 'off') {
      async function getAllMovies() {
        const all = await globalContext.getAll(pagination);
        setResults(all);
        setTitlePage('Popular Movies')
      }
      getAllMovies();
    } else if (selectGenre != 'all' && search === 'off') {
      async function getGenerMovies() {
        const all = await globalContext.getGener(selectGenre, pagination);
        setResults(all);

      }
      getGenerMovies();
    } else if (search != 'off') {
      async function getSearchMovie() {
        const all = await globalContext.getSearch(search);
        setResults(all);
        setTitlePage("Results for: " + search);
      }
      getSearchMovie();
    }

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
    setSearch('off');
    const teste = parseInt(event.target[0].value);
    setTitlePage(globalContext.setGenre(teste));
  }
  function searcMovie(event) {
    event.preventDefault();
    setPagination(1);
    setSelectGenre('');
    if (searchValue != undefined && searchValue != "") {
      setSearch(searchValue);
    } else {
      setSelectGenre('all');
      setSearch('off');
    }
    document.getElementById('input').value = ''
  }

  return (
    <>
      <Header />
      <Highlight movies={topMovie} />
      <div>
        {/* <button onClick={() => setPagination(pagination + 1)}>NEXT PAGE</button>
        <button onClick={() => setSelectGenre(14)}>Select genre</button>
        <button onClick={() => setSelectGenre('all')}>Select all</button>
        <button onClick={() => router.push(`/oi`)}>NEXT PAGE</button> */}
        <section className={styles.containerMovies}>
          <div className={styles.selectHeader}>
            <SelectBox geners={genre} fuctionSelect={selectGener} />
            <form onSubmit={searcMovie} className={styles.searchBox}>
              <input
                id="input"
                type="text"
                placeholder="Seach"
                onChange={(event) => {
                  searchValue = event.target.value;
                }}
              />
              <button type="submit">Search</button>
            </form>
          </div>
          <div className={styles.title}>
            <h1>{titlePage}</h1>
          </div>
          <div className={styles.contentMovies}>
            {results.map((result) => {
              return <Movie movie={result} />;
            })}
          </div>

          <div className={styles.pagination}>
            <div>
              {pagination - 1 <= 0 ? <h3>...</h3> : <h3 onClick={() => setPagination(pagination - 1)}>{pagination - 1}</h3>}
              <h3><strong>{pagination}</strong></h3>
              <h3 onClick={() => setPagination(pagination + 1)}>{pagination + 1}</h3>
              <h3 onClick={() => setPagination(pagination + 2)}>{pagination + 2}</h3>
            </div>
            <button onClick={() => setPagination(pagination + 1)}>NEXT PAGE</button>
          </div>
        </section>
      </div>
    </>
  );
}
