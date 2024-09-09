import { lazy, Suspense } from "react";
import Navbar from "../Components/Navbar";
const Home = lazy(() => import("../Screens/Home"));

function App() {
  return (
    <Suspense>
      <Navbar />
      <Home />
    </Suspense>
  );
}

export default App;
