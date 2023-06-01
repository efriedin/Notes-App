import React, { Component } from "react";
import { MenuItems } from "./MenuItems";
import { MdClose, MdMenu } from "react-icons/md";


class Navbar extends Component {
    state = { clicked: false }

    handleClick = () => {
        this.setState({ clicked : !this.state.clicked})
    }

  render() {
    return (
      <nav className="navbar-item">
        <h1 className="navbar-title">Life Organizer</h1>
        <div className="menu-icon" onClick={this.handleClick}>
            {this.state.clicked && <MdClose />}
            {!this.state.clicked && <MdMenu />}
        </div>
        <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
          {MenuItems.map((item, index) => {
            return (
              <li ket={index}>
                <a className={item.cName} href={item.url}>
                  {item.title}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }
}

export default Navbar;
