import * as types from '../constants/ActionTypes';
import fetch from 'cross-fetch'

const loadingResults = (res) =>({
    type: types.BATCH_RESULT_LOADING,
    res
});

export const getResultSucess = (res) => ({
    type: types.BATCH_RESULT_SUCCESS,
    res
});

const getResultError = (res) => ({
    type: types.BATCH_RESULT_ERROR,
    res
});

export const getBatchResult = (req) => {
    fetch('//api.github.com/users/lquixada')
    .then((res)=>{
        return function(dispatch){
            dispatch(getResultSucess(res));           
        }
        
    });

   
};

export const getresult = state => state;