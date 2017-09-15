import {Navigation}from "./index"
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import './style.css';
import './index.js';
import { Button, Navbar, NavItem, Nav, Grid, Row, Col, ButtonToolbar, FormGroup, FormControl } from 'react-bootstrap';

class WalkRoutes extends Component{
  constructor(props){
    super(props);

    this.state = {
      search: '',
      routes: [],
      /*refresh:[]*/
    };
  }

  componentDidMount(){
    fetch( 'http://localhost:5000/routes' )

    .then(response => response.json())
    .then(response => {
      this.setState ({
        routes: response

      });
      /*console.log(response)*/
    })
  }

  findRoute(){
    if(this.state.search==="") return this.state.routes;
    /*debugger*/
    console.log(this.state.search)
    return this.state.routes.filter(route =>
      route.name && route.description && (route.name.indexOf(this.state.search) >= 0 || route.description.indexOf(this.state.search) >= 0)
    )

  }

  FetchRoutes(){
    fetch( 'http://localhost:5000/routes', {method:'get', headers: {'Content-Type': 'application/json'}})
    .then(response => response.json())
    .then(response => {
      this.setState ({
        routes: response
      })
      console.log(response)
    })
  }

  RefreshRoutesList(){
    /*debugger*/
    return this.FetchRoutes();
  }
  Filterbycategory(){

  }


    render() {

      const list = this.findRoute().map((route, index) => {
        return (
          <li key={index}>
            <strong><h2>{route.name}</h2></strong><br/>
            <strong><h4>Length:</h4>{Math.round((route.length)/1000)}km</strong><br/>
            <h4>Description:</h4>{route.description}
          </li>
        )
      })

    return (
      <div className="container-fluid">
      <Navigation/>
        <Grid>
          <Row className="show-grid">
            <Col md={4} lg={3} sm={12} xs={12}>
              <div className="input" >
                <FormGroup>
                  <FormControl
                    type="text"
                    value={this.state.search}
                    placeholder="Search"
                    onChange={(event) => this.setState({ search: event.target.value })}
                  />
                  <FormControl.Feedback />
                </FormGroup>
              </div>
            </Col>
            <Col md={3} lg={3} sm={12} xs={12}>
              <div className="filterbycategory">
                <ButtonToolbar>
                  <Button bsStyle="primary" bsSize="large" active onClick={this.Filterbycategory.bind(this)}>Refresh list</Button>
                </ButtonToolbar>
              </div>
            </Col>

          </Row>
          <Row className="show-grid">
            <Col md={12} lg={12} sm={12} xs={12}>
              <div className="routeslist">
                <ul>
                  { list }
                </ul>
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
   )
  }
}
export default WalkRoutes;
// <Col md={3} lg={3} sm={12} xs={12}>
//   <div className="refreshbutton">
//     <ButtonToolbar>
//       <Button bsStyle="primary" bsSize="large" active onClick={this.RefreshRoutesList.bind(this)}>Refresh list</Button>
//     </ButtonToolbar>
//   </div>
// </Col>
