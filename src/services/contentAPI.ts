import {ICourse} from "../models/ICourse";
import {emptyContentAPI} from "./emptyContentAPI";


export const contentAPI = emptyContentAPI.injectEndpoints({
    endpoints: (build) => ({
        getAllCourses: build.query({
            query: () => '/courses',
            providesTags: ['Course']
        }),
        getCourse: build.query<ICourse, string>({
            query: (id) => `/courses/${id}`,
            providesTags: ['Course']
        }),
        getAllLessons: build.query({
            query: () => '/lessons',
            providesTags: () => ['Lesson']
        }),
    }),
    overrideExisting: true
})


export const {
    useGetAllCoursesQuery,
    useGetCourseQuery,
    useGetAllLessonsQuery,
} = contentAPI

export const {reducer, middleware} = contentAPI
