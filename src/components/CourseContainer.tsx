import {Box, Typography} from '@mui/material';
import React, {FC, ReactElement, useCallback} from 'react';
import {useAppSelector} from "../hooks/redux";
import UserCourse from "./Course/UserCourse";
import TeacherCourse from "./Course/TeacherCourse";

const CourseContainer: FC = () => {
    const {user} = useAppSelector(state => state.userReducer)

    const roleCourses = useCallback((): ReactElement | null => {
        if (user) {
            switch (user.role) {
                case 'user':
                    return <UserCourse/>
                case 'teacher':
                    return <TeacherCourse/>
            }
        }
        return null
    }, [user])

    return (
        <Box
            sx = {{
                border: '1px solid',
                borderRadius: 3,
                minWidth: '25vw'
            }}
            p = {3}
        >
            <Typography
                component = 'h3'
                mb = {3}
            >
                Courses
            </Typography>
            {
                roleCourses()
            }
        </Box>
    );
};

export default CourseContainer;
