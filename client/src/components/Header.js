import React from 'react';
import {Link} from 'react-router-dom';

const Header = () => {

  return (
    <header>
        <div className="wrap header--flex">
            <h1 className="header--logo"><a href="/">Courses</a></h1>
            <nav>
                <ul className="header--signedout">
                    <Link to='/signup'>Sign Up</Link>
                    <Link to='/signin'>Sign In</Link>
                </ul>
            </nav>
        </div>
    </header>
  );
}

export default Header;
