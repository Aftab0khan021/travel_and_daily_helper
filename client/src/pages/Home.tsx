import { useLocation } from "wouter";
import { Layout } from "@/components/Layout";
import { DashboardCard } from "@/components/DashboardCard";
import { 
  Languages, 
  DollarSign, 
  Phone, 
  Ruler, 
  BookOpen, 
  CloudSun, // New Icon for Weather
  Wallet    // New Icon for Expenses
} from "lucide-react";
import { AdMob } from '@capacitor-community/admob';

export default function Home() {
  const [, setLocation] = useLocation();

  // Function to handle Ad + Navigation
  const handleNavigation = async (path: string) => {
    try {
      // 1. Prepare the Interstitial Ad
      // Use Google's Test ID: ca-app-pub-3940256099942544/1033173712
      // REPLACE with Real ID before publishing
      await AdMob.prepareInterstitial({
        adId: 'ca-app-pub-3940256099942544/1033173712', 
      });

      // 2. Show the Ad
      await AdMob.showInterstitial();

      // 3. Navigate immediately (The ad will overlay the new screen)
      setLocation(path);

    } catch (e) {
      console.log("Ad failed to load or running on Web. Navigating anyway.", e);
      // Fallback: If ad fails, still let the user go to the feature
      setLocation(path);
    }
  };

  const features = [
    { 
      title: "Translator", 
      icon: Languages, 
      path: "/translator", 
      color: "text-blue-500", 
      delay: 0.1 
    },
    { 
      title: "Currency", 
      icon: DollarSign, 
      path: "/currency", 
      color: "text-green-500", 
      delay: 0.2 
    },
    // --- NEW FEATURES START ---
    { 
      title: "Weather", 
      icon: CloudSun, 
      path: "/weather", 
      color: "text-yellow-500", 
      delay: 0.25 
    },
    { 
      title: "Expenses", 
      icon: Wallet, 
      path: "/expenses", 
      color: "text-emerald-500", 
      delay: 0.25 
    },
    // --- NEW FEATURES END ---
    { 
      title: "Emergency", 
      icon: Phone, 
      path: "/emergency", 
      color: "text-red-500", 
      delay: 0.3 
    },
    { 
      title: "Units", 
      icon: Ruler, 
      path: "/units", 
      color: "text-purple-500", 
      delay: 0.4 
    },
    { 
      title: "Guide", 
      icon: BookOpen, 
      path: "/guide", 
      color: "text-orange-500", 
      delay: 0.5 
    },
  ];

  return (
    <Layout title="Local Life" showBack={false}>
      <div className="grid gap-4">
        {features.map((item) => (
          <div 
            key={item.path} 
            onClick={() => handleNavigation(item.path)}
            className="cursor-pointer"
          >
            <DashboardCard {...item} />
          </div>
        ))}
      </div>
    </Layout>
  );
}