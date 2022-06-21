import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Link from "next/link";
import api from "../../utils/api";
import useStore from "../../hooks/useStore";

export default function SingleBlog() {
  const [blog, setBlog] = useState(null);
  const router = useRouter();
  const userData = useStore((state) => state.userData);
  const isLoggedIn = useStore((state) => state.isLoggedIn);

  async function fetchData() {
    try {
      const result = await api.get(
        "/blog/get-specific-post/" + router.query.id
      );
      setBlog(result.data.data.post);
    } catch (error) {
      alert("Error Fetching Data, Redirecting back to Homepage");
      router.push("/");
    }
  }

  async function deleteBlog() {
    try {
      await api.delete("/blog/delete-post/" + router.query.id);
      alert("Blog Deleted");
      router.push("/");
    } catch (error) {
      alert("Error Deleting Blog");
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
      {blog && (
        <div className="max-w-[1440px] px-5 md:px-12 lg:px-20 mx-auto py-10">
          <img src={blog.image} className="w-full" />

          <h1 className="text-primary text-5xl mt-10 leading-tight">
            {blog.title}
          </h1>
          <small className="text-xl text-gray-500">
            Posted on {blog.dateCreated}
          </small>

          <p className="mt-5">{blog.description}</p>

          <div className="flex justify-between">
            <Link href="/">
              <a className="mt-8 inline-block bg-dark text-white px-3 py-2 rounded hover:bg-primary transition">
                Return to Home
              </a>
            </Link>
            {isLoggedIn && (
              <>
                {blog.userPosted === userData._id && (
                  <div>
                    <Link href={"/edit/" + blog._id}>
                      <a className="mt-8 inline-block bg-secondary text-white px-3 py-2 rounded hover:bg-dark-secondary transition">
                        Edit
                      </a>
                    </Link>
                    <button
                      onClick={deleteBlog}
                      className="mt-8 ml-2 inline-block bg-primary text-white px-3 py-2 rounded hover:bg-dark-primary transition"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
