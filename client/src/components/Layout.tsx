import { useLocation, Link } from "wouter";
import { ArrowLeft, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { AdMob, BannerAdSize, BannerAdPosition } from '@capacitor-community/admob';

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  showBack?: boolean;
}

export function Layout({ children, title, showBack = true }: LayoutProps) {
  const [, setLocation] = useLocation();

  useEffect(() => {
    const showBanner = async () => {
      try {
        await AdMob.showBanner({
          adId: 'ca-app-pub-3940256099942544/6300978111', // Google's Official Test ID
          position: BannerAdPosition.BOTTOM,
          size: BannerAdSize.BANNER,
          margin: 0,
        });
      } catch (e) {
        console.log("AdMob banner failed (likely running on web, not android)", e);
      }
    };

    showBanner();

    // Optional: Cleanup if needed
    // return () => { AdMob.hideBanner().catch(console.error); };
  }, []);

  return (
    <div className="min-h-screen bg-muted/30 pb-20"> {/* Padding for Ad */}
      <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/40">
        <div className="max-w-md mx-auto px-4 h-16 flex items-center justify-between">
          {showBack ? (
            <button
              onClick={() => setLocation("/")}
              className="p-2 -ml-2 rounded-full hover:bg-muted transition-colors active:scale-95"
            >
              <ArrowLeft className="w-6 h-6 text-foreground" />
            </button>
          ) : (
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/25">
              <svg 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                className="w-6 h-6 text-primary-foreground"
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
          )}

          <h1 className="text-lg font-bold font-display tracking-tight absolute left-1/2 -translate-x-1/2">
            {title}
          </h1>

          {!showBack && (
             <Link href="/settings" className="p-2 -mr-2 rounded-full hover:bg-muted transition-colors active:scale-95">
               <Menu className="w-6 h-6 text-foreground" />
             </Link>
          )}
          {showBack && <div className="w-10" />}
        </div>
      </header>

      <main className="pt-20 px-4 max-w-md mx-auto min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
}