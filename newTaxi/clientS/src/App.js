import React, { useState,useContext,useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoute from './components/AppRoute';
import NavigationBar from './components/NavigationBar';
import { observer } from 'mobx-react-lite';
import { Context } from '.';
import { check } from './http/userApi';
import { Watch } from 'react-loader-spinner';

const App = observer(()=> {
  const {user} = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    check().then(data => {
      user.setUser(data.user);
      user.setIsAuth(true);
    }).catch(error => {
      user.setIsAuth(false);
    }).finally(() => {
      setLoading(false);
    });
  }, [user]);
 if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Watch color="#00BFFF" height={80} width={80} />
    </div>;
  }
  return (
    <BrowserRouter>
      <NavigationBar/>
      <AppRoute />
    </BrowserRouter>
  );
});

export default App;
