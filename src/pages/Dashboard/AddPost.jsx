



// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import Select from "react-select";
// import Swal from "sweetalert2";
// import { useNavigate } from "react-router";
// import useAuth from "../../hooks/useAuth";
// import useAxiosSecure from "../../hooks/useAxiosSecure";

// const tagOptions = [
//   { value: "technology", label: "Technology" },
//   { value: "education", label: "Education" },
//   { value: "lifestyle", label: "Lifestyle" },
//   { value: "news", label: "News" },
//   { value: "health", label: "Health" },
//   { value: "sports", label: "Sports" },
//   { value: "finance", label: "Finance" },
//   { value: "travel", label: "Travel" },
// ];

// const AddPost = () => {
//   const { user } = useAuth();
//   const axiosSecure = useAxiosSecure();
//   const navigate = useNavigate();
//   const [postCount, setPostCount] = useState(0);
//   const [isLoading, setIsLoading] = useState(true);
//   const [selectedTag, setSelectedTag] = useState(null);

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm();

//   useEffect(() => {
//     const fetchPostCount = async () => {
//       try {
//         const res = await axiosSecure.get(`/posts/user/count?email=${user?.email}`);
//         setPostCount(res.data.count || 0);
//       } catch (err) {
//         console.error("Failed to fetch post count", err);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     if (user?.email) {
//       fetchPostCount();
//     }
//   }, [user, axiosSecure]);

//   const onSubmit = async (data) => {
//     const newPost = {
//       authorImage: user.photoURL,
//       authorName: user.displayName,
//       authorEmail: user.email,
//       title: data.title,
//       description: data.description,
//       tag: selectedTag?.value || "general",
//       upVote: 0,
//       downVote: 0,
//       createdAt: new Date(),
//     };

//     try {
//       const res = await axiosSecure.post("/posts", newPost);
//       if (res.data.insertedId) {
//         reset();
//         setSelectedTag(null);
//         Swal.fire({
//           title: "Success!",
//           text: "Your post has been added.",
//           icon: "success",
//           confirmButtonText: "OK",
//         });
//         navigate("/dashboard/myPost");
//       }
//     } catch (err) {
//       if (err.response?.status === 403) {
//         Swal.fire({
//           title: "Limit Reached!",
//           text: err.response?.data?.message || "Upgrade to Gold to post more.",
//           icon: "warning",
//           confirmButtonText: "Go to Membership",
//         }).then(() => navigate("/membership"));
//       } else {
//         Swal.fire({
//           title: "Error!",
//           text: "Something went wrong. Please try again.",
//           icon: "error",
//           confirmButtonText: "OK",
//         });
//       }
//     }
//   };

//   if (isLoading) return <div className="text-center py-10">Loading...</div>;

//   return (
//     <div className="max-w-3xl mx-auto bg-gray-500 p-8 rounded shadow">
//       <h2 className="text-2xl font-bold mb-6">Add New Post</h2>

//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//         <div>
//           <label className="font-medium">Author Name</label>
//           <input
//             type="text"
//             value={user?.displayName}
//             readOnly
//             className="w-full mt-1 border p-2 rounded bg-gray-700"
//           />
//         </div>

//         <div>
//           <label className="font-medium">Author Email</label>
//           <input
//             type="email"
//             value={user?.email}
//             readOnly
//             className="w-full mt-1 border p-2 rounded bg-gray-700"
//           />
//         </div>

//         <div>
//           <label className="font-medium">Post Title</label>
//           <input
//             type="text"
//             {...register("title", { required: true })}
//             className="w-full mt-1 border p-2 rounded"
//           />
//           {errors.title && <p className="text-red-500">Title is required</p>}
//         </div>

//         <div>
//           <label className="font-medium">Post Description</label>
//           <textarea
//             rows={5}
//             {...register("description", { required: true })}
//             className="w-full mt-1 border p-2 rounded"
//           ></textarea>
//           {errors.description && <p className="text-red-500">Description is required</p>}
//         </div>

//         <div>
//           <label className="font-medium block mb-1">Select Tag</label>
//           <Select
//             options={tagOptions}
//             value={selectedTag}
//             onChange={setSelectedTag}
//             placeholder="Select a tag"
//             isClearable
//             styles={{
//               control: (base) => ({
//                 ...base,
//                 backgroundColor: "#1f2937",
//                 borderColor: "#374151",
//                 color: "#fff",
//               }),
//               singleValue: (base) => ({ ...base, color: "white" }),
//               menu: (base) => ({ ...base, backgroundColor: "#1f2937", color: "#fff" }),
//               option: (base, state) => ({
//                 ...base,
//                 backgroundColor: state.isFocused ? "#374151" : "#1f2937",
//                 color: "white",
//               }),
//             }}
//           />
//         </div>

//         <div>
//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
//           >
//             Add Post
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AddPost;








import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AddPost = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [postCount, setPostCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [tagOptions, setTagOptions] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Backend থেকে ট্যাগগুলো ফেচ করা
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await axiosSecure.get("/tags");
        const options = res.data.map(tag => ({
          value: tag.name,
          label: tag.name.charAt(0).toUpperCase() + tag.name.slice(1),
        }));
        setTagOptions(options);
      } catch (err) {
        console.error("Failed to fetch tags", err);
      }
    };

    fetchTags();
  }, [axiosSecure]);

  // User এর পোস্টের সংখ্যা ফেচ করা
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
      if (err.response?.status === 403) {
        Swal.fire({
          title: "Limit Reached!",
          text: err.response?.data?.message || "Upgrade to Gold to post more.",
          icon: "warning",
          confirmButtonText: "Go to Membership",
        }).then(() => navigate("/membership"));
      } else {
        Swal.fire({
          title: "Error!",
          text: "Something went wrong. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }
  };

  if (isLoading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto bg-gray-500 p-8 rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Add New Post</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="font-medium">Author Name</label>
          <input
            type="text"
            value={user?.displayName}
            readOnly
            className="w-full mt-1 border p-2 rounded bg-gray-700"
          />
        </div>

        <div>
          <label className="font-medium">Author Email</label>
          <input
            type="email"
            value={user?.email}
            readOnly
            className="w-full mt-1 border p-2 rounded bg-gray-700"
          />
        </div>

        <div>
          <label className="font-medium">Post Title</label>
          <input
            type="text"
            {...register("title", { required: true })}
            className="w-full mt-1 border p-2 rounded"
          />
          {errors.title && <p className="text-red-500">Title is required</p>}
        </div>

        <div>
          <label className="font-medium">Post Description</label>
          <textarea
            rows={5}
            {...register("description", { required: true })}
            className="w-full mt-1 border p-2 rounded"
          ></textarea>
          {errors.description && <p className="text-red-500">Description is required</p>}
        </div>

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
                backgroundColor: "#1f2937",
                borderColor: "#374151",
                color: "#fff",
              }),
              singleValue: (base) => ({ ...base, color: "white" }),
              menu: (base) => ({ ...base, backgroundColor: "#1f2937", color: "#fff" }),
              option: (base, state) => ({
                ...base,
                backgroundColor: state.isFocused ? "#374151" : "#1f2937",
                color: "white",
              }),
            }}
          />
        </div>

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
