import fetch from 'unfetch';
import { Response, CheckResponseFn, Error } from './types';

function checkStatus<T>(response: T): T {
    if ((response as Response).ok) {
        return response;
    }
    // convert non-2xx HTTP responses into errors:
    const error: Error = new Error((response as Response).statusText);
    error.response = response;
    return <T>Promise.reject(error);
}

export const getAllStudents = () =>
    fetch("api/v1/students")
        .then(<CheckResponseFn>checkStatus);