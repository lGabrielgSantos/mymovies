import router from "next/router";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../components/GlobalContext";
import { Header } from "../components/Header";
import { MyFooter } from "../components/MyFooter";
import styles from "./stylesSlug.module.scss"

export default function Genre() {
  const globalContext = useContext<any>(GlobalContext);
  const [results, setResults] = useState<any>();

  useEffect(() => {
    async function getSelectMovie() {
      const all = await globalContext.getMovie(localStorage.getItem('movieId'));
      setResults(all);
      console.log(all);
    }
    getSelectMovie();
  }, []);
  var img = 'https://image.tmdb.org/t/p/w500' + results?.poster_path;
  var imgComp = 'https://image.tmdb.org/t/p/w500' + results?.production_companies[0].logo_path;


  return (
    <>
      <Header />
      <div className={styles.container}>
        <div>
          <h1>{results?.original_title}</h1>
          <div className={styles.contentMovie}>
            <img src={img} />
            <p>{results?.overview}</p>
            <a href={results?.homepage}>View Movie</a>
          </div>
          <h1>Production</h1>
          <div className={styles.production}>
            <img src={imgComp} />
            <h2>{results?.production_companies[0].name}</h2>
          </div>
        </div>
      </div>
      <MyFooter />
    </>
  );
}