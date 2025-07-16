import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const TagList = () => {
  const axiosSecure = useAxiosSecure();
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);

  // ট্যাগ গুলো ফেচ করার ফাংশন
  const fetchTags = async () => {
    try {
      setLoading(true);
      const res = await axiosSecure.get("/tags");
      setTags(res.data);
    } catch (error) {
      console.error("Failed to fetch tags:", error);
      Swal.fire("Error", "Failed to load tags", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  // ট্যাগ ডিলিট করার ফাংশন
  const handleDelete = async (id) => {
    const confirmResult = await Swal.fire({
      title: "Are you sure?",
      text: "This tag will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (confirmResult.isConfirmed) {
      try {
        await axiosSecure.delete(`/tags/${id}`);
        Swal.fire("Deleted!", "Tag has been deleted.", "success");
        fetchTags(); // ডিলিটের পরে আবার তালিকা রিফ্রেশ
      } catch (error) {
        console.error("Failed to delete tag:", error);
        Swal.fire("Error", "Failed to delete tag", "error");
      }
    }
  };

  if (loading) return <div className="text-center py-10">Loading tags...</div>;

  return (
    <div className="max-w-xl mx-auto bg-gray-700 p-6 rounded shadow text-white">
      <h2 className="text-2xl font-bold mb-4">Tags List</h2>
      {tags.length === 0 ? (
        <p>No tags found.</p>
      ) : (
        <ul>
          {tags.map((tag) => (
            <li
              key={tag._id}
              className="flex justify-between items-center border-b border-gray-600 py-2"
            >
              <span className="capitalize">{tag.name}</span>
              <button
                onClick={() => handleDelete(tag._id)}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TagList;
