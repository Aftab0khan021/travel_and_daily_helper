import { useState } from "react";
import { Layout } from "@/components/Layout";
import { ArrowRightLeft, RefreshCw } from "lucide-react";

const RATES: Record<string, number> = {
  USD: 84.50, // 1 USD = 84.50 INR
  EUR: 91.20, // 1 EUR = 91.20 INR
  GBP: 106.80 // 1 GBP = 106.80 INR
};

export default function Currency() {
  const [amount, setAmount] = useState<string>("");
  const [currency, setCurrency] = useState<"USD" | "EUR" | "GBP">("USD");

  const converted = amount ? (parseFloat(amount) * RATES[currency]).toFixed(2) : "0.00";

  return (
    <Layout title="Currency Converter">
      <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-3xl p-6 text-white shadow-lg shadow-emerald-500/25 mb-6 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-8">
            <div>
              <p className="text-emerald-100 font-medium">Exchange Rate</p>
              <h2 className="text-3xl font-bold font-display mt-1">
                1 {currency} = ₹{RATES[currency]}
              </h2>
            </div>
            <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
              <ArrowRightLeft className="w-6 h-6 text-white" />
            </div>
          </div>

          <div className="space-y-1">
             <p className="text-emerald-100 text-sm">Equivalent in INR</p>
             <div className="text-4xl font-bold tracking-tight">
               ₹{converted}
             </div>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-3xl border border-border/50 p-6 shadow-sm">
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-muted-foreground">Select Currency</label>
            <div className="flex gap-2">
              {(Object.keys(RATES) as Array<keyof typeof RATES>).map((curr) => (
                <button
                  key={curr}
                  onClick={() => setCurrency(curr)}
                  className={`flex-1 py-3 rounded-xl font-bold transition-all ${
                    currency === curr 
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 scale-105" 
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {curr}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-muted-foreground">Amount ({currency})</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount..."
              className="w-full px-4 py-4 rounded-xl bg-background border-2 border-border text-lg font-bold placeholder:text-muted-foreground/40 focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all"
            />
          </div>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-center gap-2 text-xs text-muted-foreground bg-muted/50 py-2 rounded-full w-fit mx-auto px-4">
        <RefreshCw className="w-3 h-3" />
        <span>Last updated: Static Rates (Oct 2024)</span>
      </div>
    </Layout>
  );
}
