



// import { useQuery, useMutation } from "@tanstack/react-query";
// import Swal from "sweetalert2";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import { useState } from "react";

// const ReportedComments = () => {
//   const axiosSecure = useAxiosSecure();
//   const [page, setPage] = useState(1);
//   const limit = 10;

//   const { data = {}, refetch, isLoading } = useQuery({
//     queryKey: ["reportedComments", page],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/comments/reported?page=${page}&limit=${limit}`);
//       return res.data;
//     },
//   });

//   const { comments = [], total = 0 } = data;
//   const totalPages = Math.ceil(total / limit);

//   const deleteComment = useMutation({
//     mutationFn: (id) => axiosSecure.delete(`/comments/${id}`),
//     onSuccess: () => {
//       Swal.fire("Deleted", "Comment has been deleted", "success");
//       refetch();
//     },
//   });

//   const dismissReport = useMutation({
//     mutationFn: (id) => axiosSecure.patch(`/comments/dismiss/${id}`),
//     onSuccess: () => {
//       Swal.fire("Dismissed", "Report has been ignored", "info");
//       refetch();
//     },
//   });

//   const warnUser = useMutation({
//     mutationFn: ({ email, message }) => axiosSecure.post(`/users/warn`, { email, message }),
//     onSuccess: () => {
//       Swal.fire("Warning Sent", "User has been warned", "warning");
//     },
//   });

//   const handleWarn = async (email) => {
//     const { value: message } = await Swal.fire({
//       title: "Enter warning message",
//       input: "text",
//       inputLabel: "Message",
//       inputPlaceholder: "e.g. Please follow the community rules.",
//       showCancelButton: true,
//       inputValidator: (value) => {
//         if (!value) return "Message cannot be empty!";
//       },
//     });

//     if (message) warnUser.mutate({ email, message });
//   };

//   return (
//     <div className="p-6 max-w-7xl mx-auto text-white">
//       <h2 className="text-3xl font-bold mb-4">🛡️ Reported Comments</h2>

//       {isLoading ? (
//         <p>Loading...</p>
//       ) : comments.length === 0 ? (
//         <p>No reports found.</p>
//       ) : (
//         <>
//           <table className="table w-full bg-gray-800 rounded">
//             <thead>
//               <tr>
//                 <th>User Email</th>
//                 <th>Comment</th>
//                 <th>Feedback</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {comments.map((report) => (
//                 <tr key={report._id}>
//                   <td>{report.userEmail}</td>
//                   <td>
//                     {report.text?.length > 20 ? (
//                       <div title={report.text}>{report.text.slice(0, 20)}...</div>
//                     ) : (
//                       report.text
//                     )}
//                   </td>
//                   <td>{report.feedback}</td>
//                   <td className="space-x-2">
//                     <button className="btn btn-xs btn-error" onClick={() => deleteComment.mutate(report._id)}>
//                       Delete
//                     </button>
//                     <button className="btn btn-xs btn-warning" onClick={() => handleWarn(report.userEmail)}>
//                       Warn
//                     </button>
//                     <button className="btn btn-xs btn-outline" onClick={() => dismissReport.mutate(report._id)}>
//                       Dismiss
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           {/* Pagination */}
//           <div className="mt-4 flex justify-center space-x-2">
//             {Array.from({ length: totalPages }, (_, i) => (
//               <button
//                 key={i + 1}
//                 className={`btn btn-sm ${page === i + 1 ? "btn-active btn-primary" : "btn-ghost"}`}
//                 onClick={() => setPage(i + 1)}
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

// export default ReportedComments;






import { useQuery, useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useState } from "react";

const ReportedComments = () => {
  const axiosSecure = useAxiosSecure();
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data = {}, refetch, isLoading } = useQuery({
    queryKey: ["reportedComments", page],
    queryFn: async () => {
      const res = await axiosSecure.get(`/comments/reported?page=${page}&limit=${limit}`);
      return res.data;
    },
  });

  const { comments = [], total = 0 } = data;
  const totalPages = Math.ceil(total / limit);

  const deleteComment = useMutation({
    mutationFn: (id) => axiosSecure.delete(`/comments/${id}`),
    onSuccess: () => {
      Swal.fire("🗑️ Deleted", "Comment has been deleted", "success");
      refetch();
    },
  });

  const dismissReport = useMutation({
    mutationFn: (id) => axiosSecure.patch(`/comments/dismiss/${id}`),
    onSuccess: () => {
      Swal.fire("🙅‍♂️ Dismissed", "Report has been ignored", "info");
      refetch();
    },
  });

  const warnUser = useMutation({
    mutationFn: ({ email, message }) => axiosSecure.post(`/users/warn`, { email, message }),
    onSuccess: () => {
      Swal.fire("⚠️ Warning Sent", "User has been warned", "warning");
    },
  });

  const handleWarn = async (email) => {
    const { value: message } = await Swal.fire({
      title: "✉️ Enter Warning Message",
      input: "text",
      inputLabel: "Warning Message",
      inputPlaceholder: "e.g. Please follow the community rules.",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) return "Message cannot be empty!";
      },
    });

    if (message) warnUser.mutate({ email, message });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto text-white">
      <h2 className="text-3xl font-bold mb-6 text-blue-400 text-center">🛡️ Reported Comments</h2>

      {isLoading ? (
        <div className="text-center text-lg py-10">Loading reported comments...</div>
      ) : comments.length === 0 ? (
        <div className="text-center text-gray-400 py-10">✅ No reports found.</div>
      ) : (
        <>
          <div className="overflow-x-auto shadow rounded-2xl bg-gray-900">
            <table className="table table-zebra text-white w-full">
              <thead className="bg-gray-800 text-blue-300 text-sm">
                <tr>
                  <th>User Email</th>
                  <th>Comment</th>
                  <th>Feedback</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {comments.map((report) => (
                  <tr key={report._id} className="hover:bg-gray-800 transition">
                    <td className="text-sm">{report.userEmail}</td>
                    <td className="text-sm">
                      {report.text?.length > 40 ? (
                        <div title={report.text}>
                          {report.text.slice(0, 40)}...
                        </div>
                      ) : (
                        report.text
                      )}
                    </td>
                    <td className="text-sm">{report.feedback}</td>
                    <td className="space-x-1">
                      <button
                        className="btn btn-xs bg-red-600 hover:bg-red-700 text-white"
                        onClick={() => deleteComment.mutate(report._id)}
                      >
                        Delete
                      </button>
                      <button
                        className="btn btn-xs bg-yellow-500 hover:bg-yellow-600 text-black"
                        onClick={() => handleWarn(report.userEmail)}
                      >
                        Warn
                      </button>
                      <button
                        className="btn btn-xs btn-outline text-gray-200 border-gray-400 hover:bg-gray-700"
                        onClick={() => dismissReport.mutate(report._id)}
                      >
                        Dismiss
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-6 flex justify-center gap-2 flex-wrap">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                className={`btn btn-sm px-4 ${
                  page === i + 1
                    ? "bg-blue-600 text-white shadow"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                } rounded`}
                onClick={() => setPage(i + 1)}
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

export default ReportedComments;
