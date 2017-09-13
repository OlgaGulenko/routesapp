import React, { Component } from 'react';
import { Button, Navbar, NavItem, Nav, Grid, Row, Col, ButtonToolbar, FormGroup, FormControl, MenuItem, SplitButton } from 'react-bootstrap';
import {Navigation}from './index';
import GoogleMapsLoader from 'google-maps';

GoogleMapsLoader.KEY = 'AIzaSyB5B2eh46YKpFNNN7e-EaeEykAahyoNOuQ';
GoogleMapsLoader.LIBRARIES = ['geometry', 'places'];
GoogleMapsLoader.LANGUAGE = 'uk';
GoogleMapsLoader.REGION = 'UA';
let google, marker1, marker2
GoogleMapsLoader.load(function(googleAPI) {
  google = googleAPI;
});

class Createroutes extends Component{

  constructor(props){
    super(props);
    this.state = {
      name: '',
      description: '',
      rating: '',
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
      categoryid:'',
      length:'',
      allow: 1,


    }
    this.positions=[]
  }

onMyChange(e){
  switch (e.target.name)
  {
    case 'name':
        this.setState({login:e.target.value});
      break;
    case 'length':
        this.setState({len:e.target.value});
      break;
    case 'description':
        this.setState({pass:e.target.value});
      break;
  }
}
Createmaproutes(){

  let rou = JSON.stringify({
    name:this.state.name ,
    description: this.state.description,
    length: this.state.length,
    route:this.state.route,
    categories:this.state.categories
  })

  fetch( 'http://localhost:5000/routes', {method:'get', headers: {'Content-Type': 'application/json'}} )

  .then(response => response.json())
  .then(response => {
    this.setState ({
      routes: response
    });
    response.map(route => {
      if(!route.route || route.route.length === 0) return;
      let position = {
          lat: route.route[0].lat,
          lng: route.route[0].lng
        };
      let categories = {
        categories: route.categories
      }
      for(let position of route.route){
        marker1 = new this.google.maps.Marker({
          position: position,
          draggable:true,
          map: this.map,
          title: route.name

        });
        marker2 = new this.google.maps.Marker({
          position: position,
          draggable:true,
          map: this.map,
          title: route.name

        });
      }
        /*let bounds = new google.maps.LatLngBounds(
          marker1.getPosition(), marker2.getPosition());
        this.map.fitBounds(bounds);

        google.maps.event.addListener(marker1, 'position_changed', Update);
        google.maps.event.addListener(marker2, 'position_changed', Update);*/

      let polyl = new this.google.maps.Polyline({
        categories:route.categories,
        path: route.route,
        map:this.map,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2
      });
      polyl.setMap(this.map);
    });
    console.log(response)

  });
/*  Update();*/
}

/*Update = () => {
  let path = [marker1.getPosition(), marker2.getPosition()];
  // polyl.setPath(path);
  let heading = google.maps.geometry.spherical.computeHeading(path[0], path[1]);
  document.getElementById('heading').value = heading;
  document.getElementById('origin').value = path[0].toString();
  document.getElementById('destination').value = path[1].toString();
}*/
Createroutes(){
  let route = this.positions.map((position) => {
    return position
  })

  let rou = JSON.stringify({
    name:this.state.name ,
    description: this.state.description,
    length: this.state.length,
    route: route,
    categories:this.state.categoryid
  })

  fetch( 'http://localhost:5000/routes', {method:'post', body:rou, headers: {'Content-Type': 'application/json'}} )

  .then(response => response.json())
  .then(response => {
    console.log(response)
    this.setState ({
      routes: response
    })
  })
}

componentDidMount(){
  GoogleMapsLoader.load(function(google) {
    this.google = google;
    /*this.heading = length;*/
    this.map = new this.google.maps.Map(document.getElementById('googleMap'), {
      zoom: 3,
      center: {lat: 50.432876, lng: 30.465075}
    });
    /*this.Createmaproutes();*/
    this.map.addListener('click', function(event) {
        /*console.log(event, event.latLng)*/
        new this.google.maps.Marker({
          position: event.latLng,
          draggable:true,
          map: this.map,
        });
        this.positions.push(event.latLng)
        this.PolilyneF();
        /*length = google.maps.geometry.spherical.computeHeading(event.latLng[0]);
        document.getElementById('heading').value = length;*/
      }.bind(this));

  }.bind(this));
}
  PolilyneF(){
    let polyl = new this.google.maps.Polyline({
      path: this.positions,
      map:this.map,
      /*geodesic: true,*/
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2
    });
    polyl.setMap(this.map);
    let meters = this.google.maps.geometry.spherical.computeLength(polyl.getPath());
    this.setState({
      length: meters
    })
    console.log(meters)

}


    render() {
        const menuitems = this.state.categories.map((category, index) => (
          <MenuItem key={index} eventKey={category.id}>{category.name}</MenuItem>
        ));
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
                      defaultValue={this.state.lenght}
                      // value={this.state.lenght}
                      placeholder="Route's lenght"
                      onChange={(event) => this.setState({ lenght: event.target.value })}
                    />
                    <FormControl.Feedback />
                  </FormGroup>
                  <SplitButton title="Category" onSelect={(eventKey) => { console.log(eventKey, 'qwe'); this.setState({ categoryid: eventKey }); }} pullRight id="split-button-pull-right">
                    {  this.state.categories.map((category, index) => (
                      <MenuItem key={index} eventKey={category.id}>{category.name}</MenuItem>
                    )) }
                  </SplitButton>
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
