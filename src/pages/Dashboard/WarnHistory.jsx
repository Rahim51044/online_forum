


// import React from "react";
// import { useQuery } from "@tanstack/react-query";
// import useAuth from "../../hooks/useAuth";
// import useAxiosSecure from "../../hooks/useAxiosSecure";

// const WarnHistory = () => {
//   const { user } = useAuth();
//   const axiosSecure = useAxiosSecure();

//   const {
//     data: warnings = [],
//     isLoading,
//     isError,
//     error,
//   } = useQuery({
//     queryKey: ["warnHistory", user?.email],
//     enabled: !!user?.email,
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/users/warnings/${user.email}`);
//       return res.data;
//     },
//   });

//   if (isLoading)
//     return (
//       <p className="text-center mt-10 text-white">Loading warnings...</p>
//     );

//   if (isError)
//     return (
//       <p className="text-center mt-10 text-red-500">
//         Error loading warnings: {error.message}
//       </p>
//     );

//   return (
//     <div className="max-w-4xl mx-auto p-6 text-white">
//       <h2 className="text-2xl font-bold mb-4">⚠️ Warning History</h2>

//       {warnings.length === 0 ? (
//         <p className="text-yellow-300">
//           You have no warnings. Keep following the community rules! 🎉
//         </p>
//       ) : (
//         <ul className="space-y-4">
//           {warnings.map((warn, idx) => (
//             <li
//               key={idx}
//               className="bg-red-900 p-4 rounded shadow text-sm break-words"
//             >
//               <p>
//                 <strong>Message:</strong> {warn.message || "No message"}
//               </p>
//               <p className="text-gray-300">
//                 <strong>Date:</strong>{" "}
//                 {warn.time
//                   ? new Date(warn.time).toLocaleString()
//                   : "No date available"}
//               </p>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default WarnHistory;




import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const WarnHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: warnings = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["warnHistory", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/warnings/${user.email}`);
      return res.data;
    },
  });

  if (isLoading)
    return (
      <p className="text-center mt-10 text-white animate-pulse">
        Loading warnings...
      </p>
    );

  if (isError)
    return (
      <p className="text-center mt-10 text-red-500">
        ❌ Error loading warnings: {error.message}
      </p>
    );

  return (
    <div className="max-w-4xl mx-auto p-6 text-white">
      <h2 className="text-3xl font-bold text-yellow-400 mb-6 text-center">
        ⚠️ Warning History
      </h2>

      {warnings.length === 0 ? (
        <p className="text-green-400 text-center">
          ✅ You have no warnings. Keep following the community rules! 🎉
        </p>
      ) : (
        <ul className="space-y-4">
          {warnings.map((warn, idx) => (
            <li
              key={idx}
              className="bg-red-950 border-l-4 border-yellow-400 p-4 rounded shadow text-sm break-words"
            >
              <p className="mb-2">
                <strong className="text-yellow-300">Message:</strong>{" "}
                <span className="text-white">{warn.message || "No message"}</span>
              </p>
              <p className="text-gray-400">
                <strong>Date:</strong>{" "}
                {warn.time
                  ? new Date(warn.time).toLocaleString()
                  : "No date available"}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WarnHistory;
