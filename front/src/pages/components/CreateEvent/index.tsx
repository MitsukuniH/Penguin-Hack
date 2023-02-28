import React, { useState } from "react"
import styles from "@/pages/components/CreateEvent/CreateEvent.module.css"
import { ScheduleTable } from "../ScheduleTable";
import { SchedulesTable } from "../SchedulesTable";

export const CreateEvent: React.FC<{
  serverUrl: string
}> = ({
  serverUrl
})=>{
  const today = new Date();
  const [reload, setReload] = useState<boolean>(true);
  const [tm, td] = [today.getMonth()+1, today.getDate()]

  const [title, setTitle] = useState<string>("");
  const [isOnce, setIsOnce] = useState<boolean>(true);
  const [date, setDate] = useState<string>(today.getFullYear()+"-"+(tm<10?"0"+tm:tm)+"-"+(td<10?"0"+td:td));
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [participant, setParticipant] = useState<string>("");
  const [participants, setParticipants] = useState<string[]>([]);
  const [participantIds, setParticipantIds] = useState<number[]>([]);

  
  const handleAddParticipant = async ()=>{
    const requestOptions = {
      method: "GET"
    };
    console.log(serverUrl + "userNames/" + participant)
    const response = await fetch(serverUrl +"userNames/" + participant, requestOptions);
    if(response.status != 200){
      alert("参加者が見つかりません");
      return;
    }
    const jsonData = await response.json();
    console.log(jsonData)
    
    setParticipants(participants=>[...participants, jsonData.name]);
    setParticipantIds(participantIds=>[...participantIds, jsonData.id]);
    setParticipant("");
    setReload(re=>!re)
  }
  const handleRemoveParticipant = (name: string)=>{
    const ps: string[] = [];
    participants.map(p=>{
      if(p !== name) ps.push(p);
    })
    setParticipants(ps);
  }
  const handleSubmit = async () =>{
    const userId = localStorage.getItem("UserId");
    const data = {
      title: title,
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
    setTitle("")
    setIsOnce(true)
    setDate("")
    setStartTime("")
    setEndTime("")
  }
  return(
    <div className={styles.createEvent}>
      <div className={styles.info}>
        <div className={styles.title}>Info</div>
        <div className={styles.createBtn} onClick={handleSubmit}>作成</div>
        <div className={styles.itemName}>イベント名</div>
        <input className={styles.itemForm} type="text" value={title} onChange={e=>setTitle(e.target.value)}/>

        <label className={styles.itemName}>
        <input type="radio" name="isOnce" value="once" checked={isOnce} onChange={e=>setIsOnce(true)}/>
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
          <input type="radio" name="isOnce" value="regular" checked={!isOnce} onChange={e=>setIsOnce(false)}/>
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
        <SchedulesTable serverUrl={serverUrl} reload={reload} userIds={participantIds}/>
      </div>
    </div>
  )
}