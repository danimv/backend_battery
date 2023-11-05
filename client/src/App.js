import './App.css';
import { Routes, Route, Link, BrowserRouter } from 'react-router-dom';

import Header from './components/Header';
import Config from './components/Config';
import Bateria from './components/Bateria';
import Hola from './components/Hola';

function App() {
  return (
    // basename={process.env.PUBLIC_URL+'/'}>
    <BrowserRouter>  
      <div className="App">
        <Header />        
        <Routes>
          <Route path="/configuracio" element={<Config />} />
          <Route path="/bateria" element={<Bateria />} />
          <Route path="/hola" element={<Hola />} />
        </Routes>
      </div>
      </BrowserRouter>
  );
}

export default App;
