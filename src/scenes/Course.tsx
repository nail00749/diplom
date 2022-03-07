import React, {FC} from 'react';
import { useParams } from 'react-router-dom';

const Course: FC = () => {
    const {courseId} = useParams()

    return (
        <div>

        </div>
    );
};

export default Course;
