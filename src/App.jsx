import Router from "./components/Router";
import StateProvider from "./context/context";

export default function App() {
  return (
    <StateProvider>
      <Router />
    </StateProvider>
  );
}