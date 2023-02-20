import styles from "@/pages/components/Sidebar/Sidebar.module.css"
import { Tab } from "@/types"
import {Dispatch, SetStateAction} from "react"
import { Footer } from "../Footer"

export const Sidebar: React.FC<{
  curTab: Tab,
  setTab: Dispatch<SetStateAction<Tab>>
}> = ({
  curTab,
  setTab
})=>{
  const handleTab = (tab: Tab)=>{
    if(tab === curTab) return;
    setTab(tab);
  }
  return (
    <div className={styles.sidebar}>
      <div className={styles.nav}>MENU</div>
      <div className={curTab==="home"?styles.currentTab:styles.tabBtn} 
       onClick={()=>handleTab("home")}>ホーム</div>
      <div className={curTab==="edit schedule"?styles.currentTab:styles.tabBtn}
       onClick={()=>handleTab("edit schedule")}>予定の編集</div>
      <div className={curTab==="create event"?styles.currentTab:styles.tabBtn}
       onClick={()=>handleTab("create event")}>イベント作成</div>
      <div className={curTab==="events list"?styles.currentTab:styles.tabBtn}
       onClick={()=>handleTab("events list")}>イベント一覧</div>
      <div className={curTab==="account"?styles.currentTab:styles.tabBtn}
       onClick={()=>handleTab("account")}>アカウント</div>
      <Footer/>
    </div>
  )
}