import styles from "@/pages/components/Header/Header.module.css"
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { SignIn } from "../SignIn"
import { SignUp } from "../SignUp";


export const Header :React.FC<{
  serverUrl: string,
}> = ({
  serverUrl,
})=>{
  const [isShowSignIn, setIsShowSignIn] = useState(false);
  const [isShowSignUp, setIsShowSignUp] = useState(false);
  const [isSigned, setIsSigned] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(()=>{
    const un = localStorage.getItem("UserName")
    if(un !== null){
      setIsSigned(true);
      setUserName(un)
      return;
    }
    setIsSigned(false);
  }, [isShowSignIn, isShowSignUp, isSigned])

  const SignOut = ()=>{
    setIsSigned(false);
    localStorage.clear();
  }
  
  return(
    <header className={styles.header}>
			<h1 className={styles.title}>Penguin-Schedule</h1>
			{!isSigned?
        <h2 className={styles.SIbtn} onClick={()=>setIsShowSignIn(true)}>ログイン</h2>:
        <h2>{userName}</h2>
      }
			{!isSigned?
        <h2 className={styles.SIbtn} onClick={()=>setIsShowSignUp(true)}>新規登録</h2>:
        <h2 className={styles.SIbtn} onClick={SignOut}>ログアウト</h2>
      }
      <SignIn isShowModal={isShowSignIn} setIsShowModal={setIsShowSignIn} serverUrl={serverUrl}/>
      <SignUp isShowModal={isShowSignUp} setIsShowModal={setIsShowSignUp} serverUrl={serverUrl}/>
    </header>
  )
}