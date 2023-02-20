import styles from "@/pages/components/Footer/Footer.module.css"

export const Footer = ()=>{
  return(
    <div className={styles.footer}>
      Created by Mitsukuni
      <div className={styles.urls}>
        <a className={styles.url} href="https://github.com/MitsukuniH">github</a>
        <a className={styles.url} href="https://soundcloud.com/pink-ball-imitation">soundcloud</a>
        <a className={styles.url} href="https://www.youtube.com/@user-ly2nq8nt5p">youtube</a>
        <a className={styles.url} href="https://twitter.com/Higashi3292">twitter</a>
      </div>
    </div>
  )
}