import type { ReactNode } from "react";

export type IconName =
  | "home"
  | "users"
  | "doc"
  | "info"
  | "line"
  | "search"
  | "chevron-down"
  | "external"
  | "megaphone"
  | "calendar"
  | "book"
  | "clipboard";

const STROKE_ICONS: Record<string, ReactNode> = {
  home: (
    <>
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9.5V21h14V9.5" />
    </>
  ),
  users: (
    <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </>
  ),
  doc: (
    <>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M8 13h8" />
      <path d="M8 17h8" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </>
  ),
  "chevron-down": <path d="m6 9 6 6 6-6" />,
  external: (
    <>
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
    </>
  ),
  megaphone: (
    <>
      <path d="m3 11 18-5v12L3 14v-3z" />
      <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4" />
      <path d="M8 2v4" />
      <path d="M3 10h18" />
    </>
  ),
  book: (
    <>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </>
  ),
  clipboard: (
    <>
      <rect x="8" y="2" width="8" height="4" rx="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    </>
  ),
};

const LINE_PATH =
  "M18.92 2.01C18.72 1.42 18.16 1 17.5 1h-11c-.66 0-1.21.42-1.42 1.01C3.12 1.8 1.42 3.9 1.42 6.4v11.19c0 2.49 1.7 4.6 4.65 4.39.85-.06 1.6-.16 2.44-.34.87.55 1.89.78 2.92.78 3.68 0 6.42-3.28 6.42-7.23.48.02.96-.05 1.44-.09 2.35-.26 4.07-2.3 4.07-4.66V6.4c.01-2.5-1.7-4.59-4.88-4.39zm-10.5 10.9c0 .41-.34.75-.75.75s-.75-.34-.75-.75V7.85c0-.41.34-.75.75-.75s.75.34.75.75v5.06zm3.5 0c0 .41-.34.75-.75.75s-.75-.34-.75-.75V7.85c0-.41.34-.75.75-.75s.75.34.75.75v5.06zm2.5-3.45c0 .41-.34.75-.75.75s-.75-.34-.75-.75V7.85c0-.41.34-.75.75-.75s.75.34.75.75v1.61zm3.75-.56c0 .41-.34.75-.75.75s-.75-.34-.75-.75V7.85c0-.41.34-.75.75-.75s.75.34.75.75v3.05z";

export default function Icon({
  name,
  className = "h-6 w-6",
}: {
  name: IconName;
  className?: string;
}) {
  if (name === "line") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
        <path d={LINE_PATH} />
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {STROKE_ICONS[name]}
    </svg>
  );
}
