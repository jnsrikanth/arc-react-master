import { Trader } from "../../components/traders_list/interfaces/traders_list_props_type"



export const SET_LOADING = "SET_LOADING_TYPE"
export const setLoadingAction=(loading)=> {
    return {
        type:SET_LOADING,
        data:loading
    }
}



export const SET_ERROR = "SET_ERROR_TYPE"
export const setErrorAction=(error)=> {
    return {
        type:SET_ERROR,
        data:error
    }
}

export const SET_SELECTED_DATE_RANGE = "SET_SELECTED_DATE_RANGE"
export const setSelectedDateRange=(startDate,endDate) => {
   return {
       type: SET_SELECTED_DATE_RANGE,
       data: {
           startDate,endDate
       }
   } 
}


export const SET_SELECTED_TRADER = "SET_SELECTED_TRADER"
export const setSelectedTrader = (data:Trader) => {
    return {
        type: SET_SELECTED_TRADER,
        data
    }
}

export const SET_TOAST_ERROR = 'SET_TOAST_ERROR'
export const setToastError = (data) => {
    return {
        type: SET_TOAST_ERROR,
        data
    }
}

