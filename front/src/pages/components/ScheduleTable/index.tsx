import { DayOfWeek } from "@/types";
import { DaySchedule } from "../DaySchedule";
import styles from "@/pages/components/ScheduleTable/ScheduleTable.module.css"

export const ScheduleTable = () =>{
  const weeks: DayOfWeek[] = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const hours: number[] = new Array<number>(24).fill(0).map((h, i)=>h + i)
  return(
    <div>
      <table className={styles.scheTable} border={1}>
        <thead>
        <tr>
          <th>H
          </th>
          {weeks.map(w=><th>{w}</th>)}
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>
          <div className={styles.hours}>
          {hours.map(h=><div className={styles.hour}>{h}</div>)}
            </div>
          </td>
          {weeks.map(w=><td><DaySchedule dayOfWeek={w} numOfPeople={1}/></td>)}
        </tr>
        </tbody>
      </table>
    </div>
  )
}