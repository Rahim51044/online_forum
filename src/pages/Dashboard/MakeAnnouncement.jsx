// import { useForm } from "react-hook-form";
// import Swal from "sweetalert2";
// import { useNavigate } from "react-router";
// import useAuth from "../../hooks/useAuth";
// import useAxiosSecure from "../../hooks/useAxiosSecure";

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
