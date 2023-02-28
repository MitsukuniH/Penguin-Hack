import { DayOfWeek } from "@/types";
import { DaySchedule } from "../DaySchedule";
import styles from "@/pages/components/ScheduleTable/ScheduleTable.module.css"
import React from "react";

export const ScheduleTable: React.FC<{
  serverUrl: string,
  reload: boolean
}> = ({
  serverUrl,
  reload
}) =>{
  const weeks: DayOfWeek[] = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const hours: number[] = new Array<number>(24).fill(0).map((h, i)=>h + i)
  return(
    <div>
      <table className={styles.scheTable} border={1}>
        <thead>
        <tr>
          <th>H
          </th>
          {weeks.map((w, i)=><th key={i}>{w}</th>)}
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>
          <div className={styles.hours}>
          {hours.map((h, i)=><div key={i} className={styles.hour}>{h}</div>)}
            </div>
          </td>
          {weeks.map((w, i)=><td key={i}><DaySchedule dayOfWeek={w} numOfPeople={1} serverUrl={serverUrl} reload={reload}/></td>)}
        </tr>
        </tbody>
      </table>
    </div>
  )
}