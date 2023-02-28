export type Tab = "home" | "edit schedule" | "create event" | "events list" | "account";
export type Format = "once" | "regular";
export type DayOfWeek = "sun" | "mon" | "tue" | "wed" | "thu" | "fri" | "sat";
export type PrivateEvent = {
  id: number,
  isOnce: boolean,
  date: string,
  start: string,
  end: string
}
export type PublicEvent = {
  title: string,
  isOnce: boolean,
  ownerId: number,
  date: string,
  day: DayOfWeek,
  start: string,
  end: string
}