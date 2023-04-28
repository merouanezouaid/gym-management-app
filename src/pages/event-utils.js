const eventGuid = 0;
const todayStr = new Date().toISOString().replace(/T.*$/, ""); // YYYY-MM-DD of today

export const INITIAL_EVENTS = [
  {
    id: createEventId(),
    title: "Seance Taekwondo Cadet (Coach Ali Mezouary)",
    daysOfWeek: [0, 4],
    start: todayStr,
    startTime: "10:00:00",
    endTime: "12:00:00",
  },
  {
    id: createEventId(),
    title: "Timed event",
    start: `${todayStr}T12:00:00`,
  },
];

export function createEventId() {
  return String(eventGuid + 1);
}
