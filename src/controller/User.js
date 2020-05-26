const UserModel = require('../model/User.js')
require('dotenv')
const { APP_URI } = process.env

const Response = (_data = {}, res, _status) => {
  const data = {
    success: false,
    message: '',
    ..._data
  }
  const status = _status || 200
  if (status < 300) {
    data.success = true
  }
  res.status(status).send(data)
}



module.exports = {
  getDataUser: async (req, res) => {
    let { page, limit, search, sort } = req.query
    page = parseInt(page) || 1
    limit = parseInt(limit) || 5
    let key = search && Object.keys(search)[0]
    let value = search && Object.values(search)[0]
    key = sort && Object.keys(sort)[0]
    value = sort && Object.values(sort)[0]

    const conditions = {
      page,
      perPage: limit, search, sort
    }
    console.log(conditions.perPage)
    const result = await UserModel.getAllUser(conditions)
    const totalData = await UserModel.countUser(conditions)
    const totalPage = Math.ceil(totalData / conditions.perPage)
    console.log(totalData)
    const nextLink = (page >= totalPage ? null : APP_URI.concat(`user?page=${page + 1}`))
    const prevLink = (page <= 1 ? null : APP_URI.concat(`user?page=${page - 1}`))
    delete conditions.search
    delete conditions.sort
    delete conditions.limit
    // get page info for page based on database data
    const pageInfo = {
      page,
      limit,
      totalPage,
      totalData,
      nextLink,
      prevLink
    }
    if (result) {
      return Response({
        message: 'All User',
        data: result,
        pageInfo
      }, res)
    } else {
      return Response({
        message: 'data not found',
      }, res)
    }
  },
  createDataUser: async (req, res) => {
    const { name, phone, email, address } = req.body
    const results = await UserModel.createDataUser(name, phone, email, address)
    if (results) {
      return Response({
        message: 'User has been created',
        data: { id: results, ...req.body }
      }, res)
    } else {
      return Response({
        message: 'Failed to created User, please try again'
      }, res)
    }
  },
  UpdateDataUser: async (req, res) => {
    const { id } = req.params
    const { name, phone, email, address } = req.body
    const results = await UserModel.UpdateDataUser(id, name, phone, email, address)
    if (results) {
      return Response({
        message: 'User has been updated'
      }, res)
    } else {
      return Response({
        message: 'Failed to update user'
      }, res)
    }
  },
  DeleteDataUser: async (req, res) => {
    const { id } = req.params
    const results = await UserModel.DeleteDataUser(id)
    if (results) {
      return Response({
        message: 'User has been deleted'
      }, res)
    } else {
      return Response({
        message: 'Failed to delete user'
      }, res)
    }
  }
}