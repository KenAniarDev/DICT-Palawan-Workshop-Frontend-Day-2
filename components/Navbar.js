import react from "react";
import Link from "next/link";
import useStore from "../hooks/useStore";
import { useEffect } from "react";
import Head from "next/head";

export default function Navbar() {
  const isLoggedIn = useStore((state) => state.isLoggedIn);
  const setIsLoggedIn = useStore((state) => state.setIsLoggedIn);
  const setUserData = useStore((state) => state.setUserData);

  function logout() {
    localStorage.removeItem("userData");
    setUserData(null);
    setIsLoggedIn(false);
  }

  return (
    <>
      <Head>
        <title>Anya&apos;s Blog</title>
      </Head>
      <nav className="py-5 text-xl">
        <div className="max-w-[1920px] mx-auto px-5 flex justify-between">
          <Link href="/">
            <a className="font-bold">Anya&apos;s Blog</a>
          </Link>

          <div>
            {isLoggedIn ? (
              <button className="ml-3" onClick={logout}>
                Logout
              </button>
            ) : (
              <>
                <Link href="/login">
                  <a className="">Login</a>
                </Link>
                <span className="mx-3">|</span>
                <Link href="/register">
                  <a>Register</a>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
