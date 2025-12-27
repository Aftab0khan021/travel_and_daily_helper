import { Layout } from "@/components/Layout";
import { useTheme } from "@/hooks/use-theme";
import { Moon, Sun, Monitor, Info } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Settings() {
  const { theme, setTheme } = useTheme();

  return (
    <Layout title="Settings">
      <div className="space-y-8">
        
        {/* Appearance Section */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold">Appearance</h2>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: "light", icon: Sun, label: "Light" },
              { id: "dark", icon: Moon, label: "Dark" },
              { id: "system", icon: Monitor, label: "System" },
            ].map((mode) => (
              <button
                key={mode.id}
                onClick={() => setTheme(mode.id as any)}
                className={cn(
                  "flex flex-col items-center justify-center gap-3 p-4 rounded-2xl border-2 transition-all active:scale-95",
                  theme === mode.id
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-transparent bg-card hover:bg-muted text-muted-foreground"
                )}
              >
                <mode.icon className="w-6 h-6" />
                <span className="text-sm font-semibold">{mode.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* About Section */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold">About</h2>
          <div className="bg-card rounded-2xl p-4 border border-border flex items-start gap-4">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-xl">
              <Info className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="font-bold">Local Life PWA</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Version 1.0.0
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Designed for offline utility in India.
              </p>
            </div>
          </div>
        </section>

      </div>
    </Layout>
  );
}
