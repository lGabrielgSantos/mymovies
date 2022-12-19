import styles from '../MyFooter/styles.module.scss';
export function MyFooter() {
    return (
        <footer className={styles.MyFooter}>
            <h3>Developed by Gabriel Santos</h3>
            <h4>Contact: gabrielgsantso.dev@gmail.com</h4>
            <div>
                <a href="https://github.com/lGabrielgSantos">
                    <img src="./github.svg"></img>
                </a>
                <a href="https://www.linkedin.com/in/gabriel-santos-10ba5217a/">
                    <img src="./linkedin.svg"></img>
                </a>
                <a href="https://gsdeveloper.vercel.app">
                    <img src="./globe.svg"></img>
                </a>
            </div>
        </footer>
    )
}