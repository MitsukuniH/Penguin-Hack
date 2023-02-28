import { PublicEvent } from "@/types"
import { useEffect, useState } from "react"
import styles from "@/pages/components/EventList/EventList.module.css"

export const EventList: React.FC<{
  serverUrl: string
}> = ({
  serverUrl
})=>{
  const [eventList, setEventList] = useState<PublicEvent[]>([])
  const [selected, setSelected] = useState<number>(0)
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
      <div className={styles.titles}>
        <div className={styles.nav}>タイトル</div>
        {eventList.map((e, i)=>{return(
          <div className={selected===i?styles.selected:styles.title} onClick={()=>setSelected(i)}>{e.title}</div>
        )})}
      </div>
      <div>
        <div className={styles.nav}>詳細</div>
        {eventList.length===0?"イベントがありません":
        <div>
          <div>{eventList[selected].isOnce?"単発開催":"定期開催"}</div>
          <div>{eventList[selected].date}</div>
          <div>{eventList[selected].start}~{eventList[selected].end}</div>
        </div>}
      </div>
    </div>
  )
}