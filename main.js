// GET REQUEST
function getTodos() {
    // axios({
    //     method: 'get',
    //     url: 'https://reqres.in/api/users',
    //     params: {
    //         page: 1
    //     }
    // }).then(res => showOutput(res)).catch(err => console.log(err));

    axios.get('https://reqres.in/api/users?page=2').then(res => showOutput(res)).catch(err => console.log(err));
}

// POST REQUEST
function addTodo() {
    // axios({
    //     method: 'post',
    //     url: 'https://reqres.in/api/users',
    //     data: {
    //         email: "george.bluth@reqres.in",
    //         first_name: "Atharv",
    //         last_name: "karnekar",
    //         avatar: "https://reqres.in/img/faces/1-image.jpg",
    //         completed: false
    //     }
    // }).then(res => showOutput(res)).catch(err => console.log(err));

    axios.post('https://reqres.in/api/users', {
        email: "george.bluth@reqres.in",
        first_name: "Amey",
        last_name: "karnekar",
        avatar: "https://reqres.in/img/faces/1-image.jpg",
        completed: false
    }).then(res => showOutput(res)).catch(err => console.log(err));
}

// PUT/PATCH REQUEST
function updateTodo() {
    // axios.put('https://reqres.in/api/users/302', {
    //     email: "george.bluth@reqres.in",
    //     first_name: "Anushka",
    //     last_name: "karnekar",
    //     avatar: "https://reqres.in/img/faces/1-image.jpg",
    //     completed: true
    // }).then(res => showOutput(res)).catch(err => console.log(err));

    axios.patch('https://reqres.in/api/users/2', {
        email: "george.bluth@reqres.in",
        first_name: "Atharv",
        last_name: "karnekar",
        avatar: "https://reqres.in/img/faces/1-image.jpg",
        completed: true
    }).then(res => showOutput(res)).catch(err => console.log(err));
}

// DELETE REQUEST
function removeTodo() {
    axios.delete('https://reqres.in/api/users/2').then(res => showOutput(res)).catch(err => console.log(err));
}

// SIMULTANEOUS DATA
function getData() {
    axios.all([
        axios.get('https://reqres.in/api/users?page=1'),
        axios.get('https://reqres.in/api/users?page=2')
    ]).then(axios.spread((page1, page2) => showOutput(page2))).catch(err => console.log(err));
    // res => showOutput(res[0])
}

// CUSTOM HEADERS
function customHeaders() {
    const config = {
        headers: {
            'Content-Type': 'application/json;charset=utf8;',
            Authorization: 'sometoken'
        }
    }
    axios.post('https://reqres.in/api/users', {
        email: "george.bluth@reqres.in",
        first_name: "Amey",
        last_name: "karnekar",
        avatar: "https://reqres.in/img/faces/1-image.jpg",
        completed: false
    }, config).then(res => showOutput(res)).catch(err => console.log(err));
}

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
    const option = {
        method: 'post',
        url: 'https://reqres.in/api/users',
        data: {
            email: "george.bluth@reqres.in",
            first_name: "Atharv",
            last_name: "karnekar",
            avatar: "https://reqres.in/img/faces/1-image.jpg",
        },
        transformResponse: axios.defaults.transformResponse.concat(data => {
            data.first_name = data.first_name.toUpperCase()
            return data;
        })
    }
    axios(option).then(res => showOutput(res)).catch(err => console.log(err));
}

// ERROR HANDLING
function errorHandling() {
    axios.get('https://reqres.in/ap/users=5').then(res => showOutput(res)).catch(err => {
        if (err.response) {
            console.log(err.response.status)
            console.log(err.message)
            console.log(err.response.headers)
        }
        if (err.response.status === 404) {
            alert('Page Not Found');
        }
        else {
            alert(err);
        }
    });
}

// CANCEL TOKEN
function cancelToken() {
    let source = axios.CancelToken.source();
    axios.get('https://reqres.in/api/users?page=2', { cancelToken: source.token }).then(res => showOutput(res)).catch(thrown => { console.log('Request Canceled', thrown.message) });
    if (true) {
        source.cancel('Request Cancel');
    }
}

// INTERCEPTING REQUESTS & RESPONSES
axios.interceptors.request.use(config => {
    console.log(config.method.toUpperCase() + " request send to " + config.url + " at " + new Date().getTime());
    return config;
}, err => {
    return Promise.reject(err);
})

// AXIOS INSTANCES

// Show output in browser
function showOutput(res) {
    document.getElementById('res').innerHTML = `
    <div class="card card-body mb-4">
      <h5>Status: ${res.status}</h5>
    </div>
  
    <div class="card mt-3">
      <div class="card-header">
        Headers
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.headers, null, 2)}</pre>
      </div>
    </div>
  
    <div class="card mt-3">
      <div class="card-header">
        Data
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.data, null, 2)}</pre>
      </div>
    </div>
  
    <div class="card mt-3">
      <div class="card-header">
        Config
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.config, null, 2)}</pre>
      </div>
    </div>
  `;
}

// Event listeners
document.getElementById('get').addEventListener('click', getTodos);
document.getElementById('post').addEventListener('click', addTodo);
document.getElementById('update').addEventListener('click', updateTodo);
document.getElementById('delete').addEventListener('click', removeTodo);
document.getElementById('sim').addEventListener('click', getData);
document.getElementById('headers').addEventListener('click', customHeaders);
document
    .getElementById('transform')
    .addEventListener('click', transformResponse);
document.getElementById('error').addEventListener('click', errorHandling);
document.getElementById('cancel').addEventListener('click', cancelToken);