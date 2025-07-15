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




import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";


const AnnouncementSection = ({ onClose }) => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const { data: announcements = [] } = useQuery({
    queryKey: ["announcements"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/announcements?email=${user.email}`);
      return res.data;
    },
  });

  const markAsRead = useMutation({
    mutationFn: async (id) =>
      await axiosSecure.patch(`/announcements/read/${id}`, { email: user.email }),
    onSuccess: () => {
      queryClient.invalidateQueries(["announcements"]);
      queryClient.invalidateQueries(["announcement-count"]);
    },
  });

  if (announcements.length === 0) return null;

  return (
    <div className="absolute top-12 right-0 z-50 w-96 bg-white text-black shadow-lg rounded-lg p-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">📢 Announcements</h2>
        <button onClick={onClose} className="btn btn-sm btn-ghost">✕</button>
      </div>

      <div className="space-y-3 max-h-80 overflow-y-auto">
        {announcements.map((a) => {
          const isRead = a.readBy?.includes(user.email);
          return (
            <div key={a._id} className={`border p-3 rounded ${isRead ? 'bg-gray-100' : 'bg-yellow-50'}`}>
              <h3 className="font-bold">{a.title}</h3>
              <p>{a.description}</p>
              {!isRead && (
                <button
                  onClick={() => markAsRead.mutate(a._id)}
                  className="btn btn-xs btn-success mt-2"
                >
                  Mark as Read
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AnnouncementSection;
