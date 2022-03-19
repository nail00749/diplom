import {ICourse} from "../models/ICourse";
import {emptyContentAPI} from "./emptyContentAPI";
import {ILesson} from "../models/ILesson";


export const contentAPI = emptyContentAPI.injectEndpoints({
    endpoints: (build) => ({
        getAllCourses: build.query<ICourse[], void>({
            query: () => '/courses',
            providesTags: ['Course']
        }),
        getCourse: build.query<ICourse, string>({
            query: (id) => `/courses/${id}`,
        }),
        getAllLessons: build.query<ILesson[], void>({
            query: () => '/lessons',
            providesTags: () => ['Lesson']
        }),
        getLesson: build.query<ILesson, string>({
            query: (id) => `/lessons/${id}`,
        })
    }),
    overrideExisting: true
})


export const {
    useGetAllCoursesQuery,
    useGetCourseQuery,
    useGetAllLessonsQuery,
    useGetLessonQuery
} = contentAPI

export const {reducer, middleware} = contentAPI
