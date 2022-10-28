const redux = require('redux')
const thunkMiddleware = require('redux-thunk').default
const axios = require('axios')


const createStore = redux.createStore
const appplyMiddleware = redux.applyMiddleware

const initialState = {
    loading:true,
    users: [],
    error:''
}

const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST'
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS'
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE'


function fetchUsers(){
    return function(dispatch){
        // console.log(dispatch(fetchUsersRequest))
        dispatch(fetchUsersRequest())
        axios.get("https://jsonplaceholder.typicode.com/users").then(response=>{
            const users = response.data.map(user=>user.id)
            dispatch(fetchUsersSuccess(users))
        }).catch(error=>{
            dispatch(fetchUsersFailure(error))
        })
    }
}

const fetchUsersRequest = ()=>{
    return {
        type:FETCH_USERS_REQUEST
    }
}

const fetchUsersSuccess = (users)=>{
    return {
        type: FETCH_USERS_SUCCESS,
        payload: users
    }
}

const fetchUsersFailure = (error)=>{
    return {
        type:FETCH_USERS_FAILURE,
        payload:error
    }
}



const reducer = (state=initialState, action)=>{
    switch(action.type){
        case FETCH_USERS_REQUEST:
            return {
                ...state, loading:true
            }
        case FETCH_USERS_SUCCESS:
            return{
                loading:false,
                users:action.payload,
                error:''
            }
        case FETCH_USERS_FAILURE:
            return{
                loading:false,
                users:[],
                error:action.payload
            }
    }
}

const store = createStore(reducer,appplyMiddleware(thunkMiddleware))
store.subscribe(()=>console.log('Initial State', store.getState()))
console.log(store.dispatch(fetchUsers))
store.dispatch(fetchUsers())