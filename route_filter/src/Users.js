import React, { Component } from 'react';
import './style.css';
import {Navigation} from "./index"
import { Button, Navbar, NavItem, Nav, Grid, Row, Col, ButtonToolbar, FormGroup, FormControl, MenuItem, SplitButton } from 'react-bootstrap';
import Authorization from './Authorization';

class Users extends Component {
  constructor(props){
    super(props);

    this.state = {
      user: []
    };
    console.log(this.props)
  }

  componentDidMount(){

    fetch( 'http://localhost:5000/users/'+ localStorage.getItem('id'), {method:'get', headers: {'Content-Type': 'application/json'}} )

    .then(response => response.json())
    .then(response => {
      this.setState ({
        user: response
      });
      console.log(response)
    })
  }
  render() {
    return (
      <div className="container-fluid">
        <Navigation />
          <Grid>
            <Row className="show-grid">
              <Col md={12} lg={12} sm={12} xs={12}>
                <div className="route">
                  { this.state.user === null ? (
                    <span>loading...</span>
                  ) : (
                    <div className="user">
                      <span><h2> {this.state.user.email} </h2></span>
                    </div>
                  ) }
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Users;
