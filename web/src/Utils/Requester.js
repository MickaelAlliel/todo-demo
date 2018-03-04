import axios from 'axios';
const ENDPOINT = "http://localhost:4000";
var requests = {};

requests.CreateUser = (machineId) => {
    axios.post(ENDPOINT + '/users', {machineId: machineId})
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error);
    });
};

requests.GetUserByMachineId = (machineId) => {
    axios.get(ENDPOINT + '/users/' + machineId)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error);
    });
};

requests.GetUserTodos = (userId) => {
    axios.get(ENDPOINT + '/todos/user/' + userId)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error);
    });
};

requests.AddTodo = (title, userId) => {
    axios.post(ENDPOINT + '/todos', {title: title, userId: userId})
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error);
    });
};

requests.UpdateTodo = (todoId, title, completed) => {
    axios.put(ENDPOINT + '/todos/' + todoId, {title: title, completed: completed})
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error);
    });
};

requests.DeleteTodo = (todoId) => {
    axios.delete(ENDPOINT + '/todos/' + todoId)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error);
    });
};

requests.DuplicateTodo = (todoId) => {
    axios.post(ENDPOINT + '/todos/duplicate/' + todoId)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error);
    });
};

export default requests;