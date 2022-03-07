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
            to = {`/course/${course.id}`}
        >
            <Box
                mb = {3}
                py = {1.5}
                px = {3}
                sx = {{
                    borderRadius: 3,
                    backgroundColor: 'gray'
                }}
            >
                {course.name}
            </Box>
        </Link>
    );
};

export default CourseItem;
