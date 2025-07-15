// import { useQuery, useMutation } from "@tanstack/react-query";
// import { useParams } from "react-router";
// import { useState } from "react";
// import useAxiosSecure from "../../hooks/useAxiosSecure";

// const feedbackOptions = [
//   "Spam or irrelevant",
//   "Offensive language",
//   "Other concern",
// ];

// const CommentsPage = () => {
//   const { postId } = useParams();
//   const axiosSecure = useAxiosSecure();

//   const { data: comments = [], refetch } = useQuery({
//     queryKey: ["comments", postId],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/comments?postId=${postId}`);
//       return res.data;
//     },
//   });



//   const reportMutation = useMutation(
//     ({ commentId, feedback }) =>
//       axiosSecure.post(`/comments/report/${commentId}`, { feedback }),
//     {
//       onSuccess: () => refetch(),
//     }
//   );

//   const [selectedFeedback, setSelectedFeedback] = useState({});
//   const [modalComment, setModalComment] = useState(null);

//   const handleReport = (commentId) => {
//     const feedback = selectedFeedback[commentId];
//     if (!feedback) return;
//     reportMutation.mutate({ commentId, feedback });
//     setSelectedFeedback((prev) => ({ ...prev, [commentId]: null }));
//   };

//   const truncate = (text) =>
//     text.length > 20 ? `${text.slice(0, 20)}...` : text;

//   return (
//     <div className="p-6 max-w-6xl mx-auto text-white">
//       <h2 className="text-3xl font-bold mb-4">Comments</h2>

//       <table className="table w-full bg-gray-800 rounded">
//         <thead>
//           <tr>
//             <th>Commenter Email</th>
//             <th>Comment</th>
//             <th>Feedback</th>
//             <th>Report</th>
//           </tr>
//         </thead>
//         <tbody>
//           {comments.length === 0 && (
//             <tr>
//               <td colSpan="4" className="text-center py-4">
//                 No comments yet.
//               </td>
//             </tr>
//           )}

//           {comments.map((comment) => (
//             <tr key={comment._id}>
//               <td>{comment.userEmail}</td>
//               <td>
//                 {comment.text.length > 20 ? (
//                   <>
//                     {truncate(comment.text)}{" "}
//                     <button
//                       className="text-blue-400 underline"
//                       onClick={() => setModalComment(comment.text)}
//                     >
//                       Read More
//                     </button>
//                   </>
//                 ) : (
//                   comment.text
//                 )}
//               </td>
//               <td>
//                 <select
//                   value={selectedFeedback[comment._id] || ""}
//                   onChange={(e) =>
//                     setSelectedFeedback((prev) => ({
//                       ...prev,
//                       [comment._id]: e.target.value,
//                     }))
//                   }
//                   className="select select-bordered bg-gray-700 text-white max-w-xs"
//                 >
//                   <option value="">Select Feedback</option>
//                   {feedbackOptions.map((opt) => (
//                     <option key={opt} value={opt}>
//                       {opt}
//                     </option>
//                   ))}
//                 </select>
//               </td>
//               <td>
//                 <button
//                   disabled={
//                     !selectedFeedback[comment._id] || comment.reported
//                   }
//                   onClick={() => handleReport(comment._id)}
//                   className="btn btn-sm btn-warning"
//                 >
//                   {comment.reported ? "Reported" : "Report"}
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Modal for full comment */}
//       {modalComment && (
//         <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center p-4 z-50">
//           <div className="bg-gray-900 p-6 rounded max-w-lg w-full relative">
//             <button
//               className="absolute top-2 right-2 btn btn-sm btn-circle btn-error"
//               onClick={() => setModalComment(null)}
//             >
//               ✕
//             </button>
//             <p className="text-white">{modalComment}</p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CommentsPage;




import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams } from "react-router";
import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const feedbackOptions = [
  "Spam or irrelevant",
  "Offensive language",
  "Other concern",
];

const CommentsPage = () => {
  const { postId } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: comments = [], refetch } = useQuery({
    queryKey: ["comments", postId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/comments?postId=${postId}`);
      return res.data;
    },
  });

  // React Query v5 style useMutation
  const reportMutation = useMutation({
    mutationFn: ({ commentId, feedback }) =>
      axiosSecure.post(`/comments/report/${commentId}`, { feedback }),
    onSuccess: () => {
      refetch();
    },
  });

  const [selectedFeedback, setSelectedFeedback] = useState({});
  const [modalComment, setModalComment] = useState(null);

  const handleReport = (commentId) => {
    const feedback = selectedFeedback[commentId];
    if (!feedback) return;
    reportMutation.mutate({ commentId, feedback });
    setSelectedFeedback((prev) => ({ ...prev, [commentId]: null }));
  };

  const truncate = (text) =>
    text.length > 20 ? `${text.slice(0, 20)}...` : text;

  return (
    <div className="p-6 max-w-6xl mx-auto text-white">
      <h2 className="text-3xl font-bold mb-4">Comments</h2>

      <table className="table w-full bg-gray-800 rounded">
        <thead>
          <tr>
            <th>Commenter Email</th>
            <th>Comment</th>
            <th>Feedback</th>
            <th>Report</th>
          </tr>
        </thead>
        <tbody>
          {comments.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center py-4">
                No comments yet.
              </td>
            </tr>
          )}

          {comments.map((comment) => (
            <tr key={comment._id}>
              <td>{comment.userEmail}</td>
              <td>
                {comment.text.length > 20 ? (
                  <>
                    {truncate(comment.text)}{" "}
                    <button
                      className="text-blue-400 underline"
                      onClick={() => setModalComment(comment.text)}
                    >
                      Read More
                    </button>
                  </>
                ) : (
                  comment.text
                )}
              </td>
              <td>
                <select
                  value={selectedFeedback[comment._id] || ""}
                  onChange={(e) =>
                    setSelectedFeedback((prev) => ({
                      ...prev,
                      [comment._id]: e.target.value,
                    }))
                  }
                  className="select select-bordered bg-gray-700 text-white max-w-xs"
                >
                  <option value="">Select Feedback</option>
                  {feedbackOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <button
                  disabled={
                    !selectedFeedback[comment._id] || comment.reported
                  }
                  onClick={() => handleReport(comment._id)}
                  className="btn btn-sm btn-warning"
                >
                  {comment.reported ? "Reported" : "Report"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for full comment */}
      {modalComment && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center p-4 z-50">
          <div className="bg-gray-900 p-6 rounded max-w-lg w-full relative">
            <button
              className="absolute top-2 right-2 btn btn-sm btn-circle btn-error"
              onClick={() => setModalComment(null)}
            >
              ✕
            </button>
            <p className="text-white">{modalComment}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentsPage;
