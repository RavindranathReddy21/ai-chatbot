import { useState } from "react";
import { useAccessibility } from "@/lib/accessibility";
import { cn } from "@/lib/utils";

export function AccessibilityPanel() {
  const { settings, updateSetting, resetSettings } = useAccessibility();
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs transition-all duration-150",
          open ? "bg-accent text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-accent/60"
        )}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="7" r="4"/><path d="M6 21v-2a6 6 0 0 1 12 0v2"/>
        </svg>
        Accessibility
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          className={cn("ml-auto transition-transform duration-200", open && "rotate-180")}>
          <path d="m18 15-6-6-6 6"/>
        </svg>
      </button>

      {open && (
        <div className="mt-2 bg-card border border-border/60 rounded-xl p-4 shadow-lifted flex flex-col gap-4">

          {/* Message Font Size */}
          <FontSlider
            label="Message Text"
            value={settings.messageFontSize}
            onChange={(v) => updateSetting("messageFontSize", v)}
          />

          {/* Sidebar Font Size */}
          <FontSlider
            label="Sidebar Text"
            value={settings.sidebarFontSize}
            onChange={(v) => updateSetting("sidebarFontSize", v)}
          />

          {/* Line Height */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-foreground">Line Spacing</label>
              <span className="text-xs font-mono text-muted-foreground">{settings.lineHeight.toFixed(1)}×</span>
            </div>
            <input
              type="range" min={1.4} max={2.0} step={0.1}
              value={settings.lineHeight}
              onChange={(e) => updateSetting("lineHeight", Number(e.target.value))}
              className="w-full h-1.5 rounded-full accent-primary cursor-pointer"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Compact</span><span>Relaxed</span>
            </div>
          </div>

          {/* Toggles */}
          <div className="flex flex-col gap-3">
            <Toggle
              label="High Contrast"
              description="Stronger color contrast"
              value={settings.highContrast}
              onChange={(v) => updateSetting("highContrast", v)}
            />
            <Toggle
              label="Reduce Motion"
              description="Disable animations"
              value={settings.reduceMotion}
              onChange={(v) => updateSetting("reduceMotion", v)}
            />
          </div>

          <button
            onClick={resetSettings}
            className="text-xs text-muted-foreground hover:text-foreground text-center pt-2 border-t border-border/50 transition-colors"
          >
            Reset to defaults
          </button>
        </div>
      )}
    </div>
  );
}

function FontSlider({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-medium text-foreground">{label}</label>
        <span className="text-xs font-mono text-muted-foreground">{value}px</span>
      </div>
      <input
        type="range" min={11} max={20} step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 rounded-full accent-primary cursor-pointer"
      />
      <div className="flex justify-between gap-1">
        {[11, 13, 15, 17, 20].map((size) => (
          <button
            key={size}
            onClick={() => onChange(size)}
            className={cn(
              "flex-1 py-1 rounded-lg text-xs transition-all",
              value === size
                ? "gradient-primary text-white shadow-soft"
                : "bg-muted text-muted-foreground hover:text-foreground"
            )}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}

function Toggle({
  label,
  description,
  value,
  onChange,
}: {
  label: string;
  description: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button onClick={() => onChange(!value)} className="flex items-center justify-between gap-2 w-full">
      <div className="text-left">
        <p className="text-xs font-medium text-foreground">{label}</p>
        <p className="text-xs text-muted-foreground/70">{description}</p>
      </div>
      <div className={cn(
        "relative h-5 w-9 rounded-full transition-all duration-200 shrink-0",
        value ? "bg-primary" : "bg-muted border border-border"
      )}>
        <div className={cn(
          "absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-all duration-200",
          value ? "left-4" : "left-0.5"
        )} />
      </div>
    </button>
  );
}