import React, { useContext } from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import { authRoutes, pubRoutes } from '../route';
import { Context } from '..';

const AppRoute = () => {
    const {user} = useContext(Context);

    console.log(user)
    return (
        <Routes>
            {user.isAuth && authRoutes.map(({path , Component}) =>
            <Route key = {path} path = {path} element={<Component/>} exact/>
        )}
            {pubRoutes.map(({path , Component}) =>
            <Route key = {path} path = {path} element={<Component/>} exact/>
        )}  
        <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    )
    
}

export default AppRoute

