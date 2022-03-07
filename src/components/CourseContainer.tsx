import {Box, Typography} from '@mui/material';
import React, {FC} from 'react';
import CourseItem from "./CourseItem";
import {ICourse} from "../models/ICourse";

const CourseContainer: FC = () => {
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
                [{
                    id: 'string',
                    name: 'Course 1',
                    lesson: ['123', '123']
                } as ICourse].map((course) =>
                    <CourseItem
                        key = {course.id}
                        course = {course}
                    />
                )
            }
        </Box>
    );
};

export default CourseContainer;
