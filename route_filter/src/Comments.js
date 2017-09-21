import React, { Component } from 'react';
import { Button, Navbar, NavItem, Nav, Grid, Row, Col, ButtonToolbar, FormGroup, FormControl, MenuItem, SplitButton } from 'react-bootstrap';
import {Navigation}from './index';

class Comments extends Component{

  constructor(props){
    super(props);
    this.state = {
      routes: []
      description:'',
      rating:'',
      userId:''
  }


Createcomments(){

  let comment = JSON.stringify({
    rating:this.state.rating ,
    description: this.state.description,


  })

  fetch( 'http://localhost:5000/routes/'+this.props.match.params.id +'/comments/', {method:'post', body:comment, headers: {'Content-Type': 'application/json'}} )

  .then(response => response.json())
  .then(response => {
    console.log(response)
    this.setState ({
      routes: response
    })
  })
}

    render() {
      const menuitems = this.state.rating.map((category, index) => (
        <MenuItem key={index} eventKey={rating}>{rating}</MenuItem>
      ));
      return(
        <div className="container-fluid">
        <Navigation/>
          <Grid>
            <Row className="show-grid">
              <Col md={12} lg={12} sm={12} xs={12}>
                <div className="createcomments col-centered" >
                  <SplitButton title="Category" onSelect={(eventKey) => { console.log(eventKey, 'comment'); this.setState({ rating: eventKey }); }} pullRight id="split-button-pull-right">
                    {  this.state.rating.map((rating, index) => (
                      <MenuItem key={index} eventKey={rating}>{rating}</MenuItem>
                    )) }
                  </SplitButton>
                  <ButtonToolbar>
                    <Button bsStyle="primary" bsSize="large" active onClick={this.createcomments.bind(this)}>send comment</Button>
                  </ButtonToolbar>
                </div>
              </Col>
            </Row>
          </Grid>
        </div>
      );
    }
};

export default Comments;
