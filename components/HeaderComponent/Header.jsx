import React from 'react';

/*
  Presentation Component that renders the header / navigation bar.
*/

function Header() {
  const titleBox = (
    <h1 className="heading-primary">
      <span className="heading-primary-main">News Search</span>
      <span className="heading-primary-sub"> w/ News API</span>
    </h1>
  );

  return (
    <header className="navBar">
      {titleBox}
    </header>
  );
}

export default Header;
