import { configureStore } from "@reduxjs/toolkit"; // Import configureStore to create the Redux store
import { persistStore, persistReducer } from "redux-persist"; // Import for state persistence
import cartReducer from "../slices/cartSlice";// Import the cart slice reducer
import storage from "redux-persist/lib/storage"  // Import local storage for web persistence


// Configuration for redux-persist
const persistConfig = {
  key: "root", // The key for storing the persisted state
  storage // The storage engine to use (localStorage for web)
};

// Create a persisted reducer by wrapping the cart reducer
const persistedCartReducer = persistReducer(persistConfig, cartReducer);

// Configure the Redux store
const store = configureStore({
  reducer: {
    cartSlice: persistedCartReducer, // Add the persisted cart reducer to the store
  },
});
// Create a persistor to manage the state persistence
export const persistor = persistStore(store);

// Export the configured store for use in the app
export default store;
