import { createContext, useContext, useEffect, useState } from "react";

interface AccessibilitySettings {
  messageFontSize: number;
  sidebarFontSize: number;
  lineHeight: number;
  highContrast: boolean;
  reduceMotion: boolean;
}

interface AccessibilityContextType {
  settings: AccessibilitySettings;
  updateSetting: <K extends keyof AccessibilitySettings>(key: K, value: AccessibilitySettings[K]) => void;
  resetSettings: () => void;
}

const defaults: AccessibilitySettings = {
  messageFontSize: 14,
  sidebarFontSize: 13,
  lineHeight: 1.6,
  highContrast: false,
  reduceMotion: false,
};

const AccessibilityContext = createContext<AccessibilityContextType>({
  settings: defaults,
  updateSetting: () => {},
  resetSettings: () => {},
});

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    try {
      const stored = localStorage.getItem("a11y-settings");
      return stored ? { ...defaults, ...JSON.parse(stored) } : defaults;
    } catch {
      return defaults;
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--msg-font-size", `${settings.messageFontSize}px`);
    root.style.setProperty("--sidebar-font-size", `${settings.sidebarFontSize}px`);
    root.style.setProperty("--chat-line-height", `${settings.lineHeight}`);
    root.classList.toggle("high-contrast", settings.highContrast);
    root.classList.toggle("reduce-motion", settings.reduceMotion);
    localStorage.setItem("a11y-settings", JSON.stringify(settings));
  }, [settings]);

  const updateSetting = <K extends keyof AccessibilitySettings>(
    key: K,
    value: AccessibilitySettings[K]
  ) => setSettings((prev) => ({ ...prev, [key]: value }));

  const resetSettings = () => setSettings(defaults);

  return (
    <AccessibilityContext.Provider value={{ settings, updateSetting, resetSettings }}>
      {children}
    </AccessibilityContext.Provider>
  );
}

export const useAccessibility = () => useContext(AccessibilityContext);