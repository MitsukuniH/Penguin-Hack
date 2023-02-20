import { Home }from "@/pages/components/Home"
import { Tab } from "@/types"
import { Account } from "../Account"
import { CreateEvent } from "../CreateEvent"
import { EditSchedule } from "../EditSchedule"
import { EventList } from "../EventList"
import styles from "@/pages/components/Main/Main.module.css"

export const Main: React.FC<{
  curTab: Tab
}> = ({
  curTab
})=>{
  
  return (
    <div>{
      curTab==="home"?
        <Home/>:curTab==="edit schedule"?
        <EditSchedule/>:curTab==="create event"?
        <CreateEvent/>:curTab==="events list"?
        <EventList/>:
        <Account/>
      }
    </div>
  )
}