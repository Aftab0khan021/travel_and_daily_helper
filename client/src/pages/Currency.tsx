import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { ArrowRightLeft, RefreshCw, WifiOff } from "lucide-react";

// Fallback rates if API fails and no cache exists
const DEFAULT_RATES: Record<string, number> = { USD: 84.50, EUR: 91.20, GBP: 106.80 };

export default function Currency() {
  const [amount, setAmount] = useState<string>("");
  const [currency, setCurrency] = useState<"USD" | "EUR" | "GBP">("USD");
  const [rates, setRates] = useState(DEFAULT_RATES);
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    const fetchRates = async () => {
      // 1. Try to load cached rates first
      const cached = localStorage.getItem("currency_rates");
      if (cached) {
        setRates(JSON.parse(cached));
      }

      // 2. Try to fetch fresh rates
      try {
        const response = await fetch("https://api.exchangerate-api.com/v4/latest/INR");
        const data = await response.json();
        
        // Convert because API gives 1 INR = X USD, we need 1 USD = X INR
        // Math: 1 / rate
        const newRates = {
          USD: parseFloat((1 / data.rates.USD).toFixed(2)),
          EUR: parseFloat((1 / data.rates.EUR).toFixed(2)),
          GBP: parseFloat((1 / data.rates.GBP).toFixed(2)),
        };

        setRates(newRates);
        localStorage.setItem("currency_rates", JSON.stringify(newRates)); // Cache it
        setIsOffline(false);
      } catch (error) {
        console.log("Offline or API Error, using cache");
        setIsOffline(true);
      }
    };

    fetchRates();
  }, []);

  const converted = amount ? (parseFloat(amount) * rates[currency]).toFixed(2) : "0.00";

  return (
    <Layout title="Currency Converter">
      <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-3xl p-6 text-white shadow-lg mb-6 relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-8">
            <div>
              <p className="text-emerald-100 font-medium">Exchange Rate</p>
              <h2 className="text-3xl font-bold font-display mt-1">
                1 {currency} = ₹{rates[currency]}
              </h2>
            </div>
            <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
              <ArrowRightLeft className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="space-y-1">
             <p className="text-emerald-100 text-sm">Equivalent in INR</p>
             <div className="text-4xl font-bold tracking-tight">₹{converted}</div>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-3xl border border-border/50 p-6 shadow-sm space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-muted-foreground">Select Currency</label>
            <div className="flex gap-2">
              {Object.keys(rates).map((curr) => (
                <button
                  key={curr}
                  onClick={() => setCurrency(curr as any)}
                  className={`flex-1 py-3 rounded-xl font-bold transition-all ${
                    currency === curr ? "bg-primary text-primary-foreground shadow-lg" : "bg-muted text-muted-foreground"
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
              className="w-full px-4 py-4 rounded-xl bg-background border-2 border-border text-lg font-bold focus:border-emerald-500 outline-none"
            />
          </div>
      </div>

      <div className="mt-8 flex items-center justify-center gap-2 text-xs text-muted-foreground bg-muted/50 py-2 rounded-full w-fit mx-auto px-4">
        {isOffline ? <WifiOff className="w-3 h-3" /> : <RefreshCw className="w-3 h-3" />}
        <span>{isOffline ? "Offline Mode (Using Cache)" : "Live Rates Active"}</span>
      </div>
    </Layout>
  );
}