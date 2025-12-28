import { useEffect } from "react";
import { Switch, Route } from "wouter";
import { AdMob } from '@capacitor-community/admob';
import Home from "./pages/Home";
import Translator from "./pages/Translator";
import Currency from "./pages/Currency";
import Emergency from "./pages/Emergency";
import Units from "./pages/Units";
import Guide from "./pages/Guide";
import Settings from "./pages/Settings";
import NotFound from "./pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/translator" component={Translator} />
      <Route path="/currency" component={Currency} />
      <Route path="/emergency" component={Emergency} />
      <Route path="/units" component={Units} />
      <Route path="/guide" component={Guide} />
      <Route path="/settings" component={Settings} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  useEffect(() => {
    const initAdMob = async () => {
      try {
        await AdMob.initialize({
          requestTrackingAuthorization: true,
          // testingDevices: ['2077ef9a63d2b398840261c8221a0c9b'], // <--- REMOVE THIS LINE
          initializeForTesting: true, // This is enough for emulators
        });
        console.log("AdMob initialized");
      } catch (e) {
        console.error("AdMob init failed", e);
      }
    };

    initAdMob();
  }, []);

  return <Router />;
}