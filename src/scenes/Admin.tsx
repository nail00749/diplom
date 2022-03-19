import React, {FC, useState} from 'react';
import {Box, Button, ButtonGroup, Container} from "@mui/material";
import TestCreate from "../components/modals/TestCreate";
import {useAppDispatch} from "../hooks/redux";
import {openModal as openCourse} from "../store/reducers/admin/courseSlice";
import {openModal as openLesson} from "../store/reducers/admin/lessonSlice";
import {toggleUsersData} from "../store/reducers/service/ServiceSlice";

const Admin: FC = () => {
    const dispatch = useAppDispatch()
    const [isTestModal, setIsTestModal] = useState<boolean>(false);


    const onCloseTest = () => setIsTestModal(false)

    return (
        <>
            <Box>
                <Container
                >
                    <ButtonGroup
                        orientation = 'vertical'
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
                                onClick = {() => dispatch(openLesson())}
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
                        <Box mb = {2}>
                            <Button
                                variant = 'contained'
                                onClick = {() => dispatch(toggleUsersData())}
                            >
                                Edit users data
                            </Button>
                        </Box>
                    </ButtonGroup>


                </Container>
            </Box>

            <TestCreate
                open = {isTestModal}
                onClose = {onCloseTest}
            />
        </>
    );
};

export default Admin;

