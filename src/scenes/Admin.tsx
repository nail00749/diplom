import React, {FC, useState} from 'react';
import {Box, Button, ButtonGroup, Container} from "@mui/material";
import CourseCreate from "../components/modals/CourseCreate";
import LessonCreate from "../components/modals/LessonCreate";
import TestCreate from "../components/modals/TestCreate";

const Admin: FC = () => {
    const [isCourseModal, setIsCourseModal] = useState<boolean>(false);
    const [isLessonModal, setIsLessonModal] = useState<boolean>(false);
    const [isTestModal, setIsTestModal] = useState<boolean>(false);
    const onCloseCourse = () => setIsCourseModal(false)
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
                                onClick = {() => setIsCourseModal(prev => !prev)}
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

            <CourseCreate
                open = {isCourseModal}
                onClose = {onCloseCourse}
            />
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

