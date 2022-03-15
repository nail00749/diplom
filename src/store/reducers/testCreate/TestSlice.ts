import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IAnswer, IQuestion} from "../../../models/ITest";


export interface TestState {
    questions: IQuestion[]
}

const initialState: TestState = {
    questions: []
}

interface ITextChange {
    index: number,
    text: string
}

interface IAnswerPayload {
    indexQuestion: number,
    indexAnswer: number,
    value?: string
}

export const testSlice = createSlice({
    name: 'testCreate',
    initialState,
    reducers: {
        addQuestion: (state) => {
            const question: IQuestion = {
                text: '',
                answers: [],
                is_extended: false,
                is_multiple: false,
                id: Date.now().toString()
            }
            state.questions.push(question)
        },
        textQuestion: (state, action: PayloadAction<ITextChange>) => {
            const {index, text} = action.payload
            state.questions[index].text = text
        },
        deleteQuestion: (state, action: PayloadAction<number>) => {
            state.questions = state.questions.filter((item, i) => i !== action.payload)
        },
        extensionChange: (state, action: PayloadAction<number>) => {
            state.questions[action.payload].is_extended = !state.questions[action.payload].is_extended
        },
        multipleChange: (state, action: PayloadAction<number>) => {
            state.questions[action.payload].is_multiple = !state.questions[action.payload].is_multiple
        },
        resetForm: (state) => {
            state = initialState
        },
        addAnswer: (state, action: PayloadAction<number>) => {
            const answer: IAnswer = {
                text: '',
                is_correct: false,
                id: Date.now().toString()
            }
            state.questions[action.payload].answers.push(answer)
        },
        deleteAnswer: (state, action: PayloadAction<IAnswerPayload>) => {
            const answers = [...state.questions[action.payload.indexQuestion].answers]
                .filter((_, i) => i !== action.payload.indexAnswer)

            state.questions[action.payload.indexQuestion].answers = answers
        },
        textAnswer: (state, action: PayloadAction<IAnswerPayload>) => {
            const answers = [...state.questions[action.payload.indexQuestion].answers]
            answers[action.payload.indexAnswer].text = action.payload.value!
            state.questions[action.payload.indexQuestion].answers = answers
        },
        correctAnswer: (state, action: PayloadAction<IAnswerPayload>) => {
            const answers = [...state.questions[action.payload.indexQuestion].answers]
            answers[action.payload.indexAnswer].is_correct = !answers[action.payload.indexAnswer].is_correct
            state.questions[action.payload.indexQuestion].answers = answers
        }
    }
})

export const {
    addQuestion,
    textQuestion,
    deleteQuestion,
    resetForm,
    extensionChange,
    multipleChange,
    addAnswer,
    deleteAnswer,
    textAnswer,
    correctAnswer
} = testSlice.actions

export default testSlice.reducer
