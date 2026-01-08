import { Header } from "./Header";
import { Footer } from "./Footer";
import { useLocation } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const isAppDemo = location.pathname === "/app-demo";

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className={`flex-1 ${isAppDemo ? "" : "pt-[73px]"}`}>{children}</main>
      {!isAppDemo && <Footer />}
    </div>
  );
}
