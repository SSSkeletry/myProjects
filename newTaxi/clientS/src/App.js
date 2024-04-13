import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoute from './components/AppRoute';
import NavigationBar from './components/NavigationBar';

function App() {
  return (
    <BrowserRouter>
      <NavigationBar/>
      <AppRoute />
    </BrowserRouter>
  );
}

export default App;
