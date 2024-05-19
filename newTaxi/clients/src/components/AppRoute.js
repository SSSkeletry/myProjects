import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { authRoutes, DispatcherRoutes, driverRoutes, pubRoutes } from '../route'; // ------ Добавлен driverRoutes ------
import { Context } from '..';

const AppRoute = () => {
    const { user, taxi, dispatcher } = useContext(Context); // ------ Добавлен taxi и dispatcher ------

    console.log(user);
    return (
        <Routes>
            {user.isAuth && (
                <>
                    {/* ------ Добавляем маршруты для авторизованных пользователей ------ */}
                    {authRoutes.map(({ path, Component }) => (
                        <Route key={path} path={path} element={<Component />} exact />
                    ))}

                    {/* ------ Добавляем маршруты для водителей ------ */}
                    {taxi.isDriver() && driverRoutes.map(({ path, Component }) => (
                        <Route key={path} path={path} element={<Component />} exact />
                    ))}

                    {/* ------ Добавляем маршруты для диспетчеров ------ */}
                    {dispatcher.isDispatcher() && DispatcherRoutes.map(({ path, Component }) => (
                        <Route key={path} path={path} element={<Component />} exact />
                    ))}
                </>
            )}
            
            {/* ------ Добавляем публичные маршруты ------ */}
            {pubRoutes.map(({ path, Component }) => (
                <Route key={path} path={path} element={<Component />} exact />
            ))}

            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};

export default AppRoute;


