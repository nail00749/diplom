import React, {FC, useEffect} from 'react';
import {Box, Button, Typography} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import {openModal} from "../store/reducers/admin/lessonSlice";
import {useGetAllCoursesQuery, useGetLessonQuery} from "../services/contentAPI";
import {useAppDispatch} from "../hooks/redux";

const Lesson: FC = () => {
    const {lessonId} = useParams()
    const navigate = useNavigate()
    const {data: lesson} = useGetLessonQuery(String(lessonId))
    const {data: courses} = useGetAllCoursesQuery()
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!lessonId) {
            navigate('/')
        }
    }, [])

    const handlerEdit = () => {
        if (lesson) {
            dispatch(openModal({
                lesson,
                courses,
                isUpdate: true,
            }))
        }
    }

    return (
        <Box>
            <Button
                variant = 'outlined'
                onClick = {handlerEdit}
            >
                Edit lesson
            </Button>
            <Box>
                {
                    lesson &&
					<>
						<Typography>{lesson.title}</Typography>
						<Typography>{lesson.description}</Typography>
						<Box>
                            {
                                /*lesson.lessons && lesson.lessons.map(item =>
                                    <Box>
                                        <Link
                                            to = {`/lesson/${item.id}`}
                                        >
                                            {item.title}
                                        </Link>
                                    </Box>
                                )*/
                            }
						</Box>
					</>
                }
            </Box>
        </Box>
    );
};

export default Lesson;
