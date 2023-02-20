import { useState } from "react"
import styles from "@/pages/components/EditSchedule/EditSchedule.module.css"
import { ScheduleTable } from "../ScheduleTable";

export const EditSchedule = ()=>{
  const today = new Date();
  const [tm, td] = [today.getMonth()+1, today.getDate()]

  const [format, setFormat] = useState<string>("once");
  const [date, setDate] = useState<string>(today.getFullYear()+"-"+(tm<10?"0"+tm:tm)+"-"+(td<10?"0"+td:td));
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  

  return(
    <div className={styles.editSche}>
      <div className={styles.info}>
        <div className={styles.title}>Add</div>

        <label className={styles.itemName}>
        <input type="radio" name="format" value="once" checked={format==="once"} onChange={e=>setFormat(e.target.value)}/>
        単発開催
        </label>

        <div className={styles.itemName}>日付</div>
        <div>
        <input className={styles.itemForm} type="date" disabled={format!=="once"} value={date} onChange={e=>setDate(e.target.value)}/>
        </div>

        <div className={styles.itemName}>時間帯</div>
        <div>
          <input className={styles.itemForm} type="time" disabled={format!=="once"} value={startTime} onChange={e=>setStartTime(e.target.value)}/>
          ~
          <input className={styles.itemForm} type="time" disabled={format!=="once"} value={endTime} onChange={e=>setEndTime(e.target.value)}/>
        </div>

        <label className={styles.itemName}>
          <input type="radio" name="format" value="regular" checked={format==="regular"} onChange={e=>setFormat(e.target.value)}/>
          連続開催
        </label>
        <div className={styles.itemName}>曜日</div>
        <select disabled={format==="once"} className={styles.itemForm}>
          <option value="sun">日曜</option>
          <option value="mon">月曜</option>
          <option value="tue">火曜</option>
          <option value="wed">水曜</option>
          <option value="the">木曜</option>
          <option value="fry">金曜</option>
          <option value="sat">土曜</option>
        </select>

        <div className={styles.itemName}>時間帯</div>
        <div>
            <input className={styles.itemForm} type="time" disabled={format==="once"} value={startTime} onChange={e=>setStartTime(e.target.value)}/>
            ~
            <input className={styles.itemForm} type="time" disabled={format==="once"} value={endTime} onChange={e=>setEndTime(e.target.value)}/>
        </div>
        <div className={styles.addEvent}>+</div>
      </div>
      <div className={styles.info}>
        <div className={styles.title}>Remove</div>


      </div>
      <div className={styles.schedule}>
        <ScheduleTable/>
      </div>
    </div>
  )
}