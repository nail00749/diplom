import React, {FC} from 'react';
import {Box} from "@mui/material";
import {ICourse} from "../models/ICourse";
import {Link} from "react-router-dom";

interface CourseLinkProps {
    course: ICourse
}


const CourseLink: FC<CourseLinkProps> = ({course}) => {
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
                }}
            >
                {course.title}
            </Box>
        </Link>
    );
};

export default CourseLink;
