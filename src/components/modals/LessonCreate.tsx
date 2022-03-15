import React, {FC, useEffect, useState} from 'react';
import {Dialog, Slide, Typography, IconButton, Box, TextField, Button, Autocomplete} from "@mui/material";
import {TransitionProps} from '@mui/material/transitions';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import {ICourse} from "../../models/ICourse";
import {useCreateLessonMutation, useGetAllCoursesQuery} from "../../services/teacherAPI";

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
    const [name, setName] = useState({title: '', error: false});
    const [about, setAbout] = useState({description: '', error: false});
    const [course, setCourse] = useState<CourseField>({title: '', error: false});
    const [courseInputValue, setCourseInputValue] = useState('');

    const {data: courses} = useGetAllCoursesQuery('')
    const [create, {isLoading, isError, isSuccess}] = useCreateLessonMutation()

    useEffect(() => {

    }, [isSuccess]);


    const saveLesson = async () => {
        let isError = false
        if (!name.title) {
            isError = true
            setName(prev => ({...prev, error: true}))
        }
        if (!about.description) {
            isError = true
            setAbout(prev => ({...prev, error: true}))
        }
        if (!course.title) {
            isError = true
            setCourse(prev => ({...prev, error: true}))
        }

        if (isError) {
            return
        }
        const data = {
            title: name.title,
            description: about.description,
            course_id: course.id
        }
        await create(data)
        //todo api
        defaultValues()
        onClose()
    };

    const handlerName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(prev => ({...prev, title: e.target.value, error: false}))
    };

    const handlerAbout = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAbout(prev => ({...prev, description: e.target.value, error: false}))
    };

    const handleCourse = (e: any, newValue: CourseField | null) => {
        setCourse({...course, title: (newValue && newValue.title) || '', id: newValue?.id, error: false})
    };

    const handleClose = () => {
        defaultValues()
        onClose()
    }

    const defaultValues = () => {
        setName({title: '', error: false})
        setAbout({description: '', error: false})
        setCourse({title: '', error: false})
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
                        value = {name.title}
                        error = {name.error}
                    />
                </Box>
                <Box mb = {3}>
                    <TextField
                        label = 'About'
                        variant = 'filled'
                        required
                        onChange = {handlerAbout}
                        value = {about.description}
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
                        value = {course}
                        options = {courses}
                        onChange = {handleCourse}
                        inputValue = {courseInputValue}
                        onInputChange = {(e, newValue) => {
                            setCourseInputValue(newValue)
                        }}
                        getOptionLabel = {(option: CourseField) => (option && option.title) || ''}
                        //renderOption = {(option) => <span>{option.title}</span>}
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
