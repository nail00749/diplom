import React, {FC, useState} from 'react';
import {Box, Button, Container} from "@mui/material";
import CourseCreate from "../components/modals/CourseCreate";

const Admin: FC = () => {
    const [isCourseModal, setIsCourseModal] = useState<boolean>(false);
    const onCloseCourse =  () => setIsCourseModal(false)

    return (
        <>
            <Box>
                <Container>
                    <Box mb = {2}>
                        <Button
                            variant = 'contained'
                            onClick = {()=> setIsCourseModal(prev => !prev)}
                        >
                            Create course
                        </Button>
                    </Box>
                </Container>
            </Box>

            <CourseCreate
                open={isCourseModal}
                onClose={onCloseCourse}
            />
        </>
    );
};

export default Admin;

