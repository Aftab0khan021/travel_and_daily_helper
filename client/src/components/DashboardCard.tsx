import { Link } from "wouter";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardCardProps {
  title: string;
  icon: LucideIcon;
  href: string;
  color: string;
  delay?: number;
}

export function DashboardCard({ title, icon: Icon, href, color, delay = 0 }: DashboardCardProps) {
  return (
    <Link href={href} className="group block h-full">
      <div 
        className={cn(
          "relative h-full overflow-hidden rounded-3xl p-6 transition-all duration-300",
          "bg-card border border-border/50 shadow-sm hover:shadow-xl hover:-translate-y-1",
          "flex flex-col items-start justify-between min-h-[160px]",
          "active:scale-95"
        )}
        style={{ animationDelay: `${delay}ms` }}
      >
        <div 
          className={cn(
            "w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 duration-300",
            color
          )}
        >
          <Icon className="w-6 h-6 text-white" strokeWidth={2.5} />
        </div>
        
        <div>
          <h3 className="text-xl font-bold font-display text-card-foreground group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground mt-1 font-medium opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            Open tool →
          </p>
        </div>

        {/* Decorative background gradient blob */}
        <div className={cn(
          "absolute -bottom-8 -right-8 w-24 h-24 rounded-full blur-2xl opacity-10 transition-opacity group-hover:opacity-20",
          color.replace("bg-", "bg-") // Hacky way to reuse bg color for blob
        )} />
      </div>
    </Link>
  );
}
