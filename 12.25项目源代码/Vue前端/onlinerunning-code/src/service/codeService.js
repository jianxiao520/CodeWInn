import { request } from './request';
import API from './api';


// 自测代码
export const runCode = (Form) => {
    console.log(Form);
    return request(API.CODE_RUNCODE, Form, 'post');
}

export const SubmitCode = (Form) => {
    return request(API.CODE_SUBMIT_CODE, Form, "post");
}

export const getCurrentState = (taskId) => {
    return request(API.CODE_GET_STATE, {
        TaskId: taskId
    }, "get");
}

export const getTaskInfo = (taskId) => {
    return request(API.CODE_GET_INFO, {
        TaskId: taskId
    }, "get");
}

export const getAllProblem = (skip, limit) => {
    return request(API.PROBLEM_QUERYALL, {
        skip, limit
    }, "get");
}

export const getProblemCount = () => {
    return request(API.PROBLEM_QUERYCOUNT, "", "get");
}

export const getProblemInfo = (problemId) => {
    return request(API.PROBLEM_QUERYBYID, {
        pid: problemId
    }, "get");
}

export const getRandProblem = (limit) => {
    return request(API.PROBLEM_QUERY_RAND, {
        limit
    }, "get");
}