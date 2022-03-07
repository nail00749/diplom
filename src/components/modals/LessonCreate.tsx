import React, {FC, useState} from 'react';
import {Dialog, Slide, Typography, IconButton, Box, TextField, Button, MenuItem} from "@mui/material";
import {TransitionProps} from '@mui/material/transitions';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';

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
    const [name, setName] = useState({text: '', error: false});
    const [about, setAbout] = useState({text: '', error: false});
    const [course, setCourse] = useState({value: '', error: false});

    const saveCourse = async () => {
        let isError = false
        if (!name.text) {
            isError = true
            setName(prev => ({...prev, error: true}))
        }
        if (!about.text) {
            isError = true
            setAbout(prev => ({...prev, error: true}))
        }
        if(!course.value){
            isError = true
            setCourse(prev => ({...prev, error: true}))
        }

        if (isError) {
            return
        }
        //todo api
        setName({text: '', error: false})
        setAbout({text: '', error: false})
        setCourse({value: '', error: false})
        onClose()
    };

    const handlerName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(prev => ({...prev, text: e.target.value, error: false}))
    };

    const handlerAbout = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAbout(prev => ({...prev, text: e.target.value, error: false}))
    };

    const handleCourse = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCourse({...course, value: e.target.value, error: false})
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
                        Create lesson
                    </Typography>
                </Box>
                <Box mb = {3}>
                    <TextField
                        label = 'Name'
                        variant = 'filled'
                        required
                        onChange = {handlerName}
                        value = {name.text}
                        error = {name.error}
                    />
                </Box>
                <Box mb = {3}>
                    <TextField
                        label = 'About'
                        variant = 'filled'
                        required
                        onChange = {handlerAbout}
                        value = {about.text}
                        error = {about.error}
                    />
                </Box>
                <Box mb = {3}>
                    <TextField
                        id = "outlined-select-currency"
                        select
                        variant = 'filled'
                        label = "Course"
                        value = {course.value}
                        onChange = {handleCourse}
                        required
                        fullWidth
                        error={course.error}
                    >
                        {[1, 2, 3].map((option) => (
                            <MenuItem key = {option} value = {option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
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
