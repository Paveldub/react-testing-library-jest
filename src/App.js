import './App.css';
import {useState} from 'react';
import validator from 'validator';

function App() {

  const [signupInput, setSignupInput] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [error, setError] = useState("")

  const handleChange = (e) => {
    setSignupInput({
      ...signupInput,
      [e.target.name]: e.target.value
    })
  }

  const handleClick = (e) => {
    e.preventDefault()

    if (!validator.isEmail(signupInput.email)) {
      return setError('The email you input is invalid')
    } else if (signupInput.password.length < 5) {
      return setError('The password you entered should contain 5 or more characters')
    } else if (signupInput.password !== signupInput.confirmPassword) {
      return setError('The passwords do not match. try again')
    }
  }

  return (
    <div className="container">
      <form>
        <div className='input-elem'>
          <label htmlFor="email" className='form-label'>Email address</label>

          <input 
            type="email" 
            className='form-control' 
            id="email" 
            name="email" 
            value={signupInput.email} 
            onChange={handleChange}
          />
        </div>

        <div className='input-elem'>
          <label htmlFor="password" className='form-label'>Password</label>
          <input 
            type="password" 
            className='form-control' 
            id="password" 
            name="password" 
            value={signupInput.password} 
            onChange={handleChange}
          />
        </div>

        <div className='input-elem'>
          <label htmlFor="confirm-password" className='form-label'>Confirm Password</label>
          <input 
            type="password" 
            className='form-control' 
            id="confirm-password" 
            name="confirmPassword" 
            value={signupInput.confirmPassword} 
            onChange={handleChange}
          />
        </div>
        {error && <p style={{color: 'red'}}>{error}</p>}

        <button type="submit" onClick={handleClick}>Submit</button>
      </form>
    </div>
  );
}

export default App;
