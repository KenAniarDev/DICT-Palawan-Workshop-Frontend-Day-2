import Link from "next/link";
import Navbar from "../components/Navbar";
import api from "../utils/api";
import { useState, useEffect } from "react";
import useStore from "../hooks/useStore";
import { useRouter } from "next/router";

export default function Login() {
  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
  });
  const router = useRouter();
  const isLoggedIn = useStore((state) => state.isLoggedIn);
  const setIsLoggedIn = useStore((state) => state.setIsLoggedIn);
  const setUserData = useStore((state) => state.setUserData);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const result = await api.post("/user/login-user", formValues);
      console.log(result.data.userData);
      localStorage.setItem("userData", JSON.stringify(result.data.userData));
      setUserData(result.data.userData);
      setIsLoggedIn(true);
      alert("Success!");
    } catch (error) {
      alert(error.response.data.errorMessage);
    }
  }

  useEffect(() => {
    if (isLoggedIn) {
      // redirect
      // router.push("/");
    }
  }, [isLoggedIn]);

  return (
    <>
      <Navbar />
      <div className="py-20 px-5">
        <form
          className="mx-auto max-w-[600px]  border border-gray-500 rounded-lg px-5 sm:px-10 py-14 sm:py-20 text-dark text-lg"
          onSubmit={handleSubmit}
        >
          <h1 className="text-5xl sm:text-6xl font-bold">Login.</h1>

          <div className="mt-10">
            <label htmlFor="username" className="font-medium">
              Username
            </label>
            <input
              type="text"
              name="username"
              className="mt-1 w-full bg-light outline-none placeholder:text-dark px-3 py-2 rounded"
              placeholder="Enter your username"
              required
              value={formValues.username}
              onChange={(e) =>
                setFormValues((state) => ({
                  ...state,
                  username: e.target.value,
                }))
              }
            />
          </div>

          <div className="mt-6">
            <label htmlFor="password" className="font-medium">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="mt-1 w-full bg-light outline-none placeholder:text-dark px-3 py-2 rounded"
              placeholder="Enter your password"
              required
              value={formValues.password}
              onChange={(e) =>
                setFormValues((state) => ({
                  ...state,
                  password: e.target.value,
                }))
              }
            />
          </div>

          <button className="mt-8 w-full bg-primary text-white py-3 rounded font-medium">
            Login
          </button>
          <p className="mt-2 text-base text-center font-semibold">
            Not yet Registered?{" "}
            <Link href="/register">
              <a className="text-primary">Register Here</a>
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}
