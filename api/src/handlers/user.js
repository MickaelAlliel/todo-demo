const mongoose = require('mongoose');
const Boom = require('boom');
const UserModel = require('../models/user');

exports.GetUserById = async (request, h) => {
    if (!request.params.id) {
        throw Boom.badRequest('User ID is a required parameter')
    }
    let userId = request.params.id;
    const query = UserModel.findById(userId);
    try {
        var user = await query.exec();
    } catch (err) {
        return Boom.internal('Could not find user', err);
    }
    if (!user) {
        return Boom.notFound('User not found');
    }
    return {statusCode: 200, error: false, message: user}
};

exports.GetUserByMachineId = async (request, h) => {
    if (!request.params.machineId) {
        throw Boom.badRequest('User\'s Machine ID is a required parameter')
    }
    let machineId = request.params.machineId;
    const query = UserModel.findOne({machine_id: machineId});
    try {
        var user = await query.exec();
    } catch (err) {
        return Boom.internal('Could not find user', err);
    }
    if (!user) {
        return Boom.notFound('User not found');
    }
    return {statusCode: 200, error: false, message: user}
};

exports.CreateUser = async (request, h) => {
    if (!request.payload || !request.payload.machineId) {
        throw Boom.badRequest('Missing required parameter Machine ID');
    }
    var user = new UserModel();
    user.machine_id = request.payload.machineId;
    await user.save((err) => {
        if (err) throw Boom.internal('Could not save new user', err);
    })
    return {statusCode: 200, error: false, message: user}
};

exports.DeleteUser = async (request, h) => {
    if (!request.params.id) {
        throw Boom.badRequest('User ID is a required parameter')
    }
    let userId = request.params.id;
    const query = UserModel.findById(userId);
    try {
        var user = await query.exec();
    } catch (err) {
        return Boom.notFound('User not found', err);
    }
    user.remove((err) => {
        if (err) throw Boom.expectationFailed('Could not delete user', err);
    });
    return {statusCode: 200, error: false, message: 'Successfully deleted user'}
};