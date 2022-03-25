const amqp = require('amqplib');
const { MabbitMQ } = require('../config/RabbitMQConfig.js');

class RabbitMQ {
    constructor() {
        this.url = MabbitMQ.url;
        this.queueName = MabbitMQ.QueueName;
        this.Maximum = MabbitMQ.Maximum;
        // 连接MQ
        this.open = amqp.connect(this.url);
    }

    // 消费者
    receiveTask(receiveCallBack, errCallBack) {

        let self = this;
        self.open
            // 创建连接通道
            .then(conn => conn.createChannel())
            .then(channel => {
                // 设置最大处理数
                channel.prefetch(self.Maximum);
                // 获取队列
                return channel.assertQueue(self.queueName)
                    .then(() => {
                        // 接受消息
                        return channel.consume(self.queueName, async msg => {
                            let data = msg.content.toString();
                            // 把消息交由回调函数处理
                            await receiveCallBack(JSON.parse(data));
                            // 应答
                            channel.ack(msg);
                            // console.log("做出应答");
                        }, { noAck: false });
                    });
            })
            .catch(error => {
                console.log(error);
                errCallBack && errCallBack(error);
            });
    }
}


module.exports = RabbitMQ;