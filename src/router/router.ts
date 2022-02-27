import React from 'react';
import Login from "../scenes/Login";
import Main from '../scenes/Main';
import Course from "../scenes/Course";
import Lesson from '../scenes/Lesson';
import Stream from "../scenes/Stream";

export interface IRoute {
    path: string,
    component: React.ComponentType,
    exact?: boolean
}

export enum RouteNames {
    HOME = '/',
    LOGIN = '/login',
    COURSE = '/course',
    LESSON = '/lesson',
    STREAM = '/stream'
}

export const publicRoute: IRoute[] = [
    {path: RouteNames.LOGIN, component: Login, exact: false},
    {path: RouteNames.HOME, component: Login, exact: true}
]

export const authRoute: IRoute[] = [
    {path: RouteNames.HOME, component: Main, exact: true},
    {path: RouteNames.COURSE, component: Course, exact: false},
    {path: RouteNames.LESSON, component: Lesson, exact: false},
    {path: RouteNames.STREAM, component: Stream, exact:false}
]
