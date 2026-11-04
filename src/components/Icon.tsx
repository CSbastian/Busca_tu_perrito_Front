type IconName = "paw" | "upload" | "camera" | "search" | "arrow" | "back";

export default function Icon({ name, className = "h-5 w-5" }: { name: IconName; className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={`shrink-0 ${className}`}>
      {name === "paw" && <><ellipse cx="5" cy="9" rx="2" ry="2.7" /><ellipse cx="10" cy="5" rx="2" ry="2.7" /><ellipse cx="16" cy="6" rx="2" ry="2.7" /><ellipse cx="20" cy="11" rx="2" ry="2.7" /><path d="M6 18c0-2 3-6 6-6s6 4 6 6c0 4-4 2-6 2s-6 2-6-2Z" /></>}
      {name === "upload" && <><path d="M12 16V3m-5 5 5-5 5 5M4 16v5h16v-5" /></>}
      {name === "camera" && <><path d="M3 7h5l2-3h4l2 3h5v14H3Z" /><circle cx="12" cy="13" r="4" /></>}
      {name === "search" && <><circle cx="10" cy="10" r="7" /><path d="m15 15 6 6" /></>}
      {name === "arrow" && <path d="M4 12h16m-6-6 6 6-6 6" />}
      {name === "back" && <path d="M20 12H4m6-6-6 6 6 6" />}
    </svg>
  );
}
