import React, {FC, useState} from 'react';
import {Dialog, Slide, Typography, IconButton, Box, TextField, Button} from "@mui/material";
import {TransitionProps} from '@mui/material/transitions';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import {useCreateCourseMutation} from "../../services/teacherAPI";

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
    const [name, setName] = useState({description: '', error: false});
    const [description, setDescription] = useState({description: '', error: false});
    const [create, {isLoading, isError, isSuccess}] = useCreateCourseMutation()

    const saveCourse = async () => {
        let isError = false
        if (!name.description) {
            isError = true
            setName(prev => ({...prev, error: true}))
        }
        if (!description.description) {
            isError = true
            setDescription(prev => ({...prev, error: true}))
        }

        if (isError) {
            return
        }
        //todo api
        setName({description: '', error: false})
        setDescription({description: '', error: false})
        await  create({
            title: name.description,
            description: description.description
        })
        onClose()
    };

    const handlerName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(prev => ({...prev, description: e.target.value, error: false}))
    };

    const handlerAbout = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(prev => ({...prev, description: e.target.value, error: false}))
    };

    return (
        <Dialog
            open = {open}
            TransitionComponent = {Transition}
            onClose = {onClose}

        >
            <Box
                p = {3}
                px = {5}
            >
                <Box
                    sx = {{
                        display: 'flex',
                        alignItems: 'center'
                    }}
                    mb = {2}
                >
                    <IconButton
                        onClick = {onClose}
                    >
                        <CloseIcon/>
                    </IconButton>
                    <Typography variant = 'h5' component = 'span'>
                        Create course
                    </Typography>
                </Box>
                <Box mb = {3}>
                    <TextField
                        label = 'Name'
                        variant = 'filled'
                        required
                        onChange = {handlerName}
                        value = {name.description}
                        error = {name.error}
                    />
                </Box>
                <Box mb = {3}>
                    <TextField
                        label = 'About'
                        variant = 'filled'
                        required
                        onChange = {handlerAbout}
                        value = {description.description}
                        error = {description.error}
                    />
                </Box>
                <Button
                    variant = 'outlined'
                    color = 'success'
                    endIcon = {<SaveIcon/>}
                    onClick = {saveCourse}
                >
                    Save
                </Button>

            </Box>
        </Dialog>
    )

}

export default CourseCreate;
