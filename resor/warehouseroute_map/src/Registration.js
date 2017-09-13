import React, { Component } from 'react';
import { Button, Navbar, NavItem, Nav, Grid, Row, Col, ButtonToolbar, FormGroup, FormControl } from 'react-bootstrap';
import {Navigation}from './index';

class Registration extends Component{

  constructor(props){
    super(props);

    this.state = {
      email: '',
      password: '',
      allow: 1,
    };
    this.onMyChange = this.onMyChange.bind(this);
    this.onMyClick = this.onMyClick.bind(this);
  }

onMyClick(){

}
onMyChange(e){
  switch (e.target.name)
  {
    case 'login':
        this.setState({login:e.target.value});
      break;
    case 'pass':
        this.setState({pass:e.target.value});
      break;
  }
}
CreateAccount(){
  let gh = JSON.stringify({
    email:this.state.email ,
    password: this.state.password
  })
  console.log(gh)

  fetch( 'http://localhost:5000/users', {method:'post', body:gh, headers: {'Content-Type': 'application/json'}} )

  .then(response => response.json())
  .then(response => {
    this.setState ({
      posts: response

    })
  })
}

    render() {

      return(
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
                    <Button bsStyle="primary" bsSize="large" active onClick={this.CreateAccount.bind(this)}>Create account</Button>
                  </ButtonToolbar>
                </div>
              </Col>
            </Row>
          </Grid>
        </div>
      );
    }
};

export default Registration;
