import { useDateOnDOW, useToDOWFromDate } from "@/Hooks";
import styles from "@/pages/components/Home/Home.module.css"
import { PublicEvent } from "@/types";
import React, { useEffect, useState } from "react";
import { ScheduleTable } from "../ScheduleTable";

export const Home: React.FC<{
  serverUrl: string
}> = ({
  serverUrl
})=>{
  const [eventList, setEventList] = useState<PublicEvent[]>([])
  const getEvents = async ()=>{
    const userId = localStorage.getItem("UserId")
    const requestOptions = {
      method: "GET"
    };
    console.log(serverUrl + "publicEventList/" + userId)
    const response = await fetch(serverUrl + "publicEventList/" + userId, requestOptions);
    if(response.status != 200){
      console.log("Error");
      return;
    }
    const jsonData = await response.json();
    setEventList(jsonData);
  }
  
  useEffect(()=>{getEvents()}, [])
  return(
    <div className={styles.events}>
      <div>
        <div className={styles.schedule}>
          今週のスケジュール
          <ScheduleTable serverUrl={serverUrl} reload={true}/>
        </div>
      </div>
      <div className={styles.titles}>
        <div className={styles.nav}>直近のイベント</div>
        {eventList.map((e, i)=>{return(
          <div className={styles.title}>{e.title}
          <div>{useToDOWFromDate(e.date)} {e.start}~{e.end}</div>
          </div>
        )})}
      </div>
    </div>
  )
}