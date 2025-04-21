import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Chatbox from "../components/Chatbox/Chatbox";
import Routers from "../routes/Routers";

const Layout = () => {
  const layoutRef = useRef(null);
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    layoutRef.current.classList.add("fade-in");
  }, []);

  useEffect(() => {
    // Show spinner on every route change
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [location]);

  return (
    <div ref={layoutRef}>
      {loading && (
        <div className="spinner-overlay">
          <div className="spinner" />
        </div>
      )}
      <Header />
      <main>
        <Routers />
      </main>
      <Chatbox />
      <Footer />
    </div>
  );
};

export default Layout;
