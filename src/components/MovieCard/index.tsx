import styles from '../MovieCard/styles.module.scss';

export function Movie(movie){
  var img = 'https://image.tmdb.org/t/p/w500' + movie.movie.poster_path;
  var date = '';
  if(movie.movie.release_date != undefined){
    for(var i = 0; i < 4; i++){
      date = date + Array.from(movie.movie.release_date)[i]
     }
  }
  return(
    <div className={styles.cardMovie}>
      <img src={img} />
      <h3>{movie.movie.title}</h3>
      <div>
        <p>{date}</p>
        <p>{movie.movie.genre_ids[0] + "-"+ movie.movie.genre_ids[1]}</p>
      </div>
    </div>
  );
}