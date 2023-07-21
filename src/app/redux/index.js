import { createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
// import AsyncStorage from '@react-native-community/async-storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';

const initialState = {
  stationList: [],
  vehicleList:[],
  routeList:[],

  
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_VEHICLE_LIST':
      return { ...state, vehicleList: action.vehicleList };
    case 'SET_STATION_LIST':
      return { ...state, stationList: action.stationList };

    case 'SET_ROUTE_LIST':
      return { ...state, routeList: action.routeList };

    // no default
  }
  return state;
};

const persistConfig = {
  key: 'root',
  storage,
  blacklist: [
    'tripDetails',
    'pendingTrips',
    'approvedTrips',
    'whichTrip',
    'currentDate'
],
  // stateReconciler: autoMergeLevel2,
};
const persistedReducer = persistReducer(persistConfig, reducer);
export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
