import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {BaseURL} from "../config";

export const teacherAPI = createApi({
    reducerPath: 'teacherAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: BaseURL,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token')
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }
            return headers
        }
    }),
    tagTypes: ['Course', 'Lesson', 'Test'],
    endpoints: (build) => ({
        getAllCourses: build.query({
            query: () => '/courses',
            providesTags: () => ['Course']
        }),
        createCourse: build.mutation({
            query: (body) => ({
                url: '/courses',
                method: 'POST',
                body
            }),
            invalidatesTags: ['Course']
        }),
        getAllLessons: build.query({
            query: () =>'/lessons',
            providesTags: () => ['Lesson']
        }),
        createLesson: build.mutation({
            query: (body) => ({
                url: '/lessons',
                method: 'POST',
                body
            }),
            invalidatesTags: ['Lesson']
        }),
        createTest: build.mutation({
            query: (body) => ({
                url: '/tests',
                method: 'POST',
                body
            })
        })
    })
})

export const {
    useCreateCourseMutation,
    useGetAllCoursesQuery,
    useCreateLessonMutation,
    useGetAllLessonsQuery,
    useCreateTestMutation
} = teacherAPI

export const {endpoints, reducerPath, reducer, middleware} = teacherAPI
