import { Switch, Route } from "wouter";

import Home from "./pages/Home";
import Translator from "./pages/Translator";
import Currency from "./pages/Currency";
import Emergency from "./pages/Emergency";
import Units from "./pages/Units";
import Guide from "./pages/Guide"; // [Added] Import the new Guide page
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
      <Route path="/guide" component={Guide} /> {/* [Added] New route for Guide */}
      <Route path="/settings" component={Settings} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return <Router />;
}