const {Order} = require("../models/models");

class OrderController {
    async create(req, res) {
        const {description} = req.body
        const order = await Order.create({description})
        return res.json(order)
    }

    async getAll(req, res) {

    }

    async getOne(req, res) {

    }

    async change(req, res) {

    }

    async delete(req, res) {

    }
}

module.exports = new OrderController()