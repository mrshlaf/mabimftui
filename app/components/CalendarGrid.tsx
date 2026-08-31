"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Clock, Calendar, AlertCircle } from "lucide-react";
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

  // Determine range highlighting
  const rangeHighlight = (() => {
    for (const ev of evts) {
      if (!ev.end) continue;
      const sMs = new Date(ev.start + "T00:00:00").getTime();
      const eMs = new Date(ev.end + "T23:59:59").getTime();
      if (cell.dateMs >= sMs && cell.dateMs <= eMs) {
        const isStart = cell.key === ev.start;
        const isEnd = cell.key === ev.end;
        return { ev, isStart, isEnd };
      }
    }
    return null;
  })();

  // Primary event style for cell highlight (if no range is active)
  const cellTagStyle = (() => {
    if (evts.length === 0) return null;
    const primary = evts.find(ev => ev.tag === "day" || ev.tag === "deadline") || evts[0];
    return TAG_STYLE[primary.tag];
  })();

  return (
    <button
      type="button"
      onClick={() =>
        cell.current ? onSelect(cell.key) : undefined
      }
      className={cn(
        "group relative flex h-14 flex-col items-center justify-between border-b border-r border-border/30 p-1.5 transition-all duration-300 sm:h-24 sm:p-2.5",
        cell.current
          ? "bg-background hover:bg-secondary/40"
          : "bg-muted/10 text-muted-foreground/30",
        isSelected && "bg-accent/8 ring-2 ring-inset ring-accent/40 shadow-inner"
      )}
    >
      {/* Range Highlight Box */}
      {cell.current && rangeHighlight && (
        <div
          className={cn(
            "absolute inset-y-1.5 left-0 right-0 z-0 opacity-80 sm:inset-y-2.5",
            TAG_STYLE[rangeHighlight.ev.tag].bg,
            rangeHighlight.isStart ? "rounded-l-xl left-1" : "",
            rangeHighlight.isEnd ? "rounded-r-xl right-1" : ""
          )}
        />
      )}

      {/* Date Number Indicator */}
      <span
        className={cn(
          "relative z-10 inline-flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-extrabold transition-all duration-300 sm:h-8 sm:w-8 sm:text-xs",
          isToday && "bg-accent text-white shadow-md shadow-accent/25",
          !cell.current && "opacity-20",
          !isToday && cell.current && "text-foreground group-hover:scale-105",
          !isToday && cell.current && cellTagStyle && !rangeHighlight && cn("ring-1 ring-offset-1 ring-offset-background", cellTagStyle.bar.replace("bg-", "ring-"))
        )}
      >
        {cell.day}
      </span>

      {/* Events inside the cell (Desktop view) */}
      {cell.current && evts.length > 0 && (
        <div className="relative z-10 w-full mt-auto hidden flex-col gap-1 sm:flex">
          {evts.slice(0, 2).map((ev) => {
            const s = TAG_STYLE[ev.tag];
            return (
              <span
                key={ev.label}
                className={cn(
                  "truncate rounded-lg px-2 py-0.5 text-[8.5px] font-bold leading-tight transition-colors shadow-sm",
                  s.bg,
                  s.text
                )}
              >
                {ev.label}
              </span>
            );
          })}
          {evts.length > 2 && (
            <span className="text-[8.5px] font-extrabold text-muted-foreground/80 px-1">
              +{evts.length - 2} agenda
            </span>
          )}
        </div>
      )}

      {/* Events inside the cell (Mobile view) */}
      {cell.current && evts.length > 0 && (
        <div className="relative z-10 mt-auto flex gap-1 sm:hidden">
          {evts.slice(0, 3).map((ev, idx) => (
            <span
              key={idx}
              className={cn(
                "h-1.5 w-1.5 rounded-full shadow-sm",
                TAG_STYLE[ev.tag].bar
              )}
            />
          ))}
        </div>
      )}
    </button>
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
    <div className="flex items-center gap-1">
      <Button
        type="button"
        variant="outline"
        size="icon"
        className="h-8 w-8 rounded-full border-border/60 transition-all hover:bg-secondary hover:shadow-sm"
        onClick={() => setCalIdx(Math.max(0, calIdx - 1))}
        disabled={calIdx === 0}
      >
        <ChevronLeft className="h-3.5 w-3.5" />
      </Button>
      <span className="min-w-[130px] text-center font-heading text-xs font-bold tracking-tight text-foreground sm:min-w-[140px] sm:text-sm">
        {cal.label}
      </span>
      <Button
        type="button"
        variant="outline"
        size="icon"
        className="h-8 w-8 rounded-full border-border/60 transition-all hover:bg-secondary hover:shadow-sm"
        onClick={() =>
          setCalIdx(
            Math.min(CALENDAR_MONTHS.length - 1, calIdx + 1)
          )
        }
        disabled={calIdx === CALENDAR_MONTHS.length - 1}
      >
        <ChevronRight className="h-3.5 w-3.5" />
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

  const [nowMs] = useState(() => Date.now());

  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const now = new Date();
    return dateKey(now.getFullYear(), now.getMonth(), now.getDate());
  });

  const cal = CALENDAR_MONTHS[calIdx];
  
  const grid = useMemo(
    () => buildMonthGrid(cal.year, cal.month),
    [cal.year, cal.month]
  );

  // Agenda details of selected date
  const selectedAgenda = useMemo(() => {
    if (!selectedDate) return [];
    const [y, m, d] = selectedDate.split("-").map(Number);
    const dateMs = new Date(y, m - 1, d).getTime();
    const allEvts = eventsForDateAll(dateMs, KALENDER_EVENTS);
    return locked ? allEvts.filter((ev) => isUnlocked(ev, nowMs)) : allEvts;
  }, [selectedDate, locked, nowMs]);

  const selectedDateFormatted = useMemo(() => {
    if (!selectedDate) return "";
    const [y, m, d] = selectedDate.split("-").map(Number);
    const dt = new Date(y, m - 1, d);
    const dayName = DAY_NAMES_FULL[dt.getDay()];
    const monthName = MONTH_NAMES[dt.getMonth()];
    return `${dayName}, ${d} ${monthName} ${y}`;
  }, [selectedDate]);

  return (
    <div className="space-y-5">
      <Reveal>
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-base font-bold text-foreground">
            Agenda Mabim
          </h2>
          <div className="flex items-center gap-1.5">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="rounded-full border-accent/20 bg-accent/5 px-3 h-8 text-[11px] font-bold text-accent transition-all hover:bg-accent/10 hover:shadow-sm"
              onClick={() => {
                const now = new Date();
                const idx = CALENDAR_MONTHS.findIndex(
                  (m) =>
                    m.year === now.getFullYear() &&
                    m.month === now.getMonth(),
                );
                if (idx >= 0) setCalIdx(idx);
                setSelectedDate(dateKey(now.getFullYear(), now.getMonth(), now.getDate()));
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

      {/* Calendar Grid Card */}
      <Reveal delay={80}>
        <Card className="relative overflow-hidden rounded-[2.5rem] border-transparent p-0.5 ring-1 ring-border/40 shadow-card">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/10" />
          
          <div className="relative grid grid-cols-7 border-b border-border/40 bg-secondary/30">
            {DAY_NAMES.map((d) => (
              <div
                key={d}
                className={cn(
                  "py-2 text-center text-[10px] font-bold uppercase tracking-wider",
                  d === "Min" || d === "Sab"
                    ? "text-rose-500/80"
                    : "text-muted-foreground"
                )}
              >
                {d}
              </div>
            ))}
          </div>

          <div className="relative grid grid-cols-7 bg-card">
            {grid.map((cell) => (
              <DayCell
                key={cell.key}
                cell={cell}
                nowMs={nowMs}
                cal={cal}
                locked={locked}
                isSelected={selectedDate === cell.key}
                onSelect={(key) => key && setSelectedDate(key)}
              />
            ))}
          </div>
        </Card>
      </Reveal>

      {/* Tag Legend */}
      <Reveal delay={125}>
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 rounded-2xl bg-secondary/40 px-4 py-2.5">
          {(["day", "deadline", "range"] as KalendarTag[]).map((tag) => {
            const s = TAG_STYLE[tag];
            return (
              <div key={tag} className="flex items-center gap-1.5 text-[11px] font-bold text-muted-foreground">
                <span className={cn("h-2.5 w-2.5 rounded-full ring-1 ring-white/10", s.bar)} />
                <span>{TAG_LABEL[tag]}</span>
              </div>
            );
          })}
        </div>
      </Reveal>

      {/* Inline Selected Date Agenda Details */}
      <Reveal delay={160}>
        <Card className="relative overflow-hidden rounded-[2rem] border-transparent p-6 ring-1 ring-border/40 shadow-card">
          {/* Accent Glow Backdrops */}
          <div className="pointer-events-none absolute inset-0">
            <span aria-hidden="true" className="absolute -left-12 -top-12 h-36 w-36 rounded-full bg-accent/8 blur-2xl" />
            <span aria-hidden="true" className="absolute -bottom-8 -right-8 h-32 w-32 rounded-full bg-amber-400/5 blur-2xl" />
            <div aria-hidden="true" className="hero-beam" />
          </div>

          <div className="relative z-10 flex flex-col gap-4">
            <div className="flex items-center gap-2 border-b border-border/40 pb-3">
              <Calendar className="h-4.5 w-4.5 text-accent" />
              <h3 className="font-heading text-sm font-bold text-foreground">
                Detail Agenda · <span className="text-muted-foreground">{selectedDateFormatted}</span>
              </h3>
            </div>

            {selectedAgenda.length > 0 ? (
              <div className="space-y-2.5">
                {selectedAgenda.map((ev, idx) => {
                  const s = TAG_STYLE[ev.tag];
                  return (
                    <div
                      key={idx}
                      className={cn(
                        "group relative overflow-hidden rounded-2xl border border-border/40 px-4 py-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-sm",
                        s.bg
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <span className={cn("mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ring-1 ring-white/10", s.bar)} />
                        <div className="min-w-0 flex-1">
                          <p className={cn("font-heading text-sm font-bold leading-snug", s.text)}>
                            {ev.label}
                          </p>
                          <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs">
                            <span className="rounded-full bg-background/70 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-muted-foreground ring-1 ring-border/30 shadow-sm">
                              {TAG_LABEL[ev.tag]}
                            </span>
                            {ev.waktu && (
                              <span className="flex items-center gap-1 text-muted-foreground font-medium">
                                <Clock className="h-3 w-3" />
                                {ev.waktu}
                              </span>
                            )}
                            {ev.end && (
                              <span className="flex items-center gap-1 text-muted-foreground font-medium">
                                <Calendar className="h-3 w-3" />
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
            ) : (
              <div className="flex flex-col items-center justify-center py-6 text-center text-muted-foreground">
                <AlertCircle className="h-8 w-8 opacity-40 text-muted-foreground mb-2" />
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground/60">Tidak Ada Agenda</p>
                <p className="text-[11px] mt-0.5">Belum ada agenda resmi Mabim pada tanggal ini.</p>
              </div>
            )}
          </div>
        </Card>
      </Reveal>
    </div>
  );
}
