import React, {FC} from 'react';
import {Route, Routes, BrowserRouter, Navigate} from "react-router-dom";
import {adminRoutes, authRoute, publicRoute} from '../router/router';
import {useTypedSelector} from "../hooks/redux";
import Topbar from "./UI/Topbar";
import ServiceAlert from "./serviceAlert";

const AppRouter: FC = () => {
    const {isAuthenticated, user} = useTypedSelector(state => state.userReducer)

    return (
        <BrowserRouter>
            {isAuthenticated && <Topbar/>}
            <ServiceAlert/>
            {
                !isAuthenticated ?
                    <Routes>
                        {
                            publicRoute.map(route =>
                                <Route
                                    path = {route.path}
                                    index = {route.exact}
                                    element = {<route.component/>}
                                    key = {route.path}
                                />
                            )
                        }
                        <Route
                            path = '*'
                            element = {<Navigate to = '/'/>}
                        />
                    </Routes> :
                    <Routes>
                        {
                            authRoute.map(route =>
                                <Route
                                    path = {route.path}
                                    index = {route.exact}
                                    element = {<route.component/>}
                                    key = {route.path}
                                />
                            )
                        }
                        {
                            (user && (user.role === 'teacher' || user.role === 'admin')) &&
                            adminRoutes.map(route =>
                                <Route
                                    path = {route.path}
                                    index = {route.exact}
                                    element = {<route.component/>}
                                    key = {route.path}
                                />
                            )
                        }
                        <Route
                            path = '*'
                            element = {<Navigate to = '/'/>}
                        />
                    </Routes>
            }
        </BrowserRouter>

    );
};

export default AppRouter;
