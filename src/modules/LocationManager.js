const locationAPIManager = {
    getAll: () => {
        return fetch("http://localhost:5002/stores")
        .then(stores => stores.json())
    }
}

export default locationAPIManager;