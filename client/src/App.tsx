import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { useTheme } from "@/hooks/use-theme";

import Home from "@/pages/Home";
import Translator from "@/pages/Translator";
import Currency from "@/pages/Currency";
import Emergency from "@/pages/Emergency";
import Units from "@/pages/Units";
import Settings from "@/pages/Settings";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/translator" component={Translator} />
      <Route path="/currency" component={Currency} />
      <Route path="/emergency" component={Emergency} />
      <Route path="/units" component={Units} />
      <Route path="/settings" component={Settings} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  useTheme();

  return (
    <>
      <Router />
      <Toaster />
    </>
  );
}

export default App;
