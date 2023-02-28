import styles from "@/pages/components/DaySchedule/DaySchedule.module.css"
import { DayOfWeek } from "@/types"
import { useDateOnDOW } from "@/Hooks"
import { useEffect, useState } from "react"

/* testdata */
type Sche = {
  title: string,
  isOnce: boolean,
  ownerId: number,
  date: string,
  day: DayOfWeek,
  start: string,
  end: string
}
/* testdata */

export const DaySchedules: React.FC<{
  dayOfWeek: DayOfWeek,
  numOfPeople: number,
  serverUrl: string,
  reload: boolean,
  userIds: number[]
}> = ({
  dayOfWeek,
  numOfPeople,
  serverUrl,
  reload,
  userIds
})=>{
  const [events, setEvents] = useState<Sche[]>([]);
  const fecthSchedule = async ()=>{
    setEvents([])
    userIds.forEach(async(userId)=>{const date = useDateOnDOW(dayOfWeek)
    const data = {
      ownerId: userId,
      date: date
    };
    // console.log(data)
    const requestOptions = {
      method: "POST",
      headers:{"Content-Type": "application/json"},
      body: JSON.stringify(data)
    };
    const response = await fetch(serverUrl + "eventListOnDate", requestOptions);
    if(response.status != 200){
      console.log("error")
      return;
    }
    const jsonData = await response.json();
    if(jsonData === undefined) return
    const a = [...events, ...jsonData]
    setEvents(a)
    console.log(a)
  })
  }
  useEffect(()=>{fecthSchedule()} ,[reload])
  //開始時間を(0~48)で管理する配列
  const startTimes = events.map((s,i)=>{
    const tStr = s.start.split(":").map(v=>parseInt(v));
    return {time:tStr[0] * 2 + ((tStr[1] < 15)?0:(tStr[1] > 45)?2:1), id:i};
  })
  //終了時間を(0~48)で管理する配列
  const endTimes = events.map(s=>{
    const tStr = s.end.split(":").map(v=>parseInt(v));
    return tStr[0] * 2 + ((tStr[1] < 15)?0:(tStr[1] > 45)?2:1);
  })
  //開始、終了時間に応じて埋めるマスを決定する
  const fillTimes = new Array<{overlap:number, id:number} | null>(48).fill(null).map(()=>({overlap: 0, id: -1}))
  startTimes.map((st, i)=>{
    for(let j = st.time;j <= endTimes[i]; ++j) {
      fillTimes[j].overlap += 1;
      fillTimes[j].id = st.id;
    }
  })
  // //予定の重なりの最大値
  // let maxOverlap = 1;
  // fillTimes.forEach(v=>{maxOverlap = maxOverlap<v.overlap?v.overlap:maxOverlap;})
  let OLRate = (ol:number) => ol/(numOfPeople)
  return(
    <div className={styles.daySche}>
      {fillTimes.map((t, i)=>(
      <div key={i}>{
        t.overlap===0?
        <div className={styles.sell} key={i} style={{backgroundColor:"#fff"}}></div>
        :OLRate(t.overlap)>1?
        <div className={styles.sellSet}>
        <div className={styles.sell} key={i} style={{backgroundColor:"rgb(255,50,50)"}}></div>
        <div className={styles.comment}>予定が被っています</div>
        </div>
        :
        <div className={styles.sellSet}>
        <div className={styles.sell} key={i} style={{backgroundColor:`rgba(70,120,70,${OLRate(t.overlap)})`}}></div>
        <div className={styles.comment}>{events[t.id].start} ~ {events[t.id].end}</div>
        </div>
      }</div>))}
    </div>
  )
}