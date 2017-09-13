import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import users from './users';
// import walkroutes from './walkroutes';

const rootReduser = combineReducers({
  router: routerReducer,
  users,

});
export default rootReduser;
