import './App.css';
import { Routes, Route, Link, BrowserRouter } from 'react-router-dom';

import Header from './components/Header';
import Config from './components/Config';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <nav>
          <Link to="/config">Config</Link>
        </nav>
        <Routes>
          <Route path="/config" element={<Config />} />
        </Routes>
        {/* <Config /> */}
      </div>
      </BrowserRouter>
  );
}

export default App;
