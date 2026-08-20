"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
} from "@/data/kalendar";
import { cn } from "@/lib/utils";

const DAY_NAMES = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
const DAY_NAMES_FULL = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
const MONTH_NAMES = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember",
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
  const cells: { day: number; current: boolean; dateMs: number; key: string }[] = [];

  const prevMonthDays = daysInMonth(year, month - 1);
  for (let i = startDay - 1; i >= 0; i--) {
    const d = prevMonthDays - i;
    const m2 = month === 0 ? 11 : month - 1;
    const y2 = month === 0 ? year - 1 : year;
    cells.push({ day: d, current: false, dateMs: new Date(y2, m2, d).getTime(), key: dateKey(y2, m2, d) });
  }

  for (let d = 1; d <= total; d++) {
    cells.push({ day: d, current: true, dateMs: new Date(year, month, d).getTime(), key: dateKey(year, month, d) });
  }

  const remaining = 42 - cells.length;
  for (let d = 1; d <= remaining; d++) {
    const m2 = month === 11 ? 0 : month + 1;
    const y2 = month === 11 ? year + 1 : year;
    cells.push({ day: d, current: false, dateMs: new Date(y2, m2, d).getTime(), key: dateKey(y2, m2, d) });
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
  const evts = locked ? allEvts.filter((ev) => isUnlocked(ev, nowMs)) : allEvts;

  const isToday =
    new Date().getFullYear() === cal.year &&
    new Date().getMonth() === cal.month &&
    new Date().getDate() === cell.day &&
    cell.current;

  const rangeInfo = useMemo(() => {
    const info: { starts: KalendarEvent[]; ends: KalendarEvent[]; mid: KalendarEvent[] }[] = [];
    for (const ev of evts) {
      if (!ev.end) continue;
      const sMs = new Date(ev.start + "T00:00:00").getTime();
      const eMs = new Date(ev.end + "T00:00:00").getTime();
      const cellStart = new Date(cal.year, cal.month, 1).getTime();
      const cellEnd = new Date(cal.year, cal.month + 1, 0, 23, 59, 59).getTime();
      if (eMs < cellStart || sMs > cellEnd) continue;
      const clampedStart = Math.max(sMs, cellStart);
      const clampedEnd = Math.min(eMs, cellEnd);
      for (let t = clampedStart; t <= clampedEnd; t += 86400000) {
        const dt = new Date(t);
        const dk = dateKey(dt.getFullYear(), dt.getMonth(), dt.getDate());
        if (dk !== cell.key) continue;
        if (!info[0]) info[0] = { starts: [], ends: [], mid: [] };
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
      onClick={() => (cell.current ? onSelect(isSelected ? null : cell.key) : undefined)}
      className={cn(
        "group relative flex h-16 flex-col border-b border-r border-border/40 px-1 pt-1 transition-colors sm:h-24 sm:p-1.5",
        cell.current
          ? "bg-background hover:bg-secondary/30"
          : "bg-muted/30 text-muted-foreground/40",
        isSelected && "bg-accent/5 ring-2 ring-inset ring-accent/40"
      )}
    >
      <span
        className={cn(
          "inline-flex h-5 w-5 items-center justify-center rounded-full text-[11px] font-bold sm:h-6 sm:w-6 sm:text-xs",
          isToday && "bg-accent text-white",
          !cell.current && "opacity-30",
          !isToday && cell.current && "text-foreground"
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
                  "hidden truncate rounded-sm px-1 py-px text-[8px] font-bold leading-tight sm:block",
                  s.bg,
                  s.text
                )}
              >
                {ev.label.length > 14 ? ev.label.slice(0, 14) + "..." : ev.label}
              </span>
            );
          })}
          {evts.length > 3 && (
            <span className="hidden text-[8px] font-bold text-muted-foreground sm:inline">
              +{evts.length - 3}
            </span>
          )}
          {evts.length > 0 && (
            <div className="flex gap-0.5 sm:hidden">
              {evts.slice(0, 2).map((ev) => (
                <span
                  key={ev.label}
                  className={cn("h-1.5 w-1.5 rounded-full", TAG_STYLE[ev.tag].bar)}
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
                className={cn("h-1 flex-1", s.bar, isEnd ? "rounded-r-full" : "")}
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
  const evts = locked ? allEvts.filter((ev) => isUnlocked(ev, nowMs)) : allEvts;

  const dayName = DAY_NAMES_FULL[new Date(y, m - 1, d).getDay()];
  const monthName = MONTH_NAMES[m - 1];

  if (evts.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
      <Card className="w-full max-w-md overflow-hidden ring-border/60 shadow-card">
        <div className="flex items-center justify-between bg-secondary/50 px-5 py-3">
          <div>
            <p className="text-sm font-bold text-foreground">
              {dayName}, {d} {monthName} {y}
            </p>
            <p className="text-xs text-muted-foreground">
              {evts.length} kegiatan
            </p>
          </div>
          <Button type="button" variant="ghost" size="sm" onClick={onClose} className="rounded-full">
            <span className="text-xs">✕</span>
          </Button>
        </div>
        <div className="max-h-80 overflow-y-auto p-4 space-y-2">
          {evts.map((ev) => {
            const s = TAG_STYLE[ev.tag];
            return (
              <div
                key={ev.label}
                className={cn(
                  "rounded-xl border px-3 py-2.5",
                  s.bg,
                  ev.tag === "range" || ev.tag === "extend" ? "border-l-4" : "",
                  ev.tag === "range"
                    ? "border-violet-400/30"
                    : ev.tag === "extend"
                      ? "border-amber-400/30"
                      : ev.tag === "day"
                        ? "border-accent/30"
                        : "border-rose-400/30"
                )}
              >
                <div className="flex items-start gap-2">
                  <span className={cn("mt-0.5 h-2 w-2 shrink-0 rounded-full", s.bar)} />
                  <div className="min-w-0 flex-1">
                    <p className={cn("text-sm font-bold leading-snug", s.text)}>
                      {ev.label}
                    </p>
                    <div className="mt-0.5 flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                        {TAG_LABEL[ev.tag]}
                      </span>
                      {ev.waktu && (
                        <>
                          <span className="text-muted-foreground">·</span>
                          <span className="text-xs text-muted-foreground">{ev.waktu}</span>
                        </>
                      )}
                      {ev.end && (
                        <>
                          <span className="text-muted-foreground">·</span>
                          <span className="text-xs text-muted-foreground">
                            {ev.start} s/d {ev.end}
                          </span>
                        </>
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
    <div className="flex items-center gap-2">
      <Button
        type="button"
        variant="outline"
        size="icon"
        className="h-9 w-9 rounded-full"
        onClick={() => setCalIdx(Math.max(0, calIdx - 1))}
        disabled={calIdx === 0}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <span className="min-w-[140px] text-center text-sm font-bold text-foreground">
        {cal.label}
      </span>
      <Button
        type="button"
        variant="outline"
        size="icon"
        className="h-9 w-9 rounded-full"
        onClick={() => setCalIdx(Math.min(CALENDAR_MONTHS.length - 1, calIdx + 1))}
        disabled={calIdx === CALENDAR_MONTHS.length - 1}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}

export default function CalendarGrid({ locked = true }: { locked?: boolean }) {
  const [calIdx, setCalIdx] = useState(() => {
    const now = new Date();
    const idx = CALENDAR_MONTHS.findIndex(
      (m) => m.year === now.getFullYear() && m.month === now.getMonth()
    );
    return idx >= 0 ? idx : 0;
  });
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [nowMs] = useState(() => Date.now());

  const cal = CALENDAR_MONTHS[calIdx];
  const grid = useMemo(() => buildMonthGrid(cal.year, cal.month), [cal.year, cal.month]);

  return (
    <>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap gap-2">
          {(Object.keys(TAG_STYLE) as (keyof typeof TAG_STYLE)[]).map((tag) => {
            const s = TAG_STYLE[tag];
            return (
              <div key={tag} className="flex items-center gap-1.5">
                <span className={cn("h-2.5 w-2.5 rounded-full", s.bar)} />
                <span className="text-xs font-medium text-muted-foreground">
                  {TAG_LABEL[tag]}
                </span>
              </div>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="rounded-full text-xs"
            onClick={() => {
              const now = new Date();
              const idx = CALENDAR_MONTHS.findIndex(
                (m) => m.year === now.getFullYear() && m.month === now.getMonth()
              );
              if (idx >= 0) setCalIdx(idx);
            }}
          >
            Hari Ini
          </Button>
          <MonthNav calIdx={calIdx} setCalIdx={setCalIdx} cal={cal} />
        </div>
      </div>

      <Card className="overflow-hidden ring-border/60 shadow-card">
        <div className="grid grid-cols-7 border-b border-border/60">
          {DAY_NAMES.map((d) => (
            <div
              key={d}
              className={cn(
                "py-2 text-center text-[11px] font-bold uppercase tracking-wider",
                d === "Min" || d === "Sab" ? "text-rose-500" : "text-muted-foreground"
              )}
            >
              {d}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7">
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
