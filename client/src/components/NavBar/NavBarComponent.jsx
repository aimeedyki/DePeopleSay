import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import './NavBar.css';

const NavBarComponent = () => <Navbar collapseOnSelect expand="lg" className="navbar" variant="dark">
  <Navbar.Brand href="#home" className="brand-name">Opinopolly</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
    <Nav>
      <Nav.Link href="#notification">Notification</Nav.Link>
      <Nav.Link href="#user">User name</Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Navbar>;

export default NavBarComponent;
