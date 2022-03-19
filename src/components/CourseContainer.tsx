import {Box, Typography} from '@mui/material';
import React, {FC} from 'react';
import CourseLink from "./CourseLink";
import {ICourse} from "../models/ICourse";
import {useGetAllCoursesQuery} from "../services/contentAPI";

const CourseContainer: FC = () => {
    const {data: courses} = useGetAllCoursesQuery('')

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
                courses &&
                courses.map((course: ICourse) =>
                    <CourseLink
                        key = {course.id}
                        course = {course}
                    />
                )
            }
        </Box>
    );
};

export default CourseContainer;
