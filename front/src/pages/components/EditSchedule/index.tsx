import { Dispatch, SetStateAction, useEffect, useState } from "react"
import styles from "@/pages/components/EditSchedule/EditSchedule.module.css"
import { ScheduleTable } from "../ScheduleTable";
import { PrivateEvent } from "@/types";
const test = [1, 2, 3]
export const EditSchedule: React.FC<{
  serverUrl: string,
  reload: boolean,
  setReload: Dispatch<SetStateAction<boolean>>
}> = ({
  serverUrl,
  reload,
  setReload
})=>{
  const today = new Date();
  const [tm, td] = [today.getMonth()+1, today.getDate()]

  const [isOnce, setIsOnce] = useState<boolean>(true);
  const [date, setDate] = useState<string>(today.getFullYear()+"-"+(tm<10?"0"+tm:tm)+"-"+(td<10?"0"+td:td));
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [eventList, setEventList] = useState<PrivateEvent[]>([]);
  const [reflesh, setReflesh] = useState<boolean>(true);
  
  const getEvents = async () => {
    const userId = localStorage.getItem("UserId")
    const requestOptions = {
      method: "GET"
    };
    console.log(serverUrl + "privateEventList/" + userId)
    const response = await fetch(serverUrl + "privateEventList/" + userId, requestOptions);
    if(response.status != 200){
      console.log("Error");
      return;
    }
    const jsonData = await response.json();
    setEventList(jsonData);
    // console.log("eventlist")
    // console.log(eventList);
    setReflesh(re=>!re)
  }
  useEffect(()=>{getEvents()}, [reload])
  //入力データからEventを作成する
  const handleSubmit = async ()=>{
    const userId = localStorage.getItem("UserId");
    const data = {
      title: null,
      isOnce: isOnce,
      ownerId: userId,
      date: date,
      start: startTime,
      end: endTime
    };
    // console.log(data)
    const requestOptions = {
      method: "POST",
      headers:{"Content-Type": "application/json"},
      body: JSON.stringify(data)
    };
    const response = await fetch(serverUrl + "createEvent", requestOptions);
    if(response.status != 200){
      console.log("Error");
      return;
    }
    // const jsonData = await response.json();
    // console.log(jsonData);
    setIsOnce(false);
    setDate("");
    setStartTime("");
    setEndTime("");
    setReload(re=>!re);
  }
  const GetDay = (date: string)=>{
    const d = new Date(date)
    switch(d.getDay()){
    case 0: return "sun"
    case 1: return "mon"
    case 2: return "tue"
    case 3: return "wed"
    case 4: return "thu"
    case 5: return "fri"
    case 6: return "sat"
    }
  }
  //EventIdからEventを削除する
  const handleRemove = async (id: number)=>{
    const requestOptions = {
      method: "DELETE"
    };
    const response = await fetch(serverUrl + "deleteEvent/" + id, requestOptions);
    if(response.status != 200){
      console.log("Error");
      return;
    }
    setReload(re=>!re)
  }
  return(
    <div className={styles.editSche}>
      <div className={styles.info}>
        <div className={styles.title}>Add</div>

        <label className={styles.itemName}>
        <input type="radio" name="format" value="once" checked={isOnce} onChange={e=>setIsOnce(true)}/>
        単発開催
        </label>

        <div className={styles.itemName}>日付</div>
        <div>
        <input className={styles.itemForm} type="date" disabled={!isOnce} value={date} onChange={e=>setDate(e.target.value)}/>
        </div>

        <div className={styles.itemName}>時間帯</div>
        <div>
          <input className={styles.itemForm} type="time" disabled={!isOnce} value={startTime} onChange={e=>setStartTime(e.target.value)}/>
          ~
          <input className={styles.itemForm} type="time" disabled={!isOnce} value={endTime} onChange={e=>setEndTime(e.target.value)}/>
        </div>

        <label className={styles.itemName}>
          <input type="radio" name="format" value="regular" checked={!isOnce} onChange={e=>setIsOnce(false)}/>
          連続開催
        </label>
        <div className={styles.itemName}>曜日</div>
        <select disabled={isOnce} className={styles.itemForm}>
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
            <input className={styles.itemForm} type="time" disabled={isOnce} value={startTime} onChange={e=>setStartTime(e.target.value)}/>
            ~
            <input className={styles.itemForm} type="time" disabled={isOnce} value={endTime} onChange={e=>setEndTime(e.target.value)}/>
        </div>
        <div className={styles.addEvent} onClick={handleSubmit}>+</div>
      </div>
      <div>
        <div className={styles.info}>
          <div className={styles.title}>Remove</div>
          {eventList.map((e, i)=>{return(
            <div className={styles.event} key={i}>
              <div className={styles.eventDay}>{GetDay(e.date)}</div>
              {e.start}~{e.end}
              <div className={styles.removeBtn} onClick={()=>{handleRemove(e.id)}}>-</div>
            </div>
          )})}
        </div>
      </div>
      <div className={styles.schedule}>
        <ScheduleTable serverUrl={serverUrl} reload={reload}/>
      </div>
    </div>
  )
}