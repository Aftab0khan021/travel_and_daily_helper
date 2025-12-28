import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Phone, Shield, Flame, HeartPulse, Globe } from "lucide-react";
import { Geolocation } from '@capacitor/geolocation';
import { cn } from "@/lib/utils";

// Different datasets for different regions
const NUMBERS_INDIA = [
  { id: 1, name: "Police", number: "100", icon: Shield, color: "text-blue-500", bg: "bg-blue-500/10" },
  { id: 2, name: "Fire", number: "101", icon: Flame, color: "text-orange-500", bg: "bg-orange-500/10" },
  { id: 3, name: "Ambulance", number: "102", icon: HeartPulse, color: "text-red-500", bg: "bg-red-500/10" },
];

const NUMBERS_GLOBAL = [
  { id: 1, name: "Universal Emergency", number: "112", icon: Shield, color: "text-blue-500", bg: "bg-blue-500/10" },
  { id: 2, name: "US/General", number: "911", icon: Phone, color: "text-red-500", bg: "bg-red-500/10" },
];

export default function Emergency() {
  const [locationStatus, setLocationStatus] = useState("Detecting location...");
  const [isIndia, setIsIndia] = useState(true); // Default to India for safety

  useEffect(() => {
    const checkLocation = async () => {
      try {
        const position = await Geolocation.getCurrentPosition();
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        // Rough bounding box for India (Lat 8-37, Lon 68-97)
        if (lat >= 8 && lat <= 37 && lon >= 68 && lon <= 97) {
          setIsIndia(true);
          setLocationStatus("India Detected");
        } else {
          setIsIndia(false);
          setLocationStatus("International Location Detected");
        }
      } catch (e) {
        console.log("Location failed, using default");
        setLocationStatus("Location unavailable - Defaulting to India");
      }
    };
    checkLocation();
  }, []);

  const numbers = isIndia ? NUMBERS_INDIA : NUMBERS_GLOBAL;

  return (
    <Layout title="Emergency">
      <div className="space-y-4">
        {/* Status Bar */}
        <div className="bg-muted px-4 py-2 rounded-lg flex items-center justify-between text-xs font-medium text-muted-foreground">
            <span className="flex items-center gap-2"><Globe className="w-3 h-3"/> {locationStatus}</span>
            <button onClick={() => setIsIndia(!isIndia)} className="text-primary underline">Switch Manually</button>
        </div>

        <div className="bg-red-50 border border-red-100 rounded-2xl p-4 flex gap-4 items-start dark:bg-red-950/20 dark:border-red-900/50">
          <div className="bg-red-100 p-2 rounded-full dark:bg-red-900/50">
            <Phone className="w-5 h-5 text-red-600 dark:text-red-400" />
          </div>
          <div>
            <h3 className="font-bold text-red-900 dark:text-red-200">Emergency Mode</h3>
            <p className="text-sm text-red-700/80 mt-1 dark:text-red-300/70">
              Tap any card to dial immediately.
            </p>
          </div>
        </div>

        <div className="grid gap-3">
          {numbers.map((item) => (
            <a
              key={item.id}
              href={`tel:${item.number}`}
              className="flex items-center justify-between p-4 bg-card rounded-2xl border border-border shadow-sm hover:shadow-md transition-all active:scale-[0.98]"
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