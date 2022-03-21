import React, {FC} from 'react';
import {Box, Button, ButtonGroup, Container} from "@mui/material";
import {useAppDispatch} from "../hooks/redux";
import {openModal as openCourse} from "../store/reducers/admin/courseSlice";
import {openModal as openLesson} from "../store/reducers/admin/lessonSlice";
import {openModal as openTest} from "../store/reducers/admin/testSlice";
import {toggleUsersData} from "../store/reducers/service/ServiceSlice";

const Admin: FC = () => {
    const dispatch = useAppDispatch()

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
                                onClick = {() => dispatch(openTest())}
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

        </>
    );
};

export default Admin;

