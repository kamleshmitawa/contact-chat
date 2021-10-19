import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./saga";
import reducers from "./reducers";

const sagaMiddleware = createSagaMiddleware();
// const persistedReducer = persistReducer(persistConfig, reducer);
let store = createStore(reducers, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

// export let persistReduxStore = persistStore(store);
export default store;
