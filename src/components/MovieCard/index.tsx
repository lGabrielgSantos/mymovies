import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { GlobalContext } from '../GlobalContext';
import styles from '../MovieCard/styles.module.scss';

export function Movie(movie){
  const router = useRouter()
  var img = 'https://image.tmdb.org/t/p/w500' + movie.movie.poster_path;
  const genreContext = useContext<any>(GlobalContext);
  var genre1 = genreContext.setGenre(movie.movie.genre_ids[0]) === undefined ? "" : genreContext.setGenre(movie.movie.genre_ids[0]);
  var genre2 = genreContext.setGenre(movie.movie.genre_ids[1]) === undefined ? "" : genreContext.setGenre(movie.movie.genre_ids[1]);

  var date = genreContext.convertDate(movie.movie.release_date)
  
  function MovieInfo(){
    localStorage.setItem('movieId', movie.movie.id)
    router.push(`/${movie.movie.id}`)
  }
  return(
    <div className={styles.cardMovie} onClick={() => MovieInfo()}>
      <img src={img} />
      <h3>{movie.movie.title}</h3>
      <div>
        <p>{date}</p>
        <p>{genre1}<span> - </span>{genre2}</p>
      </div>
    </div>
  );
}