const {Basket, BasketDevice} = require('../models/models')
const ApiError = require("../error/ApiError");

class BasketController {

    async create(req, res) {
        const {user} = req.body
        const basket = await Basket.create({userId: user.id})
        return res.json(user)
    }

    async getBasket(req, res, next) {
        const {id} = req.params
        const baskets = await Basket.findOne({where: {userId: id}})
        return res.json(baskets)
    }

    async getDevices(req, res, next) {
        console.log('req params', req.params)
        const {id} = req.params
        if (id === undefined) {
            //next(ApiError.badRequest('get Devices req basket id is undefined'))
            console.log('get Devices req basket id is undefined')
            return
        }
        const devices = await BasketDevice.findAll({where: {basketId: id}})
        return res.json(devices)
    }

    async addDevice(req, res) {
        const {basket, device} = req.body
        const basketDevice = await BasketDevice.create({basketId: basket.id, deviceId: device.id, count: 1})
        return res.json(basketDevice)
    }

    async updateBasketDeviceCount(req, res) {
        const {basketDevice, count} = req.body
        console.log(basketDevice, count)
        const answer = await BasketDevice.update( {count: count}, { where:{id: basketDevice.id} } )
        return res.json(answer)
    }

    // async getOne(req, res) {
    //     const baskets = await Basket.findAll()
    //     return res.json(baskets)
    // }

    async delete(req, res) {

    }

}

module.exports = new BasketController()