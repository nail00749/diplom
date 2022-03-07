import React, {FC, useState} from 'react';
import {Dialog, Slide, Typography, IconButton, Box, TextField, Button, MenuItem} from "@mui/material";
import {TransitionProps} from '@mui/material/transitions';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import {IQuestion} from "../../models/ITest";

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
    const [lesson, setLesson] = useState({value: '', error: false});
    const [questions, setQuestions] = useState<IQuestion[]>([]);

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
        if (!lesson.value) {
            isError = true
            setLesson(prev => ({...prev, error: true}))
        }

        if (isError) {
            return
        }
        //todo api
        setName({text: '', error: false})
        setAbout({text: '', error: false})
        setLesson({value: '', error: false})
        onClose()
    };

    const handlerName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(prev => ({...prev, text: e.target.value, error: false}))
    };

    const handlerAbout = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAbout(prev => ({...prev, text: e.target.value, error: false}))
    };

    const handleCourse = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLesson({...lesson, value: e.target.value, error: false})
    };

    const handlerAdd = () => {
        setQuestions(prev => [...prev, {text: ''} as IQuestion])
    };

    const handlerDeleteQuestion = (index: number) => {
        return () => {
            setQuestions(prev => prev.filter((item, i) => i !== index))
        }
    };

    return (
        <Dialog
            open = {open}
            TransitionComponent = {Transition}
            onClose = {onClose}
            fullScreen
        >
            <Box
                p = {3}
                px = {10}
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
                        Create test
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
                        label = "Lesson"
                        value = {lesson.value}
                        onChange = {handleCourse}
                        required
                        fullWidth
                        error = {lesson.error}
                    >
                        {[1, 2, 3].map((option) => (
                            <MenuItem key = {option} value = {option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                </Box>
                <Box>
                    {
                        questions.map((item, index) =>
                            <Box
                                key = {index}
                                mb = {2}
                                sx = {{
                                    display: 'flex',
                                    alignItems: 'center'
                                }}
                            >
                                <TextField
                                    label = {'Text question'}
                                />
                                <Button
                                    variant = 'outlined'
                                    color = 'error'
                                    //todo fix index
                                    onClick = {handlerDeleteQuestion(index)}
                                >
                                    Delete
                                </Button>
                            </Box>
                        )
                    }
                </Box>
                <Box mb = {3}>
                    <Button
                        variant = 'outlined'
                        onClick = {handlerAdd}
                    >
                        Add question
                    </Button>
                </Box>
                <Box>
                    <Button
                        variant = 'outlined'
                        color = 'success'
                        endIcon = {<SaveIcon/>}
                        onClick = {saveCourse}
                    >
                        Save
                    </Button>
                </Box>
            </Box>
        </Dialog>
    )

}

export default CourseCreate;
