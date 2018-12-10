import React, { Component, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { Navbar, NavbarBrand, NavItem, Nav, Collapse } from 'reactstrap';

import './App.css';

const ItemIndex = lazy(() => import('./items/ItemIndex'));
const ItemForm = lazy(() => import('./items/ItemForm'));

class App extends Component {
  render() {
    return (
      <Router>
        <Suspense fallback={<h3>Preparing...</h3>}>
          <Navbar color="light" light expand="md">
            <NavbarBrand href="/">Price monitoring</NavbarBrand>
            <Collapse isOpen={true} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <Link to="/">Item List</Link>
                </NavItem>
                <NavItem>
                  <Link to="/item/add">Add New Item</Link>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
          <Switch>
            <Route exact path="/">
              <ItemIndex />
            </Route>
            <Route exact path="/item/add">
              <ItemForm />
            </Route>
          </Switch>
        </Suspense>
      </Router>
    );
  }
}

export default App;
