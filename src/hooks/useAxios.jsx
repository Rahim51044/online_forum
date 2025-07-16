import axios from "axios";

const axiosInstance = axios.create({
    baseURL: `https://online-forum-server-eta.vercel.app`
})
const useAxios = () => {
    return axiosInstance
};

export default useAxios;