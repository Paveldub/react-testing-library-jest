import './App.css';

function App() {
  return (
    <div className="container">
      <form>
        <div>
          <label htmlFor="email" className='form-label'>Email address</label>
          <input type="email" className='form-control' id="email" name="email" />
        </div>
      </form>
    </div>
  );
}

export default App;
