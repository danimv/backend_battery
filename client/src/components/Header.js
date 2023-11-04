import React from 'react';


class Header extends React.Component {
  render() {
    const paddingRight10 = {
      paddingRight: '10%'
    };
    const fontSize140 = {
      fontSize: '140%'
    };
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <a className="navbar-brand" style={paddingRight10} href="/">PROSUM</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent" role="alert">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item" style={paddingRight10}>
                <a className="nav-link active" style={fontSize140} aria-current="page" href="/config">Config</a>
              </li>
              <li className="nav-item" style={paddingRight10}>
                <a className="nav-link active" style={fontSize140} aria-current="page" href="/bateria">Bateria</a>
              </li>
              <li className="nav-item" style={paddingRight10}>
                <a className="nav-link active" style={fontSize140} aria-current="page" href="/hola">Hola</a>
              </li>               
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Header;
