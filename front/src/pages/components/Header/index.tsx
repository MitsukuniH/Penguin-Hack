import styles from "@/pages/components/Header/Header.module.css"
import { useState } from "react";
import { SignIn } from "../SignIn"
import { SignUp } from "../SignUp";


export const Header = ()=>{
  const [isShowSignIn, setIsShowSignIn] = useState(false);
  const [isShowSignUp, setIsShowSignUp] = useState(false);
  return(
    <header className={styles.header}>
			<h1 className={styles.title}>Penguin-Schedule</h1>
			<h2 className={styles.SIbtn} onClick={()=>setIsShowSignIn(true)}>ログイン</h2>
			<h2 className={styles.SIbtn} onClick={()=>setIsShowSignUp(true)}>新規登録</h2>
      <SignIn isShowModal={isShowSignIn} setIsShowModal={setIsShowSignIn}/>
      <SignUp isShowModal={isShowSignUp} setIsShowModal={setIsShowSignUp}/>
    </header>
  )
}