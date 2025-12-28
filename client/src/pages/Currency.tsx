import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { ArrowRightLeft, RefreshCw, WifiOff } from "lucide-react";

// Global Standard Defaults (Base: USD)
const DEFAULT_RATES: Record<string, number> = { 
  USD: 1.0, 
  EUR: 0.92, 
  GBP: 0.79, 
  INR: 83.50, 
  JPY: 150.0 
};

export default function Currency() {
  const [amount, setAmount] = useState<string>("1");
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("EUR");
  const [rates, setRates] = useState(DEFAULT_RATES);
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    const fetchRates = async () => {
      // 1. Try Cache
      const cached = localStorage.getItem("global_currency_rates");
      if (cached) setRates(JSON.parse(cached));

      // 2. Try API (Base USD)
      try {
        const response = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
        const data = await response.json();
        setRates(data.rates);
        localStorage.setItem("global_currency_rates", JSON.stringify(data.rates));
        setIsOffline(false);
      } catch (error) {
        console.log("Offline, using cache");
        setIsOffline(true);
      }
    };
    fetchRates();
  }, []);

  // Conversion Logic: (Amount / FromRate) * ToRate
  const fromRate = rates[fromCurrency] || 1;
  const toRate = rates[toCurrency] || 1;
  const result = ((parseFloat(amount || "0") / fromRate) * toRate).toFixed(2);

  return (
    <Layout title="Currency Converter">
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-6 text-white shadow-lg mb-6">
        <div className="flex justify-between items-center mb-4">
           <div className="text-blue-100 text-sm">Converting</div>
           <div className="bg-white/20 p-2 rounded-lg"><ArrowRightLeft className="w-5 h-5"/></div>
        </div>
        <div className="text-4xl font-bold mb-1">{result} {toCurrency}</div>
        <div className="text-blue-200 text-sm">1 {fromCurrency} = {(toRate/fromRate).toFixed(4)} {toCurrency}</div>
      </div>

      <div className="space-y-4">
        {/* FROM Selector */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-muted-foreground uppercase">From</label>
            <select 
              value={fromCurrency} 
              onChange={(e) => setFromCurrency(e.target.value)}
              className="w-full p-3 rounded-xl bg-card border border-border font-bold"
            >
              {Object.keys(rates).map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          {/* TO Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-muted-foreground uppercase">To</label>
            <select 
              value={toCurrency} 
              onChange={(e) => setToCurrency(e.target.value)}
              className="w-full p-3 rounded-xl bg-card border border-border font-bold"
            >
              {Object.keys(rates).map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        {/* Amount Input */}
        <div className="space-y-2">
            <label className="text-xs font-bold text-muted-foreground uppercase">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-4 rounded-xl bg-muted/50 text-xl font-bold border-2 border-transparent focus:border-blue-500 outline-none transition-all"
            />
        </div>
      </div>

      <div className="mt-8 flex justify-center gap-2 text-xs text-muted-foreground">
        {isOffline ? <WifiOff className="w-3 h-3" /> : <RefreshCw className="w-3 h-3" />}
        <span>{isOffline ? "Offline Mode" : "Live Rates"}</span>
      </div>
    </Layout>
  );
}