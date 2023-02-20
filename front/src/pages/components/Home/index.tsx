import styles from "@/pages/components/Home/Home.module.css"
import { ScheduleTable } from "../ScheduleTable";

export const Home = ()=>{
  return(
    <div>
      <div className={styles.schedule}>
        今週のスケジュール
        <ScheduleTable/>
      </div>
    </div>
  )
}