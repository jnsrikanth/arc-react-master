import { createStore, combineReducers, applyMiddleware } from 'redux'
import { AuthReducer } from './reducers/AuthReducers'
import { GlobalReducer } from './reducers/GlobalReducers'
import thunkMiddleware from 'redux-thunk'
import { MakeStore, createWrapper, Context } from 'next-redux-wrapper';
import { EventReducer } from './reducers/EventReducers';
import storage from 'redux-persist/lib/storage/session';
import { persistReducer, persistStore } from 'redux-persist';
import { UsersReducer } from './reducers/UsersReduces';
import { UserLogsReducer } from './reducers/UserLogsReducers';
import { MeetingsReducer } from './reducers/MeetingsReducers';
import { OrganizationsReducer } from './reducers/OrganizationsReducers';
import { pendingConfirmationReducer } from './reducers/PendingConfirmationReducer';


const persistConfig = {
    key: 'root',
    storage
}


export const PersistorProvier: any = {
}

const rootReducer = combineReducers({
    auth: AuthReducer,
    global: GlobalReducer,
    events: EventReducer,
    users: UsersReducer,
    organizations: OrganizationsReducer,
    userLogs: UserLogsReducer,
    meetings: MeetingsReducer,
    pendingConfirmation: pendingConfirmationReducer,
});


const persistedReducer = persistReducer(persistConfig, rootReducer)

const storeCreator = () => {
    var store = createStore(persistedReducer, applyMiddleware(thunkMiddleware))
    var persistor = persistStore(store)
    PersistorProvier.persistor = persistor
    return store
}

const makeStore: MakeStore<any> = (context: Context) => {
    return storeCreator()
};

export const wrapper = createWrapper<any>(makeStore, { debug: true });
