interface TimestampProps {
  timestamp: number;
}

export function Timestamp({ timestamp }: TimestampProps) {
  const formatted = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(timestamp));

  return (
    <span className="text-muted-foreground mt-1 select-none chat-timestamp">
      {formatted}
    </span>
  );
}