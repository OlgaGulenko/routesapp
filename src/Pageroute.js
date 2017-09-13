import React, { Component } from 'react';
import './style.css';
import {Navigation} from "./index";
import { Button, Navbar, NavItem, Nav, Grid, Row, Col, ButtonToolbar, FormGroup, FormControl, MenuItem, SplitButton } from 'react-bootstrap';
import GoogleMapsLoader from 'google-maps';

GoogleMapsLoader.KEY = 'AIzaSyB5B2eh46YKpFNNN7e-EaeEykAahyoNOuQ';
GoogleMapsLoader.LIBRARIES = ['geometry', 'places'];
GoogleMapsLoader.LANGUAGE = 'uk';
GoogleMapsLoader.REGION = 'UA';
let google
GoogleMapsLoader.load(function(googleAPI) {
  google = googleAPI;
});
class Pageroutes extends Component {

  constructor(props){
    super(props);

    this.state = {
      route: null
    };
  }
  // Createmaproutes(){
  //
  //   fetch( 'http://localhost:5000/routes/'+this.props.match.params.id, {method:'get', headers: {'Content-Type': 'application/json'}} )
  //
  //   .then(response => response.json())
  //   .then(response => {
  //     this.setState ({
  //       routes: response
  //     });
  //     response.map(route => {
  //       if(!route.route || route.route.length === 0) return;
  //       let position = {
  //           lat: route.route[0].lat,
  //           lng: route.route[0].lng
  //         };
  //     });
  //     console.log(response)
  //
  //   });
  // /*  Update();*/
  // }

  componentDidMount(){

    fetch( 'http://localhost:5000/routes/'+this.props.match.params.id, {method:'get', headers: {'Content-Type': 'application/json'}} )

    .then(response => response.json())
    .then(response => {
      this.setState ({
        route: response
      });
      new this.google.maps.Polyline({
        path: response.route,
        map:this.map,
        /*geodesic: true,*/
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2
      });
      response.route.map(route => {

        let position = {
            lat: route.lat,
            lng: route.lng
          };
        console.log(position);
        new this.google.maps.Marker({
          position: position,
          map: this.map,
          title: route.name
        });
    })

  })
    GoogleMapsLoader.load(function(google) {
      this.google = google;
      this.map = new this.google.maps.Map(document.getElementById('googleMap'), {
        zoom: 3,
        center: {lat: 50.432876, lng: 30.465075}
      });
    }.bind(this));
  }

  render() {

    return (

      <div className="container-fluid">
        <Navigation />
        <Grid>
          <Row className="show-grid">
            <Col md={12} lg={12} sm={12} xs={12}>
              <div className="route">
                { this.state.route === null ? (
                  <span>loading...</span>
                ) : (
                  <div className="route">
                    <span><h2> {this.state.route.name} </h2></span><br/>
                    <span><h4>Description: {this.state.route.description} </h4></span><br/>
                    <span><h4>Length: {Math.round((this.state.route.length)/1000)} km</h4></span><br/>

                  </div>
                ) }
                    <div id="googleMap" className="googleMap"></div>
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Pageroutes;
