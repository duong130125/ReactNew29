import { combineReducers, createStore } from "redux";
import reducerProduct from "./reducers/productReducer";

const rootReducer = combineReducers({
    reducerProduct,
})

const store = createStore(rootReducer)

export default store