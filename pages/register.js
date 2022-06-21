import Link from "next/link";
import Navbar from "../components/Navbar";
import api from "../utils/api";
import { useState, useEffect } from "react";
import useStore from "../hooks/useStore";
import { useRouter } from "next/router";

export default function Register() {
  const [formValues, setFormValues] = useState({
    name: "",
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
      const result = await api.post("/user/create-user", formValues);
      localStorage.setItem("userData", JSON.stringify(result.data.data));
      setUserData(result.data.data);
      setIsLoggedIn(true);
      alert("Success!");
    } catch (error) {
      console.log(error);
      alert("Error registering User," + error.response?.data.message);
    }
  }

  useEffect(() => {
    if (isLoggedIn) {
      // redirect
      router.push("/");
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
          <h1 className="text-5xl sm:text-6xl font-bold">Register.</h1>

          <div className="mt-10">
            <label htmlFor="name" className="font-medium">
              Name
            </label>
            <input
              type="text"
              name="name"
              className="mt-1 w-full bg-light outline-none placeholder:text-dark px-3 py-2 rounded"
              placeholder="Enter your name"
              value={formValues.name}
              onChange={(e) =>
                setFormValues((state) => ({
                  ...state,
                  name: e.target.value,
                }))
              }
              required
            />
          </div>

          <div className="mt-6">
            <label htmlFor="username" className="font-medium">
              Username
            </label>
            <input
              type="text"
              name="username"
              className="mt-1 w-full bg-light outline-none placeholder:text-dark px-3 py-2 rounded"
              placeholder="Enter your username"
              value={formValues.username}
              onChange={(e) =>
                setFormValues((state) => ({
                  ...state,
                  username: e.target.value,
                }))
              }
              required
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
              value={formValues.password}
              onChange={(e) =>
                setFormValues((state) => ({
                  ...state,
                  password: e.target.value,
                }))
              }
              required
            />
          </div>

          <button className="mt-8 w-full bg-primary text-white py-3 rounded font-medium">
            Register
          </button>
          <p className="mt-2 text-base text-center font-semibold">
            Already have an Account?{" "}
            <Link href="/login">
              <a className="text-primary">Login Here</a>
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}
