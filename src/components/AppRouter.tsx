import React, {FC} from 'react';
import {Route, Routes, BrowserRouter, Navigate} from "react-router-dom";
import {authRoute, publicRoute} from '../router/router';
import {useTypedSelector} from "../hooks/redux/useTypedSelector";
import NavigationMenu from "./NavigationMenu";
import {Box, useMediaQuery} from '@mui/material';

const AppRouter: FC = () => {
    const {isAuthenticated} = useTypedSelector(state => state.userReducer)
    const matches = useMediaQuery('(max-width: 425px)')

    return (
        <BrowserRouter>
            {isAuthenticated && <NavigationMenu/>}
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
                    <Box>
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
                            <Route
                                path = '*'
                                element = {<Navigate to = '/'/>}
                            />
                        </Routes>
                    </Box>
            }
        </BrowserRouter>

    );
};

export default AppRouter;
