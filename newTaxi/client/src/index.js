import React, { createContext } from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';
import UserTaxi from './main/userTaxi';
import DriverTaxi from './main/driverTaxi';
import DispatcherTaxi from './main/dispatcherTaxi';

export const Context = createContext(null);
console.log(process.env.REACT_APP_API_URL);
const root = createRoot(document.getElementById('root'));
root.render(
  <Context.Provider value={{
    user: new UserTaxi(),
    taxi: new DriverTaxi(),
    dispatcher: new DispatcherTaxi(),
  }}>
    <App />
  </Context.Provider>
);