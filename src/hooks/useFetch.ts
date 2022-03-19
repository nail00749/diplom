import {useCallback, useState} from "react";
import {BaseURL} from '../config/index'


export interface RequestOptions<T> {
    body: T | Array<any>  | string,
    headers?: Object
    method: 'GET' | 'POST' | 'PUT' | 'DELETE'
}

export const useFetch = <T>() => {
    /*const [loading, setLoading] = useState(false)
    const [error, setError] = useState('');*/

    const request = async (url: string, requestOptions: RequestOptions<T>, isFormData = false, isFullUrl = false): Promise<T> => {
        //setLoading(true)
        try {
            let fullUrl: string;
            fullUrl = BaseURL + url
            if (isFullUrl) {
                fullUrl = url
            }

            const headers = {
                'Content-type':'application/json; charset=UTF-8'
            }

            let body: string | FormData
            if (isFormData) {
                let b = requestOptions.body
                body = new FormData()
                if(typeof body === 'object') {
                    Object.keys(b as Array<keyof typeof b>).forEach(key => {

                        // @ts-ignore
                        body.append(key, b[key])
                        //(key, requestOptions.body[key])
                    })
                }
            } else {
                body = JSON.stringify(requestOptions.body)
                if(requestOptions.method !== "GET") {
                    //todo
                }
                else {

                }
            }

            const options = {
                headers: requestOptions.headers || headers,
                body
            }

            const response = await fetch(fullUrl, options as RequestInit)
            const data: T = await response.json()

            if (!response.ok) {
                throw new Error(response.statusText || "Что то пошло не так")
            }
            //setLoading(false)
            return data


            //return new Promise<T>(() => {})
            /*
            const data = new FormData()
            data.append('username', 'string')
            data.append('password', 'string')
            const options = {method: "POST", headers: { 'Content-Type': 'application/x-www-form-urlencoded'}, body: data}
            const resp = await fetch('http://178.46.163.86:8000/token', options)
             */
        } catch (e: any) {
            //setError(e.message)
            throw e
        } finally {
            //setLoading(false)
        }

    }

    const clearError = () => {
        //setError('')
    }

    return {/*loading,*/ request, /*error,*/ clearError}
}
