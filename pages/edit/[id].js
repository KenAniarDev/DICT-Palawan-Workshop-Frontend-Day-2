import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Link from "next/link";
import api from "../../utils/api";
import { nanoid } from "nanoid";
import useStore from "../../hooks/useStore";

export default function SingleBlog() {
  const [formValues, setFormValues] = useState(null);
  const router = useRouter();
  const userData = useStore((state) => state.userData);

  async function fetchData() {
    try {
      const result = await api.get(
        "/blog/get-specific-post/" + router.query.id
      );
      setFormValues(result.data.data.post);
      if (userData._id !== result.data.data.post.userPosted) {
        router.push("/blogs/" + router.query.id);
      }
    } catch (error) {
      console.log(error);
      alert("Error Fetching Data, Redirecting back to Homepage");
      router.push("/");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await api.patch("/blog/update-post/" + formValues._id, {
        ...formValues,
      });
      alert("Blog Post Updated");
      router.push("/blogs/" + formValues._id);
    } catch (error) {
      console.log(error);
      alert("Error Updating Blog Post");
    }
  }

  useEffect(() => {
    if (router.query.id) {
      fetchData();
    }
  }, [router]);
  return (
    <>
      <Navbar />
      {formValues && (
        <div className="py-10 px-5">
          <form
            className="mx-auto max-w-[600px] text-dark text-lg"
            onSubmit={handleSubmit}
          >
            <h1 className="text-4xl sm:text-5xl font-bold">Update Blog Post</h1>

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
                Update
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
