import './App.css';

function App() {
  return (
    <div className="container">
      <form>
        <div className='input-elem'>
          <label htmlFor="email" className='form-label'>Email address</label>
          <input type="email" className='form-control' id="email" name="email" />
        </div>

        <div className='input-elem'>
          <label htmlFor="password" className='form-label'>Password</label>
          <input type="password" className='form-control' id="password" name="password" />
        </div>

        <div className='input-elem'>
          <label htmlFor="confirm-password" className='form-label'>Confirm Password</label>
          <input type="password" className='form-control' id="confirm-password" name="confirm-password" />
        </div>
      </form>
    </div>
  );
}

export default App;
