// 用户状态模块
import { getCurrentState, runCode, getTaskInfo, SubmitCode } from '@/service/codeService';

// consoleOutPutList = {
//     outTitle: -> 执行标题
//     time: -> 提交时间
//     userOut: -> 用户输出
//     isSuccess: -> 是否成功
//     runTime: -> 程序运行时间
// }

// state
const state = () => ({
    consoleOutPutList: [],              // 提交执行的历史记录以及详细信息
    lang: 1,                            // 运行语言
    submitResult: {},                   // 提交判题返回结果详细信息
    currentTaskId: "",                  // 提交执行返回的TaskId 
    customInput: '',                    // 用户输入
    currentState: "无任务",              // 当前任务状态
    isShowLoading: false,               // 是否展示正在处理窗口
    isShowResult: false,                 // 是否展示答题结果框
    problemId: "",                      // 题目ID
    isSubmitProblem: false,             // flase: 用户自测代码、true: 提交代码
})

// mutations
const mutations = {
    ADD_OUTPUT_MESSAGE(state, outPutObj) {                      // 加入新执行结果入列表
        outPutObj.id = state.consoleOutPutList.length + 1;
        state.consoleOutPutList.push(outPutObj);
    },
    CLEAR_OUTPUT_MESSAGE(state) {                               // 清空执行结果列表
        state.consoleOutPutList = [];
    },
    SET_CURRENT_STATE(state, stateInfo) {                       // 设置当前任务状态
        state.currentState = stateInfo;
    },
    SET_CURRENT_TASKID(state, taskId) {                         // 设置当前TaskId
        state.currentTaskId = taskId;
    },
    SET_SHOW_LODING(state, isShow) {                            // 设置是否展示处理窗口
        state.isShowLoading = isShow;
    },
    SET_CUSTOM_INPUT(state, Content) {                          // 设置当前用户输入 (重定向输入)
        state.customInput = Content;
    },
    SET_PROBLEM_ID(state, id) {                                 // 设置题目ID
        state.problemId = id;
    },
    SET_PROBLEM_SELF_TEST(state) {                              // 设置提交类型为自测
        state.isSubmitProblem = false;
    },
    SET_PROBLEM_SUBMIT(state) {                                 // 设置提交类型为题目代码提交
        state.isSubmitProblem = true;
    },
    SET_SHOW_RESULT(state) {                                    // 展示答题结果框
        state.isShowResult = true;
    },
    SET_CLOSE_RESULT(state) {                                   // 关闭答题结果框
        state.isShowResult = false;
    },
    SET_RESULT(state, result) {
        state.submitResult = result;
    },
    SET_LANG(state, lang) {
        switch (lang) {
            case "C++":
                state.lang = 1;
                break;
            case "C":
                state.lang = 1;
                break;
            case "Python":
                state.lang = 4;
                break;
            default:
                state.lang = 1;
        }
    }
}
// actions
const actions = {
    // 获取最新的任务状态
    getCurrentState({ commit }, taskId) {
        return getCurrentState(taskId).then(res => {
            // 设置任务状态
            commit("SET_CURRENT_STATE", res.data.message);
            return Promise.resolve(res.data.message);
        })
    },
    // 获取任务全部信息 (获取状态为最终结果后执行)
    getTaskInfo({ commit, state }, taskId) {
        return getTaskInfo(taskId).then(res => {
            let TaskInfo = JSON.parse(res.data.message);
            let Result = {
                outTitle: `${TaskInfo.result}`,
                time: TaskInfo.subTime,
                userOut: TaskInfo.additionalInfo,
                isSuccess: TaskInfo.result == "Compile Success" ? true : false,
                runTime: TaskInfo.runtime
            };
            if (state.isSubmitProblem) {
                commit("SET_RESULT", Result);
                commit("SET_SHOW_RESULT");          // 展示结果
            } else {
                // 加入至任务详细列表
                commit("ADD_OUTPUT_MESSAGE", Result);

            }
            return Promise.resolve(TaskInfo);
        });
    },
    // 提交代码 (自测)
    submitCode({ commit }, runObject) {
        let { userCode, CustomInput, lang } = runObject;
        return runCode({
            userCode,
            CustomInput,
            lang
        }).then(
            (response) => {
                commit("SET_CURRENT_TASKID", response.data.message);
                return Promise.resolve(response.data);
            },
            (response) => {
                return Promise.reject(response.data);
            })
    },
    // 提交代码 ()
    submitCodeJudge({ commit, state }, runObject) {
        // state.problemId = "20981";
        let { userCode, lang } = runObject;
        return SubmitCode({
            userCode,
            SubjectId: state.problemId,
            lang
        }).then(
            (response) => {
                commit("SET_CURRENT_TASKID", response.data.message);
                return Promise.resolve(response.data);
            },
            (response) => {
                return Promise.reject(response.data);
            }
        )
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}