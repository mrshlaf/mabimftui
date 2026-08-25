"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  CALENDAR_MONTHS,
  KALENDER_EVENTS,
  TAG_STYLE,
  TAG_LABEL,
  eventsForDateAll,
  isUnlocked,
  type CalendarMonth,
  type KalendarEvent,
  type KalendarTag,
} from "@/data/kalendar";
import { cn } from "@/lib/utils";
import Reveal from "./Reveal";

const DAY_NAMES = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
const DAY_NAMES_FULL = [
  "Minggu",
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jumat",
  "Sabtu",
];
const MONTH_NAMES = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

function dateKey(y: number, m: number, d: number) {
  return `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

function daysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function buildMonthGrid(year: number, month: number) {
  const first = new Date(year, month, 1);
  const total = daysInMonth(year, month);
  const startDay = first.getDay();
  const cells: {
    day: number;
    current: boolean;
    dateMs: number;
    key: string;
  }[] = [];

  const prevMonthDays = daysInMonth(year, month - 1);
  for (let i = startDay - 1; i >= 0; i--) {
    const d = prevMonthDays - i;
    const m2 = month === 0 ? 11 : month - 1;
    const y2 = month === 0 ? year - 1 : year;
    cells.push({
      day: d,
      current: false,
      dateMs: new Date(y2, m2, d).getTime(),
      key: dateKey(y2, m2, d),
    });
  }

  for (let d = 1; d <= total; d++) {
    cells.push({
      day: d,
      current: true,
      dateMs: new Date(year, month, d).getTime(),
      key: dateKey(year, month, d),
    });
  }

  const remaining = 42 - cells.length;
  for (let d = 1; d <= remaining; d++) {
    const m2 = month === 11 ? 0 : month + 1;
    const y2 = month === 11 ? year + 1 : year;
    cells.push({
      day: d,
      current: false,
      dateMs: new Date(y2, m2, d).getTime(),
      key: dateKey(y2, m2, d),
    });
  }

  return cells;
}

function DayCell({
  cell,
  nowMs,
  cal,
  locked,
  isSelected,
  onSelect,
}: {
  cell: { day: number; current: boolean; dateMs: number; key: string };
  nowMs: number;
  cal: CalendarMonth;
  locked: boolean;
  isSelected: boolean;
  onSelect: (key: string | null) => void;
}) {
  const allEvts = eventsForDateAll(cell.dateMs, KALENDER_EVENTS);
  const evts = locked
    ? allEvts.filter((ev) => isUnlocked(ev, nowMs))
    : allEvts;

  const isToday =
    new Date().getFullYear() === cal.year &&
    new Date().getMonth() === cal.month &&
    new Date().getDate() === cell.day &&
    cell.current;

  const rangeInfo = useMemo(() => {
    const info: {
      starts: KalendarEvent[];
      ends: KalendarEvent[];
      mid: KalendarEvent[];
    }[] = [];
    for (const ev of evts) {
      if (!ev.end) continue;
      const sMs = new Date(ev.start + "T00:00:00").getTime();
      const eMs = new Date(ev.end + "T00:00:00").getTime();
      const cellStart = new Date(cal.year, cal.month, 1).getTime();
      const cellEnd = new Date(
        cal.year,
        cal.month + 1,
        0,
        23,
        59,
        59,
      ).getTime();
      if (eMs < cellStart || sMs > cellEnd) continue;
      const clampedStart = Math.max(sMs, cellStart);
      const clampedEnd = Math.min(eMs, cellEnd);
      for (let t = clampedStart; t <= clampedEnd; t += 86400000) {
        const dt = new Date(t);
        const dk = dateKey(dt.getFullYear(), dt.getMonth(), dt.getDate());
        if (dk !== cell.key) continue;
        if (!info[0])
          info[0] = { starts: [], ends: [], mid: [] };
        if (t === clampedStart) info[0].starts.push(ev);
        else if (t === clampedEnd) info[0].ends.push(ev);
        else info[0].mid.push(ev);
      }
    }
    return info[0] || { starts: [], ends: [], mid: [] };
  }, [evts, cal.year, cal.month, cell.key]);

  return (
    <button
      type="button"
      onClick={() =>
        cell.current ? onSelect(isSelected ? null : cell.key) : undefined
      }
      className={cn(
        "group relative flex h-16 flex-col border-b border-r border-border/30 px-1 pt-1 transition-all duration-200 sm:h-24 sm:p-1.5",
        cell.current
          ? "bg-background hover:bg-secondary/40 hover:shadow-inner"
          : "bg-muted/20 text-muted-foreground/30",
        isSelected &&
          "bg-accent/8 ring-2 ring-inset ring-accent/50 shadow-inner",
      )}
    >
      <span
        className={cn(
          "inline-flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold transition-all sm:h-7 sm:w-7 sm:text-xs",
          isToday &&
            "bg-accent text-white shadow-md shadow-accent/30",
          !cell.current && "opacity-25",
          !isToday &&
            cell.current &&
            "text-foreground group-hover:font-extrabold",
        )}
      >
        {cell.day}
      </span>

      {cell.current && (
        <div className="mt-auto flex flex-wrap gap-0.5">
          {evts.slice(0, 3).map((ev) => {
            const s = TAG_STYLE[ev.tag];
            return (
              <span
                key={ev.label}
                className={cn(
                  "hidden truncate rounded-md px-1.5 py-px text-[8px] font-bold leading-tight transition-colors sm:block",
                  s.bg,
                  s.text,
                )}
              >
                {ev.label.length > 14
                  ? ev.label.slice(0, 14) + "..."
                  : ev.label}
              </span>
            );
          })}
          {evts.length > 3 && (
            <span className="hidden text-[8px] font-bold text-muted-foreground/70 sm:inline">
              +{evts.length - 3}
            </span>
          )}
          {evts.length > 0 && (
            <div className="flex gap-0.5 sm:hidden">
              {evts.slice(0, 2).map((ev) => (
                <span
                  key={ev.label}
                  className={cn(
                    "h-1.5 w-1.5 rounded-full",
                    TAG_STYLE[ev.tag].bar,
                  )}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {cell.current && rangeInfo.starts.length > 0 && (
        <div className="absolute bottom-0 left-0 right-0 flex">
          {rangeInfo.starts.map((ev) => {
            const s = TAG_STYLE[ev.tag];
            const isEnd = rangeInfo.ends.includes(ev);
            return (
              <div
                key={ev.label}
                className={cn(
                  "h-1 flex-1",
                  s.bar,
                  isEnd ? "rounded-r-full" : "",
                )}
              />
            );
          })}
        </div>
      )}
    </button>
  );
}

function EventPopup({
  dateKey,
  nowMs,
  locked,
  onClose,
}: {
  dateKey: string;
  nowMs: number;
  locked: boolean;
  onClose: () => void;
}) {
  const [y, m, d] = dateKey.split("-").map(Number);
  const dateMs = new Date(y, m - 1, d).getTime();
  const allEvts = eventsForDateAll(dateMs, KALENDER_EVENTS);
  const evts = locked
    ? allEvts.filter((ev) => isUnlocked(ev, nowMs))
    : allEvts;

  const dayName = DAY_NAMES_FULL[new Date(y, m - 1, d).getDay()];
  const monthName = MONTH_NAMES[m - 1];

  if (evts.length === 0) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <Card
        className="relative w-full max-w-md overflow-hidden rounded-[2rem] ring-border/60 shadow-lift"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="pointer-events-none absolute inset-0">
          <span
            aria-hidden="true"
            className="absolute -left-12 -top-12 h-48 w-48 rounded-full bg-accent/15 blur-3xl"
          />
          <span
            aria-hidden="true"
            className="absolute -bottom-8 -right-8 h-40 w-40 rounded-full bg-amber-400/10 blur-3xl"
          />
          <div aria-hidden="true" className="hero-beam" />
        </div>

        <div className="relative flex items-center justify-between bg-secondary/60 px-6 py-4 ring-b ring-border/40">
          <div>
            <p className="font-heading text-sm font-bold text-foreground sm:text-base">
              {dayName}, {d} {monthName} {y}
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {evts.length} kegiatan
            </p>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 rounded-full bg-secondary/80 text-muted-foreground hover:bg-secondary hover:text-foreground"
          >
            <span className="text-xs">✕</span>
          </Button>
        </div>

        <div className="relative max-h-80 space-y-2 overflow-y-auto p-5">
          {evts.map((ev) => {
            const s = TAG_STYLE[ev.tag];
            return (
              <div
                key={ev.label}
                className={cn(
                  "rounded-2xl border px-4 py-3 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card",
                  s.bg,
                  ev.tag === "range" || ev.tag === "extend"
                    ? "border-l-4"
                    : "",
                  ev.tag === "range"
                    ? "border-violet-400/30"
                    : ev.tag === "extend"
                      ? "border-amber-400/30"
                      : ev.tag === "day"
                        ? "border-accent/30"
                        : "border-rose-400/30",
                )}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={cn(
                      "mt-1 h-2.5 w-2.5 shrink-0 rounded-full",
                      s.bar,
                    )}
                  />
                  <div className="min-w-0 flex-1">
                    <p
                      className={cn(
                        "text-sm font-bold leading-snug",
                        s.text,
                      )}
                    >
                      {ev.label}
                    </p>
                    <div className="mt-1 flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-background/60 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground ring-1 ring-border/40">
                        {TAG_LABEL[ev.tag]}
                      </span>
                      {ev.waktu && (
                        <span className="text-xs text-muted-foreground">
                          {ev.waktu}
                        </span>
                      )}
                      {ev.end && (
                        <span className="text-xs text-muted-foreground">
                          {ev.start} s/d {ev.end}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}

function MonthNav({
  calIdx,
  setCalIdx,
  cal,
}: {
  calIdx: number;
  setCalIdx: (i: number) => void;
  cal: CalendarMonth;
}) {
  return (
    <div className="flex items-center gap-1.5">
      <Button
        type="button"
        variant="outline"
        size="icon"
        className="h-9 w-9 rounded-full border-border/60 transition-all hover:bg-secondary hover:shadow-sm"
        onClick={() => setCalIdx(Math.max(0, calIdx - 1))}
        disabled={calIdx === 0}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <span className="min-w-[140px] text-center font-heading text-sm font-bold tracking-tight text-foreground">
        {cal.label}
      </span>
      <Button
        type="button"
        variant="outline"
        size="icon"
        className="h-9 w-9 rounded-full border-border/60 transition-all hover:bg-secondary hover:shadow-sm"
        onClick={() =>
          setCalIdx(
            Math.min(CALENDAR_MONTHS.length - 1, calIdx + 1),
          )
        }
        disabled={calIdx === CALENDAR_MONTHS.length - 1}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}

export default function CalendarGrid({
  locked = true,
}: {
  locked?: boolean;
}) {
  const [calIdx, setCalIdx] = useState(() => {
    const now = new Date();
    const idx = CALENDAR_MONTHS.findIndex(
      (m) =>
        m.year === now.getFullYear() && m.month === now.getMonth(),
    );
    return idx >= 0 ? idx : 0;
  });
  const [selectedDate, setSelectedDate] = useState<string | null>(
    null,
  );
  const [nowMs] = useState(() => Date.now());

  const cal = CALENDAR_MONTHS[calIdx];
  const grid = useMemo(
    () => buildMonthGrid(cal.year, cal.month),
    [cal.year, cal.month],
  );

  const upcomingEvents = useMemo(() => {
    const now = new Date();
    const todayMs = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    return KALENDER_EVENTS.filter((ev) => {
      if (locked && !isUnlocked(ev, nowMs)) return false;
      const endMs = ev.end
        ? new Date(ev.end + "T23:59:59").getTime()
        : new Date(ev.start + "T23:59:59").getTime();
      return endMs >= todayMs;
    }).slice(0, 6);
  }, [locked, nowMs]);

  const nextEvent = useMemo(() => {
    const now = new Date();
    const todayMs = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    for (const ev of KALENDER_EVENTS) {
      const startMs = new Date(ev.start + "T00:00:00").getTime();
      if (startMs >= todayMs) return ev;
    }
    return null;
  }, []);

  const daysUntilNext = useMemo(() => {
    if (!nextEvent) return null;
    const now = new Date();
    const todayMs = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const startMs = new Date(nextEvent.start + "T00:00:00").getTime();
    return Math.ceil((startMs - todayMs) / 86400000);
  }, [nextEvent]);

  return (
    <>
      <Reveal>
        <div className="mb-4 flex items-center justify-end">
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="rounded-full border-accent/30 bg-accent/5 text-xs font-bold text-accent transition-all hover:bg-accent/10 hover:shadow-sm"
              onClick={() => {
                const now = new Date();
                const idx = CALENDAR_MONTHS.findIndex(
                  (m) =>
                    m.year === now.getFullYear() &&
                    m.month === now.getMonth(),
                );
                if (idx >= 0) setCalIdx(idx);
              }}
            >
              Hari Ini
            </Button>
            <MonthNav
              calIdx={calIdx}
              setCalIdx={setCalIdx}
              cal={cal}
            />
          </div>
        </div>
      </Reveal>

      <Reveal delay={80}>
        <Card className="relative overflow-hidden rounded-[2rem] ring-border/60 shadow-card">
          <div className="pointer-events-none absolute inset-0">
            <span
              aria-hidden="true"
              className="absolute -left-16 -top-16 h-56 w-56 rounded-full bg-accent/8 blur-3xl"
            />
            <span
              aria-hidden="true"
              className="absolute -bottom-12 -right-12 h-48 w-48 rounded-full bg-amber-400/5 blur-3xl"
            />
          </div>

          <div className="relative grid grid-cols-7 border-b border-border/40">
            {DAY_NAMES.map((d) => (
              <div
                key={d}
                className={cn(
                  "py-2.5 text-center text-[11px] font-bold uppercase tracking-wider",
                  d === "Min" || d === "Sab"
                    ? "text-rose-500/80"
                    : "text-muted-foreground",
                )}
              >
                {d}
              </div>
            ))}
          </div>

          <div className="relative grid grid-cols-7">
            {grid.map((cell) => (
              <DayCell
                key={cell.key}
                cell={cell}
                nowMs={nowMs}
                cal={cal}
                locked={locked}
                isSelected={selectedDate === cell.key}
                onSelect={setSelectedDate}
              />
            ))}
          </div>
        </Card>
      </Reveal>

      <Reveal delay={120}>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          {(["day", "deadline", "range"] as KalendarTag[]).map((tag) => {
            const s = TAG_STYLE[tag];
            return (
              <div key={tag} className="flex items-center gap-1.5">
                <span className={cn("h-2.5 w-2.5 rounded-full", s.bar)} />
                <span className="text-[11px] font-bold text-muted-foreground">
                  {TAG_LABEL[tag]}
                </span>
              </div>
            );
          })}
        </div>
      </Reveal>

      {nextEvent && daysUntilNext !== null && (
        <Reveal delay={160}>
          <Card className="mt-5 overflow-hidden rounded-[1.5rem] ring-border/60 shadow-card">
            <div className="relative flex items-center gap-4 px-5 py-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent/15">
                <Clock className="h-5 w-5 text-accent" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  Acara Berikutnya
                </p>
                <p className="mt-0.5 truncate font-heading text-sm font-bold text-foreground">
                  {nextEvent.label}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {nextEvent.start}
                  {nextEvent.waktu && ` \u00B7 ${nextEvent.waktu}`}
                </p>
              </div>
              <div className="shrink-0 text-right">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15 font-heading text-lg font-extrabold text-accent">
                  {daysUntilNext}
                </span>
                <p className="mt-0.5 text-[10px] font-bold text-muted-foreground">
                  hari lagi
                </p>
              </div>
            </div>
          </Card>
        </Reveal>
      )}

      {upcomingEvents.length > 0 && (
        <Reveal delay={200}>
          <div className="mt-5">
            <h2 className="mb-3 font-heading text-sm font-bold text-foreground">
              Jadwal Mendatang
            </h2>
            <div className="space-y-2">
              {upcomingEvents.map((ev) => {
                const s = TAG_STYLE[ev.tag];
                return (
                  <Card
                    key={ev.label}
                    className="overflow-hidden rounded-xl ring-border/40 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card"
                  >
                    <div className="flex items-center gap-3 px-4 py-3">
                      <span className={cn("h-2.5 w-2.5 shrink-0 rounded-full", s.bar)} />
                      <div className="min-w-0 flex-1">
                        <p className={cn("truncate text-sm font-bold leading-snug", s.text)}>
                          {ev.label}
                        </p>
                        <div className="mt-0.5 flex items-center gap-2">
                          <span className="rounded-full bg-background/60 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground ring-1 ring-border/40">
                            {TAG_LABEL[ev.tag]}
                          </span>
                          <span className="text-[11px] text-muted-foreground">
                            {ev.start}
                            {ev.end && ` s/d ${ev.end}`}
                          </span>
                          {ev.waktu && (
                            <span className="text-[11px] text-muted-foreground">
                              {ev.waktu}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </Reveal>
      )}

      {selectedDate && (
        <EventPopup
          dateKey={selectedDate}
          nowMs={nowMs}
          locked={locked}
          onClose={() => setSelectedDate(null)}
        />
      )}
    </>
  );
}
