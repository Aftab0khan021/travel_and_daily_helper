import { Layout } from "@/components/Layout";
import { Phone, Shield, Flame, HeartPulse, UserRound } from "lucide-react";
import { cn } from "@/lib/utils";

const NUMBERS = [
  { id: 1, name: "Police", number: "100", icon: Shield, color: "text-blue-500", bg: "bg-blue-500/10" },
  { id: 2, name: "Fire", number: "101", icon: Flame, color: "text-orange-500", bg: "bg-orange-500/10" },
  { id: 3, name: "Ambulance", number: "102", icon: HeartPulse, color: "text-red-500", bg: "bg-red-500/10" },
  { id: 4, name: "Women Helpline", number: "1091", icon: UserRound, color: "text-pink-500", bg: "bg-pink-500/10" },
];

export default function Emergency() {
  return (
    <Layout title="Emergency">
      <div className="space-y-4">
        <div className="bg-red-50 border border-red-100 rounded-2xl p-4 flex gap-4 items-start dark:bg-red-950/20 dark:border-red-900/50">
          <div className="bg-red-100 p-2 rounded-full dark:bg-red-900/50">
            <Phone className="w-5 h-5 text-red-600 dark:text-red-400" />
          </div>
          <div>
            <h3 className="font-bold text-red-900 dark:text-red-200">Emergency Mode</h3>
            <p className="text-sm text-red-700/80 mt-1 dark:text-red-300/70">
              Tap any card below to instantly dial the number.
            </p>
          </div>
        </div>

        <div className="grid gap-3">
          {NUMBERS.map((item) => (
            <a
              key={item.id}
              href={`tel:${item.number}`}
              className="flex items-center justify-between p-4 bg-card rounded-2xl border border-border shadow-sm hover:shadow-md hover:border-primary/50 transition-all active:scale-[0.98]"
            >
              <div className="flex items-center gap-4">
                <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", item.bg)}>
                  <item.icon className={cn("w-6 h-6", item.color)} />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{item.name}</h3>
                  <p className="text-muted-foreground text-sm font-medium">Tap to call</p>
                </div>
              </div>
              <div className="text-2xl font-bold font-mono tracking-wider bg-muted/50 px-3 py-1 rounded-lg">
                {item.number}
              </div>
            </a>
          ))}
        </div>
      </div>
    </Layout>
  );
}
