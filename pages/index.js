import Image from "next/image";
import Link from "next/link";
import api from "../utils/api";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import BlogCard from "../components/BlogCard";
import useStore from "../hooks/useStore";

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const isLoggedIn = useStore((state) => state.isLoggedIn);
  const fetchData = async () => {
    try {
      const result = await api.get("/blog/get-all-posts");
      setBlogs(result.data.data.posts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <Navbar />
      <main>
        {/* Banner */}
        <div className="max-w-[1920px] mx-auto px-5 h-[420px] relative">
          <img
            src="/bannerbg.jpg"
            className="w-full h-full object-cover rounded-lg"
          />
          <div className="absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center">
            <h1 className="text-4xl lg:text-5xl font-bold bg-white px-4 py-3 rounded-lg">
              Spy Missions
            </h1>
          </div>
          <div className="absolute bottom-8 right-16">
            <Link href={isLoggedIn ? "/create-blog" : "/login"}>
              <a className="bg-secondary text-white px-4 py-3 rounded-lg hover:bg-dark-secondary transition">
                Create Blog Post
              </a>
            </Link>
          </div>
        </div>
        {/* Banner */}
        {/* Blogs */}
        <div className="max-w-[1920px] mx-auto px-10 sm:px-14 md:px-16 xl:px-20 py-10 grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
          {blogs.map((e) => (
            <BlogCard key={e.id} {...e} />
          ))}
        </div>
      </main>
    </>
  );
}
