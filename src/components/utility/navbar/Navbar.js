import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";
import './Navbar.css';

const Navbar = (props) => {
    const handleClick = () => {
        props.history.push('/');
    }
    let element = null;
    if(props.type === 'home') {
        element = null;
    } else {
        element = <button type="button" className="btn btn-warning home-btn" onClick={handleClick}>Home</button>;
    }
    return (
        <Fragment>
            <nav className="navbar navbar-dark navbar-inverse bg-dark">
                <div className="container-fluid">
                    <ul className="nav navbar-nav">
                        <li>
                            <span className="nav-title">
                                Breaking Bad
                            </span>
                        </li>
                    </ul>
                    <ul className="nav navbar-nav ml-auto">
                        <li>
                            {element}
                        </li>
                    </ul>
                </div>
            </nav>
        </Fragment>
    );
}

export default withRouter(Navbar);