// Function to create request the creation of a user account from the backend api.
const create = async (user) => {

    try {
        let response = await fetch('/api/users/', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(user)
        })
      return await response.json()
    } catch(err) {
      console.log(err)
    }
}