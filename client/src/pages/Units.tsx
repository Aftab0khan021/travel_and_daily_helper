import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ArrowDown } from "lucide-react";

type UnitType = "length" | "weight" | "temp";

export default function Units() {
  const [activeTab, setActiveTab] = useState<UnitType>("length");
  const [val, setVal] = useState("");
  
  const convert = (value: number, type: UnitType): string => {
    if (isNaN(value)) return "--";
    
    if (type === "length") {
      // km to miles
      return `${(value * 0.621371).toFixed(2)} miles`;
    } else if (type === "weight") {
      // kg to lbs
      return `${(value * 2.20462).toFixed(2)} lbs`;
    } else {
      // C to F
      return `${((value * 9/5) + 32).toFixed(1)} °F`;
    }
  };

  const getLabel = (type: UnitType) => {
    switch(type) {
      case "length": return "Kilometers (km)";
      case "weight": return "Kilograms (kg)";
      case "temp": return "Celsius (°C)";
    }
  };

  return (
    <Layout title="Unit Converter">
      <div className="space-y-6">
        {/* Custom Tabs implementation since wouter doesn't bundle one */}
        <div className="bg-muted p-1 rounded-xl flex gap-1">
          {(["length", "weight", "temp"] as UnitType[]).map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setVal("");
              }}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all capitalize ${
                activeTab === tab 
                  ? "bg-background text-foreground shadow-sm" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab === "temp" ? "Temp." : tab}
            </button>
          ))}
        </div>

        <div className="bg-card border border-border rounded-3xl p-8 shadow-lg shadow-black/5 flex flex-col items-center justify-center space-y-8 min-h-[300px]">
          
          <div className="w-full space-y-2">
            <label className="block text-center text-sm font-bold text-muted-foreground uppercase tracking-wider">
              {getLabel(activeTab)}
            </label>
            <input 
              type="number" 
              value={val}
              onChange={(e) => setVal(e.target.value)}
              placeholder="0"
              className="w-full text-center text-5xl font-bold bg-transparent border-none p-0 focus:ring-0 placeholder:text-muted-foreground/20 font-display"
              autoFocus
            />
          </div>

          <div className="bg-muted/50 p-3 rounded-full">
            <ArrowDown className="w-6 h-6 text-muted-foreground" />
          </div>

          <div className="w-full text-center space-y-1">
            <label className="block text-sm font-bold text-muted-foreground uppercase tracking-wider">
              Result
            </label>
            <div className="text-4xl font-bold text-primary font-display">
              {val ? convert(parseFloat(val), activeTab) : "--"}
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
}
