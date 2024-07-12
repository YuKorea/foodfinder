import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import memberReducer from './MemberSlice'; // 정확한 경로를 지정하세요

// 로컬스토리지 설정
const persistConfig = {
  key: 'login_app',
  storage,
};

// 만든 슬라이스, 리듀서를 등록
const persistedReducer = persistReducer(persistConfig, memberReducer);

// 리덕스 스토어 생성
const store = configureStore({
  reducer: {
    member: persistedReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

const persistor = persistStore(store);

// store와 persistor를 named export로 정의
export { store, persistor };
