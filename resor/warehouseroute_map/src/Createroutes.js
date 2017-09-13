import React, { Component } from 'react';
import { Button, Navbar, NavItem, Nav, Grid, Row, Col, ButtonToolbar, FormGroup, FormControl, MenuItem, SplitButton } from 'react-bootstrap';
import {Navigation}from './index';
// import {GoogleMapsLoader } from "google-maps";
// import { withGoogleMap, GoogleMap, Marker} from "react-google-maps";
import GoogleMapsLoader from 'google-maps';

GoogleMapsLoader.KEY = 'AIzaSyB5B2eh46YKpFNNN7e-EaeEykAahyoNOuQ';
GoogleMapsLoader.LIBRARIES = ['geometry', 'places'];
GoogleMapsLoader.LANGUAGE = 'uk';
GoogleMapsLoader.REGION = 'UA';
let google;
GoogleMapsLoader.load(function(googleAPI) {
  google = googleAPI;
});

// const GettingStartedGoogleMap = withGoogleMap(props => (
//   <GoogleMap
//     defaultZoom={3}
//     defaultCenter={{ lat: -25.363882, lng: 131.044922 }}
//   >
//
//   </GoogleMap>
// ));
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
    route:this.state.route
  })
  /*console.log(rou)*/

  fetch( 'http://localhost:5000/routes', {method:'post', body:rou, headers: {'Content-Type': 'application/json'}} )

  .then(response => response.json())
  .then(response => {
    this.setState ({
      routes: response
    });
    console.log(response)
    response.map(routes => {
      let position = {
        lat: Number(routes.route.lat),
        lng: Number(routes.route.lng)
      };

        /*new this.google.maps.Marker({
          position: position,
          map: this.map,
          title: routes.name
        });
        let polyl = new this.google.maps.Polyline({
          path: position,
          map:this.map,
          geodesic: true,
          strokeColor: '#FF0000',
          strokeOpacity: 1.0,
          strokeWeight: 2
        });
        polyl.setMap(this.map);*/
      });

  });
}

componentDidMount(){

  GoogleMapsLoader.load(function(google) {
    this.google = google;
    this.map = new this.google.maps.Map(document.getElementById('googleMap'), {
      zoom: 3,
      center: {lat: 50.432876, lng: 30.465075}
    });
    this.Createroutes();

  }.bind(this));
}

    render() {

      return(
        <div className="container-fluid">
        <Navigation/>
          <Grid>
            <Row className="show-grid">
              <Col md={12} lg={12} sm={12} xs={12}>
                <div className="createroutesform col-centered" >
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
                  <div id="googleMap" className="googleMap"></div>
                  <ButtonToolbar>
                    <Button bsStyle="primary" bsSize="large" active onClick={this.Createroutes.bind(this)}>Create route</Button>
                  </ButtonToolbar>
                </div>
              </Col>
            </Row>
          </Grid>
        </div>
      );
    }
};

export default Createroutes;
// onMapLoad={_.noop}
// onMapClick={_.noop}
// markers={markers}
// onMarkerRightClick={_.noop}
/*<div className="map">
  <GettingStartedGoogleMap
    containerElement={
      <div style={{ height: `100%` }} />
    }
    mapElement={
      <div style={{ height: `100%` }} />
    }
  />
</div>*/
