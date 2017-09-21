import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import FilterRoutes from './FilterRoutes';
import users from './users';
// import walkroutes from './walkroutes';

const rootReduser = combineReducers({
  router: routerReducer,
  users,
  FilterRoutes

});
export default rootReduser;
