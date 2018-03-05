const uuidv4 = require('uuid/v4');
var Utils = {};

Utils.pluralize = (count, word) => {
    return count === 1 ? word : word + 's';
}

Utils.getUuid = () => {
    return uuidv4();
}

export default Utils;