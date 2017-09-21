import {Navigation}from "./index"
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import './style.css';
import './index.js';
import { Button, Navbar, NavItem, Nav, Grid, Row, Col, ButtonToolbar, FormGroup, FormControl, MenuItem, SplitButton } from 'react-bootstrap';
import Authorization from './Authorization';

class WalkRoutes extends Component{
  constructor(props){
    super(props);

    this.state = {
      search: '',
      routes: [],
      filterlength: '',
      filterbycategory: '',
      favorites: [],
      categories: [
        {
          "id": 1,
          "name": "Walk"
        },
        {
          "id": 2,
          "name": "Bike"
        },
        {
          "id": 3,
          "name": "Other"
        }
      ],
      categoryId:'',
      routeId:'',
      filterByFavorites: true,
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
    })

    this.Favorites();
  }

  findRoute(list){
    if(this.state.search==="") return list;
    /*console.log(this.state.search)*/
    return list.filter(route =>
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
    })
  }

  Favorites() {

      fetch( 'http://localhost:5000/favorites?userId='+localStorage.getItem('id'), {method:'get', headers: {'Content-Type': 'application/json'}})

        .then(response => response.json())
        .then((response) => {
            this.setState({
              favorites: response
            });
            /*console.log(response);*/
        });

    }

  Filterbylength(list = []){
    if(this.state.filterlength ==='') return list;
    /*console.log(this.state.filterlength)*/
    return list.filter(rout => {
      return rout.length >= Number(this.state.filterlength);
    })
  }

  FilterbyCategory(){
    if(this.state.filterbycategory==='') return this.state.routes;
    /*console.log(this.state.filterbycategory)*/
    return this.state.routes.filter(rout => {
      /*console.log(rout.categoryId, this.state.filterbycategory);*/
      return rout.categoryId == this.state.filterbycategory;
    })
  }

  FilterByFavorites(list){
    if(!this.state.filterByFavorites || localStorage.getItem('id') === null ) return list;
    console.log(list)
      return list.filter(route => {

        return this.state.favorites.find(favor => favor.routeId === route.id);
      })
  }

  ToggleFilterByFavorites(){
    this.setState({ filterByFavorites: !this.state.filterByFavorites });
  }
    render() {

      const list = this.FilterByFavorites(this.findRoute(this.Filterbylength(this.FilterbyCategory()))).map((route, index) => {
        return (
          <li key={index}>
            <Link to = {"/routes/"+route.id}><strong><h2>{route.name}</h2></strong></Link><br/>
            <strong><h4>Length:</h4>{Math.round((route.length)/1000)}km</strong><br/>
            <h4>Description:</h4>{route.description}
          </li>
        )
      })

      const menuitems = this.state.categories.map((category, index) => (
        <MenuItem key={index} eventKey={category.id}>{category.name}</MenuItem>
      ));

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
                  <FormControl
                    type="text"
                    value={this.state.filterlength}
                    placeholder="Length"
                    onChange={(event) => this.setState({ filterlength: event.target.value })}
                  />
                  <FormControl.Feedback />
                  <SplitButton title="Category" onSelect={(eventKey) => { console.log(eventKey, 'qwe'); this.setState({ filterbycategory: eventKey }); }} pullRight id="split-button-pull-right">
                    {  this.state.categories.map((category, index) => (
                      <MenuItem key={index} eventKey={category.id}>{category.name}</MenuItem>
                    )) }
                  </SplitButton>
                  <ButtonToolbar>
                    <Button bsStyle="primary" bsSize="large" active onClick={this.ToggleFilterByFavorites.bind(this)}>My favorit routes</Button>
                  </ButtonToolbar>
                </FormGroup>
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
