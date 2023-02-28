import styles from "@/pages/components/SignIn/SignIn.module.css"
import { Dispatch, SetStateAction, useState } from "react"

export const SignIn: React.FC<{
  isShowModal: boolean,
  setIsShowModal: Dispatch<SetStateAction<boolean>>,
  serverUrl: string,
}> = ({
  isShowModal,
  setIsShowModal,
  serverUrl,
})=>{
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const handleSubmit = async ()=>{
    const data = {
      name: userName,
      password: password
    };
    const requestOptions = {
      method: "POST",
      headers:{"Content-Type": "application/json"},
      body: JSON.stringify(data)
    };
    const response = await fetch(serverUrl + "signIn", requestOptions);
    if(response.status != 200){
      setError(true);
      return;
    }
    else setError(false)
    const jsonData = await response.json();
    console.log(jsonData);
    localStorage.setItem("UserId", String(jsonData.id));
    localStorage.setItem("UserName", jsonData.name);
    setUserName("");
    setPassword("");
    setIsShowModal(false);
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
          {error?<div className="errorMsg">ユーザー名かパスワードが間違っています</div>:<></>}
          <div className={styles.button} onClick={handleSubmit}>ログイン</div>
          <div className={styles.button} onClick={()=>setIsShowModal(false)}>Close</div>
        </div>
      </div>:<></>}
    </div>
  )
}