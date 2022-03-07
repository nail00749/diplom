import React, {FC} from 'react';
import {Dialog, Slide, Typography, IconButton, Box} from "@mui/material";
import {TransitionProps} from '@mui/material/transitions';
import CloseIcon from '@mui/icons-material/Close';

const Transition = React.forwardRef(function Transition(props: TransitionProps & {
    children: React.ReactElement;
}, ref: React.Ref<unknown>) {
    return <Slide direction = "down" ref = {ref} {...props} />;
});

interface CourseCreateProps {
    open: boolean,
    onClose: () => void
}

const CourseCreate: FC<CourseCreateProps> = ({open, onClose}) => {
    return (
        <Dialog
            open = {open}
            TransitionComponent = {Transition}
            onClose = {onClose}

        >
            <Box
                p={3}
            >
                <IconButton
                    onClick = {onClose}
                >
                    <CloseIcon/>
                </IconButton>
                <Typography>
                    Create course
                </Typography>
            </Box>
        </Dialog>
    )
        ;
};

export default CourseCreate;
