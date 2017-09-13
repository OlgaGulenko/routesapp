import React, { Component } from 'react';
import { Button, Navbar, NavItem, Nav, Grid, Row, Col, ButtonToolbar, FormGroup, FormControl, MenuItem, SplitButton } from 'react-bootstrap';
import {Navigation}from './index';
import GoogleMapsLoader from "google-maps";
// import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
// import ReactDOM from 'react-dom';

GoogleMapsLoader.KEY = 'AIzaSyB5B2eh46YKpFNNN7e-EaeEykAahyoNOuQ';
GoogleMapsLoader.LIBRARIES = ['geometry', 'places'];
GoogleMapsLoader.LANGUAGE = 'uk';
GoogleMapsLoader.REGION = 'UA';
GoogleMapsLoader.VERSION = '3.20';

class Createroutes extends Component{

  constructor(props){
    super(props);
    this.state = {
      name: '',
      description: '',
      rating: '',
      category: []
    }
  }
/*
  initMap() {
    let map = new google.maps.Map(document.getElementById('map'), {
      zoom: 3,
      center: {lat: 0, lng: -180},
      mapTypeId: 'terrain'
    });

    let flightPlanCoordinates = [
      {lat: 37.772, lng: -122.214},
      {lat: 21.291, lng: -157.821},
      {lat: -18.142, lng: 178.431},
      {lat: -27.467, lng: 153.027}
    ];
    let flightPath = new google.maps.Polyline({
      path: flightPlanCoordinates,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2
    });

    flightPath.setMap(map);
  }
  */
onMyChange(e){
  switch (e.target.name)
  {
    case 'name':
        this.setState({login:e.target.value});
      break;
    case 'description':
        this.setState({pass:e.target.value});
      break;
    case 'length':
        this.setState({len:e.target.value});
      break;
  }
}
Createroutes(){
  let rou = JSON.stringify({
    name:this.state.name ,
    description: this.state.description,
    length: this.state.length,

  })
  console.log(rou)

  fetch( 'http://localhost:5000/routes', {method:'post', body:rou, headers: {'Content-Type': 'application/json'}} )

  .then(response => response.json())
  .then(response => {
    this.setState ({
      posts: response

    })
    GoogleMapsLoader.load(function(google) {
    this.google = google;
    this.map = new this.google.maps.Map(document.getElementById('googleMap'), {
      zoom: 3,
      center: {lat: 50.432876, lng: 30.465075}
    });

    response.map(routes => {
      let position = {
        lat: Number(routes.route.lat),
        lng: Number(routes.route.lng)
      };

      new this.google.maps.Marker({
        position: position,
        map: this.map,
        title: routes.name
      });
    });
  }.bind(this));
  })
}
_onClickButton(coords){
  this.map.setCenter(coords);
  this.map.setZoom(15);

  var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
  let marker = new this.google.maps.Marker({
    position: coords,
    map: this.map,
    title: 'You here',
    icon: image
  });
}

geoFindMe() {
  let output = document.getElementById("out")
  if (!navigator.geolocation){
    output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
    return;
  }

  const success = (position) => {
    let latitude  = position.coords.latitude;
    let longitude = position.coords.longitude;

    this._onClickButton({ lat: latitude, lng: longitude });
  };

  const error = () => {
    output.innerHTML = "Unable to retrieve your location";
  };

  output.innerHTML = "<p>Locating…</p>";
  navigator.geolocation.getCurrentPosition(success, error);
}
    render() {

      return(
        <div className="container-fluid">
        <Navigation/>
          <Grid>
            <Row className="show-grid">
              <Col md={12} lg={12} sm={12} xs={12}>
                <div className="createroutesform" >
                  <FormGroup>
                    <FormControl
                      label="Route name"
                      type="text"
                      value={this.state.name}
                      placeholder="Enter the route's name here"
                      onChange={(event) => this.setState({ name: event.target.value })}
                    />
                    <FormControl.Feedback />
                    <FormControl
                      label="Description"
                      type="text"
                      value={this.state.password}
                      placeholder="Description"
                      onChange={(event) => this.setState({ description: event.target.value })}
                    />
                    <FormControl.Feedback />
                    <FormControl
                      label="Lenght"
                      type="text"
                      value={this.state.lenght}
                      placeholder="Route's lenght"
                      onChange={(event) => this.setState({ lenght: event.target.value })}
                    />
                    <FormControl.Feedback />
                    <SplitButton title="Category" pullRight id="split-button-pull-right">
                      <MenuItem  eventKey={this.state.category}>Walk</MenuItem>
                      <MenuItem eventKey="2">Bike</MenuItem>
                      <MenuItem eventKey="3">Other</MenuItem>
                    </SplitButton>
                  </FormGroup>
                  <ButtonToolbar>
                    <Button bsStyle="primary" bsSize="large" active onClick={this.Createroutes.bind(this)}>Create route</Button>
                    <Button bsStyle="primary" bsSize="large" active onClick={this.geoFindMe.bind(this)}>Show my location</Button>
                  </ButtonToolbar>
                  <div id="googleMap" className="googleMap"></div>
                </div>
              </Col>
              <Col md={12} lg={12} sm={12} xs={12}>

              </Col>
            </Row>
          </Grid>
        </div>
      );
    }
};

export default Createroutes;
