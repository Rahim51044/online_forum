// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../hooks/useAxiosSecure";

// const AnnouncementSection = () => {
//   const axiosSecure = useAxiosSecure();

//   const { data: announcements = [] } = useQuery({
//     queryKey: ["announcements"],
//     queryFn: async () => {
//       const res = await axiosSecure.get("/announcements");
//       return res.data;
//     },
//   });

//   if (announcements.length === 0) return null;

// return (
//     <div className="bg-green-400 p-4 rounded shadow mb-6">
//       <h2 className="text-xl font-semibold mb-2">📢 Announcements</h2>
//       {announcements.map((a) => (
//         <div key={a._id} className="mb-3">
//           <h3 className="font-bold">{a.title}</h3>
//           <p className="text-sm text-gray-700">{a.description}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default AnnouncementSection;
