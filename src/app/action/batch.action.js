import * as types from '../constants/ActionTypes'

const loadingResults = (res) =>({
    type: types.BATCH_RESULT_LOADING,
    res
});

const getResultSucess = (res) => ({
    type: types.BATCH_RESULT_SUCCESS,
    res
});

const getResultError = (res) => ({
    type: types.BATCH_RESULT_ERROR,
    res
});

export const getBatchResult = (req) => ({
    
});

export const getresult = state => state;