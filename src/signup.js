// Euan Chree
// 1912490

// Imports
import React, {useState} from 'react'
import axios from 'axios'

// Function for signing up to the quote system
export default function Signup() {
  // Setting the state
  const [values, setValues] = useState({
    name: '',
    password: '',
    email: '',
    open: false,
    error: ''
  })

  // Function to handle changes of the input fields
  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
  }

  const signup = (e) =>  {
    e.preventDefault();
    console.log("Signing up")
    let data = {"name": values.name, "email": values.email, "password" : values.password}
    var requestURI = "http://127.0.0.1:8000/api/users"
    console.log(requestURI)
    axios.post(requestURI, data).then(response => {
      alert("Account created succesfully.")
    })
    .catch(err => {
      console.log(err)
      alert("Invalid Data entered please retry.\nEmails Must contain an '@' and a '.'.\nPasswords must be longer than 10 characters.")
    });
  }

  // Returning the component
  return (
    <div id="signup">
      <form>
      <label>
          Name:
          <input class="input" type="text" name="name" onChange={handleChange('name')}/>
        </label>
        <br></br>
        <label>
          e-mail:
          <input class="input" type="text" name="email" onChange={handleChange('email')}/>
        </label>
        <br></br>
        <label>
          Password:
          <input class="input" type="password" name="password" onChange={handleChange('password')} />
        </label>
        <br></br>
        <input class="input" type="submit" value="Submit" onClick={signup} />
      </form>
    </div>
  );
}
