const initialState = '';

export default function FilterRoutes(state = initialState, action) {
  if (action.type === 'FIND_Route') {
    return action.payload;
  }
  return state;
}
