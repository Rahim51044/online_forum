import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure"; // your axios instance with auth headers
import useAuth from "../../hooks/useAuth"; // your custom auth hook

const tagOptions = [
  { value: "technology", label: "Technology" },
  { value: "education", label: "Education" },
  { value: "lifestyle", label: "Lifestyle" },
  { value: "news", label: "News" },
];

const AddPost = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [postCount, setPostCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTag, setSelectedTag] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // 🔄 Fetch user's post count
  useEffect(() => {
    const fetchPostCount = async () => {
      try {
        const res = await axiosSecure.get(`/posts/user/count?email=${user?.email}`);
        setPostCount(res.data.count || 0);
      } catch (err) {
        console.error("Failed to fetch post count", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (user?.email) {
      fetchPostCount();
    }
  }, [user, axiosSecure]);

  // ✅ Handle form submission
  const onSubmit = async (data) => {
    const newPost = {
      authorImage: user.photoURL,
      authorName: user.displayName,
      authorEmail: user.email,
      title: data.title,
      description: data.description,
      tag: selectedTag?.value || "general",
      upVote: 0,
      downVote: 0,
      createdAt: new Date(),
    };

    try {
      const res = await axiosSecure.post("/posts", newPost);
      if (res.data.insertedId) {
        reset();
        setSelectedTag(null);
        Swal.fire({
          title: "Success!",
          text: "Your post has been added.",
          icon: "success",
          confirmButtonText: "OK",
        });
        navigate("/dashboard/myPost");
      }
    } catch (err) {
      console.error("Post creation failed", err);
      Swal.fire({
        title: "Error!",
        text: "Something went wrong. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  if (isLoading) return <div className="text-center py-10">Loading...</div>;

  // 🚫 If user has more than 5 posts
  if (postCount >= 5) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-2xl font-semibold mb-4">You have reached your post limit (5).</h2>
        <p className="mb-6">Become a member to post more!</p>
        <button
          onClick={() => navigate("/membership")}
          className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Become a Member
        </button>
      </div>
    );
  }

  // 📝 Add Post Form
  return (
    <div className="max-w-3xl mx-auto bg-gray-500 p-8 rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Add New Post</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Author Name */}
        <div>
          <label className="font-medium">Author Name</label>
          <input
            type="text"
            value={user?.displayName}
            readOnly
            className="w-full mt-1 border p-2 rounded bg-gray-700"
          />
        </div>

        {/* Author Email */}
        <div>
          <label className="font-medium">Author Email</label>
          <input
            type="email"
            value={user?.email}
            readOnly
            className="w-full mt-1 border p-2 rounded bg-gray-700"
          />
        </div>

        {/* Title */}
        <div>
          <label className="font-medium">Post Title</label>
          <input
            type="text"
            {...register("title", { required: true })}
            className="w-full mt-1 border p-2 rounded"
          />
          {errors.title && <p className="text-red-500">Title is required</p>}
        </div>

        {/* Description */}
        <div>
          <label className="font-medium">Post Description</label>
          <textarea
            rows={5}
            {...register("description", { required: true })}
            className="w-full mt-1 border p-2 rounded"
          ></textarea>
          {errors.description && <p className="text-red-500">Description is required</p>}
        </div>

        {/* Tag */}
        <div>
          <label className="font-medium block mb-1">Select Tag</label>
          <Select
  options={tagOptions}
  value={selectedTag}
  onChange={setSelectedTag}
  placeholder="Select a tag"
  isClearable
  styles={{
    control: (base) => ({
      ...base,
      backgroundColor: "#1f2937", // bg-gray-800
      borderColor: "#374151",     // border-gray-700
      color: "#fff",
    }),
    singleValue: (base) => ({
      ...base,
      color: "white",
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: "#1f2937",
      color: "#fff",
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused ? "#374151" : "#1f2937",
      color: "white",
    }),
  }}
/>

        </div>

        {/* Submit */}
        <div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Add Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPost;
