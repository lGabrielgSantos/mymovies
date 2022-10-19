import React, { createContext, useEffect, useState } from 'react';

export const GlobalContext = createContext({});

export const GlobalProvider = ({ children }) => {
var apiKey = process.env.MOVIES_API_KEY
console.log("key", apiKey)
  function setGenre(id) {
    switch (id) {
      case 28:
        return 'Action';
      case 12:
        return 'Adventure';
      case 16:
        return 'Animation';
      case 35:
        return 'Comedy';
      case 80:
        return 'Crime';
      case 99:
        return 'Documentary';
      case 18:
        return 'Drama';
      case 10751:
        return 'Family';
      case 14:
        return 'Fantasy';
      case 36:
        return 'History';
      case 27:
        return 'Horror';
      case 10402:
        return 'Music';
      case 9648:
        return 'Mystery';
      case 10749:
        return 'Romance';
      case 878:
        return 'Science Fiction';
      case 10770:
        return 'TV Movie';
      case 53:
        return 'Thriller';
      case 10752:
        return 'War';
      case 37:
        return 'Western';
    }
  }
  function convertDate(date) {
    var dateConvert = '';
    if (date != undefined) {
      for (var i = 0; i < 4; i++) {
        dateConvert = dateConvert + Array.from(date)[i];
      }
    }
    return dateConvert;
  }

  async function getAll(pagination) {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=eb47659ba7a9220356f6958d4f16e72f&language=en-US&page=${pagination}`,
    )
      .then((response) => response.json())
    return data.results;
  }
  async function getGener(selectGenre, pagination) {
    const data = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=eb47659ba7a9220356f6958d4f16e72f&language=en-US&with_genres=${selectGenre}&page=${pagination}`,
    )
      .then((response) => response.json())
    return data.results;
  }
  async function getSearch(search) {
    const data = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=eb47659ba7a9220356f6958d4f16e72f&query=${search}`,
    )
      .then((response) => response.json())
    return data.results;
  }

  // function getMovies() {
  //   if (selectGenre === 'all' && search === 'off') {

  //   } else if(selectGener != 'all'  && search === 'off') {

  //     fetch(
  //       `https://api.themoviedb.org/3/discover/movie?api_key=eb47659ba7a9220356f6958d4f16e72f&language=en-US&with_genres=${selectGenre}&page=${pagination}`,
  //     )
  //       .then((response) => response.json())
  //       .then((data) => setResults(data.results));
  //   }else if(search != 'off') {
  //     fetch(
  //       `https://api.themoviedb.org/3/search/movie?api_key=eb47659ba7a9220356f6958d4f16e72f&query=${search}`,
  //     )
  //       .then((response) => response.json())
  //       .then((data) => setResults(data.results));
  //   }
  // }
  return (
    <GlobalContext.Provider value={{ setGenre, convertDate, getAll, getGener, getSearch }}>
      {children}
    </GlobalContext.Provider>
  );
};
