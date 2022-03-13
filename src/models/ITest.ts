export interface IQuestion {
    text: string,
    answers: IAnswer[],
    isExtensions?: boolean,
    isMultiple?: boolean,
    id?: string
}

export  interface IAnswer {
    text: string,
    isCorrect?: boolean,
    id?: string

}
