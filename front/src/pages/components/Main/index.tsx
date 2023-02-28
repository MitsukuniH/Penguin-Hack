import { Home }from "@/pages/components/Home"
import { Tab } from "@/types"
import { Account } from "../Account"
import { CreateEvent } from "../CreateEvent"
import { EditSchedule } from "../EditSchedule"
import { EventList } from "../EventList"
import styles from "@/pages/components/Main/Main.module.css"
import { useEffect, useState } from "react"

export const Main: React.FC<{
  curTab: Tab,
  serverUrl: string,
}> = ({
  curTab,
  serverUrl,
})=>{
  const [isSigned, setIsSigned] = useState(false);
  const [scheduleReload, setScheduleReload] = useState<boolean>(true);
  useEffect(()=>{
    const userId = localStorage.getItem("UserId")
    setIsSigned(userId!==null)
  })
  console.log(isSigned)
  return (
    <div>{
      !isSigned?<h1>ログインしてください</h1>:
      curTab==="home"?
        <Home serverUrl={serverUrl}/>:curTab==="edit schedule"?
        <EditSchedule serverUrl={serverUrl} reload={scheduleReload} setReload={setScheduleReload}/>:curTab==="create event"?
        <CreateEvent serverUrl={serverUrl}/>:curTab==="events list"?
        <EventList serverUrl={serverUrl}/>:
        <Account serverUrl={serverUrl}/>
      }
    </div>
  )
}