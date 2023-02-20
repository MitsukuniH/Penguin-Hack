import styles from "@/pages/components/SignIn/SignIn.module.css"
import { Dispatch, SetStateAction, useState } from "react"

export const SignIn: React.FC<{
  isShowModal: boolean,
  setIsShowModal: Dispatch<SetStateAction<boolean>>
}> = ({
  isShowModal,
  setIsShowModal
})=>{
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = ()=>{
    console.log(userName + ":" + password);
    setUserName("")
    setPassword("")
    setIsShowModal(false)
  }
  return(
    <div>
      {isShowModal?
      <div className={styles.overlay}>
        <div className={styles.modal}>
          <div className={styles.title}>ユーザ名</div>
          <input className={styles.form} type="text" defaultValue="ユーザ名" value={userName} onChange={e=>setUserName(e.target.value)}/>
          <div className={styles.title}>パスワード</div>
          <input className={styles.form} type="password" value={password} onChange={e=>setPassword(e.target.value)}/>
          <div className={styles.button} onClick={handleSubmit}>ログイン</div>
          <div className={styles.button} onClick={()=>setIsShowModal(false)}>Close</div>
        </div>
      </div>:<></>}
    </div>
  )
}