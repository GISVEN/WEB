import {$host, $authHost} from "./index";

// export const create = async (basket) => {
//     const {data} = await $authHost.post('api/basket', basket)
//     return data
// }

export const addDeviceInBasket = async (basket, device) => {
    console.log(basket.id, device.id)
    const {data} = await $authHost.post('api/basket/add', {basket, device})
    return data
}

export const getBasket = async (user) => {
    const {data} = await $authHost.get('api/basket/' + user.id)
    return data
}

export const getBasketDevices = async (basketId) => {
    const {data} = await $authHost.get('api/basket/devices/' +  basketId)
    return data
}

export const updateBasketDevice = async (basketDevice, count) => {
    const {data} = await $authHost.post('api/basket/update', {basketDevice, count})
    return data
}

