async function fetchUsers(endpoint) {

    try {
        console.log('fetching');
        const res = await fetch(endpoint);
    
        console.log('parsing data');
        let data = await res.json();
    
        console.log('mapping data to another format');
        data = data.map(user => user.username);
    
        console.log(data);    
    } catch (err) {
        console.log('catched the error');
        console.log(err);
    }
}

fetchUsers('https://jsonplaceholder.typicode.com/users');
