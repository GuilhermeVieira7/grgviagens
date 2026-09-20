export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`arrow h-4 w-4 flex-none ${className}`}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2 8h11M9 3.5 13.5 8 9 12.5" />
    </svg>
  );
}
