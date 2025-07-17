// import React from "react";
// import { FaMedal } from "react-icons/fa";

import { FaMedal } from "react-icons/fa";

// const MembershipBadge = ({ membership }) => {
//   if (!membership) {
//     // membership যদি না থাকে তবে ব্রোঞ্জ ব্যাজ দেখাবে
//     return (
//       <span className="badge badge-accent flex items-center gap-1">
//         <FaMedal /> Bronze Badge
//       </span>
//     );
//   }

//   if (membership.toLowerCase() === "gold") {
//     return (
//       <span className="badge badge-warning flex items-center gap-1">
//         <FaMedal /> Gold Badge
//       </span>
//     );
//   }

//   // অন্য যেকোনো membership হলে ব্রোঞ্জ ব্যাজ দেখাবে
//   return (
//     <span className="badge badge-accent flex items-center gap-1">
//       <FaMedal /> Bronze Badge
//     </span>
//   );
// };

// export default MembershipBadge;



const MembershipBadge = ({ membership }) => {
  const level = membership?.toLowerCase() || "bronze";
  const badgeClasses = {
    gold: "badge-warning",
    silver: "badge-info",
    bronze: "badge-accent",
  };

  const badgeText = {
    gold: "Gold Badge",
    silver: "Silver Badge",
    bronze: "Bronze Badge",
  };

  return (
    <span className={`badge flex items-center gap-1 ${badgeClasses[level] || "badge-accent"}`}>
      <FaMedal /> {badgeText[level] || "Bronze Badge"}
    </span>
  );
};

export default MembershipBadge;
