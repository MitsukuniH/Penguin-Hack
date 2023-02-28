import { DayOfWeek } from "./types";

export const useDateOnDOW = (dayOfWeek: DayOfWeek) => {
  let today = new Date();
  let this_year = today.getFullYear();
  let this_month = today.getMonth();
  let date = today.getDate();
  let day_num = today.getDay();
  let this_sunday = date - day_num;
  let this_dow;
  switch(dayOfWeek){
    case "sun":
      this_dow = 0
      break
    case "mon":
      this_dow = 1
      break
    case "tue":
      this_dow = 2
      break
    case "wed":
      this_dow = 3
      break
    case "thu":
      this_dow = 4
      break
    case "fri":
      this_dow = 5
      break
    case "sat":
      this_dow = 6
      break
  }
  const toDow = this_sunday + this_dow;
  //月曜日の年月日
  const res = new Date(this_year, this_month, toDow);
  const monthStr = (res.getMonth()+1) < 10 ? "0" + (res.getMonth()+1): String(res.getMonth()+1)
  const dateStr = res.getDate() < 10 ? "0" + res.getDate(): String(res.getDate())
  return res.getFullYear()+"-"+monthStr+"-"+dateStr
}

export const useToDOWFromDate = (date: string) =>{
  switch((new Date(date)).getDay()){
    case 0: return "sun"
    case 1: return "mon"
    case 2: return "tue"
    case 3: return "wed"
    case 4: return "thu"
    case 5: return "fri"
    case 6: return "sat"
  }
}