import React, {FC} from 'react';
import {Box} from "@mui/material";
import {ICourse} from "../models/ICourse";
import {Link} from "react-router-dom";

interface CourseItemProps {
    course: ICourse
}


const CourseItem: FC<CourseItemProps> = ({course}) => {
    return (
        <Link
            to = {'/lesson'}
        >
            <Box
                mb = {3}
                py = {1.5}
                px = {3}
                sx = {{
                    backgroundColor: 'orange',
                    borderRadius: 3
                }}
            >
                {course.name}
            </Box>
        </Link>
    );
};

export default CourseItem;
