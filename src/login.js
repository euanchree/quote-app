import React, {useState, useContext} from 'react'
import axios from 'axios'
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { setAuthBool, unsetAuthBool } from './reduxslice'


export default function Signup() {
  const [values, setValues] = useState({
    name: '',
    password: '',
    email: '',
    authorised: false,
    token: "",
    quotes: []
  });

  const dispatch = useDispatch();

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
  };


  const login = (e) =>  {
    console.log("Logging in");
    e.preventDefault();
    let data = {"email": values.email, "password" : values.password};
    var requestURI = "http://127.0.0.1:8000/auth/signin";
    console.log(requestURI);
    axios.post(requestURI, data)
    .then(response => {
      //console.log("Setting JWT in storage")
      sessionStorage.setItem('auth', JSON.stringify(response.data));
      console.log("Auth Response",response.data)
      setValues({ ...values, 'authorised': true })
      setValues({ ...values, 'token': JSON.stringify(response.data) })
      dispatch(setAuthBool())
    })
    .catch(err => {
      console.log(err)
      alert("Invalid login: Please check email and password.")
    });
  }
  
  const authUser = sessionStorage.getItem('auth')
  let loginDisplay = "Log in now" 
  if (authUser) {
    loginDisplay = "You're already logged in"
    dispatch(setAuthBool())
  } else {
    dispatch(unsetAuthBool)
  }

  return (
    <div id="signup">
      <form>
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
          <input class="input" type="submit" value={loginDisplay} onClick={login} />
      </form>
    </div>
  );
}
