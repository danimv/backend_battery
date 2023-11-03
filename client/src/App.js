import './App.css';
import { Routes, Route, Link, BrowserRouter } from 'react-router-dom';

import Header from './components/Header';
import Config from './components/Config';
import Bateria from './components/Bateria';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />        
        <Routes>
          <Route path="/config" element={<Config />} />
          <Route path="/bateria" element={<Bateria />} />
        </Routes>
      </div>
      </BrowserRouter>
  );
}

export default App;
