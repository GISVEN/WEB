import {$host, $authHost} from "./index";
import jwtDecode from "jwt-decode";

export const create = async (order) => {
    const {data} = await $authHost.post('api/order', order)
    return jwtDecode(data)
}

export const get = async (userId) => {
    const {data} = await $authHost.get('api/order', userId)
    return jwtDecode(data)
}