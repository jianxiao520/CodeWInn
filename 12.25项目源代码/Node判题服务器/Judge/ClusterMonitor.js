// 低配版集群监控中心
// 用于配置与启动多个判题服务器

const DOCKER = require('./config/DockerConfig.js');
const { spawn } = require("child_process");


// 启动配置项中全部判题服务器
DOCKER.Judges.forEach((item) => {
    let ContainerName = item.Name;
    let args = [
        "./app.js",
        ContainerName,
    ];

    // 启动子进程
    let child = spawn("node", args);
    child.stdout.on('data', data => {
        console.log(ContainerName, ">>", data.toString());
    });

    child.stderr.on("data", err => {
        console.log(ContainerName, "❌❌", err.toString());
    });

});


