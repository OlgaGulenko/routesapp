import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import registerServiceWorker from './registerServiceWorker';
import { routerMiddleware, ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Route } from 'react-router';
import { Link } from 'react-router-dom';

import Users from './Users';
import WalkRoutes from './Walkroutes';
import Registration from './Registration'
// import './style.css';
import { Button, Navbar, NavItem, Nav, Grid, Row, Col, ButtonToolbar } from 'react-bootstrap';
import Authorization from './Authorization';
import Createroutes from './Createroutes';
import reducers from './reducers';


const history = createHistory()
console.log (history)

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history)

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
export const store = createStore(
  applyMiddleware(middleware)
)

export const Navigation = () => {
   return (
     <Grid>
       <Row className="show-grid">
         <Col md={4} lg={3} sm={12} xs={12}>
           <div className="menu">
             <nav className="nav center">
               <ul>
                 <li><Link to={`/`} className="active">WALK ROUTES</Link></li>
                 <li><Link to={`/users`} className="">USERS</Link></li>
                 <li><Link to={`/registration`} className="">CREATE ACCOUNT</Link></li>
                 <li><Link to={`/authorization`} className="">Login</Link></li>
                 <li><Link to={`/routes`} className="">Create Route</Link></li>
               </ul>
             </nav>
           </div>
         </Col>
       </Row>
     </Grid>
  )
};

ReactDOM.render(
  <Provider store={store}>
    { /* ConnectedRouter will use the store from Provider automatically */ }
    <ConnectedRouter history={history}>
      <div>
        <Route exact path="/" component={WalkRoutes}/>
        <Route exact path="/users" component={Users}/>
        <Route exact path="/registration" component={Registration}/>
        <Route exact path="/authorization" component={Authorization}/>
        <Route exact path="/routes" component={Createroutes}/>
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('main')
)
