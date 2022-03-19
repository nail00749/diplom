import React, {FC, useState} from 'react';
import {Box, Button, ButtonGroup, Container} from "@mui/material";
import LessonCreate from "../components/modals/LessonCreate";
import TestCreate from "../components/modals/TestCreate";
import {useAppDispatch} from "../hooks/redux";
import {openModal as openCourse} from "../store/reducers/admin/courseSlice";

const Admin: FC = () => {
    const dispatch = useAppDispatch()
    const [isLessonModal, setIsLessonModal] = useState<boolean>(false);
    const [isTestModal, setIsTestModal] = useState<boolean>(false);

    const onCloseLesson = () => setIsLessonModal(false)
    const onCloseTest = () => setIsTestModal(false)

    return (
        <>
            <Box>
                <Container
                >
                    <ButtonGroup
                        orientation='vertical'
                    >
                        <Box mb = {2}>
                            <Button
                                variant = 'contained'
                                onClick = {() => dispatch(openCourse())}
                            >
                                Create course
                            </Button>
                        </Box>
                        <Box mb = {2}>
                            <Button
                                variant = 'contained'
                                onClick = {() => setIsLessonModal(prev => !prev)}
                            >
                                Create lesson
                            </Button>
                        </Box>
                        <Box mb = {2}>
                            <Button
                                variant = 'contained'
                                onClick = {() => setIsTestModal(prev => !prev)}
                            >
                                Create test
                            </Button>
                        </Box>
                    </ButtonGroup>
                </Container>
            </Box>

            {/*<CourseCreate
                open = {isCourseModal}
                onClose = {onCloseCourse}
            />*/}
            <LessonCreate
                open = {isLessonModal}
                onClose = {onCloseLesson}
            />
            <TestCreate
                open = {isTestModal}
                onClose = {onCloseTest}
            />
        </>
    );
};

export default Admin;

