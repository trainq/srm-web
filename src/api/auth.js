import server from "../utils/request";
import axios from "axios";

export function getCaptchaApi() {
    return server.request({
        url:'/auth/getCaptcha',
        method:'get'
    })
}

export function loginApi(data) {
    return server.request({
        url: '/auth/login',
        method: 'post',
        data: JSON.stringify(data)
    })
}
