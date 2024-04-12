import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import { authRoutes, pubRoutes } from '../route';

const AppRoute = () => {
    const isAuth = false;
    return (
        <Routes>
            {isAuth && authRoutes.map(({path , Component}) =>
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

