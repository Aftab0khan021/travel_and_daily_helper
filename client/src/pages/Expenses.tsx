import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Plus, Trash2, Wallet, ShoppingBag, Coffee, Bus } from "lucide-react";

type Expense = { id: number; title: string; amount: number; category: string };

export default function Expenses() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  // Load from Storage
  useEffect(() => {
    const saved = localStorage.getItem("my_expenses");
    if (saved) setExpenses(JSON.parse(saved));
  }, []);

  // Save to Storage
  const saveExpenses = (newExpenses: Expense[]) => {
    setExpenses(newExpenses);
    localStorage.setItem("my_expenses", JSON.stringify(newExpenses));
  };

  const addExpense = () => {
    if (!title || !amount) return;
    const newItem = { 
      id: Date.now(), 
      title, 
      amount: parseFloat(amount), 
      category: "General" 
    };
    saveExpenses([newItem, ...expenses]);
    setTitle("");
    setAmount("");
  };

  const removeExpense = (id: number) => {
    saveExpenses(expenses.filter(e => e.id !== id));
  };

  const total = expenses.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <Layout title="Trip Expenses">
      <div className="space-y-6">
        {/* Total Card */}
        <div className="bg-primary rounded-3xl p-6 text-primary-foreground shadow-md flex justify-between items-center">
          <div>
            <p className="text-primary-foreground/80 text-sm font-medium">Total Spending</p>
            <h2 className="text-4xl font-bold mt-1">₹{total.toFixed(0)}</h2>
          </div>
          <div className="bg-white/20 p-3 rounded-xl">
            <Wallet className="w-8 h-8" />
          </div>
        </div>

        {/* Input Form */}
        <div className="flex gap-2">
          <input 
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Item (e.g. Taxi)" 
            className="flex-1 p-3 rounded-xl bg-card border border-border"
          />
          <input 
            type="number"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            placeholder="₹" 
            className="w-20 p-3 rounded-xl bg-card border border-border"
          />
          <button onClick={addExpense} className="bg-primary text-primary-foreground p-3 rounded-xl">
            <Plus className="w-6 h-6" />
          </button>
        </div>

        {/* List */}
        <div className="space-y-3">
          {expenses.length === 0 && (
            <p className="text-center text-muted-foreground py-8">No expenses yet.</p>
          )}
          {expenses.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-4 bg-card rounded-2xl border border-border shadow-sm">
              <div className="flex items-center gap-3">
                <div className="bg-muted p-2 rounded-lg">
                  <ShoppingBag className="w-5 h-5 text-muted-foreground" />
                </div>
                <span className="font-bold">{item.title}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-mono font-bold">₹{item.amount}</span>
                <button onClick={() => removeExpense(item.id)} className="text-red-400">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}