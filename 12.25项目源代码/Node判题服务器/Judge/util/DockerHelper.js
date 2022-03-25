const { execSync } = require("child_process");
const fs = require("fs");

/** 
 * 将内容生成文件写入至容器内部
 * @method writeFIleToContainer
 * @param [ContainerName] -> 容器名称
 * @param [TaskId]] -> 任务ID
 * @param [extension] -> 写入文件的后缀
 * @param [Content] -> 写入文件的内容
 * @param [target] -> 目标文件路径
 * @return {boolean} -> 写入结果
*/
function writeFileToContainer(ContainerName, TaskId, extension, Content, target) {
    // 目标是否符合规范
    if (Content == undefined) Content = " ";

    // 内容写入宿主机
    let localCodePath = `${process.cwd()}/public/UserCode/${TaskId}.${extension}`;

    fs.writeFileSync(
        localCodePath,
        new Buffer.from(Content, 'base64').toString("utf-8")
    );

    let command = `docker cp ${localCodePath} ${ContainerName}:${target}`;
    // 执行
    execSync(command);

    // 删除本地用户代码文件
    fs.unlinkSync(localCodePath);
    return true;
}


/** 
 * 将用户代码交由判题机进行运行
 * @method startJudge
 * @param [ContainerName] -> 容器名称
 * @return {} ->
*/
function startJudge(ContainerName, CodePath, TaskId, isCustom, Lang, TimeLimit, addPath) {

    // 启动Judge判题机
    let JudgeCommand = `/Judge/judge -c ${CodePath} -d ${TaskId} -l ${Lang} -t ${TimeLimit} -r /Judge ${isCustom == 0 ? '-e' : '-s'} ${addPath}`;
    let DockerCommand = `docker exec ${ContainerName} ${JudgeCommand}`;
    // console.log(DockerCommand);
    execSync(DockerCommand);
    /*
     *  执行完判题机后
     *
     *  获取判题机重定向输出的所有文件
     *  *.result (结果信息文件)、*.error (错误信息文件)、*.out (程序输出文件)
     * 
     */
    let Run_result = getContainerFileContent(ContainerName, `/Judge/${TaskId}.result`);
    let Run_error = getContainerFileContent(ContainerName, `/Judge/${TaskId}.error`);
    let status = Run_result.split("\n")[0];
    let time_usage = Run_result.split("\n")[1];
    let Run_Out = "";
    if (status != "Compile Error") {
        Run_Out = getContainerFileContent(ContainerName, `/Judge/${TaskId}.out`);
    }

    // 删除与此任务有关的所有文件
    delAllTaskFile(ContainerName, "/Judge", TaskId);

    // 处理附加信息 -> Base64编码
    let additionalInfo = isCustom == 0 ?
        Run_result.substring(Run_result.indexOf("_")) :
        new Buffer.from(Run_Out, "utf-8").toString('base64');


    return {
        "result": {
            status,
            time_usage,
            additionalInfo
        },
        "errorMessage": new Buffer.from(Run_error, "utf-8").toString('base64')
    }
}


/** 
 * 获取容器内部指定文件的内容
 * @method getContainerFileContent
 * @param [ContainerName] -> 容器名称
 * @param [Path] -> 需要获取内容的文件路径
 * @return {string} -> 返回的文件内容
*/
function getContainerFileContent(ContainerName, Path) {
    let Content = execSync(`docker exec ${ContainerName} cat ${Path}`);
    return Content.toString();
}



/** 
 * 删除容器内所有与TaskId有关的文件
 * @method delAllTaskFile
 * @param [ContainerName] -> 容器名称
 * @param [Path] -> 删除的路径
 * @param [TaskId] -> 删除的TaskId
 * @return {} ->
*/
function delAllTaskFile(ContainerName, Path, TaskId) {
    execSync(`docker exec ${ContainerName} bash -c "rm ${Path}/${TaskId}*"`);
}

/** 
 * 查询容器是否存在
 * @method isContainereExists
 * @param [ContainerName] -> name
 * @return {boolean} ->
*/
function isContainereExists(name) {
    let Content = execSync(`docker ps -f name=${name}`).toString();
    return Content.indexOf(name) != -1 ? true : false;
}
module.exports = {
    writeFileToContainer,
    startJudge,
    isContainereExists
}