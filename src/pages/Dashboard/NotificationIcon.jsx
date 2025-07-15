// import { FaBell } from "react-icons/fa";
// import { useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import useAuth from "../../hooks/useAuth";
// import AnnouncementSection from "./AnnouncementSection";


// const NotificationIcon = () => {
//   const [open, setOpen] = useState(false);
//   const axiosSecure = useAxiosSecure();
//   const { user } = useAuth();

//   const { data: countData } = useQuery({
//     queryKey: ["announcement-count", user.email],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/announcements/unread-count?email=${user.email}`);
//       return res.data;
//     },
//   });

//   return (
//     <div className="relative">
//       <button onClick={() => setOpen(!open)} className="btn btn-ghost btn-circle">
//         <FaBell className="text-xl" />
//         {countData?.count > 0 && (
//           <span className="badge badge-sm badge-error absolute -top-1 -right-1">
//             {countData.count}
//           </span>
//         )}
//       </button>

//       {open && <AnnouncementSection onClose={() => setOpen(false)} />}
//     </div>
//   );
// };

// export default NotificationIcon;




// components/NotificationIcon.jsx
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FaBell } from "react-icons/fa";

import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const NotificationIcon = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [showAnnouncements, setShowAnnouncements] = useState(false);

  // ⏳ Get Unread Count
  const { data: countData } = useQuery({
    queryKey: ["unread-announcement-count", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/announcements/unread-count?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // 📢 Get All Announcements
  const { data: announcements = [] } = useQuery({
    queryKey: ["announcements", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/announcements");
      return res.data;
    },
    enabled: showAnnouncements, // only fetch when open
  });

  // ✅ Mark as Read
  const markAsRead = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.patch(`/announcements/read/${id}`, { email: user?.email });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["unread-announcement-count", user?.email]);
    },
  });

  const handleRead = (id) => {
    markAsRead.mutate(id);
  };

  return (
    <div className="relative">
      {/* 🔔 Bell icon */}
      <div
        className="cursor-pointer relative"
        onClick={() => setShowAnnouncements(!showAnnouncements)}
      >
        <FaBell className="text-xl" />
        {countData?.count > 0 && (
          <span className="badge badge-sm badge-error absolute -top-2 -right-2">
            {countData.count}
          </span>
        )}
      </div>

      {/* 🔽 Dropdown */}
      {showAnnouncements && (
        <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg z-50 rounded p-4 text-black max-h-96 overflow-y-auto">
          <h2 className="font-bold text-lg mb-2">📢 Announcements</h2>
          {announcements.map((a) => (
            <div key={a._id} className="mb-3 border-b pb-2">
              <h3 className="font-semibold">{a.title}</h3>
              <p className="text-sm text-gray-600">{a.description}</p>
              <button
                onClick={() => handleRead(a._id)}
                className="btn btn-xs btn-outline mt-1"
              >
                Mark as Read
              </button>
            </div>
          ))}
          {announcements.length === 0 && <p>No announcements yet.</p>}
        </div>
      )}
    </div>
  );
};

export default NotificationIcon;
