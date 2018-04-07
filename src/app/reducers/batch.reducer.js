import { BATCH_RESULT_ERROR,
BATCH_RESULT_LOADING,
BATCH_RESULT_SUCCESS,FIND_BATCH_RESULT } from '../constants/ActionTypes';

const initialState = {
    result: [],
    loading: false
  }

  export const getBatchResult = (state = initialState,action) =>{
    switch(action.type){
        case BATCH_RESULT_LOADING :
        state.loading = true;
        return [ ...state, action.res ];
        break;
        case BATCH_RESULT_SUCCESS :
        state.loading = false;
        return [ ...state, action.res ];
        break;
        case BATCH_RESULT_ERROR :
        state.loading = false;
        return [ ...state, action.res ];
        break;
        default :
        return [ ...state, action.res ];
        break;
    }
  }

