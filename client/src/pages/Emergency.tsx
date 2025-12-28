import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Phone, Shield, Flame, HeartPulse, Globe, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

// Database of Major Countries
const EMERGENCY_DB: Record<string, any[]> = {
  "IN": [ // India
    { name: "Police", number: "100", icon: Shield, color: "text-blue-500", bg: "bg-blue-100" },
    { name: "Ambulance", number: "102", icon: HeartPulse, color: "text-red-500", bg: "bg-red-100" },
    { name: "Fire", number: "101", icon: Flame, color: "text-orange-500", bg: "bg-orange-100" },
  ],
  "US": [ // USA
    { name: "Emergency (All)", number: "911", icon: Shield, color: "text-red-500", bg: "bg-red-100" },
  ],
  "UK": [ // UK
    { name: "Emergency (All)", number: "999", icon: Shield, color: "text-red-500", bg: "bg-red-100" },
  ],
  "EU": [ // Europe (General)
    { name: "General Emergency", number: "112", icon: Shield, color: "text-blue-500", bg: "bg-blue-100" },
  ],
  "GLOBAL": [ // Fallback
    { name: "GSM Standard", number: "112", icon: Shield, color: "text-blue-500", bg: "bg-blue-100" },
    { name: "International", number: "911", icon: Phone, color: "text-red-500", bg: "bg-red-100" },
  ]
};

export default function Emergency() {
  const [country, setCountry] = useState("GLOBAL");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Attempt to detect country via IP (Works for Global users)
    const detectCountry = async () => {
      try {
        const res = await fetch('https://ipapi.co/json/');
        const data = await res.json();
        if (data.country_code && EMERGENCY_DB[data.country_code]) {
          setCountry(data.country_code);
        } else if (["FR", "DE", "ES", "IT"].includes(data.country_code)) {
          setCountry("EU");
        } else {
          setCountry("GLOBAL");
        }
      } catch (e) {
        console.log("Offline or detection failed");
      } finally {
        setLoading(false);
      }
    };
    detectCountry();
  }, []);

  const numbers = EMERGENCY_DB[country] || EMERGENCY_DB["GLOBAL"];

  return (
    <Layout title="Emergency Help">
      <div className="space-y-6">
        
        {/* Country Selector / Status */}
        <div className="bg-card p-4 rounded-2xl border border-border shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-full">
              <MapPin className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-bold uppercase">Current Region</p>
              <h3 className="font-bold">{country === "IN" ? "India" : country === "US" ? "USA" : country}</h3>
            </div>
          </div>
          <select 
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="bg-muted px-3 py-2 rounded-lg text-sm font-medium outline-none"
          >
            <option value="GLOBAL">Global</option>
            <option value="IN">India</option>
            <option value="US">USA</option>
            <option value="UK">UK</option>
            <option value="EU">Europe</option>
          </select>
        </div>

        <div className="grid gap-3">
          {numbers.map((item, idx) => (
            <a
              key={idx}
              href={`tel:${item.number}`}
              className="flex items-center justify-between p-5 bg-card rounded-3xl border border-border shadow-sm active:scale-95 transition-transform"
            >
              <div className="flex items-center gap-4">
                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center", item.bg)}>
                  <item.icon className={cn("w-7 h-7", item.color)} />
                </div>
                <div>
                  <h3 className="font-bold text-xl">{item.name}</h3>
                  <p className="text-muted-foreground text-sm">Tap to call</p>
                </div>
              </div>
              <div className="text-3xl font-black text-foreground tracking-tight">
                {item.number}
              </div>
            </a>
          ))}
        </div>

        <div className="text-center p-4">
           <p className="text-xs text-muted-foreground bg-muted inline-block px-3 py-1 rounded-full">
             <Globe className="w-3 h-3 inline mr-1"/>
             {loading ? "Detecting location..." : "Auto-detection enabled"}
           </p>
        </div>
      </div>
    </Layout>
  );
}