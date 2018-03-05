import axios from 'axios';
const ENDPOINT = "http://localhost:4000";
var requests = {};

requests.GET = (url) => {
    return new Promise((resolve, reject) => {
        axios.get(ENDPOINT + url)
        .then(response => {
            resolve(response)
        })
        .catch(error => {
            reject(error)
        });
    })
};

requests.POST = (url, payload) => {
    return new Promise((resolve, reject) => {
        axios.post(ENDPOINT + url, payload)
        .then(response => {
            resolve(response)
        })
        .catch(error => {
            reject(error)
        });
    })
};

requests.PUT = (url, payload) => {
    return new Promise((resolve, reject) => {
        axios.put(ENDPOINT + url, payload)
        .then(response => {
            resolve(response)
        })
        .catch(error => {
            reject(error)
        });
    })
};

requests.DELETE = (url) => {
    return new Promise((resolve, reject) => {
        axios.delete(ENDPOINT + url)
        .then(response => {
            resolve(response)
        })
        .catch(error => {
            reject(error)
        });
    })
}

requests.CreateUser = (machineId) => {
    return requests.POST('/users', {machineId: machineId})
};

requests.GetUserByMachineId = (machineId) => {
    return requests.GET('/users/' + machineId)
};

requests.GetUserTodos = (userId) => {
    return requests.GET('/todos/user/' + userId)
};

requests.AddTodo = (title, userId) => {
    return requests.POST('/todos', {title: title, userId: userId})
};

requests.UpdateTodo = (todoId, title, completed) => {
    return requests.PUT('/todos/' + todoId, {title: title, completed: completed})
};

requests.DeleteTodo = (todoId) => {
    return requests.DELETE('/todos/' + todoId)
};

requests.DuplicateTodo = (todoId) => {
    return requests.POST('/todos/duplicate/' + todoId, {})
};

export default requests;