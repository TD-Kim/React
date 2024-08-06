import { configureStore } from '@reduxjs/toolkit';
import foodSlice, { dataTransform } from './foodSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  transforms: [dataTransform], // 변환기 추가
};

const persistedReducer = persistReducer(persistConfig, foodSlice.reducer);

const store = configureStore({
  reducer: {
    // food: foodSlice.reducer,
    food: persistedReducer,
  },
});

const persistor = persistStore(store);

export { store, persistor };
