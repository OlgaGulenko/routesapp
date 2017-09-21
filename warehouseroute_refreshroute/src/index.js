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
import Registration from './Registration';
import Refreshroute from './Refreshroute';
// import './style.css';
import { Button, Navbar, NavItem, Nav, Grid, Row, Col, ButtonToolbar } from 'react-bootstrap';
import Authorization from './Authorization';
import Createroutes from './Createroutes';
import Pageroutes from './Pageroute';
import rootReduser from './reducers';
import { push } from 'react-router-redux';

const history = createHistory()
/*console.log (history)*/

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history)

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
export const store = createStore(
  rootReduser,
  applyMiddleware(middleware)
)

function Logout(){
  localStorage.clear();

  store.dispatch(push('/authorization'))
}

export const Navigation = () => {

   return (
     <Grid>
       <Row className="show-grid">
         <Col md={4} lg={3} sm={12} xs={12}>
           <div className="menu">
             <nav className="nav center">
               <ul>
                 <li><Link to={`/`} className="active">Walk routes</Link></li>
                 <li><Link to={`/routes`} className="">Create Route</Link></li>
                 <li><Link to={`/routes/1`} className="">Pageroute</Link></li>
                 <li><Link to={`/users/9`} className="">My account</Link></li>
                 <li><Link to={`/registration`} className="">Registration</Link></li>
                 { localStorage.getItem('id') ? (
                   <li><a to={`/logout`} onClick={Logout} className="">Logout</a></li>
                 ): (
                   <li><Link to={`/authorization`} className="">Login</Link></li>
                 ) }
                 <li><Link to={`/refreshroute/1`} className="">Refresh route</Link></li>
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
        <Route exact path="/routes" component={Createroutes}/>
        <Route exact path="/refreshroute/:id" component={Refreshroute}/>
        <Route exact path="/routes/:id" component={Pageroutes}/>
        <Route exact path="/users/:id" component={Users}/>
        <Route exact path="/registration" component={Registration}/>
        <Route exact path="/authorization" component={Authorization}/>

      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('main')
)
