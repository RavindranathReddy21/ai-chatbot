import { cn } from "@/lib/utils";

interface AvatarProps {
  role: "user" | "assistant";
  className?: string;
}

export function Avatar({ role, className }: AvatarProps) {
  return (
    <div
      className={cn(
        "h-8 w-8 shrink-0 rounded-xl flex items-center justify-center text-xs font-semibold shadow-soft",
        role === "user"
          ? "bg-primary text-primary-foreground"
          : "bg-gradient-to-br from-violet-500 to-indigo-600 text-white",
        className
      )}
    >
      {role === "user" ? (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L2 7l10 5 10-5-10-5z"/>
          <path d="M2 17l10 5 10-5"/>
          <path d="M2 12l10 5 10-5"/>
        </svg>
      )}
    </div>
  );
}