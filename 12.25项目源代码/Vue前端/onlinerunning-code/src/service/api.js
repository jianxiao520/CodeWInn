// 定义API的文件

const USER_API = 'user';
const PROBLEM_API = 'problem';
const CODE_API = 'judge'

const base = {
    // USER 类
    ACCOUNT_REGISTER    :   `/${USER_API}/create`,                      // 注册账户接口
    ACCOUNT_LOGIN       :   `/${USER_API}/login`,                       // 登录账户接口
    ACCOUNT_VERIFY      :   `/${USER_API}/verifyUser`,                  // 校验账户接口

    // PROBLEM 类
    PROBLEM_QUERYALL    :   `/${PROBLEM_API}/queryAllProblem`,          // 查询全部题目接口
    PROBLEM_QUERYCOUNT    :   `/${PROBLEM_API}/queryProblemCount`,          // 查询全部题目接口
    PROBLEM_QUERYBYID   :   `/${PROBLEM_API}/queryProblemById`,         // 根据ID查询题目接口
    PROBLEM_QUERY_RAND  :   `/${PROBLEM_API}/queryRandProblem`,         // 随机查询N条题目接口

    // CODE 类
    CODE_RUNCODE        :   `/${CODE_API}/runCode`,                     // 自测用户代码接口
    CODE_SUBMIT_CODE    :   `/${CODE_API}/submitCode`,                  // 提交题目代码判题
    CODE_GET_STATE      :   `/${CODE_API}/getTaskState`,                // 获取提交任务状态
    CODE_GET_INFO       :   `/${CODE_API}/getTaskAllInfo`               // 获取任务全部信息
}

export default base;
