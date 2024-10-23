import { BrowserRouter } from 'react-router-dom'
import './App.css';
import Router from './router'


function App() {
  return (
    <div className='app'>
      <BrowserRouter >
        <Router/>
      </BrowserRouter>
    </div>
  )
}

export default App;
