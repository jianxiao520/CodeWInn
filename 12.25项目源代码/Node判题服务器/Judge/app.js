// MySql 帮助类
const { setTaskInfo } = require("./util/MysqlHelper");
// RabbitMQ 帮助类
const RabbitMQ = require('./util/RabbitmqHelper');
// Docker 帮助类
const { writeFileToContainer, startJudge, isContainereExists } = require("./util/DockerHelper");
const { exit } = require("process");

// 服务判题机名称
const DOCKERINDEX = process.argv[2];

// 格式输出
let PrintLog = (...Message) => console.log(new Date().toTimeString().split(' ')[0] + " >> ", ...Message);

// 判断异常
if (!isContainereExists(DOCKERINDEX)) { PrintLog(`容器${DOCKERINDEX}不存在!`); exit(0); }
if (DOCKERINDEX == undefined) { PrintLog("传入参数出错"); exit(0); };
PrintLog(DOCKERINDEX, "判题服务器已启动");

let MQ = new RabbitMQ();
MQ.receiveTask(async (data) => {
    PrintLog("收到任务", data.taskId);
    let Lang = ['cpp', "c", 'java', 'py'];

    // 更新任务状态
    await setTaskInfo(data.taskId, "Compiling");



    // 代码写入容器
    writeFileToContainer(DOCKERINDEX, data.taskId, Lang[data.lang - 1], data.userCode, '/Judge')
    // 写入用户自定义输入
    if (data.isCustom == 1)
        writeFileToContainer(DOCKERINDEX, data.taskId, "in", data.customInput, '/Judge')


    // 更新任务状态
    await setTaskInfo(data.taskId, "Running");


    // 启动判题机
    let Result = startJudge(
        DOCKERINDEX,                    // 容器名称
        `/Judge/${data.taskId}.${Lang[data.lang - 1]}`,    // 容器内部代码的位置
        data.taskId,                    // 任务ID
        data.isCustom,                  // 是否为自定义输入
        data.lang,                      // 语言环境
        1,                              // 限制运行时长
        data.isCustom == 0 ? `/Subject/${data.subjectId}` : `/Judge/${data.taskId}.in` // 附加
    );




    // 处理结果返回
    if (Result["result"].status == "Accepted") {
        /* 
         * 返回结果：Accepted
         * 
         * 更新数据库结果，写入程序运行时间 
         * 
         */
        await setTaskInfo(data.taskId, "Accepted", Result["result"].time_usage);
    } else if (Result["result"].status == "Wrong Answer" || Result["result"].status == "Compile Success") {
        /* 
         * 返回结果：Wrong Answer、Compile Success
         * 
         * 结果为答题错误 或 自测运行完毕
         * 更新数据库结果，错误样题、错误结果
         * 
         */
        await setTaskInfo(
            data.taskId,
            Result["result"].status,
            Result["result"].time_usage,
            Result["result"].additionalInfo);
    } else {
        /* 
         * 返回结果：Compile Error、Time Limit Exceeded ...
         * 
         * 结果为编译错误、编译超时、运行超时...
         * 更新数据库结果，错误信息
         * 
         */
        // 编译出错或其他问题写入数据库
        await setTaskInfo(data.taskId, Result["result"].status, "0", Result["errorMessage"]);
    }

    PrintLog("任务完成", data.taskId, Result["result"].status);
}, (err) => {
    PrintLog("错误信息", err);
})

