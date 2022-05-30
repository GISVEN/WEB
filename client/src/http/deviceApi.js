import {$host, $authHost} from "./index";
import collapse from "bootstrap/js/src/collapse";

export const createType = async (type) => {
    const {data} = await $authHost.post('api/type', type)
    return data
}

export const fetchTypes = async () => {
    const {data} = await $host.get('api/type')
    return data
}

export const createBrand = async (brand) => {
    const {data} = await $authHost.post('api/brand', brand)
    return data
}

export const fetchBrands = async () => {
    const {data} = await $host.get('api/brand')
    return data
}

export const createDevice = async (device) => {
    const {data} = await $authHost.post('api/device', device)
    return data
}

export const fetchDevices = async (crt) => {
    crt = crt || {}
    const {brandId, typeId, page} = crt
    let url = 'api/device/?'
    // console.log(url)
    if (brandId !== undefined) {
        url = url + `${brandId ? `&brandId=${brandId}` : ''}`;
        // console.log(url)
    }
    if (typeId !== undefined) {
        url = url + `${typeId ? `&typeId=${typeId}` : ''}`;
        // console.log(url)
    }
    if (page !== undefined) {
        url = url + `${page ? `&page=${page}` : ''}`;
        // console.log(url)

    }

    const {data} = await $host.get(url)
    // console.log(data)
    return data
}

export const fetchOneDevice = async (id) => {
    const {data} = await $host.get('api/device/' + id)
    return data
}