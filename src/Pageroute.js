import React, { Component } from 'react';
import './style.css';
import {Navigation} from "./index";
import { Button, Navbar, NavItem, Nav, Grid, Row, Col, ButtonToolbar, FormGroup, FormControl, MenuItem, SplitButton, ControlLabel } from 'react-bootstrap';
import GoogleMapsLoader from 'google-maps';

GoogleMapsLoader.KEY = 'AIzaSyB5B2eh46YKpFNNN7e-EaeEykAahyoNOuQ';
GoogleMapsLoader.LIBRARIES = ['geometry', 'places'];
GoogleMapsLoader.LANGUAGE = 'uk';
GoogleMapsLoader.REGION = 'UA';
let google,comment

class Pageroutes extends Component {

  constructor(props){
    super(props);

    this.state = {
      route: null,
      description: '',
      rating: '',
      userId:'',
      comments:[]

    };
  }

  componentDidMount(){

    GoogleMapsLoader.load(function(google) {
      this.google = google;
      this.map = new this.google.maps.Map(document.getElementById('googleMap'), {
        zoom: 3,
        center: {lat: 50.432876, lng: 30.465075}
      });

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

          this.GetComments();
      })
    })
    }.bind(this));
  }

  Createcomments(){

    let comment = JSON.stringify({
      rating:this.state.rating ,
      description: this.state.description,
    })

    fetch( 'http://localhost:5000/comments', {method:'post', body:comment, headers: {'Content-Type': 'application/json'}} )

    .then(response => response.json())
    .then(response => {
      comments: [...this.state.comments, response]
      this.GetComments();
    })
  }

  GetComments(){
      fetch( 'http://localhost:5000/comments',  {method:'get', headers: {'Content-Type': 'application/json'}} )
      .then(response => response.json())
      .then(response => {
        this.setState ({
          comments: response
        })
      })
  }

  render() {

    const list = this.state.comments.map((comment, index) => {
      return (
        <li key={index}>
          <strong><h2>Rating:{comment.rating}</h2></strong><br/>
          <strong><h4>Description:</h4>{comment.description}</strong><br/>
        </li>
      )
    })

    return (

      <div className="container-fluid">
        <Navigation />
        <Grid>
          <Row className="show-grid">
            <Col md={12} lg={12} sm={12} xs={12}>
              <div className="route">
                { this.state.route === null ? (
                  <span>Loading...</span>
                ) : (
                  <div className="route">
                    <span><h2> {this.state.route.name} </h2></span><br/>
                    <span><h4>Description: {this.state.route.description} </h4></span><br/>
                    <span><h4>Length: {Math.round((this.state.route.length)/1000)}km</h4></span><br/>
                  </div>
                ) }
                  <div id="googleMap" className="googleMap"></div><br/>
                    <div className="comment col-centered">
                      <FormGroup controlId="formControlsTextarea">
                        <ControlLabel>My comment</ControlLabel>
                        <FormControl
                        defaultValue={this.state.description}
                        onChange={(event) => this.setState({ description: event.target.value })}
                        componentClass="textarea"
                        placeholder="Your comment must be here" />
                      </FormGroup>
                      <SplitButton title="Rating" onSelect={(eventKey) => { console.log(eventKey, 'comment'); this.setState({ rating: eventKey }); }} pullRight id="split-button-pull-left">
                        { [1,2,3,4,5,6,7,8,9,10].map((rating, index) => (
                          <MenuItem key={index} eventKey={rating}>{rating}</MenuItem>
                        )) }
                      </SplitButton>
                      <ButtonToolbar>
                        <Button bsStyle="primary" bsSize="large" active onClick={this.Createcomments.bind(this)}>send comment</Button>
                      </ButtonToolbar>
                    </div>
                    <div className="lastcomments">
                      <h2>Comments:</h2>
                      {list}
                    </div>
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Pageroutes;
