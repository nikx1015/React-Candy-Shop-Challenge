const candyAPIManager = {
    getAll: () => {
        return fetch("http://localhost:5002/candy")
        .then(candy => candy.json())
    }
}

export default candyAPIManager;