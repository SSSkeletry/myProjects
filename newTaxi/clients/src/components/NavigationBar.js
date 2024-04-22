import React, { useContext } from 'react';
import { Context } from '..';
import '../style/navbar.css';

const NavigationBar = () => {
    const {user} = useContext(Context);
    return (
        <div>
        <div id="menu-button" className="menu-button">☰</div>
        <nav id="navigation" className="navigation">
            <ul className="nav-list">
                <li className="nav-item"><a href="#">Design</a></li>
                <li className="nav-item"><a href="#">Company</a></li>
                <li className="nav-item"><a href="#">Contact</a></li>
                <li className="nav-item"><a href="#">About</a></li>
            </ul>
        </nav>
    </div>
    )
}

export default NavigationBar