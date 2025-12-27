import { useState } from "react";
import { Layout } from "@/components/Layout";
import { ArrowUpDown, Copy, Check, Search } from "lucide-react"; // Added Search icon
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import dictionaryData from "../data/dictionary.json"; // [Import the JSON file]

// Type assertion to ensure TypeScript knows the shape of the data
const DICTIONARY: Record<string, string> = dictionaryData;

export default function Translator() {
  const [input, setInput] = useState("");
  const [direction, setDirection] = useState<"en-hi" | "hi-en">("en-hi");
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const getTranslation = (term: string) => {
    if (!term) return "";
    const normalized = term.toLowerCase().trim();
    
    if (direction === "en-hi") {
      // Direct lookup
      return DICTIONARY[normalized] || "Translation not found";
    } else {
      // Reverse lookup (search by value)
      // Note: This is simple matching. Real Hindi typing is hard, so this helps basic searches.
      const entry = Object.entries(DICTIONARY).find(([_, val]) => 
        val.toLowerCase().includes(normalized)
      );
      return entry ? entry[0] : "Translation not found";
    }
  };

  const output = getTranslation(input);

  const handleCopy = () => {
    if (output && !output.includes("not found")) {
      navigator.clipboard.writeText(output);
      setCopied(true);
      toast({ title: "Copied to clipboard" });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Layout title="Translator">
      <div className="bg-card rounded-3xl border border-border/50 shadow-sm overflow-hidden">
        {/* Language Toggle Header */}
        <div className="bg-muted/50 p-4 flex items-center justify-between border-b border-border/50">
          <span className={cn("font-bold text-lg", direction === "en-hi" ? "text-primary" : "text-muted-foreground")}>
            English
          </span>
          <button 
            onClick={() => {
                setDirection(prev => prev === "en-hi" ? "hi-en" : "en-hi");
                setInput("");
            }}
            className="p-2 rounded-full bg-background border border-border hover:bg-muted active:scale-95 transition-all"
          >
            <ArrowUpDown className="w-5 h-5 text-foreground" />
          </button>
          <span className={cn("font-bold text-lg", direction === "hi-en" ? "text-primary" : "text-muted-foreground")}>
            Hindi
          </span>
        </div>

        {/* Input Area */}
        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Type {direction === "en-hi" ? "English" : "Hindi"}
            </label>
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={direction === "en-hi" ? "Type 'hello'..." : "Type 'नमस्ते'..."}
                className="w-full text-2xl font-medium bg-transparent border-none p-0 placeholder:text-muted-foreground/40 focus:ring-0 focus:outline-none"
                autoFocus
              />
              {input && (
                <button 
                  onClick={() => setInput("")}
                  className="absolute right-0 top-1/2 -translate-y-1/2 p-1 bg-muted rounded-full text-xs font-bold text-muted-foreground"
                >
                  CLR
                </button>
              )}
            </div>
          </div>

          <div className="h-px bg-border/50 w-full" />

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Translation
              </label>
              {output && !output.includes("not found") && (
                <button 
                  onClick={handleCopy}
                  className="text-primary hover:text-primary/80 transition-colors"
                >
                  {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                </button>
              )}
            </div>
            <div className={cn(
              "text-2xl font-medium min-h-[40px]",
              !input ? "text-muted-foreground/30" : output.includes("not found") ? "text-orange-500 text-lg" : "text-primary"
            )}>
              {input ? output : "..."}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-sm font-semibold text-muted-foreground mb-3 px-1">Quick Phrases</h3>
        <div className="grid grid-cols-2 gap-2">
          {['Water', 'Food', 'Toilet', 'Help', 'Price', 'Hotel'].map((phrase) => (
            <button
              key={phrase}
              onClick={() => {
                setDirection("en-hi");
                setInput(phrase.toLowerCase());
              }}
              className="px-4 py-3 bg-card border border-border/50 rounded-xl text-left font-medium text-sm hover:border-primary/50 hover:bg-primary/5 transition-all active:scale-95"
            >
              {phrase}
            </button>
          ))}
        </div>
      </div>
    </Layout>
  );
}