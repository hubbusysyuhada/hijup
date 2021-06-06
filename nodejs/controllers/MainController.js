const { Product, Order, OrderItem, sequelize } = require('../models')
const { token } = require('../helpers/generateToken')

class MainController {
    static async getAllProducts (req, res, next) {
        try {
            const data = await Product.findAll({
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            })
            res.status(200).json(data)
        } catch (error) {
            console.error(error);
            next({
                name: 'custom error',
                code: 500,
                message: 'internal server error'
            })
        }
    }

    static async getProduct (req, res, next) {
        try {
            const { id } = req.params
            const data = await Product.findByPk(id, {
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            })
            if (data === null) throw 404
            res.status(200).json(data)
        } catch (error) {
            console.error(error);
            next({
                name: 'custom error',
                code: 404,
                message: 'not found'
            })
        }
    }

    static async addProduct (req, res, next) {
        try {
            const { name } = req.body
            if (!name) throw 400
            const data = await Product.create({name})
            res.status(201).json(data)
        } catch (error) {
            console.error(error);
            next({
                name: 'custom error',
                code: 400,
                message: 'bad request'
            })
        }
    }

    static async editProduct (req, res, next) {
        try {
            const { name } = req.body
            const { id } = req.params
            if (!name) next({
                name: 'custom error',
                code: 400,
                message: 'bad request'
            })
            const data = await Product.update({name}, {where: {id}, returning: true})
            res.status(200).json(data[1][0])
        } catch (error) {
            console.error(error);
            next({
                name: 'custom error',
                code: 404,
                message: 'not found'
            })
        }
    }

    static async deleteProduct (req, res, next) {
        try {
            const { id } = req.params
            const data = await Product.destroy({where: {id}})
            if (data === 0) throw 404
            res.status(200).json({message: 'delete success'})
        } catch (error) {
            console.error(error);
            next({
                name: 'custom error',
                code: 404,
                message: 'not found'
            })
        }
    }

    static async getAllOrders (req, res, next) {
        try {
            const data = await OrderItem.findAll({
                include: ['Product', 'Order'],
            })

            let result = []
            for (let i = 0; i < data.length; i++) {
                let flag = true
                for (let j = 0; j < result.length; j++) {
                    if (result[j].ProductName === data[i].Product.name) {
                        flag = false
                        result[j].OrderCodeList.push(data[i].Order.code)
                        result[j].Quantity++
                    }
                }

                if (flag) result.push({
                    ProductName: data[i].Product.name,
                    ProductId: data[i].Product.id,
                    Quantity: 1,
                    OrderCodeList: [data[i].Order.code]
                })
            }
            res.status(200).json(result)
        } catch (error) {
            console.error(error);
            next({
                name: 'custom error',
                code: 500,
                message: 'internal server error'
            })
        }
    }

    static async createOrder (req, res, next) {
        const transaction = await sequelize.transaction()
        try {
            let { ProductId } = req.body
            ProductId = ProductId.split(',')
            ProductId = ProductId.map(id => id = id.trim());

            for (let i = 0; i < ProductId.length; i++) {
                const product = ProductId[i]
                const responseCode = await Order.create({code: token()}, {transaction})
                await OrderItem.create({ProductId: product, OrderId: responseCode.id}, {transaction})
            }
            await transaction.commit()       
            res.status(201).json({message: 'order created successfully'})     
        } catch (error) {
            console.error(error);
            await transaction.rollback()
            next({
                name: 'custom error',
                code: 400,
                message: 'bad request'
            })
        }
    }

    static async minusOne (req, res, next) {
        const transaction = await sequelize.transaction()
        try {
            const { id } = req.params
            const lastData = await OrderItem.findAll({where: {ProductId: id}, limit: 1, transaction})
            const { OrderId } = lastData[0]
            await OrderItem.destroy({where: {ProductId: id}, limit: 1, transaction})
            await Order.destroy({where: {id: OrderId}, transaction})
            if (lastData.length === 0) throw 404
            await transaction.commit()
            res.status(200).json({message: `Product id no. ${id} quantity minus by 1 successfully`})
        } catch (error) {
            await transaction.rollback()
            console.error(error);
            next({
                name: 'custom error',
                code: 404,
                message: 'not found'
            })
        }
    }

    static async toZeroQuantity (req, res, next) {
        const transaction = await sequelize.transaction()
        try {
            const { id } = req.params
            const lastData = await OrderItem.findAll({where: {ProductId: id}, transaction, include: ['Order']})
            let OrderId = []
            lastData.forEach(order => {
                OrderId.push(order.Order.id)
            });
            await OrderItem.destroy({where: {ProductId: id}, transaction, returning: true})
            for (let i = 0; i < OrderId.length; i++) {
                const response = await Order.destroy({where: {id: OrderId[i]}, transaction})
            }
            if (lastData.length === 0) throw 404
            else transaction.commit()
            res.status(200).json({message: `Product id no. ${id} is now removed from order item list`})
        } catch (error) {
            transaction.rollback()
            console.error(error);
            next({
                name: 'custom error',
                code: 404,
                message: 'not found'
            })
        }
    }

    static async emptyOrderList (req, res, next) {
        const transaction = await sequelize.transaction()
        try {
            await OrderItem.destroy({where: {}, transaction})
            await Order.destroy({where: {}, transaction})
            await transaction.commit()
            res.status(200).json({message: `Successful empty order list`})
        } catch (error) {
            await transaction.rollback()
            console.error(error);
            next({
                name: 'custom error',
                code: 500,
                message: 'internal server error'
            })
        }
    }
}

module.exports = MainController