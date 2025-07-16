// import axios from 'axios';
// import React from 'react';
// import useAuth from './useAuth';

// const axiosSecure = axios.create({
//     baseURL: `https://online-forum-server-eta.vercel.app`
// })

// const useAxiosSecure = () => {
//     const {user} = useAuth()
//      axiosSecure.interceptors.request.use(config => {
//         config.headers.Authorization = `Bearer ${user.accessToken}`
//         return config;
//     }, error => {
//         return Promise.reject(error);
//     })
//     return axiosSecure
// };

// export default useAxiosSecure;





import axios from 'axios';
import { useEffect } from 'react';
import useAuth from './useAuth';

const axiosSecure = axios.create({
  baseURL: `https://online-forum-server-eta.vercel.app`
});

const useAxiosSecure = () => {
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const setInterceptor = async () => {
      const token = await user.getIdToken();

      axiosSecure.interceptors.request.use(
        config => {
          config.headers.Authorization = `Bearer ${token}`;
          return config;
        },
        error => Promise.reject(error)
      );
    };

    setInterceptor();
  }, [user]);

  return axiosSecure;
};

export default useAxiosSecure;

