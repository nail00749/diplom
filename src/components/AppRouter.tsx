import React, {FC} from 'react';
import {Route, Routes, BrowserRouter, Navigate} from "react-router-dom";
import {adminRoutes, authRoute, publicRoute} from '../router/router';
import {useTypedSelector} from "../hooks/redux";
import Topbar from "./Topbar";

const AppRouter: FC = () => {
    const {isAuthenticated} = useTypedSelector(state => state.userReducer)

    return (
        <BrowserRouter>
            {isAuthenticated && <Topbar/>}
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
