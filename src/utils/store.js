'use strict';
/**
 * Creates a new server side storage object and will create an empty
 * collection if no collection already exists.
 *
 */
class Store {
    constructor() {
        this.todos = [];
    }
}

/**
 * Finds items based on a query given as a JS object
 *
 * @param {object} query The query to match against (i.e. {foo: 'bar'})
 * @returns {Promise}
 * @example
 * store.find({foo: 'bar', hello: 'world'})
 */
Store.prototype.find = (query) => {
    return new Promise((resolve, reject) => {
        try {
            let todos = this.todos;
            todos.filter( todo => {
                for (let q in query) {
                    if (query[q] !== todo[q]) {
                        return false;
                    }
                }
                return true;
            });
            resolve(todos);
        }
        catch (err) {
            reject(err);
        }
    });
};

/**
 * Will retrieve all data from the collection
 * @returns {Promise}
 */
Store.prototype.findAll = () => {
    return new Promise((resolve, reject) => {
        try {
            let todos = this.todos;
            resolve(todos);
        }
        catch (err) {
            reject(err);
        }
    });
};

/**
 * Will save the given data to the DB. If no item exists it will create a new
 * item, otherwise it'll simply update an existing item's properties
 *
 * @param {object} updateData The data to save back into the DB
 * @param {number} id An optional param to enter an ID of an item to update
 * @returns {Promise}
 */
Store.prototype.save = (updateData, id) => {
    return new Promise((resolve, reject) => {
        try {
            let todos = this.todos;
            // If an ID was actually given, find the item and update each property
            if (id) {
                for (let i = 0; i < todos.length; i++) {
                    if (todos[i].id === id) {
                        for (let key in updateData) {
                            todos[i][key] = updateData[key];
                        }
                        break;
                    }
                }
            } else {
                // Generate a new id and add to store
                updateData.id = new Date().getTime();
                todos.push(updateData);
            }
            this.todos = todos;
            resolve(updateData);
        }
        catch (err) {
            reject(err);
        }
    });
};

/**
 * Will remove an item from the Store based on its ID
 *
 * @param {number} id The ID of the item you want to remove
 * @returns {Promise}
 */
Store.prototype.remove = (id) => {
    return new Promise((resolve, reject) => {
        try {
            let todos = this.todos;
            for (let i = 0; i < todos.length; i++) {
                if (todos[i].id == id) {
                    todos.splice(i, 1);
                    break;
                }
            }
            this.todos = todos;
            resolve(todos);
        } catch (err) {
            reject(err);
        }
    });
};

/**
 * Will drop all storage and start fresh
 *
 * @returns {Promise}
 */
Store.prototype.drop = () => {
    return new Promise((resolve, reject) => {
        try {
            this.todos = [];
            resolve(true);
        } catch (err) {
            reject(err);
        }
    });
};