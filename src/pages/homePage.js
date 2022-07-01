import { useEffect } from "react";
import { Header } from "../components/header";
import { Home } from "../components/mainContentHP";

export function HomePage() {
  useEffect(() => {
    document.title = "Memories | Home";
  }, []);
  return (
    <div className="home">
      <Header />
      <Home />
    </div>
  );
}
