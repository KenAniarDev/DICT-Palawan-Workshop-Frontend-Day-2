import Navbar from "../components/Navbar";
import Link from "next/link";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import api from "../utils/api";
import { nanoid } from "nanoid";
import { useRouter } from "next/router";
import useStore from "../hooks/useStore";

export default function CreateBlog() {
  const router = useRouter();
  const isLoggedIn = useStore((state) => state.isLoggedIn);
  const userData = useStore((state) => state.userData);
  const [formValues, setFormValues] = useState({
    image: "",
    title: "",
    description: "",
    userPosted: userData._id,
  });

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const post = await api.post("/blog/create-post", { ...formValues });
      alert("Blog Post Added");
      router.push("/blogs/" + post.data.data.newPost._id);
    } catch (error) {
      console.log(error);
      alert("Error Adding Blog Post");
    }
  }

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [isLoggedIn]);
  return (
    <>
      <Navbar />
      <div className="py-10 px-5">
        <form
          className="mx-auto max-w-[600px] text-dark text-lg"
          onSubmit={handleSubmit}
        >
          <h1 className="text-4xl sm:text-5xl font-bold">
            Create New Blog Post
          </h1>

          <div className="mt-10">
            <label htmlFor="image" className="font-medium">
              Image
            </label>
            <input
              type="text"
              name="image"
              className="mt-1 w-full bg-light outline-none placeholder:text-dark px-3 py-2 rounded"
              placeholder="Enter image link"
              value={formValues.image}
              onChange={(e) => {
                setFormValues((state) => ({
                  ...state,
                  image: e.target.value,
                }));
              }}
              required
            />
          </div>

          <div className="mt-4">
            <label htmlFor="title" className="font-medium">
              Blog Title
            </label>
            <input
              type="text"
              name="title"
              className="mt-1 w-full bg-light outline-none placeholder:text-dark px-3 py-2 rounded"
              placeholder="Enter your blog title"
              value={formValues.title}
              onChange={(e) => {
                setFormValues((state) => ({
                  ...state,
                  title: e.target.value,
                }));
              }}
              required
            />
          </div>

          <div className="mt-4">
            <label htmlFor="description" className="font-medium">
              Blog Text
            </label>
            <textarea
              name="description"
              rows={5}
              className="mt-1 w-full bg-light outline-none placeholder:text-dark px-3 py-2 rounded"
              placeholder="Enter your blog text"
              value={formValues.description}
              onChange={(e) => {
                setFormValues((state) => ({
                  ...state,
                  description: e.target.value,
                }));
              }}
              required
            />
          </div>

          <div className="flex justify-between mt-10">
            <Link href="/">
              <a>Return to Homepage</a>
            </Link>
            <button className="px-5 py-1 bg-secondary text-white rounded">
              Post
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
