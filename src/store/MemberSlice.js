import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    token: null,
    user: null
  }
};

const memberSlice = createSlice({
  name: 'member',
  initialState,
  reducers: {
    saveToken: (state, action) => {
      state.value = {
        ...action.payload
      };
      console.log('saveToken', state.value);
    },
    clearToken: (state) => {
      state.value = {
        token: null,
        user: null
      };
      console.log('clearToken', state.value);
    }
  }
});

// 각 케이스에 대한 리듀서 함수들을 생성
export const { saveToken, clearToken } = memberSlice.actions;
export default memberSlice.reducer;
