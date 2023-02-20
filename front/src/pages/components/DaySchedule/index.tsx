import styles from "@/pages/components/DaySchedule/DaySchedule.module.css"
import { DayOfWeek } from "@/types"

/* testdata */
type Sche = {
  isOnce: boolean,
  date: string,
  day: DayOfWeek,
  start: string,
  end: string
}
const allSches: Sche[] = [
  {isOnce: true, date: "2026-02-21", day: "tue", start: "16:00", end: "20:30"},
  {isOnce: true, date: "2026-02-21", day: "tue", start: "13:00", end: "18:30"},
  {isOnce: false, date: "2026-02-23", day: "thu", start: "11:46", end: "13:10"},
] 
/* testdata */

export const DaySchedule: React.FC<{
  dayOfWeek: DayOfWeek,
  numOfPeople: number
}> = ({
  dayOfWeek,
  numOfPeople
})=>{
  //その曜日のイベントが入った配列、インデックスをidとする
  const toSche = allSches.filter(s=>s.day===dayOfWeek);
  //開始時間を(0~48)で管理する配列
  const startTimes = toSche.map((s,i)=>{
    const tStr = s.start.split(":").map(v=>parseInt(v));
    return {time:tStr[0] * 2 + ((tStr[1] < 15)?0:(tStr[1] > 45)?2:1), id:i};
  })
  //終了時間を(0~48)で管理する配列
  const endTimes = toSche.map(s=>{
    const tStr = s.end.split(":").map(v=>parseInt(v));
    return tStr[0] * 2 + ((tStr[1] < 15)?0:(tStr[1] > 45)?2:1);
  })
  //開始、終了時間に応じて埋めるマスを決定する
  const fillTimes = new Array<{overlap:number, id:number} | null>(48).fill(null).map(()=>({overlap: 0, id: -1}))
  startTimes.map((st, i)=>{
    for(let j = st.time;j <= endTimes[i]; ++j) {
      fillTimes[j].overlap += 1;
      fillTimes[j].id = st.id;
      console.log(dayOfWeek);
      console.log(j)
      console.log(fillTimes)
    }
  })
  // //予定の重なりの最大値
  // let maxOverlap = 1;
  // fillTimes.forEach(v=>{maxOverlap = maxOverlap<v.overlap?v.overlap:maxOverlap;})
  let OLRate = (ol:number) => ol/(numOfPeople)
  return(
    <div className={styles.daySche}>
      {fillTimes.map((t, i)=>(
      <div>{
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
        <div className={styles.comment}>{toSche[t.id].start} ~ {toSche[t.id].end}</div>
        </div>
      }</div>))}
    </div>
  )
}