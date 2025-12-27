import { Layout } from "@/components/Layout";
import { useTheme } from "@/hooks/use-theme";
import { useCreateFeedback } from "@/hooks/use-feedback";
import { useState } from "react";
import { Moon, Sun, Monitor, Loader2, Send, Info } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Settings() {
  const { theme, setTheme } = useTheme();
  const { mutate: submitFeedback, isPending } = useCreateFeedback();
  const [feedback, setFeedback] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.trim()) return;
    submitFeedback({ content: feedback }, {
      onSuccess: () => setFeedback("")
    });
  };

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

        {/* Feedback Section */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold">Feedback</h2>
          <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-4">
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Suggest a feature or report a bug..."
                className="w-full min-h-[120px] p-4 rounded-xl bg-muted/50 border border-transparent focus:bg-background focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all resize-none outline-none"
              />
              <button
                type="submit"
                disabled={isPending || !feedback.trim()}
                className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-bold flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-primary/25"
              >
                {isPending ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Submit Feedback
                  </>
                )}
              </button>
            </form>
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
