import axios from "axios";
import {ElMessage} from "element-plus";
import router from "@/router";

const BASEURL = process.env.NODE_ENV === "production" ? "" : "/api";
const server = axios.create({
    baseURL: BASEURL,
});
server.interceptors.request.use(
    (config) => {
        config.headers["token"] = localStorage.getItem("token");
        config.headers["content-Type"] = "application/json;charset=utf-8";
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

server.interceptors.response.use(
    (response) => {
        let data = response.data;
        if (data.code !== 200) {
            ElMessage.error(data.msg);
            if (data.code === 401) {
                localStorage.removeItem("token");
                return router.push('/');
            }
            return data;
        }
        return data;
    },
    (error) => {
        ElMessage.error(error.message);
        return Promise.reject(error);
    }
);
export default server;
