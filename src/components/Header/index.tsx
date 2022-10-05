import React from 'react';
import { useEffect, useState } from 'react';
import styles from '../Header/styles.module.scss';
export function Header() {
  const [statusMenu, setStatusMenu] = useState(true);
  const [scrollM, setScrollMenu] = useState(0);

  useEffect(() => {
    document.body.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  const handleScroll = () => {
    setScrollMenu(document.body.scrollTop);
  };

  function handleOpenMenu() {
    setStatusMenu(!statusMenu);
  }

  return (
    <header
      className={scrollM > 0 ? `${styles.scroll_active}` : styles.content}
    >
      <nav className={styles.jsmenu}>
        <a href="/" className={styles.logo}>
          My Movies
        </a>
        <button onClick={() => handleOpenMenu()}>
          <div
            className={`${styles.mobileMenu} ${
              statusMenu === true ? '' : styles.active
            }`}
          >
            <div className={styles.line1}></div>
            <div className={styles.line2}></div>
            <div className={styles.line3}></div>
          </div>
        </button>
        <ul className={`${styles.navList} ${statusMenu ? styles.active : ''}`}>
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#services">Genre</a>
          </li>
          <li>
            <a href="#projects">Account</a>
          </li>
          <li>
            <a href="#about">Contact</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
