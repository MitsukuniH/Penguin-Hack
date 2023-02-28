import { useEffect, useState } from "react"

export const Account: React.FC<{
  serverUrl: string
}> = ({
  serverUrl
})=>{
  const [userName, setUserName] = useState<string>("")
  const [friends, setFriends] = useState<string[]>([])
  const [users, setUsers] = useState<string[]>([])

  const getFriends = async ()=>{
    const userId = localStorage.getItem("UserId")
    const requestOptions = {
      method: "GET"
    };
    console.log(serverUrl + "friendList/" + userId)
    const response = await fetch(serverUrl + "friendList/" + userId, requestOptions);
    if(response.status != 200){
      console.log("Error");
      return;
    }
    const jsonData = await response.json();
    setFriends(jsonData);
  }
  useEffect(()=>{getFriends()},[])
  
  const searchUser = async ()=>{
    const requestOptions = {
      method: "GET"
    };
    console.log(serverUrl + "searchUser/" + userName)
    const response = await fetch(serverUrl + "searchUser/" + userName, requestOptions);
    if(response.status != 200){
      console.log("Error");
      return;
    }
    const jsonData = await response.json();
    setUsers(jsonData);
    console.log(jsonData)
  }
  useEffect(()=>{searchUser()}, [userName])
  const registarFriend = async (friendName: string)=>{
    const userId = localStorage.getItem("UserId")
    const friendId = (await (await fetch(serverUrl + "userNames/" + friendName, {method: "GET"})).json()).id;
    const data = {
      userId: userId,
      friendId: friendId
    };
    const requestOptions = {
      method: "POST",
      headers:{"Content-Type": "application/json"},
      body: JSON.stringify(data)
    };
    const response = await fetch(serverUrl + "registarFriend", requestOptions);
    if(response.status != 200){
      return;
    }
    const jsonData = await response.json();
    console.log(jsonData);
  }
  return(
    <div>
      <div>
        <div>フレンド一覧</div>
        {friends.map(f=><div>{f}</div>)}
      </div>
      <div>
        <div>ユーザー検索</div>
        <input value={userName} onChange={e=>setUserName(e.target.value)}/>
        {users.map(f=><div>{f}<div onClick={()=>{registarFriend(f)}}>+</div></div>)}
      </div>
    </div>
    
  )
}