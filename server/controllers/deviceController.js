const uuid = require('uuid')
const path = require('path')
const {Device, DeviceInfo} = require('../models/models')
const ApiError = require('../error/ApiError')

class DeviceController {
    async create(req, res, next) {
        try {
            let {name, price, brandId, typeId, info} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + '.jpg'
            await img.mv(path.resolve(__dirname, '..', 'static', fileName))

            const device = await Device.create({name, price, brandId, typeId, img: fileName})

            if (info) {
                info = JSON.parse(info)
            }
            info.forEach(i => DeviceInfo.create({
                title: i.title,
                description: i.description,
                deviceId: device.id
            }))
            return res.json(device)
        } catch (e) {
            // next(ApiError.badRequest(e.message))
            return 0
        }


    };

    async getAll(req, res) {
        let {brandId, typeId, limit, page} = req.query
        console.log(page)
        page = page || 1
        limit = limit || 12
        let offset = page * limit - limit
        let devices;

        if (!brandId && !typeId) {
            console.log('1')
            devices = await Device.findAndCountAll({limit, offset})
        }
        if (brandId && !typeId) {
            console.log('2')
            devices = await Device.findAndCountAll({where:{brandId}, limit, offset })

        }
        if (!brandId && typeId) {
            console.log('3')
            devices = await Device.findAndCountAll({where: {typeId}, limit, offset })

        }
        if (brandId && typeId) {
            console.log('4')
            devices = await Device.findAndCountAll({ where: {brandId, typeId}, limit, offset})

        }
        return res.json(devices)
    };

    async getOne(req, res) {
        let {id} = req.params
        const device = await Device.findOne(
            {
                where: {id: id},
                include: [{model: DeviceInfo, as: 'info'}]
            },
        )
        return res.json(device)
    };

    async delete(req, res, next) {
        try {
            const {id} = req.body
            const device = await Device.destroy({where: {id: id}})

            return res.json(device)
        } catch (e) {
            // next(ApiError.badRequest(e.message))
            return 1
        }

    };
}

module.exports = new DeviceController()