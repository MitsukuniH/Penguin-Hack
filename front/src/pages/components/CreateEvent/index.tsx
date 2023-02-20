import { useState } from "react"
import styles from "@/pages/components/CreateEvent/CreateEvent.module.css"

export const CreateEvent = ()=>{
  const today = new Date();
  const [tm, td] = [today.getMonth()+1, today.getDate()]

  const [title, setTitle] = useState<string>("");
  const [format, setFormat] = useState<string>("once");
  const [date, setDate] = useState<string>(today.getFullYear()+"-"+(tm<10?"0"+tm:tm)+"-"+(td<10?"0"+td:td));
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [participant, setParticipant] = useState<string>("");
  const [participants, setParticipants] = useState<string[]>([]);
  
  const handleAddParticipant = ()=>{
    if(participant.length < 1) {
      alert("参加者が見つかりません");
      return;
    }
    setParticipants(participants=>[...participants, participant]);
    setParticipant("");
  }
  const handleRemoveParticipant = (name: string)=>{
    const ps: string[] = [];
    participants.map(p=>{
      if(p !== name) ps.push(p);
    })
    setParticipants(ps);
  }
  return(
    <div className={styles.createEvent}>
      <div className={styles.info}>
        <div className={styles.title}>Info</div>
        <div className={styles.itemName}>イベント名</div>
        <input className={styles.itemForm} type="text" value={title} onChange={e=>setTitle(e.target.value)}/>

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
          <div className={styles.pList}>
            <div className={styles.itemName}>参加者</div>
            <div className={styles.participant}>
              <input className={styles.addP} type="text" value={participant} onChange={e=>setParticipant(e.target.value)}/>
              <div onClick={handleAddParticipant} className={styles.managePbtn}>+</div>
            </div>
            {participants.map(p=>{return(
              <div className={styles.participant}>
                {p}
                <div onClick={()=>handleRemoveParticipant(p)} className={styles.managePbtn}>-</div>
              </div>
            )})}
          </div>
        </div>
      </div>
      <div>
        schedule
      </div>
    </div>
  )
}