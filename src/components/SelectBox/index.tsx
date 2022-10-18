import styles from '../SelectBox/styles.module.scss';
export function SelectBox(geners, fuctionSelect){
  return(
    <form className={styles.selectBox} onSubmit={geners.fuctionSelect}>
      <select>
            <optgroup>
            <option className={styles.teste}value={"all"}>All</option>
              {geners.geners.map((genr) => {
                return(
                  <option value={genr.id}>{genr.name}</option>
                )
              })}
            </optgroup>
        </select> 
      <input type="submit" value="Submit"></input>
  </form>
  )

}