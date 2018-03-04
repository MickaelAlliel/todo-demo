const UserHandlers = require('../handlers/user');
var express = require('express');
var router = express.Router();

router.get('/:id', UserHandlers.GetUserById);
router.get('/:machine/:machineId', UserHandlers.GetUserByMachineId);
router.post('/', UserHandlers.CreateUser);
router.delete('/:id', UserHandlers.DeleteUser);

module.exports = router;