import styles from "@/pages/components/Footer/Footer.module.css"

export const Footer = ()=>{
  return(
    <div className={styles.footer}>
      Created by Mitsukuni
      <div className={styles.urls}>
        <div className={styles.url}>github</div>
        <div className={styles.url}>soundcloud</div>
        <div className={styles.url}>youtube</div>
        <div className={styles.url}>twitter</div>
      </div>
    </div>
  )
}