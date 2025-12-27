import { Layout } from "@/components/Layout";
import { DashboardCard } from "@/components/DashboardCard";
import { Languages, DollarSign, Phone, Ruler, Settings, BookOpen } from "lucide-react";

export default function Home() {
  return (
    <Layout title="Local Life" showBack={false}>
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-bold mb-1">Welcome</h2>
          <p className="text-muted-foreground">What do you need help with?</p>
        </section>

        {/* Updated grid to hold 6 items perfectly */}
        <div className="grid grid-cols-2 gap-4">
          <DashboardCard
            title="Translator"
            icon={Languages}
            href="/translator"
            color="bg-violet-500 shadow-violet-500/30"
            delay={0}
          />
          <DashboardCard
            title="Currency"
            icon={DollarSign}
            href="/currency"
            color="bg-emerald-500 shadow-emerald-500/30"
            delay={100}
          />
          <DashboardCard
            title="Emergency"
            icon={Phone}
            href="/emergency"
            color="bg-rose-500 shadow-rose-500/30"
            delay={200}
          />
          <DashboardCard
            title="Units"
            icon={Ruler}
            href="/units"
            color="bg-blue-500 shadow-blue-500/30"
            delay={300}
          />
          
          {/* [Added] New Card for Local Guide */}
          <DashboardCard
            title="Local Guide"
            icon={BookOpen}
            href="/guide"
            color="bg-orange-500 shadow-orange-500/30"
            delay={400}
          />

          {/* [Updated] Settings is now a standard card to complete the grid */}
          <DashboardCard
            title="Settings"
            icon={Settings}
            href="/settings"
            color="bg-slate-500 shadow-slate-500/30"
            delay={500}
          />
        </div>
      </div>
    </Layout>
  );
}