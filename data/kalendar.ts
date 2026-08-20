export type KalendarTag = "day" | "deadline" | "holiday" | "range" | "extend";

export type KalendarEvent = {
  label: string;
  tag: KalendarTag;
  start: string;
  end?: string;
  waktu?: string;
  unlockDate?: string;
};

function toMs(s: string) {
  return new Date(s + "T00:00:00").getTime();
}


export function isUnlocked(ev: KalendarEvent, nowMs: number): boolean {
  if (!ev.unlockDate) return true;
  return nowMs >= toMs(ev.unlockDate);
}

export function eventsForDate(dateMs: number, events: KalendarEvent[], nowMs: number) {
  return events.filter((ev) => {
    if (!isUnlocked(ev, nowMs)) return false;
    const s = toMs(ev.start);
    const e = ev.end ? toMs(ev.end) : s;
    return dateMs >= s && dateMs <= e;
  });
}

export function eventsForDateAll(dateMs: number, events: KalendarEvent[]) {
  return events.filter((ev) => {
    const s = toMs(ev.start);
    const e = ev.end ? toMs(ev.end) : s;
    return dateMs >= s && dateMs <= e;
  });
}

export function hasLockedEvents(dateMs: number, events: KalendarEvent[], nowMs: number): boolean {
  return eventsForDateAll(dateMs, events).some((ev) => !isUnlocked(ev, nowMs));
}

export function nextUnlockDate(events: KalendarEvent[], nowMs: number): string | null {
  let earliest: string | null = null;
  for (const ev of events) {
    if (!ev.unlockDate) continue;
    if (isUnlocked(ev, nowMs)) continue;
    if (!earliest || ev.unlockDate < earliest) earliest = ev.unlockDate;
  }
  return earliest;
}

const U0 = undefined;
const U1 = "2026-08-30";
const U2 = "2026-09-06";
const U3 = "2026-09-13";
const U4 = "2026-09-20";
const U5 = "2026-09-27";
const U6 = "2026-10-04";

export const KALENDER_EVENTS: KalendarEvent[] = [
  { label: "Indonesian Independence Day", tag: "holiday", start: "2026-08-17", unlockDate: U0 },
  { label: "Maulid Nabi Muhammad", tag: "holiday", start: "2026-08-25", unlockDate: U0 },
  { label: "DAY 1 - MABIM FTUI 2026", tag: "day", start: "2026-08-29", waktu: "06:00 WIB", unlockDate: U0 },

  { label: "PENUGASAN HI", tag: "range", start: "2026-08-31", end: "2026-09-04", unlockDate: U1 },
  { label: "PENGUMPULAN TUGAS HI", tag: "deadline", start: "2026-09-04", waktu: "00:00 WIB", unlockDate: U1 },
  { label: "DAY 2 - MABIM FTUI 2026", tag: "day", start: "2026-09-05", waktu: "06:00 WIB", unlockDate: U1 },
  { label: "PENGUMPULAN TUGAS", tag: "deadline", start: "2026-09-05", waktu: "08:00 WIB", unlockDate: U1 },

  { label: "EXTEND PENUGASAN HI", tag: "extend", start: "2026-09-06", end: "2026-09-11", unlockDate: U2 },
  { label: "PENUGASAN AKSIOMA (TWTW Non Mahasiswa)", tag: "range", start: "2026-09-07", end: "2026-09-12", unlockDate: U2 },
  { label: "PENGUMPULAN TUGAS HI", tag: "deadline", start: "2026-09-11", waktu: "06:00 WIB", unlockDate: U2 },
  { label: "TUGAS HI (BINGO ESKAPADE)", tag: "deadline", start: "2026-09-11", waktu: "06:00 WIB", unlockDate: U2 },
  { label: "DAY 3 - MABIM FTUI 2026", tag: "day", start: "2026-09-12", waktu: "06:00 WIB", unlockDate: U2 },
  { label: "PENGUMPULAN TUGAS", tag: "deadline", start: "2026-09-12", waktu: "08:00 WIB", unlockDate: U2 },

  { label: "PENUGASAN FT AntiKS", tag: "range", start: "2026-09-13", end: "2026-09-18", unlockDate: U3 },
  { label: "PENUGASAN AKSIOMA (Kampanye Budaya Biru dan Mascot)", tag: "range", start: "2026-09-14", end: "2026-09-19", unlockDate: U3 },
  { label: "PENUGASAN Ke-IKM-an (IKM FAIR)", tag: "range", start: "2026-09-14", end: "2026-09-18", waktu: "12:00 & 15:00 WIB", unlockDate: U3 },
  { label: "DAY 4 - MABIM FTUI 2026", tag: "day", start: "2026-09-19", waktu: "06:00 WIB", unlockDate: U3 },
  { label: "TUGAS FT AntiKS", tag: "deadline", start: "2026-09-19", waktu: "08:00 WIB", unlockDate: U3 },
  { label: "PENGUMPULAN TUGAS", tag: "deadline", start: "2026-09-19", waktu: "08:00 WIB", unlockDate: U3 },

  { label: "[EXTEND] PENGERJAAN TUGAS FT AntiKS", tag: "extend", start: "2026-09-21", end: "2026-09-25", unlockDate: U4 },
  { label: "PENUGASAN Ke-IKM-an (IKM FAIR)", tag: "range", start: "2026-09-21", end: "2026-09-25", waktu: "12:00 & 15:00 WIB", unlockDate: U4 },
  { label: "PENGUMPULAN LEMBAR PENUGASAN Ke-IKM-an", tag: "deadline", start: "2026-09-23", waktu: "12:00 WIB", unlockDate: U4 },
  { label: "PENGUMPULAN LEMBAR PENUGASAN Ke-IKM-an", tag: "deadline", start: "2026-09-24", waktu: "12:00 WIB", unlockDate: U4 },
  { label: "[LAST DAY] PENGUMPULAN TUGAS FT AntiKS", tag: "deadline", start: "2026-09-25", waktu: "08:00 WIB", unlockDate: U4 },
  { label: "[LAST DAY] PENGUMPULAN LEMBAR PENUGASAN Ke-IKM-an", tag: "deadline", start: "2026-09-25", waktu: "12:00 WIB", unlockDate: U4 },
  { label: "DAY 5 - MABIM FTUI 2026", tag: "day", start: "2026-09-26", waktu: "06:00 WIB", unlockDate: U4 },

  { label: "DAY 6 - MABIM FTUI 2026", tag: "day", start: "2026-10-03", waktu: "07:00 WIB", unlockDate: U5 },

  { label: "WEEK TUGAS PENGGANTI", tag: "range", start: "2026-10-05", end: "2026-10-09", unlockDate: U6 },
  { label: "TUGAS PENGGANTI", tag: "deadline", start: "2026-10-09", waktu: "00:00 WIB", unlockDate: U6 },
  { label: "DAY 7 - MABIM FTUI 2026", tag: "day", start: "2026-10-10", waktu: "06:00 WIB", unlockDate: U6 },
  { label: "PENUGASAN TECHNOPRENEURSHIP", tag: "deadline", start: "2026-10-10", waktu: "08:00 WIB", unlockDate: U6 },
];

export const TAG_STYLE: Record<KalendarTag, { color: string; bg: string; text: string; bar: string }> = {
  day:      { color: "#d9651a", bg: "bg-accent/10",  text: "text-accent",                    bar: "bg-accent" },
  deadline: { color: "#e11d48", bg: "bg-rose-500/10", text: "text-rose-600 dark:text-rose-400", bar: "bg-rose-500" },
  holiday:  { color: "#0ea5e9", bg: "bg-sky-500/10",  text: "text-sky-600 dark:text-sky-400",   bar: "bg-sky-500" },
  range:    { color: "#7c3aed", bg: "bg-violet-500/10", text: "text-violet-600 dark:text-violet-400", bar: "bg-violet-500" },
  extend:   { color: "#d97706", bg: "bg-amber-500/10", text: "text-amber-600 dark:text-amber-400", bar: "bg-amber-500" },
};

export const TAG_LABEL: Record<KalendarTag, string> = {
  day: "Mabim Day",
  deadline: "Deadline",
  holiday: "Hari Libur",
  range: "Penugasan",
  extend: "Perpanjangan",
};

export type CalendarMonth = {
  year: number;
  month: number;
  label: string;
};

export const CALENDAR_MONTHS: CalendarMonth[] = [
  { year: 2026, month: 7, label: "Agustus 2026" },
  { year: 2026, month: 8, label: "September 2026" },
  { year: 2026, month: 9, label: "Oktober 2026" },
  { year: 2026, month: 10, label: "November 2026" },
  { year: 2026, month: 11, label: "Desember 2026" },
];
