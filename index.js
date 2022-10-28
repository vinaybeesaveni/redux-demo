const redux = require('redux')
const reduxLogger = require('redux-logger')

const createStore = redux.createStore
const combineReducers = redux.combineReducers
const applyMiddleware = redux.applyMiddleware
const logger = reduxLogger.createLogger()

const BUY_CAKE = 'BUY_CAKE'
const BUY_ICECREAM = 'BUY_ICECREAM' 

function buyCake(){
    return {
        type:BUY_CAKE,
        info:'First redux action'
    }
}

function buyIceCream(){
    return {
        type: BUY_ICECREAM,
    }
}


// USING A SINGLE REDUCER AND COMMON STATE

// const initialState = {
//     numOfCakes: 10,
//     numOfIcrCreams:20
// }

// const reducer = (state=initialState, action)=>{
//     switch(action.type){
//         case BUY_CAKE:
//             return {...state, numOfCakes: state.numOfCakes - 1}
//         case BUY_ICECREAM:
//             return {...state, numOfIcrCreams: state.numOfIcrCreams - 1}
//         default:
//             return state
//     }
// }


// USING MULTIPLE REDUCERS WITH DIFFERENT STATES

const initialCakeState = {
    numOfCakes: 10
}

const initiaIceCreamState = {
    numOfIcrCreams:20
}


const cakeReducer = (state=initialCakeState, action)=>{
    switch(action.type){
        case BUY_CAKE:
            return {...state, numOfCakes: state.numOfCakes - 1}
        default:
            return state
    }
}

const iceCreamReducer = (state=initiaIceCreamState, action)=>{
    switch(action.type){
        case BUY_ICECREAM:
            return {...state, numOfIcrCreams: state.numOfIcrCreams - 1}
        default:
            return state
    }
}

const rootReducer = combineReducers({
    cake: cakeReducer,
    iceCream: iceCreamReducer
})
const store = createStore(rootReducer, applyMiddleware(logger))
console.log('Initial State', store.getState())
const unsubscribe = store.subscribe(()=>{})

store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyIceCream())
store.dispatch(buyIceCream())

unsubscribe()
