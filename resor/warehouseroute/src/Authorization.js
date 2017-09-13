import React, { Component } from 'react';
import ErrorMessageInput from './ErrorMessageInput';
import { Button, Navbar, NavItem, Nav, Grid, Row, Col, ButtonToolbar, FormGroup, FormControl } from 'react-bootstrap';
import { push } from 'react-router-redux'
import {store, Navigation} from './index';

class Authorization extends Component{

  constructor(props){
    super(props);

    this.state = {
      email: '',
      password: '',
      isValid: true,
      gets:''
    };
  }
  handleChange = (e) =>{
    switch (e.target.name)
    {
      case 'email':
          this.setState({email:e.target.value});
        break;
      case 'password':
          this.setState({password:e.target.value});
        break;
    }
  }
  Login(){
    let url ='http://localhost:5000/users?email='+this.state.email+'&password='+this.state.password;
    fetch(url, {method:'get', headers: {'Content-Type': 'application/json'}} )
    .then(response => response.json())
    .then(response => {
      if(response!="")store.dispatch(push('/users'))
      else {
        alert("Incorrect email or password!")
      }
    })
  }

  render() {
    return (
      <div className="container-fluid">
      <Navigation/>
        <Grid>
          <Row className="show-grid">
            <Col md={12} lg={12} sm={12} xs={12}>
              <div className="registrationform" >
                <FormGroup>
                  <FormControl
                    label="Email address"
                    type="text"
                    value={this.state.email}
                    placeholder="Enter your email here"
                    onChange={(event) => this.setState({ email: event.target.value })}
                  />
                  <FormControl.Feedback />
                  <FormControl
                    label="Password"
                    type="text"
                    value={this.state.password}
                    placeholder="Password"
                    onChange={(event) => this.setState({ password: event.target.value })}
                  />
                  <FormControl.Feedback />
                </FormGroup>
                <ButtonToolbar>
                  <Button bsStyle="primary" bsSize="large" active onClick={this.Login.bind(this)}>Login</Button>
                </ButtonToolbar>
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
      );
    }
};

export default Authorization;
