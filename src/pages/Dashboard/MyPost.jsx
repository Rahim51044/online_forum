

import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useState } from "react";

const MyPosts = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [page, setPage] = useState(1);
  const limit = 10;

  const {
    data = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["user-posts", user?.email, page],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/posts/user?email=${user.email}&page=${page}&limit=${limit}`
      );
      return res.data;
    },
    enabled: !!user?.email,
    keepPreviousData: true,
  });

  const posts = data.posts || [];
  const total = data.total || 0;
  const totalPages = Math.ceil(total / limit);

  const handleDelete = async (postId) => {
    const confirm = window.confirm("Are you sure you want to delete this post?");
    if (!confirm) return;

    try {
      await axiosSecure.delete(`/posts/${postId}`);
      refetch();
    } catch (error) {
      alert("Failed to delete post.");
    }
  };

  if (isLoading) return <p className="text-center text-white">Loading...</p>;

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto text-white">
      <h2 className="text-2xl font-bold mb-4">My Posts</h2>

      {/* ✅ Table container */}
      <div className="w-full overflow-x-auto">
        <table className="table w-full bg-base-200 rounded table-zebra">
          <thead className="bg-base-300 text-white">
            <tr>
              <th className="min-w-[180px] py-3 px-4">Title</th>
              <th className="min-w-[80px] text-center">Votes</th>
              <th className="min-w-[100px] text-center">Comments</th>
              <th className="min-w-[100px] text-center">Delete</th>
            </tr>
          </thead>
          <tbody>
            {posts.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  No posts found.
                </td>
              </tr>
            )}
            {posts.map((post) => (
              <tr key={post._id}>
                <td className="py-3 px-4 break-words">{post.title}</td>
                <td className="text-center">{(post.upVote || 0) - (post.downVote || 0)}</td>
                <td className="text-center">
                  <Link to={`/comments/${post._id}`} className="btn btn-xs btn-info">
                    Comments
                  </Link>
                </td>
                <td className="text-center">
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="btn btn-xs btn-error whitespace-nowrap"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ Pagination */}
      {totalPages > 1 && (
        <div className="mt-4 flex justify-center flex-wrap gap-2">
          {[...Array(totalPages).keys()].map((i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 rounded ${
                page === i + 1 ? "bg-blue-500 text-white" : "bg-gray-600 text-white"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPosts;
