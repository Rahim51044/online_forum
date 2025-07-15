// hooks/useAuth.js
import { useEffect, useState } from "react";
import useAxiosSecure from "./useAxiosSecure";

const useRole = (email) => {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (email) {
      axiosSecure.get(`/users/admin/${email}`)
        .then(res => {
          setRole(res.data.admin ? "admin" : "user");
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [email, axiosSecure]);

  return { role, loading };
};

export default useRole;
