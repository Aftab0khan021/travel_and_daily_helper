import { Layout } from "@/components/Layout";
import { ThumbsUp, ThumbsDown } from "lucide-react";

export default function Guide() {
  const dos = [
    "Remove shoes before entering a home or temple.",
    "Eat with your right hand.",
    "Greet elders with 'Namaste'.",
    "Carry cash for small vendors."
  ];

  const donts = [
    "Don't touch people's heads (it's considered sensitive).",
    "Don't show public affection (PDA) in rural areas.",
    "Don't point your feet at people or religious altars.",
    "Don't drink tap water unless filtered."
  ];

  return (
    <Layout title="Do's & Don'ts">
      <div className="space-y-6">
        {/* Do's Section */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
            <ThumbsUp className="w-6 h-6" />
            <h2 className="text-xl font-bold">Do's</h2>
          </div>
          <ul className="grid gap-3">
            {dos.map((item, i) => (
              <li key={i} className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-2xl border border-emerald-100 dark:border-emerald-900/50 text-sm font-medium">
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Don'ts Section */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400">
            <ThumbsDown className="w-6 h-6" />
            <h2 className="text-xl font-bold">Don'ts</h2>
          </div>
          <ul className="grid gap-3">
            {donts.map((item, i) => (
              <li key={i} className="bg-rose-50 dark:bg-rose-900/20 p-4 rounded-2xl border border-rose-100 dark:border-rose-900/50 text-sm font-medium">
                {item}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </Layout>
  );
}