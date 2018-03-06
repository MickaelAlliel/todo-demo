const UserHandlers = require('../handlers/user');
const express = require('express');
let router = express.Router();

router.get('/:id', UserHandlers.GetUserById);
router.get('/:machine/:machineId', UserHandlers.GetUserByMachineId);
router.post('/', UserHandlers.CreateUser);
router.delete('/:id', UserHandlers.DeleteUser);

module.exports = router;