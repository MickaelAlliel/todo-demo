const UserModel = require('../models/user');

exports.GetUserById = async (req, res, next) => {
    if (!req.params.id) {
        return res.status(400).send({statusCode: 400, error: true, message: 'User ID is a required parameter'})
    }
    let userId = req.params.id;
    const query = UserModel.findById(userId);
    try {
        var user = await query.exec();
    } catch (err) {
        if (err) return res.status(500).send({statusCode: 500, error: true, message: err})
    }
    if (!user) {
        return res.status(404).send({statusCode: 404, error: true, message: 'User not found'})
    }
    if (!res.headersSent) {
        return res.status(200).send({statusCode: 200, error: false, message: user})
    }
};

exports.GetUserByMachineId = async (req, res, next) => {
    if (!req.params.machineId) {
        return res.status(400).send({statusCode: 400, error: true, message: 'User\'s Machine ID is a required parameter'})
    }
    let machineId = req.params.machineId;
    const query = UserModel.findOne({machine_id: machineId});
    try {
        var user = await query.exec();
    } catch (err) {
        if (err) return res.status(500).send({statusCode: 500, error: true, message: err})
    }
    if (!user) {
        return res.status(404).send({statusCode: 404, error: true, message: 'User not found'})
    }
    if (!res.headersSent) {
        return res.status(200).send({statusCode: 200, error: false, message: user})
    }
};

exports.CreateUser = (req, res, next) => {
    if (!req.body || !req.body.machineId) {
        return res.status(400).send({statusCode: 400, error: true, message: 'User Machine ID is a required parameter'})
    }
    var user = new UserModel();
    user.machine_id = req.body.machineId;
    user.save((err) => {
        if (err) return res.status(500).send({statusCode: 500, error: true, message: err})

        if (!res.headersSent) {
            return res.status(200).send({statusCode: 200, error: false, message: user})
        }
    })
};

exports.DeleteUser = async (req, res, next) => {
    if (!req.params.id) {
        return res.status(400).send({statusCode: 400, error: true, message: 'User ID is a required parameter'})
    }
    let userId = req.params.id;
    const query = UserModel.findById(userId);
    try {
        var user = await query.exec();
    } catch (err) {
        if (err) return res.status(500).send({statusCode: 500, error: true, message: err})
    }
    user.remove((err) => {
        if (err) return res.status(500).send({statusCode: 500, error: true, message: err})

        if (!res.headersSent) {
            return res.status(200).send({statusCode: 200, error: false, message: 'Successfully deleted user'})
        }
    });
};