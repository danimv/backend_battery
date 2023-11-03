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
      <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <div class="container-fluid">
          <a class="navbar-brand" style={paddingRight10} href="/">PROSUM</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent" role="alert">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item" style={paddingRight10}>
                <a class="nav-link active" style={fontSize140} aria-current="page" href="/config">Config</a>
              </li>
              <li class="nav-item" style={paddingRight10}>
                <a class="nav-link active" style={fontSize140} aria-current="page" href="/bateria">Bateria</a>
              </li>
              <li class="nav-item">
                <a class="nav-link active" style={fontSize140} aria-current="page" href="/logout">Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Header;
