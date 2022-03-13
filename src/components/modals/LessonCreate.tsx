import React, {FC, useState} from 'react';
import {Dialog, Slide, Typography, IconButton, Box, TextField, Button, MenuItem, Autocomplete} from "@mui/material";
import {TransitionProps} from '@mui/material/transitions';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import {handleInputChange} from "react-select/dist/declarations/src/utils";
import {ICourse} from "../../models/ICourse";

const Transition = React.forwardRef(function Transition(props: TransitionProps & {
    children: React.ReactElement;
}, ref: React.Ref<unknown>) {
    return <Slide direction = "down" ref = {ref} {...props} />;
});

interface CourseCreateProps {
    open: boolean,
    onClose: () => void
}

interface CourseField extends ICourse {
    error: boolean,
}

const CourseCreate: FC<CourseCreateProps> = ({open, onClose}) => {
    const [name, setName] = useState({text: '', error: false});
    const [about, setAbout] = useState({text: '', error: false});
    const [course, setCourse] = useState<CourseField>({name: '', error: false});
    const [courseInputValue, setCourseInputValue] = useState('');

    const saveLesson = async () => {
        let isError = false
        if (!name.text) {
            isError = true
            setName(prev => ({...prev, error: true}))
        }
        if (!about.text) {
            isError = true
            setAbout(prev => ({...prev, error: true}))
        }
        if (!course.name) {
            isError = true
            setCourse(prev => ({...prev, error: true}))
        }

        if (isError) {
            return
        }
        //todo api
        defaultValues()
        onClose()
    };

    const handlerName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(prev => ({...prev, text: e.target.value, error: false}))
    };

    const handlerAbout = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAbout(prev => ({...prev, text: e.target.value, error: false}))
    };

    const handleCourse = (e: any, newValue: string | null) => {
        setCourse({...course, name: newValue})
        //setCourse({...course, value: e.target.value, error: false})
    };

    const handleClose = () => {
        defaultValues()
        onClose()
    }

    const defaultValues = () => {
        setName({text: '', error: false})
        setAbout({text: '', error: false})
        setCourse({name: '', error: false})
    }

    return (
        <Dialog
            open = {open}
            TransitionComponent = {Transition}
            onClose = {handleClose}

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
                        onClick = {handleClose}
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
                    <Autocomplete
                        renderInput = {params =>
                            <TextField
                                {...params}
                                label = 'Course'
                                variant = 'filled'
                                required
                                fullWidth
                                error = {course.error}
                            />
                        }
                        value = {course.name}
                        options = {['1', '2', '3']}
                        onChange = {handleCourse}
                        inputValue = {courseInputValue}
                        onInputChange = {(e, newValue) => {
                            setCourseInputValue(newValue)
                        }}
                    />
                </Box>
                <Button
                    variant = 'outlined'
                    color = 'success'
                    endIcon = {<SaveIcon/>}
                    onClick = {saveLesson}
                >
                    Save
                </Button>

            </Box>
        </Dialog>
    )

}

export default CourseCreate;
