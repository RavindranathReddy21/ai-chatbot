export function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 px-1 py-1">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="typing-dot h-2 w-2 rounded-full bg-muted-foreground/60"
          style={{ animationDelay: `${i * 160}ms` }}
        />
      ))}
    </div>
  );
}