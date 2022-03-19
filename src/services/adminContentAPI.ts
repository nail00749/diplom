import {emptyContentAPI} from "./emptyContentAPI";
import {ICourse} from "../models/ICourse";
import {contentAPI} from "./contentAPI";

export const contentAdminAPI = emptyContentAPI.injectEndpoints({
    endpoints: (build) => ({
        createCourse: build.mutation({
            query: (body) => ({
                url: '/courses',
                method: 'POST',
                body
            }),
            invalidatesTags: ['Course']
        }),
        updateCourse: build.mutation<ICourse, ICourse>({
            query: (body) => ({
                url: `/courses/?course_id=${body.id}`,
                method: 'PATCH',
                body
            }),
            invalidatesTags: ['Course'],
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
        }),
    }),
    overrideExisting: true
})


export const {
    useCreateCourseMutation,
    useCreateLessonMutation,
    useCreateTestMutation,
    useUpdateCourseMutation,
} = contentAdminAPI

export const {reducer, middleware} = contentAPI
