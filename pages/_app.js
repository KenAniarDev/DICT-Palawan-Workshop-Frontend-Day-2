import "../styles/globals.css";
import { useEffect } from "react";
import useStore from "../hooks/useStore";

function MyApp({ Component, pageProps }) {
  const setIsLoggedIn = useStore((state) => state.setIsLoggedIn);
  const setUserData = useStore((state) => state.setUserData);
  useEffect(() => {
    if (localStorage.getItem("userData")) {
      setUserData(JSON.parse(localStorage.getItem("userData")));
      setIsLoggedIn(true);
    }
  }, []);
  return <Component {...pageProps} />;
}

export default MyApp;
