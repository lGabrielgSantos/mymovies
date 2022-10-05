import styles from '../Highlight/styles.module.scss';

interface IMovie {
  movies: {
    title: string;
    img: string;
    genre: [];
    date: string;
    overview: string;
    poster: string;
  }
  
}
export function Highlight(movies: IMovie) {
  var img = 'https://image.tmdb.org/t/p/w500' + movies.movies.img;
  var poster = 'https://image.tmdb.org/t/p/w500' + movies.movies.poster;
  var date = '';
  if(movies.movies.date != undefined){
    for(var i = 0; i < 4; i++){
      date = date + Array.from(movies.movies.date)[i]
     }
  }
 
  return (
    <section className={styles.container}>
      <img className={styles.imgBack}src={img} />

      <div className={styles.content}>
        <img src={poster} />
        <div>
          <h3>{date}</h3>
          <h1>{movies.movies.title}</h1>
          <p>{movies.movies.overview}</p>
        </div>
      </div>
      
    </section>
  );
}