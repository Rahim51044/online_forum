








// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import Select from "react-select";
// import Swal from "sweetalert2";
// import { useNavigate } from "react-router";
// import useAuth from "../../hooks/useAuth";
// import useAxiosSecure from "../../hooks/useAxiosSecure";

// const AddPost = () => {
//   const { user } = useAuth();
//   const axiosSecure = useAxiosSecure();
//   const navigate = useNavigate();

//   const [postCount, setPostCount] = useState(0);
//   const [isLoading, setIsLoading] = useState(true);
//   const [tagOptions, setTagOptions] = useState([]);
//   const [selectedTag, setSelectedTag] = useState(null);

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm();

//   // Backend থেকে ট্যাগগুলো ফেচ করা
//   useEffect(() => {
//     const fetchTags = async () => {
//       try {
//         const res = await axiosSecure.get("/tags");
//         const options = res.data.map(tag => ({
//           value: tag.name,
//           label: tag.name.charAt(0).toUpperCase() + tag.name.slice(1),
//         }));
//         setTagOptions(options);
//       } catch (err) {
//         console.error("Failed to fetch tags", err);
//       }
//     };

//     fetchTags();
//   }, [axiosSecure]);

//   // User এর পোস্টের সংখ্যা ফেচ করা
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





// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import Select from "react-select";
// import Swal from "sweetalert2";
// import { useNavigate } from "react-router";
// import useAuth from "../../hooks/useAuth";
// import useAxiosSecure from "../../hooks/useAxiosSecure";

// const AddPost = () => {
//   const { user } = useAuth();
//   const axiosSecure = useAxiosSecure();
//   const navigate = useNavigate();

//   const [postCount, setPostCount] = useState(0);
//   const [isLoading, setIsLoading] = useState(true);
//   const [tagOptions, setTagOptions] = useState([]);
//   const [selectedTag, setSelectedTag] = useState(null);

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm();

//   useEffect(() => {
//     const fetchTags = async () => {
//       try {
//         const res = await axiosSecure.get("/tags");
//         const options = res.data.map(tag => ({
//           value: tag.name,
//           label: tag.name.charAt(0).toUpperCase() + tag.name.slice(1),
//         }));
//         setTagOptions(options);
//       } catch (err) {
//         console.error("Failed to fetch tags", err);
//       }
//     };
//     fetchTags();
//   }, [axiosSecure]);

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

//   if (isLoading) return <div className="text-center py-10 text-white">Loading...</div>;

//   return (
//     <div className="max-w-3xl mx-auto bg-gray-900 p-8 rounded-xl shadow-lg border border-gray-700 text-white">
//       <h2 className="text-3xl font-bold mb-8 text-center text-blue-400">Add New Post</h2>

//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//         {/* Author Info */}
//         <div>
//           <label className="font-semibold block mb-1">Author Name</label>
//           <input
//             type="text"
//             value={user?.displayName}
//             readOnly
//             className="w-full rounded-md bg-gray-800 border border-gray-700 px-3 py-2 text-gray-300"
//           />
//         </div>

//         <div>
//           <label className="font-semibold block mb-1">Author Email</label>
//           <input
//             type="email"
//             value={user?.email}
//             readOnly
//             className="w-full rounded-md bg-gray-800 border border-gray-700 px-3 py-2 text-gray-300"
//           />
//         </div>

//         {/* Title */}
//         <div>
//           <label className="font-semibold block mb-1">Post Title</label>
//           <input
//             type="text"
//             {...register("title", { required: "Title is required" })}
//             className={`w-full rounded-md px-3 py-2 border ${
//               errors.title ? "border-red-500" : "border-gray-700"
//             } bg-gray-800 text-white`}
//             placeholder="Enter post title"
//           />
//           {errors.title && (
//             <p className="text-red-500 mt-1 text-sm">{errors.title.message}</p>
//           )}
//         </div>

//         {/* Description */}
//         <div>
//           <label className="font-semibold block mb-1">Post Description</label>
//           <textarea
//             rows={5}
//             {...register("description", { required: "Description is required" })}
//             className={`w-full rounded-md px-3 py-2 border ${
//               errors.description ? "border-red-500" : "border-gray-700"
//             } bg-gray-800 text-white resize-none`}
//             placeholder="Write your post description here..."
//           ></textarea>
//           {errors.description && (
//             <p className="text-red-500 mt-1 text-sm">{errors.description.message}</p>
//           )}
//         </div>

//         {/* Tag Select */}
//         <div>
//           <label className="font-semibold block mb-2">Select Tag</label>
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
//                 minHeight: "40px",
//               }),
//               singleValue: (base) => ({ ...base, color: "white" }),
//               menu: (base) => ({ ...base, backgroundColor: "#1f2937", color: "#fff" }),
//               option: (base, state) => ({
//                 ...base,
//                 backgroundColor: state.isFocused ? "#374151" : "#1f2937",
//                 color: "white",
//                 cursor: "pointer",
//               }),
//               placeholder: (base) => ({ ...base, color: "#9ca3af" }),
//             }}
//           />
//         </div>

//         {/* Submit Button */}
//         <div>
//           <button
//             type="submit"
//             className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-3 rounded-md"
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
import { useQueryClient } from "@tanstack/react-query";  // Import useQueryClient
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AddPost = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const queryClient = useQueryClient();  // Initialize queryClient

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

        // Invalidate recent-posts query to update posts in MyProfile page
        queryClient.invalidateQueries(["recent-posts"]);

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

  if (isLoading) return <div className="text-center py-10 text-white">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto bg-gray-900 p-8 rounded-xl shadow-lg border border-gray-700 text-white">
      <h2 className="text-3xl font-bold mb-8 text-center text-blue-400">Add New Post</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Author Info */}
        <div>
          <label className="font-semibold block mb-1">Author Name</label>
          <input
            type="text"
            value={user?.displayName}
            readOnly
            className="w-full rounded-md bg-gray-800 border border-gray-700 px-3 py-2 text-gray-300"
          />
        </div>

        <div>
          <label className="font-semibold block mb-1">Author Email</label>
          <input
            type="email"
            value={user?.email}
            readOnly
            className="w-full rounded-md bg-gray-800 border border-gray-700 px-3 py-2 text-gray-300"
          />
        </div>

        {/* Title */}
        <div>
          <label className="font-semibold block mb-1">Post Title</label>
          <input
            type="text"
            {...register("title", { required: "Title is required" })}
            className={`w-full rounded-md px-3 py-2 border ${
              errors.title ? "border-red-500" : "border-gray-700"
            } bg-gray-800 text-white`}
            placeholder="Enter post title"
          />
          {errors.title && <p className="text-red-500 mt-1 text-sm">{errors.title.message}</p>}
        </div>

        {/* Description */}
        <div>
          <label className="font-semibold block mb-1">Post Description</label>
          <textarea
            rows={5}
            {...register("description", { required: "Description is required" })}
            className={`w-full rounded-md px-3 py-2 border ${
              errors.description ? "border-red-500" : "border-gray-700"
            } bg-gray-800 text-white resize-none`}
            placeholder="Write your post description here..."
          ></textarea>
          {errors.description && (
            <p className="text-red-500 mt-1 text-sm">{errors.description.message}</p>
          )}
        </div>

        {/* Tag Select */}
        <div>
          <label className="font-semibold block mb-2">Select Tag</label>
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
                minHeight: "40px",
              }),
              singleValue: (base) => ({ ...base, color: "white" }),
              menu: (base) => ({ ...base, backgroundColor: "#1f2937", color: "#fff" }),
              option: (base, state) => ({
                ...base,
                backgroundColor: state.isFocused ? "#374151" : "#1f2937",
                color: "white",
                cursor: "pointer",
              }),
              placeholder: (base) => ({ ...base, color: "#9ca3af" }),
            }}
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-3 rounded-md"
          >
            Add Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPost;
