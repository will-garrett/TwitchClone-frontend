import _ from 'lodash';
import {
  CREATE_STREAM,
  FETCH_STREAM,
  EDIT_STREAM,
  DELETE_STREAM,
  FETCH_STREAMS
} from '../actions/types';

export default (state = {}, action) => {
  switch(action.type){
    case FETCH_STREAM:
    case CREATE_STREAM:
    case EDIT_STREAM:
      console.log("RETURNING STATE...")
      return {...state, [action.payload.id]: action.payload};
    case DELETE_STREAM:
      return _.omit(state, action.payload);
    case FETCH_STREAMS:
      return {...state, ..._.mapKeys(action.payload, 'id')};
    default:
      return state;
  }
}