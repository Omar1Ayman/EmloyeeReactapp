import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "../fetaures/UserSlice";

const store = configureStore({
  reducer: {
    users: UserSlice,
  },
});

export default store;