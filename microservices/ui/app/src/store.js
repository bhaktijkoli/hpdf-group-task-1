import { applyMiddleware, createStore } from "redux"
import { createLogger } from 'redux-logger'

import reducer from "./reducers"

var middleware = applyMiddleware()

if(process.env.NODE_ENV == 'development'){
  middleware = applyMiddleware(createLogger())
}

export default createStore(reducer, middleware)
