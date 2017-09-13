import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, HashRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import './index.js';
import './style.css';
import { Button, Navbar, NavItem, Nav, Grid, Row, Col, ButtonToolbar, FormGroup, FormControl } from 'react-bootstrap';
import {Navigation}from "./index"


class WalkRoutes extends Component {

  constructor(props){
  super(props);

  this.state = {
    walkroutes: [],
    /*refresh:[]*/
  };
}

  render() {
    return (
      <div>
        <Navigation/>
        <ul>esrtyuiopi</ul>
      </div>

    );
  }
}

export default WalkRoutes;
