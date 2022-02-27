import {Box} from '@mui/material';
import React, {FC, useEffect, useState} from 'react';
import CourseItem from "./CourseItem";
import {ICourse} from "../models/ICourse";

const course = {
    id: 'string',
    name: 'name',
    lesson: ['123', '123'],
} as ICourse

const CourseContainer: FC = () => {
    const [courses, setCourses] = useState<ICourse[]>([]);
    useEffect(()=> {
        courses.push(course)
        setCourses(courses)
    }, [])

    return (
        <Box
            sx = {{
                border: '1px solid',
                borderRadius: 3,
                minWidth: '25vw'
            }}
            p={3}
        >
            {
                courses.map((course) =>
                    <CourseItem
                        key = {course.id}
                        course={course}
                     />
                )
            }
        </Box>
    );
};

export default CourseContainer;
