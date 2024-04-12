import User from "./pages/user"
import Login from "./pages/login"
import Profile from "./pages/profile"
import Order from "./pages/order"
import Taxi from "./pages/taxi"
import { LOGIN_ROUTE, ORDER_ROUTE, PROFILE_ROUTE, REGISTRATION_ROUTE, TAXI_ROUTE, USER_ROUTE } from "./utils/consts";


export const authRoutes = [
    {
        path: USER_ROUTE,
        Component: User,

    },
    {
        path: PROFILE_ROUTE,
        Component: Profile,
    },
    {
        path: ORDER_ROUTE,
        Component: Order,

    },
]

export const pubRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Login,
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Login,

    },
    {
        path: TAXI_ROUTE,
        Component: Taxi,
    },
    
]

export const DispatcherRoutes = [
    
]

export const driverRoutes = [
    
]