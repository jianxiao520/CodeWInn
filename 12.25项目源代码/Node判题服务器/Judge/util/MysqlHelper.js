const Mysql = require("mysql");
const { NULL } = require("mysql/lib/protocol/constants/types");
const { PoolConfig } = require("../config/MySqlConfig");
let pool = Mysql.createPool(PoolConfig);

/** 
 * 写入任务当前状态
 * @method setTaskState
 * @param [TaskId] -> 任务ID
 * @param [State] -> 状态内容
 * @param [runTime] -> 运行时间
 * @param [additionalInfo] -> 附加内容
 * @return {boolean} -> 写入结果
*/
exports.setTaskInfo = function (TaskId, State, runTime, additionalInfo) {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) throw err;

            // 把预先字段放入数组对象中
            let slot = [
                { "result": State },
                { "runtime": runTime },
                { "additionalInfo": additionalInfo }
            ];
            // 遍历所有成员
            slot.forEach((item) => {
                // 遍历成员对象中的对象名
                for (let val in item) {
                    // 若传入的参数不为空则写入数据库
                    if (item[val] != null) {
                        let sql = `UPDATE solution SET ${val} = "${item[val]}" WHERE task_id = "${TaskId}"`;
                        connection.query(sql, err => {
                            if (err) throw err;
                        })
                    }
                }
            });
            resolve();
            // 释放连接对象
            connection.release();
        })
    })



}