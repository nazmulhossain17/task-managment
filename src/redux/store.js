import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import userReducer from "./userSlice/userSlice";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["user"], // Add any properties you want to exclude from persistence
};

const rootReducer = {
  user: persistReducer(persistConfig, userReducer),
  // Include the filterReducer in the root reducer
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export { store, persistor };
