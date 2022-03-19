import React, {FC, useState} from 'react';
import {
    Dialog,
    Typography,
    IconButton,
    Box,
    TextField,
    Button,
    Grid,
    useMediaQuery, Autocomplete
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import {useAppSelector} from "../../hooks/redux";
import {useDispatch} from "react-redux";
import {addQuestion, resetForm} from "../../store/reducers/admin/testSlice";
import Question from "../test/Question";
import {useCreateTestMutation} from "../../services/adminAPI";
import {useGetAllLessonsQuery} from "../../services/contentAPI";
import {ILesson} from "../../models/ILesson";
import {Transition} from "./Transition";

interface CourseCreateProps {
    open: boolean,
    onClose: () => void
}

interface LessonField extends ILesson {
    error: boolean
}

const CourseCreate: FC<CourseCreateProps> = ({open, onClose}) => {
    const [name, setName] = useState({description: '', error: false});
    const [about, setAbout] = useState({description: '', error: false});
    const [lesson, setLesson] = useState<LessonField>({title: '', error: false});
    const {questions} = useAppSelector(state => state.testReducer)
    const [lessonInputValue, setLessonInputValue] = useState('');

    const dispatch = useDispatch()
    const {data: lessons} = useGetAllLessonsQuery('')
    const [create, {isError, isLoading, isSuccess}] = useCreateTestMutation()

    const matches = useMediaQuery('(max-width: 425px)')

    const saveTest = async () => {
        let isError = false
        if (!name.description) {
            isError = true
            setName(prev => ({...prev, error: true}))
        }
        if (!about.description) {
            isError = true
            setAbout(prev => ({...prev, error: true}))
        }
        if (!lesson.title) {
            isError = true
            setLesson(prev => ({...prev, error: true}))
        }

        if (isError) {
            return
        }
        //todo api
        defaultValue()
        dispatch(resetForm())
        const data = {
            lesson_id: lesson.id,
            description: about.description,
            questions: questions
        }
        await create(data)


        onClose()
    };

    const handlerName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(prev => ({...prev, description: e.target.value, error: false}))
    };

    const handlerAbout = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAbout(prev => ({...prev, description: e.target.value, error: false}))
    };

    const handleLesson = (e: any, newValue: LessonField | null) => {
        setLesson({...lesson, title: (newValue && newValue.title) || '', id: newValue?.id, error: false})
    };

    const handlerAdd = () => {
        dispatch(addQuestion())
    };

    const closeWindow = () => {
        defaultValue()
        onClose()
    }

    const defaultValue = () => {
        setName({description: '', error: false})
        setAbout({description: '', error: false})
        setLesson({title: '', error: false})
    }

    return (
        <Dialog
            open = {open}
            TransitionComponent = {Transition}
            onClose = {closeWindow}
            fullScreen
        >
            <Box
                p = {3}
                px = {matches ? 3 : 10}
            >
                <Box
                    sx = {{
                        display: 'flex',
                        alignItems: 'center'
                    }}
                    mb = {2}
                >
                    <IconButton
                        onClick = {closeWindow}
                    >
                        <CloseIcon/>
                    </IconButton>
                    <Typography variant = 'h5' component = 'span'>
                        Create test
                    </Typography>
                </Box>
                <Grid
                    container
                    spacing = {3}
                >
                    <Grid item xs = {12} md = {6} lg = {4}>
                        <Box mb = {3}>
                            <TextField
                                label = 'Name'
                                variant = 'filled'
                                required
                                onChange = {handlerName}
                                value = {name.description}
                                error = {name.error}
                                fullWidth
                            />
                        </Box>
                    </Grid>
                    <Grid item xs = {12} md = {6} lg = {4}>
                        <Box mb = {3}>
                            <TextField
                                label = 'About'
                                variant = 'filled'
                                required
                                onChange = {handlerAbout}
                                value = {about.description}
                                error = {about.error}
                                fullWidth
                            />
                        </Box>
                    </Grid>
                    <Grid item xs = {12} md = {6} lg = {4}>
                        <Box mb = {3}>
                            <Autocomplete
                                renderInput = {params =>
                                    <TextField
                                        {...params}
                                        label = 'Lesson'
                                        variant = 'filled'
                                        required
                                        fullWidth
                                        error = {lesson.error}
                                    />
                                }
                                value = {lesson}
                                options = {lessons}
                                onChange = {handleLesson}
                                inputValue = {lessonInputValue}
                                onInputChange = {(e, newValue) => {
                                    setLessonInputValue(newValue)
                                }}
                                getOptionLabel = {(option: LessonField) => (option && option.title) || ''}
                                //renderOption = {(option) => <span>{option.title}</span>}
                            />
                        </Box>
                    </Grid>
                </Grid>
                <Box>
                    {
                        questions && questions.length ?
                            questions.map((item, index) =>
                                <Question
                                    value = {item}
                                    key = {item.id}
                                    index = {index}
                                />
                            ) : null
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
                        onClick = {saveTest}
                    >
                        Save
                    </Button>
                </Box>
            </Box>
        </Dialog>
    )

}

export default CourseCreate;
