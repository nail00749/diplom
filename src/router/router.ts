import React from 'react';
import Login from "../scenes/Login";

export interface IRoute {
    path: string,
    component: React.ComponentType,
    exact?: boolean
}

export enum RouteNames {
    LOGIN = '/login'
}

export const publicRoute: IRoute[] = [
    {path: RouteNames.LOGIN, component: Login, exact: true}
]
