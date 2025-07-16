


// import { useForm } from "react-hook-form";
// import Swal from "sweetalert2";
// import { useNavigate } from "react-router";
// import useAuth from "../../../hooks/useAuth";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";

// const MakeAnnouncement = () => {
//   const { user } = useAuth();
//   const axiosSecure = useAxiosSecure();
//   const navigate = useNavigate();

//   const { register, handleSubmit, reset } = useForm();

//   const onSubmit = async (data) => {
//     const newAnnouncement = {
//       authorImage: user.photoURL,
//       authorName: user.displayName,
//       title: data.title,
//       description: data.description,
//     };

//     try {
//       const res = await axiosSecure.post("/announcements", newAnnouncement);
//       if (res.data.insertedId) {
//         Swal.fire("Success!", "Announcement posted.", "success");
//         reset();
//         navigate("/");
//       }
//     } catch (err) {
//       Swal.fire("Error", "Something went wrong.", "error");
//     }
//   };

//   return (
//     <div className="max-w-xl mx-auto mt-10 bg-gray-700 text-white p-6 rounded shadow">
//       <h2 className="text-2xl font-bold mb-4">Make Announcement</h2>
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//         <input value={user.displayName} readOnly className="w-full bg-gray-600 p-2 rounded" />
//         <input value={user.email} readOnly className="w-full bg-gray-600 p-2 rounded" />
//         <input
//           {...register("title", { required: true })}
//           placeholder="Announcement Title"
//           className="w-full p-2 rounded"
//         />
//         <textarea
//           {...register("description", { required: true })}
//           placeholder="Announcement Description"
//           rows={4}
//           className="w-full p-2 rounded"
//         ></textarea>
//         <button className="btn btn-primary w-full">Post</button>
//       </form>
//     </div>
//   );
// };

// export default MakeAnnouncement;




import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MakeAnnouncement = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const newAnnouncement = {
      authorImage: user.photoURL,
      authorName: user.displayName,
      title: data.title,
      description: data.description,
    };

    try {
      const res = await axiosSecure.post("/announcements", newAnnouncement);
      if (res.data.insertedId) {
        Swal.fire("✅ Success!", "Announcement posted.", "success");
        reset();
        navigate("/");
      }
    } catch (err) {
      Swal.fire("❌ Error", "Something went wrong.", "error");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-gray-800 text-white p-8 rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-400">📢 Make Announcement</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name (Read Only) */}
        <input
          value={user.displayName}
          readOnly
          className="w-full bg-gray-700 text-white rounded-md px-4 py-2 border border-gray-600"
        />
        {/* Email (Read Only) */}
        <input
          value={user.email}
          readOnly
          className="w-full bg-gray-700 text-white rounded-md px-4 py-2 border border-gray-600"
        />

        {/* Title Input */}
        <input
          type="text"
          placeholder="Enter announcement title"
          {...register("title", { required: "Title is required" })}
          className={`w-full px-4 py-2 rounded-md border ${
            errors.title ? "border-red-500" : "border-gray-600"
          } text-white bg-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
        {errors.title && (
          <p className="text-red-400 text-sm -mt-2">{errors.title.message}</p>
        )}

        {/* Description Textarea */}
        <textarea
          placeholder="Write announcement details..."
          rows={5}
          {...register("description", { required: "Description is required" })}
          className={`w-full px-4 py-2 rounded-md border ${
            errors.description ? "border-red-500" : "border-gray-600"
          } text-white bg-gray-900 placeholder:text-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500`}
        ></textarea>
        {errors.description && (
          <p className="text-red-400 text-sm -mt-2">{errors.description.message}</p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 transition duration-300 text-white font-semibold py-2 rounded-md"
        >
          📤 Post Announcement
        </button>
      </form>
    </div>
  );
};

export default MakeAnnouncement;


