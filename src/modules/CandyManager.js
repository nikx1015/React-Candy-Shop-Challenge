const candyAPIManager = {
    getAll: () => {
        return fetch("http://localhost:5002/candy")
        .then(candy => candy.json())
    },
    post(newCandy) {
        return fetch("http://localhost:5002/candy", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newCandy)
        }).then(data => data.json())
      }
}

export default candyAPIManager;