import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const TagsSection = ({ onTagClick }) => {
  const [tags, setTags] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await axiosSecure.get("/tags/all");
              console.log("Tags from backend:", res.data);  // এই লাইনটি যোগ করো

        setTags(res.data || []);
      } catch (error) {
        console.error("Failed to fetch tags", error);
      }
    };
    fetchTags();
  }, [axiosSecure]);

  return (
    <div className="max-w-6xl mx-auto my-8 px-4">
      <h2 className="text-2xl font-bold mb-4">All Available Tags</h2>
      <div className="flex flex-wrap gap-3">
        {tags.length === 0 ? (
          <p>No tags found.</p>
        ) : (
          tags.map((tag, i) => (
            <button
              key={i}
              onClick={() => onTagClick(tag)}
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              #{tag}
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default TagsSection;
