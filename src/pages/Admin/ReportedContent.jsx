

// import { useQuery, useMutation } from "@tanstack/react-query";
// import Swal from "sweetalert2";
// import useAxiosSecure from "../../hooks/useAxiosSecure";

// const ReportedComments = () => {
//   const axiosSecure = useAxiosSecure();

//   const { data: reports = [], refetch } = useQuery({
//     queryKey: ["reportedComments"],
//     queryFn: async () => {
//       const res = await axiosSecure.get("/comments/reported");
//       return res.data;
//     },
//   });

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
//     mutationFn: (email) => axiosSecure.post(`/users/warn`, { email }),
//     onSuccess: () => {
//       Swal.fire("Warning Sent", "User has been warned", "warning");
//     },
//   });

//   return (
//     <div className="p-6 max-w-7xl mx-auto text-white">
//       <h2 className="text-3xl font-bold mb-4">🛡️ Reported Comments</h2>

//       {reports.length === 0 ? (
//         <p>No reports found.</p>
//       ) : (
//         <table className="table w-full bg-gray-800 rounded">
//           <thead>
//             <tr>
//               <th>User Email</th>
//               <th>Comment</th>
//               <th>Feedback</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {reports.map((report) => (
//               <tr key={report._id}>
//                 <td>{report.userEmail}</td>
//                 <td>
//                   {report.text.length > 20 ? (
//                     <div title={report.text}>{report.text.slice(0, 20)}...</div>
//                   ) : (
//                     report.text
//                   )}
//                 </td>
//                 <td>{report.feedback}</td>
//                 <td className="space-x-2">
//                   <button
//                     className="btn btn-xs btn-error"
//                     onClick={() => deleteComment.mutate(report._id)}
//                   >
//                     Delete
//                   </button>
//                   <button
//                     className="btn btn-xs btn-warning"
//                     onClick={() => warnUser.mutate(report.userEmail)}
//                   >
//                     Warn
//                   </button>
//                   <button
//                     className="btn btn-xs btn-outline"
//                     onClick={() => dismissReport.mutate(report._id)}
//                   >
//                     Dismiss
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default ReportedComments;




import { useQuery, useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ReportedComments = () => {
  const axiosSecure = useAxiosSecure();

  const { data: reports = [], refetch } = useQuery({
    queryKey: ["reportedComments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/comments/reported");
      return res.data;
    },
  });

  const deleteComment = useMutation({
    mutationFn: (id) => axiosSecure.delete(`/comments/${id}`),
    onSuccess: () => {
      Swal.fire("Deleted", "Comment has been deleted", "success");
      refetch();
    },
  });

  const dismissReport = useMutation({
    mutationFn: (id) => axiosSecure.patch(`/comments/dismiss/${id}`),
    onSuccess: () => {
      Swal.fire("Dismissed", "Report has been ignored", "info");
      refetch();
    },
  });

  const warnUser = useMutation({
    mutationFn: ({ email, message }) =>
      axiosSecure.post(`/users/warn`, { email, message }),
    onSuccess: () => {
      Swal.fire("Warning Sent", "User has been warned", "warning");
    },
  });

  const handleWarn = async (email) => {
    const { value: message } = await Swal.fire({
      title: "Enter warning message",
      input: "text",
      inputLabel: "Message",
      inputPlaceholder: "e.g. Please follow the community rules.",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "Message cannot be empty!";
        }
      },
    });

    if (message) {
      warnUser.mutate({ email, message });
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto text-white">
      <h2 className="text-3xl font-bold mb-4">🛡️ Reported Comments</h2>

      {reports.length === 0 ? (
        <p>No reports found.</p>
      ) : (
        <table className="table w-full bg-gray-800 rounded">
          <thead>
            <tr>
              <th>User Email</th>
              <th>Comment</th>
              <th>Feedback</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report._id}>
                <td>{report.userEmail}</td>
                <td>
                  {report.text.length > 20 ? (
                    <div title={report.text}>{report.text.slice(0, 20)}...</div>
                  ) : (
                    report.text
                  )}
                </td>
                <td>{report.feedback}</td>
                <td className="space-x-2">
                  <button
                    className="btn btn-xs btn-error"
                    onClick={() => deleteComment.mutate(report._id)}
                  >
                    Delete
                  </button>

                  <button
                    className="btn btn-xs btn-warning"
                    onClick={() => handleWarn(report.userEmail)}
                  >
                    Warn
                  </button>

                  <button
                    className="btn btn-xs btn-outline"
                    onClick={() => dismissReport.mutate(report._id)}
                  >
                    Dismiss
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ReportedComments;
