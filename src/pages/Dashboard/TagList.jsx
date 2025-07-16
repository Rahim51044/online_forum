// import React, { useEffect, useState } from "react";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import Swal from "sweetalert2";

// const TagList = () => {
//   const axiosSecure = useAxiosSecure();
//   const [tags, setTags] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // ট্যাগ গুলো ফেচ করার ফাংশন
//   const fetchTags = async () => {
//     try {
//       setLoading(true);
//       const res = await axiosSecure.get("/tags");
//       setTags(res.data);
//     } catch (error) {
//       console.error("Failed to fetch tags:", error);
//       Swal.fire("Error", "Failed to load tags", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTags();
//   }, []);

//   // ট্যাগ ডিলিট করার ফাংশন
//   const handleDelete = async (id) => {
//     const confirmResult = await Swal.fire({
//       title: "Are you sure?",
//       text: "This tag will be deleted permanently!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Yes, delete it!",
//       cancelButtonText: "Cancel",
//     });

//     if (confirmResult.isConfirmed) {
//       try {
//         await axiosSecure.delete(`/tags/${id}`);
//         Swal.fire("Deleted!", "Tag has been deleted.", "success");
//         fetchTags(); // ডিলিটের পরে আবার তালিকা রিফ্রেশ
//       } catch (error) {
//         console.error("Failed to delete tag:", error);
//         Swal.fire("Error", "Failed to delete tag", "error");
//       }
//     }
//   };

//   if (loading) return <div className="text-center py-10">Loading tags...</div>;

//   return (
//     <div className="max-w-xl mx-auto bg-gray-700 p-6 rounded shadow text-white">
//       <h2 className="text-2xl font-bold mb-4">Tags List</h2>
//       {tags.length === 0 ? (
//         <p>No tags found.</p>
//       ) : (
//         <ul>
//           {tags.map((tag) => (
//             <li
//               key={tag._id}
//               className="flex justify-between items-center border-b border-gray-600 py-2"
//             >
//               <span className="capitalize">{tag.name}</span>
//               <button
//                 onClick={() => handleDelete(tag._id)}
//                 className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
//               >
//                 Delete
//               </button>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default TagList;








// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import Swal from "sweetalert2";

// const TagList = () => {
//   const axiosSecure = useAxiosSecure();

//   const {
//     data: tags = [],
//     isLoading,
//     refetch,
//   } = useQuery({
//     queryKey: ["tags"],
//     queryFn: async () => {
//       const res = await axiosSecure.get("/tags");
//       return res.data;
//     },
//   });

//   const handleDelete = async (id) => {
//     const confirm = await Swal.fire({
//       title: "Are you sure?",
//       text: "This tag will be deleted permanently!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Yes, delete it!",
//     });

//     if (confirm.isConfirmed) {
//       try {
//         await axiosSecure.delete(`/tags/${id}`);
//         Swal.fire("Deleted!", "Tag has been deleted.", "success");
//         refetch(); // Delete এর পরে ট্যাগ রিফ্রেশ
//       } catch (error) {
//         console.error("Failed to delete tag:", error);
//         Swal.fire("Error", "Failed to delete tag", "error");
//       }
//     }
//   };

//   if (isLoading) return <div className="text-center py-10">Loading tags...</div>;

//   return (
//     <div className="max-w-xl mx-auto bg-gray-700 p-6 rounded shadow text-white">
//       <h2 className="text-2xl font-bold mb-4">Tags List</h2>
//       {tags.length === 0 ? (
//         <p>No tags found.</p>
//       ) : (
//         <ul>
//           {tags.map((tag) => (
//             <li
//               key={tag._id}
//               className="flex justify-between items-center border-b border-gray-600 py-2"
//             >
//               <span className="capitalize">{tag.name}</span>
//               <button
//                 onClick={() => handleDelete(tag._id)}
//                 className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
//               >
//                 Delete
//               </button>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default TagList;









// // ✅ TagList Component with Pagination
// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import Swal from "sweetalert2";
// import { useState } from "react";

// const TagList = () => {
//   const axiosSecure = useAxiosSecure();
//   const [page, setPage] = useState(1);
//   const limit = 10;

//   const {
//     data,
//     isLoading,
//     refetch,
//     isError,
//     error,
//   } = useQuery({
//     queryKey: ["paginatedTags", page],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/tags/paginated?page=${page}&limit=${limit}`);
//       return res.data;
//     },
//     keepPreviousData: true,
//   });

//   const tags = data?.tags || [];
//   const total = data?.total || 0;
//   const totalPages = Math.ceil(total / limit);

//   const handleDelete = async (id) => {
//     const confirm = await Swal.fire({
//       title: "Are you sure?",
//       text: "This tag will be deleted permanently!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Yes, delete it!",
//     });

//     if (confirm.isConfirmed) {
//       try {
//         await axiosSecure.delete(`/tags/${id}`);
//         Swal.fire("Deleted!", "Tag has been deleted.", "success");
//         refetch();
//       } catch (error) {
//         console.error("Failed to delete tag:", error);
//         Swal.fire("Error", "Failed to delete tag", "error");
//       }
//     }
//   };

//   if (isLoading) return <div className="text-center py-10">Loading tags...</div>;
//   if (isError) return <div className="text-center text-red-500 py-10">Error: {error.message}</div>;

//   return (
//     <div className="max-w-xl mx-auto bg-gray-700 p-6 rounded shadow text-white">
//       <h2 className="text-2xl font-bold mb-4">Tags List</h2>
//       {tags.length === 0 ? (
//         <p>No tags found.</p>
//       ) : (
//         <>
//           <ul>
//             {tags.map((tag) => (
//               <li
//                 key={tag._id}
//                 className="flex justify-between items-center border-b border-gray-600 py-2"
//               >
//                 <span className="capitalize">{tag.name}</span>
//                 <button
//                   onClick={() => handleDelete(tag._id)}
//                   className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
//                 >
//                   Delete
//                 </button>
//               </li>
//             ))}
//           </ul>
//           {/* Pagination */}
//           <div className="flex justify-center mt-4 space-x-2 flex-wrap">
//             {[...Array(totalPages).keys()].map((i) => (
//               <button
//                 key={i}
//                 onClick={() => setPage(i + 1)}
//                 className={`px-3 py-1 rounded ${
//                   page === i + 1 ? "bg-blue-500" : "bg-gray-600"
//                 }`}
//               >
//                 {i + 1}
//               </button>
//             ))}
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default TagList;






import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useState } from "react";

const TagList = () => {
  const axiosSecure = useAxiosSecure();
  const [page, setPage] = useState(1);
  const limit = 10;

  const {
    data,
    isLoading,
    refetch,
    isError,
    error,
  } = useQuery({
    queryKey: ["paginatedTags", page],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tags/paginated?page=${page}&limit=${limit}`);
      return res.data;
    },
    keepPreviousData: true,
  });

  const tags = data?.tags || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / limit);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This tag will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await axiosSecure.delete(`/tags/${id}`);
        Swal.fire("Deleted!", "Tag has been deleted.", "success");
        refetch();
      } catch (error) {
        console.error("Failed to delete tag:", error);
        Swal.fire("Error", "Failed to delete tag", "error");
      }
    }
  };

  if (isLoading) return <div className="text-center py-10">Loading tags...</div>;
  if (isError) return <div className="text-center text-red-500 py-10">Error: {error.message}</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-800 rounded-2xl shadow-lg text-white">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-300">Tags Management</h2>

      {tags.length === 0 ? (
        <p className="text-center text-gray-300">No tags found.</p>
      ) : (
        <>
          <ul className="divide-y divide-gray-700">
            {tags.map((tag) => (
              <li
                key={tag._id}
                className="flex justify-between items-center py-3 px-2 hover:bg-gray-700 rounded transition"
              >
                <span className="capitalize text-lg">{tag.name}</span>
                <button
                  onClick={() => handleDelete(tag._id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-md text-sm font-medium"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>

          {/* Pagination */}
          <div className="flex justify-center mt-6 flex-wrap gap-2">
            {[...Array(totalPages).keys()].map((i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`px-4 py-1 rounded-md font-medium transition ${
                  page === i + 1
                    ? "bg-blue-600 text-white shadow"
                    : "bg-gray-600 hover:bg-gray-700 text-gray-200"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default TagList;
