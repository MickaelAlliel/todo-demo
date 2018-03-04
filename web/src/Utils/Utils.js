import {machineIdSync} from 'node-machine-id';
var Utils = {};

Utils.pluralize = (count, word) => {
    return count === 1 ? word : word + 's';
}

Utils.getMachineId = () => {
    return machineIdSync();
}

export default Utils;