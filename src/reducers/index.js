import { combineReducers } from 'redux';
import tiles from './tiles';

// This makes absolutely no sense with one reducer (you could just create a store by passing one reducer), but makes adding new reducers super easy
export default combineReducers({
  tiles,
});
